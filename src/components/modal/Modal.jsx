import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import Logout from "../logout/Logout";
import Login from "../login/Login";

const Modal = (props) => {
  const [content, setContent] = useState();
  useEffect(() => {
    setContent(() => {
      if (props.type === "login")
        return <Login modal={props.modal} setModal={props.setModal} />;
      else if (props.type === "logout")
        return <Logout modal={props.modal} setModal={props.setModal} />;
    });
  }, []);
  return (
    <div className={styles.box}>
      {content}
      <ion-icon
        onClick={() => props.setModal(false)}
        id={styles.icon}
        name="close-circle"
      ></ion-icon>
    </div>
  );
};

export default Modal;
