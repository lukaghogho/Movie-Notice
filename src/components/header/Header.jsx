import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useContext, Fragment, useEffect } from "react";
import UserContext from "../store/user-context";
import Modal from "../modal/Modal";
import Search from "../search/Search";

const Header = () => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState();

  const logoClickHandler = () => {
    navigate("/");
  };
  const modalClickHandler = (e) => {
    setModal(true);
  };

  const profileClickHandler = (e) => {
    navigate(`/user/profile/${ctx.userID}`);
  };

  useEffect(() => {
    setContent(
      ctx.isLoggedIn ? (
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
          {" "}
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
      )
    );
  }, [ctx]);

  return (
    <header className={styles.box}>
      <div className={styles.section}>
        <h1 onClick={logoClickHandler} className={styles.logo}>
          movieNotice
        </h1>
        <nav>
          <ul className={styles.nav}>
            <li>
              <Search />
            </li>
            <li>
              <NavLink to="/trending" className={styles["nav-item"]}>
                Trending
              </NavLink>
            </li>
            {content}
          </ul>
        </nav>
      </div>
      {modal && <Modal type="login" modal={modal} setModal={setModal} />}
    </header>
  );
};

export default Header;
