import React, { useContext, useRef, useReducer, Fragment } from "react";
import useAuth from "../hooks/use-auth";
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
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const formSubmitHandler = (e) => {
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
    console.log(props.type);
    useAuth(
      props.type,
      email,
      password,
      props.setModal,
      dispatchData,
      ctx.collector,
      navigate
    );
    // if (props.type === "Sign Up") {
    //   const response = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   ).then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     ctx.collector({
    //       type: "LOGIN",
    //       isLoggedIn: true,
    //       userID: user.uid,
    //       userEmail: user.email,
    //       userJoined: user.metadata.creationTime,
    //       userLast: user.metadata.lastSignInTime,
    //       userShows: "",
    //       userMovies: "",
    //     });
    //     navigate(`/user/profile/${user.uid}`);
    //   });

    //   props.setModal(false);
    // } else if (props.type === "Login") {
    //   const response = await signInWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   ).then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     ctx.collector({
    //       type: "LOGIN",
    //       isLoggedIn: true,
    //       userID: user.uid,
    //       userEmail: user.email,
    //       userJoined: user.metadata.creationTime,
    //       userLast: user.metadata.lastSignInTime,
    //       userShows: "",
    //       userMovies: "",
    //     });
    //     navigate(`/user/profile/${user.uid}`);
    //   });
    //   console.log(response);
    //   props.setModal(false);
    // }
  };

  const logoutHandler = async () => {
    try {
      const post = await signOut(auth);
      dispatchData({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
        <div className={styles.form}>
          <h2 className={styles.heading}>Do you want to log out?</h2>
          <button onClick={logoutHandler} className={styles.btn}>
            Yes
          </button>
        </div>
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
