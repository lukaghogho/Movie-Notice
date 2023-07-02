import styles from "./Logout.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import React from "react";

const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const post = await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.box}>
      <h2 className={styles.heading}>Do you want to log out?</h2>
      <button onClick={logoutHandler} className={styles.btn}>
        Yes
      </button>
    </div>
  );
};

export default Logout;
