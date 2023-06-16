import styles from "./MoviesList.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MoviesList = (props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const date = (info) => new Date(info).getFullYear();
  const rating = (info) => info.toFixed(1);

  useEffect(() => {
    (async function () {
      try {
        const request = await axios.request(props.options);
        setItems(
          request.data.results.reduce((acc, cur) => {
            return cur.media_type === "tv" || cur.media_type === "movie"
              ? (acc = [
                  ...acc,
                  {
                    id: cur.id,
                    name: cur.name || cur.title,
                    release: date(cur.first_air_date || cur.release_date),
                    rating: cur.vote_average ? rating(cur.vote_average) : "N/A",
                    poster: `https://image.tmdb.org/t/p/original/${cur.poster_path}`,
                    type: props.type || cur.media_type,
                  },
                ])
              : acc;
          }, [])
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, [props.options]);
  return (
    <div className={styles.box}>
      <h1 className={styles["heading-one"]}>{props.heading}</h1>
      {props.options.url.includes("favorite") && (
        <span className={styles.length}>{items.length}</span>
      )}
      <ul className={styles["movies-box"]}>
        {items.map((mov) => {
          return (
            <li
              onClick={() => {
                navigate(`/${mov.type}/${mov.id}`);
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
  );
};

export default MoviesList;
