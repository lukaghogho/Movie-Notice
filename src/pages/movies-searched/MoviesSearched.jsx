import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MoviesSearched.module.css";
import MoviesList from "../../components/movies-list/MoviesList";

const MoviesSearched = (props) => {
  const params = useParams();
  const [options, setOptions] = useState({
    method: "GET",
    url: "https://api.themoviedb.org/3/search/multi",
    params: {
      query: `${params.movieWord}`,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  });

  useEffect(() => {
    setOptions({
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: `${params.movieWord}`,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
      },
    });
  }, [params.movieWord]);

  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <MoviesList
          options={options}
          heading={`Search Results for "${params.movieWord}"`}
        ></MoviesList>
      </div>
    </div>
  );
};

export default MoviesSearched;
