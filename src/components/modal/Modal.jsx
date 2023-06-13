import React, { useContext, useRef, useReducer, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./Modal.module.css";
import UserContext from "../store/user-context";

const initData = {
  email: "",
  password: "",
  emailError: false,
  emailErrorType: "",
  passError: false,
  passErrorType: "",
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        emailError: true,
        emailErrorType: action.errorType,
      };
    case "EMAIL_TRUE":
      return {
        ...state,
        emailError: false,
        emailErrorType: "",
      };
    case "PASSWORD":
      return {
        ...state,
        passError: true,
        passErrorType: action.errorType,
      };
  }
  return initData;
};

const Modal = (props) => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const [data, dispatchData] = useReducer(dataReducer, initData);
  const emailRef = useRef();
  const passRef = useRef();
  const symbols = ["&", "=", "_", "'", "-", "+", ",", "<", ">", '"'];

  const closeClickHandler = () => {
    props.setModal(false);
  };

  const formSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passRef.current.value;
      if (email.length < 8) {
        dispatchData({
          type: "EMAIL",
          errorType: "Email should contain at least 8 characters",
        });
        return;
      }
      if (email.split("").some((mov) => symbols.includes(mov))) {
        dispatchData({
          type: "EMAIL",
          errorType:
            "Email should only contain letters (a-z), numbers (0-9) and periods (.)",
        });
        return;
      }
      dispatchData({ type: "EMAIL_TRUE" });
      if (password.length < 8) {
        dispatchData({
          type: "PASSWORD",
          errorType: "Password should contain at least 8 characters",
        });
        return;
      }
      dispatchData({
        type: "TRUE",
      });

      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/authentication/token/new",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
        },
      };
      if (props.type === "Sign Up") {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          ctx.collector({
            type: "LOGIN",
            isLoggedIn: true,
            userID: user.uid,
            userEmail: user.email,
            userJoined: user.metadata.creationTime,
            userLast: user.metadata.lastSignInTime,
            userShows: "",
            userMovies: "",
          });
          navigate(`/user/profile/${user.uid}`);
        });
        props.setModal(false);
      } else if (props.type === "Login") {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          ctx.collector({
            type: "LOGIN",
            isLoggedIn: true,
            userID: user.uid,
            userEmail: user.email,
            userJoined: user.metadata.creationTime,
            userLast: user.metadata.lastSignInTime,
            userShows: "",
            userMovies: "",
          });
          navigate(`/user/profile/${user.uid}`);
        });
        props.setModal(false);
      }
    } catch (error) {
      console.error(error);
      dispatchData({
        type: "EMAIL",
        errorType: `Invalid Email / Already in use`,
      });
    }
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatchData({ type: "LOGOUT" });
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.box}>
      {props.type === "Sign Up" || props.type === "Login" ? (
        <form onSubmit={formSubmitHandler} className={styles.form}>
          <h2 className={styles.heading}>{props.type}</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className={`${styles.username} ${
                data.emailError && styles.error
              }`}
              name="email"
              type="email"
              ref={emailRef}
            />
            {data.emailError && (
              <span className={styles["error-text"]}>
                {data.emailErrorType}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className={`${styles.password} ${data.passError && styles.error}`}
              name="password"
              type="password"
              ref={passRef}
            />
            {data.passError && (
              <span className={styles["error-text"]}>{data.passErrorType}</span>
            )}
            {props.type === "Login" && (
              <span className={styles.forgot}>Forgot Password?</span>
            )}
          </div>
          <button className={styles.btn}>Continue</button>
        </form>
      ) : (
        <Fragment>
          <div className={styles.form}>
            <h2 className={styles.heading}>Do you want to log out?</h2>
            <button onClick={logoutHandler} className={styles.btn}>
              Yes
            </button>
          </div>
        </Fragment>
      )}
      <ion-icon
        onClick={closeClickHandler}
        id={styles.icon}
        name="close-circle"
      ></ion-icon>
    </div>
  );
};

export default Modal;
