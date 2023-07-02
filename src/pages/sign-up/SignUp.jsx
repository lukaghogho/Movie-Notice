import styles from "./Signup.module.css";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AuthErrors from "../../components/store/auth-errors";
import axios from "axios";

const SignUp = () => {
  const ctxErrors = useContext(AuthErrors);
  const navigate = useNavigate();
  const date = (val) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      new Date(val)
    );
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
      let userID;
      const requestAuth = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        const user = userCredential.user;
        userID = user.uid;
        localStorage.setItem(
          "user",
          JSON.stringify({
            isLoggedIn: "1",
            id: user.uid,
            email: user.email,
            userJoined: date(user.metadata.creationTime),
            userLast: date(user.metadata.lastSignInTime),
          })
        );
      });
      const requestUser = await axios.put(
        `https://movie-notice-default-rtdb.europe-west1.firebasedatabase.app/users/${userID}/1396.json`,
        {
          id: 1396,
          poster_path:
            "https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
          name: "Breaking Bad",
          rating: "8.9",
          release: 2008,
        }
      );
      console.log(requestUser);
      navigate(`/user/profile/${userID}`);
    } catch (error) {
      console.error(error);
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
      <h2 className={styles.heading}>Sign up</h2>
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
        </div>
      </div>
      <button className={styles.btn}>Continue</button>
    </form>
  );
};

export default SignUp;
