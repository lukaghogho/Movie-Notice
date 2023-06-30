import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import Logout from "../logout/Logout";
import Login from "../login/Login";
import { useSpring, animated } from "@react-spring/web";

const Modal = (props) => {
  const [content, setContent] = useState();
  const [springs, api] = useSpring(() => ({
    from: { opacity: props.modal ? 0 : 1 },
    to: { opacity: props.modal ? 1 : 0 },
  }));
  useEffect(() => {
    setContent(() => {
      if (props.type === "login")
        return <Login modal={props.modal} setModal={props.setModal} />;
      else if (props.type === "logout")
        return <Logout modal={props.modal} setModal={props.setModal} />;
    });
  }, [props.type]);
  return (
    <animated.div className={styles.box} style={{ ...springs }}>
      {content}
      <ion-icon
        onClick={() => {
          api.start({
            from: { opacity: 1 },
            to: { opacity: 0 },
          });
          setTimeout(() => {
            props.setModal(false);
          }, 400);
        }}
        id={styles.icon}
        name="close-circle"
      ></ion-icon>
    </animated.div>
  );
};

export default Modal;
