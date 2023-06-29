import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../store/user-context";
import AuthErrors from "../store/auth-errors";

import React, { useContext } from "react";

const Login = () => {
  const ctx = useContext(UserContext);
  const ctxErrors = useContext(AuthErrors);
  const navigate = useNavigate();
  const {
    register,
    unregister,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data, e) => {
    e.preventDefault();
    unregister();
    try {
      const request = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        const user = userCredential.user;
        ctx.collector({
          type: "LOGIN",
          isLoggedIn: true,
          userID: user.uid,
          userEmail: user.email,
          userJoined: user.metadata.creationTime,
          userLast: user.metadata.lastSignInTime,
        });
        navigate(`/user/profile/${user.uid}`);
      });
    } catch (error) {
      setError(error.code.split("/")[0], {
        message: ctxErrors[error.code.split("/")[1]],
      });
    }
  };

  const errorHandler = () => {
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler, errorHandler)}
      className={styles.form}
    >
      <h2 className={styles.heading}>Log In </h2>
      <div className={styles["inputs-box"]}>
        <div>
          <input
            {...register("email", {
              required: "This is required",
              shouldUnregister: true,
              onChange: (e) => {
                clearErrors("auth");
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid input",
              },
            })}
            type="email"
            className={styles.input}
            placeholder="Email"
          />
          <span
            className={styles["error-text"]}
            style={{ opacity: `${errors.email?.message ? 1 : 0}` }}
          >
            {errors.email?.message ? errors.email.message : ""}
          </span>
        </div>
        <div>
          <input
            {...register("password", {
              required: "This is required",
              shouldUnregister: true,
              onChange: (e) => {
                clearErrors("auth");
              },
              minLength: {
                value: 8,
                message: "Password should contain at least 8 characters",
              },
            })}
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <span
            className={styles["error-text"]}
            style={{ opacity: `${errors.password?.message ? 1 : 0}` }}
          >
            {errors.password?.message ? errors.password.message : ""}
          </span>
          <span
            className={styles["error-text"]}
            style={{ opacity: `${errors.auth?.message ? 1 : 0}` }}
          >
            {errors.auth?.message ? errors.auth.message : ""}
          </span>
          <p className={styles.forgot}>Forgot Password?</p>
        </div>
      </div>
      <button className={styles.btn}>Continue</button>
    </form>
  );
};

export default Login;
