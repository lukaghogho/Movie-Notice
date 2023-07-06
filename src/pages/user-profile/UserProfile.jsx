import styles from "./UserProfile.module.css";
import FavoriteMovies from "../../components/favorite-movies/FavoriteMovies";
import React, { Fragment, useState } from "react";
import Modal from "../../components/modal/Modal";
import NotFound from "../errors/NotFound";

const UserProfile = (props) => {
  const [modal, setModal] = useState(false);
  const local = JSON.parse(localStorage.getItem("user"));

  return (
    <Fragment>
      {local !== null ? (
        <Fragment>
          <div className={styles["profile-section"]}>
            <div className={styles["profile-box"]}>
              <img
                className={styles.img}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png"
                alt="user-default"
              ></img>
              <div>
                <p className={styles.email}>{local.email}</p>
                <div className={styles["joined-box"]}>
                  <div>
                    <p className={styles.joined}>Joined:</p>
                    <span className={styles["joined-date"]}>
                      {local.userJoined}
                    </span>
                  </div>
                  <div>
                    <p className={styles.joined}>Last Visit:</p>
                    <span className={styles["joined-date"]}>
                      {local.userLast}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setModal(true)}
                  className={styles.logout}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.section}>
              <FavoriteMovies userID={local.id} heading="Favorite TV Shows" />
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
