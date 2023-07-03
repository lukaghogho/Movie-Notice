import styles from "./FavoriteMovies.module.css";
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../UI/spinner/Spinner";
const rating = (info) => info.toFixed(1);

const MoviesList = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        const request = await axios(
          `https://movie-notice-default-rtdb.europe-west1.firebasedatabase.app/users/${props.userID}.json`
        );
        setItems(
          Object.values(request.data).map((mov) => {
            return {
              id: mov.id,
              name: mov.name,
              release: mov.release,
              rating: mov.rating ? rating(+mov.rating) : "N/A",
              poster: `https://image.tmdb.org/t/p/original/${mov.poster_path}`,
            };
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [props.userID]);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.box}>
          <h1 className={styles["heading-one"]}>{props.heading}</h1>
          <span className={styles.length}>{items.length}</span>
          <ul className={styles["movies-box"]}>
            {items.map((mov) => {
              return (
                <li
                  onClick={() => {
                    navigate(`/tv/${mov.id}`);
                  }}
                  key={mov.id}
                  className={styles["movie-item"]}
                >
                  <div className={styles["movie-text-box"]}>
                    <h2 className={styles["heading-two"]}>{mov.name}</h2>
                    <p className={styles.release}>{`(${mov.release})`}</p>
                    <p className={styles.rating}>
                      <ion-icon id={styles["star-icon"]} name="star" />
                      {mov.rating}
                    </p>
                  </div>
                  <div className={styles.overlay}></div>
                  <img
                    className={styles.poster}
                    src={mov.poster}
                    alt={`${mov.name} poster`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default MoviesList;
