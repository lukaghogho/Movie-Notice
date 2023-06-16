import styles from "./SearchMovies.module.css";
import { useNavigate } from "react-router-dom";
import React, { Fragment } from "react";

const SearchMovies = (props) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {props.movies.length > 0 && (
        <ul className={styles.box}>
          {props.movies.map((mov, i, arr) => {
            const year = new Date(
              mov.first_air_date || mov.release_date
            ).getFullYear();
            const rating = mov.vote_average ? mov.vote_average.toFixed(1) : 0;
            return (
              <li
                key={mov.id}
                className={styles.item}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  props.setFocus(false);
                  navigate(`/${mov.media_type}/${mov.id}`);
                }}
              >
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/original/${mov.poster_path}`}
                />
                <div>
                  <p className={styles.title}>{mov.name || mov.title}</p>
                  <span className={styles.year}>({year})</span>
                </div>
                <span className={styles.rating}>
                  <ion-icon id={styles["star-icon"]} name="star" />
                  {rating}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

export default SearchMovies;
