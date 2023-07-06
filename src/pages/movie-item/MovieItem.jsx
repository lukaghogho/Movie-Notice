import styles from "./MovieItem.module.css";
import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/UI/spinner/Spinner";
import instance from "../../components/instance/instance";
import axios from "axios";
import Modal from "../../components/modal/Modal";

const MovieItem = () => {
  const local = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const date = (info) => new Date(info).getFullYear();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState({});
  const [isFavorite, setIsFavorite] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        if (local) {
          const request = await axios.get(
            `https://movie-notice-default-rtdb.europe-west1.firebasedatabase.app/users/${local.id}.json`
          );
          if (request.data === null) setIsFavorite(false);
          else setIsFavorite(!request.data[params.movieID] === false);
        }
        const optionsMovie = {
          method: "GET",
          url: `tv/${+params.movieID}`,
        };
        const response = await instance(optionsMovie);
        setContent({
          poster: `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
          title: response.data.title || response.data.name || "N/A",
          year:
            date(response.data.release_date) ||
            date(response.data.first_air_date) ||
            "N/A",
          country:
            response.data.production_countries
              .map((mov) => mov.name)
              .join(", ") || "N/A",
          overview: response.data.overview || "N/A",
          rating: response.data.vote_average.toFixed(1) || "N/A",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params.movieID]);

  const favoriteClickHandler = async (e) => {
    if (local) {
      try {
        if (isFavorite) {
          const request = await axios.delete(
            `https://movie-notice-default-rtdb.europe-west1.firebasedatabase.app/users/${local.id}/${params.movieID}.json`
          );
        } else {
          const request = await axios.put(
            `https://movie-notice-default-rtdb.europe-west1.firebasedatabase.app/users/${local.id}/${params.movieID}.json`,
            {
              id: params.movieID,
              poster_path: content.poster,
              name: content.title,
              rating: content.rating,
              release: content.year,
            }
          );
        }
        setIsFavorite((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
    } else {
      setModal(true);
    }
  };
  return (
    <Fragment>
      {!isLoading ? (
        <div className={styles.box}>
          <div className={styles.section}>
            <img className={styles.img} src={content.poster} />
            {/* <div className={styles["text-box"]}> */}
            <div className={styles["heading-div"]}>
              <h2 className={styles["heading-two"]}>{content.title} </h2>
              <span className={styles.year}>{`(${content.year})`}</span>
            </div>
            <div className={styles["desc-box"]}>
              <div className={styles.desc}>
                <h3 className={styles["heading-three"]}>Plot</h3>
                <span>{content.overview}</span>
              </div>
              <div className={styles.country}>
                <h3 className={styles["heading-three"]}>Country</h3>
                <span>{content.country}</span>
              </div>
              <div className={styles.rating}>
                <h3 className={styles["heading-three"]}>Rating</h3>
                <span>{content.rating}</span>
              </div>
            </div>
            <ion-icon
              id={styles.icon}
              name={`heart${isFavorite ? "-dislike" : ""}-circle-outline`}
              onClick={favoriteClickHandler}
            />
            {/* </div> */}
          </div>
          {modal && <Modal type="login" modal={modal} setModal={setModal} />}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default MovieItem;
