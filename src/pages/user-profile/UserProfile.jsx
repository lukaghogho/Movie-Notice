import styles from "./UserProfile.module.css";
import MoviesList from "../../components/movies-list/MoviesList";
import React, { Fragment, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../components/store/user-context";
import Modal from "../../components/modal/Modal";
import NotFound from "../errors/NotFound";

const UserProfile = (props) => {
  const params = useParams();
  const ctx = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const optionsShows = {
    method: "GET",
    url: "https://api.themoviedb.org/3/account/19890581/favorite/tv",
    params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  };

  const optionsMovies = {
    method: "GET",
    url: "https://api.themoviedb.org/3/account/19890581/favorite/movies",
    params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  };

  const logoutClickHandler = () => {
    setModal(true);
  };

  return (
    <Fragment>
      {ctx.isLoggedIn ? (
        <Fragment>
          <div className={styles["profile-section"]}>
            <div className={styles["profile-box"]}>
              <img
                className={styles.img}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png"
                alt="user-default"
              ></img>
              <div>
                <p className={styles.email}>{ctx.userEmail}</p>
                <div className={styles["joined-box"]}>
                  <p className={styles.joined}>Joined:</p>
                  <span className={styles["joined-date"]}>
                    {ctx.userJoined}
                  </span>
                </div>
                <p className={styles.joined}>Last Visit:</p>
                <span className={styles["joined-date"]}>{ctx.userLast}</span>
                {ctx.isLoggedIn && (
                  <button
                    onClick={logoutClickHandler}
                    className={styles.logout}
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.section}>
              <MoviesList
                options={optionsShows}
                type="tv"
                heading="Favorite TV Shows"
              ></MoviesList>
              <MoviesList
                options={optionsMovies}
                type="movie"
                heading="Favorite Movies"
              ></MoviesList>
            </div>
          </div>
          {modal && <Modal type={"logout"} modal={modal} setModal={setModal} />}
        </Fragment>
      ) : (
        <NotFound></NotFound>
      )}
    </Fragment>
  );
};

export default UserProfile;
