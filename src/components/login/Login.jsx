import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import AuthErrors from "../store/auth-errors";

import React, { useContext } from "react";

const date = (val) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(val));

const Login = (props) => {
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
        localStorage.setItem(
          "user",
          JSON.stringify({
            isLoggedIn: true,
            id: user.uid,
            email: user.email,
            userJoined: date(user.metadata.creationTime),
            userLast: date(user.metadata.lastSignInTime),
          })
        );
        props.setModal(false);

        navigate(`/user/profile/${user.uid}`);
      });
    } catch (error) {
      setError(error.code.split("/")[0], {
        message: ctxErrors[error.code.split("/")[1]],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <h2 className={styles.heading}>Log In</h2>
      <div className={styles["inputs-box"]}>
        <div>
          <input
            {...register("email", {
              required: "This is required",
              shouldUnregister: true,
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid input",
              },
            })}
            onFocus={() => clearErrors("auth")}
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
              minLength: {
                value: 8,
                message: "Password should contain at least 8 characters",
              },
            })}
            onFocus={() => clearErrors("auth")}
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
