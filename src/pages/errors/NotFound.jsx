import styles from "./NotFound.module.css";
import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <div className={styles.box}>
      <ion-icon id={styles.icon} name="hammer"></ion-icon>
      <h1 className={styles.heading}>Page not found 404</h1>
    </div>
  );
};

export default NotFound;
