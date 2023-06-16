import styles from "./MovieItem.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieItem = () => {
  const params = useParams();
  const date = (info) => new Date(info).getFullYear();
  const [content, setContent] = useState({});

  const optionsMovie = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${params.type}/${+params.movieID}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  };

  const optionsStatus = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${
      params.type
    }/${+params.movieID}/account_states`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  };

  const optionsPost = {
    method: "POST",
    url: "https://api.themoviedb.org/3/account/19890581/favorite",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
    data: {
      media_type: params.type,
      media_id: +params.movieID,
      favorite: true,
    },
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.request(optionsMovie);
        const responseStatus = await axios.request(optionsStatus);
        setContent({
          poster: `https://image.tmdb.org/t/p/original/${response.data.poster_path}`,
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
          favorite: responseStatus.data.favorite,
        });
      } catch (error) {
        alert(error);
      }
    })();
  }, [params.movieID]);

  const addClickHandler = async (e) => {
    if (e.target.lastChild.data === "Add to Favorites") {
      try {
        const post = await axios.request(optionsPost);
        setContent((prev) => {
          return { ...prev, favorite: true };
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <img className={styles.img} src={content.poster}></img>
        <div className={styles["text-box"]}>
          <h2 className={styles.heading}>{content.title}</h2>
          <span className={styles.year}>{`(${content.year})`}</span>
          <div className={styles["desc-box"]}>
            <div className={styles.desc}>
              <p>Plot</p>
              <span>{content.overview}</span>
            </div>
            <div className={styles.country}>
              <p>Country</p>
              <span>{content.country}</span>
            </div>
            <div className={styles.rating}>
              <p>Rating</p>
              <span>{content.rating}</span>
            </div>
            <button
              className={`${styles.btn} ${content.favorite && styles.favorite}`}
            >
              <div
                onClick={addClickHandler}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ion-icon
                  id={styles.icon}
                  name={content.favorite ? "checkmark-done" : "add"}
                />
                {content.favorite ? "Already in Favorites" : "Add to Favorites"}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
