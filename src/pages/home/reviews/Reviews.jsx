import styles from "./Reviews.module.css";
import React from "react";
import rogan from "../../../assets/rogan.jpg";

import churchill from "../../../assets/churchill.jpg";
import tarantino from "../../../assets/tarantino.jpg";

const Reviews = () => {
  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Reviews</h2>
        <ul className={styles.list}>
          <li className={styles.review}>
            <img className={styles.img} src={churchill} alt="winston" />
            <div>
              <p className={styles.name}>Winston</p>
              <span className={styles.text}> Underidoderidoderiododeridoo</span>
            </div>
          </li>
          <li className={`${styles.review} ${styles.middle}`}>
            <img className={styles.img} src={rogan} alt="rogan" />
            <div>
              <p className={styles.name}>Joe</p>
              <span className={styles.text}>
                {" "}
                Movie Notice is a BAD MUTHERFUCKER!
              </span>
            </div>
          </li>
          <li className={styles.review}>
            <img className={styles.img} src={tarantino} alt="rogan" />
            <div>
              <p className={styles.name}>Quentin</p>
              <span className={styles.text}>
                {" "}
                Wow, this thing is really cool
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Reviews;
