import styles from "./Header.module.css";
import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSpring, animated } from "@react-spring/web";
import Modal from "../modal/Modal";
import Search from "../search/Search";

const Header = () => {
  const local = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [isBurger, setIsBurger] = useState(true);
  const responsiveOne = useMediaQuery({ query: "(max-width: 58.4em)" });
  const [nav, setNav] = useState();
  const [props, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  const logoClickHandler = () => {
    navigate("/");
  };
  const modalClickHandler = () => {
    setModal(true);
  };

  const profileClickHandler = () => {
    navigate(`/user/profile/${local.id}`);
  };

  useEffect(() => {
    setNav(
      <nav>
        <ul className={`${styles.nav} ${isBurger ? styles.hidden : ""}`}>
          <li>
            <Search />
          </li>
          <li>
            <NavLink to="/trending" className={styles["nav-item"]}>
              Trending
            </NavLink>
          </li>
          {local !== null ? (
            <li>
              <button
                onClick={profileClickHandler}
                className={`${styles["nav-item"]} ${styles["sign-up"]}`}
              >
                My Profile
              </button>
            </li>
          ) : (
            <Fragment>
              <li>
                <button
                  onClick={modalClickHandler}
                  className={`${styles["nav-item"]} ${styles.modal}`}
                >
                  Login
                </button>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={`${styles["nav-item"]} ${styles["sign-up"]}`}
                >
                  Sign Up
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    );
  }, [isBurger, local?.id]);

  return (
    <header className={styles.box}>
      <div className={styles.section}>
        <h1 onClick={logoClickHandler} className={styles.logo}>
          movieNotice
        </h1>
        {responsiveOne ? (
          <ion-icon
            id={styles.icon}
            name={isBurger ? "menu" : "close"}
            onClick={() => setIsBurger((prev) => !prev)}
          ></ion-icon>
        ) : (
          <Fragment>{nav}</Fragment>
        )}
      </div>
      {responsiveOne && <animated.div style={props}>{nav}</animated.div>}
      {modal && <Modal type="login" modal={modal} setModal={setModal} />}
    </header>
  );
};

export default Header;
