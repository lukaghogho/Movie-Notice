import styles from "./Logout.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import React from "react";

const Logout = (props) => {
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    const type = e.target.innerHTML;
    try {
      if (type === "Yes") {
        const post = await signOut(auth);
        localStorage.clear();
        navigate("/");
      } else if (type === "No") {
        props.closeModal.start({
          from: { opacity: 1 },
          to: { opacity: 0 },
        });
        setTimeout(() => props.setModal(false), 400);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.box}>
      <h2 className={styles.heading}>Do you want to log out?</h2>
      {/* <button onClick={logoutHandler} className={styles.btn}>
        No
      </button>
      <button onClick={logoutHandler} className={styles.btn}>
        Yes
      </button> */}
      <div className={styles.btns}>
        {["No", "Yes"].map((mov, i) => {
          return (
            <button key={i} onClick={logoutHandler} className={styles.btn}>
              {mov}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Logout;
