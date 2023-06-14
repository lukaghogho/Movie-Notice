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
import Input from "./input/Input";

const initData = {
  email: "",
  password: "",
  emailError: false,
  emailErrorType: "",
  passError: false,
  passErrorType: "",
  authError: false,
  authErrorType: "",
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
    case "AUTH":
      return {
        ...state,
        authError: true,
        authErrorType: action.errorType,
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
  // const symbols = ["&", "=", "_", "'", "-", "+", ",", "<", ">", '"'];
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // const closeClickHandler = () => {

  // };

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
        throw new Error("Email should contain at least 8 characters");
      }
      if (!email.match(validRegex)) {
        dispatchData({
          type: "EMAIL",
          errorType: "Invalid input",
        });
        throw new Error("Invalid input");
      }
      dispatchData({ type: "EMAIL_TRUE" });
      if (password.length < 8) {
        dispatchData({
          type: "PASSWORD",
          errorType: "Password should contain at least 8 characters",
        });
        throw new Error("Password should contain at least 8 characters");
      }
      dispatchData({
        type: "TRUE",
      });
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
      console.log(error.code);
      let errType = error.code.split("/")[0].toUpperCase();
      const str = error.code.split("/")[1].replaceAll("-", " ");
      if (str === "wrong password") errType = "PASSWORD";
      // console.log(str);
      dispatchData({
        type: errType,
        errorType: str[0].toUpperCase() + str.slice(1),
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
          <div className={styles["inputs-box"]}>
            <Input
              name="email"
              type="email"
              error={data.emailError}
              errorType={data.emailErrorType}
              reff={emailRef}
            ></Input>
            <Input
              name="password"
              type="password"
              error={data.passError}
              errorType={data.passErrorType}
              reff={passRef}
            ></Input>
          </div>
          {data.authError && (
            <p className={styles["auth-error"]}>{data.authErrorType}</p>
          )}
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
        onClick={() => props.setModal(false)}
        id={styles.icon}
        name="close-circle"
      ></ion-icon>
    </div>
  );
};

export default Modal;
