import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MoviesSearched.module.css";
import MoviesList from "../../components/movies-list/MoviesList";

const MoviesSearched = (props) => {
  const params = useParams();
  const [options, setOptions] = useState({
    method: "GET",
    url: "search/multi",
    params: {
      query: `${params.movieWord}`,
      include_adult: "false",
      language: "en-US",
      page: "1",
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
    });
  }, [params.movieWord]);

  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <MoviesList
          options={options}
          heading={`Search Results for "${params.movieWord}"`}
        />
      </div>
    </div>
  );
};

export default MoviesSearched;
