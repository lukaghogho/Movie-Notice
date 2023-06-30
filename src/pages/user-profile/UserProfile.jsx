import styles from "./UserProfile.module.css";
import MoviesList from "../../components/movies-list/MoviesList";
import React, { Fragment, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../components/store/user-context";
import Modal from "../../components/modal/Modal";
import NotFound from "../errors/NotFound";

const UserProfile = (props) => {
  const ctxUser = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const optionsShows = {
    method: "GET",
    url: "account/19890581/favorite/tv",
    params: { page: "1", sort_by: "created_at.asc" },
  };

  const optionsMovies = {
    method: "GET",
    url: "account/19890581/favorite/movies",
    params: { page: "1", sort_by: "created_at.asc" },
  };

  const optionsList = {
    method: "GET",
    url: "account/19890581/lists",
    params: { page: "1" },
  };

  return (
    <Fragment>
      {ctxUser.isLoggedIn ? (
        <Fragment>
          <div className={styles["profile-section"]}>
            <div className={styles["profile-box"]}>
              <img
                className={styles.img}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png"
                alt="user-default"
              ></img>
              <div>
                <p className={styles.email}>{ctxUser.userEmail}</p>
                <div className={styles["joined-box"]}>
                  <p className={styles.joined}>Joined:</p>
                  <span className={styles["joined-date"]}>
                    {ctxUser.userJoined}
                  </span>
                </div>
                <p className={styles.joined}>Last Visit:</p>
                <span className={styles["joined-date"]}>
                  {ctxUser.userLast}
                </span>
                {ctxUser.isLoggedIn && (
                  <button
                    onClick={() => setModal(true)}
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
              />
              {/* <MoviesList
                options={optionsMovies}
                type="movie"
                heading="Favorite Movies"
              /> */}
              <MoviesList options={optionsList} type="tv" heading="List" />
            </div>
          </div>
          {modal && <Modal type={"logout"} modal={modal} setModal={setModal} />}
        </Fragment>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default UserProfile;
