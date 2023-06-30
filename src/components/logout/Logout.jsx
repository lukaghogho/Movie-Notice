import styles from "./Logout.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "../store/user-context";

const Logout = () => {
  const ctxUser = useContext(UserContext);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const post = await signOut(auth);
      ctxUser.collector({ type: "LOGOUT" });
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
