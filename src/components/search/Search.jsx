import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchMovies from "./search-movies/SearchMovies";
import styles from "./Search.module.css";

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const [focus, setFocus] = useState(true);
  const [movies, setMovies] = useState([]);

  let delayTimer;
  const changeHandler = () => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      const movieWord = searchRef.current.value;
      // SEARCH FETCHING
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/multi",
        params: {
          query: `${movieWord}`,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
        },
      };
      (async function () {
        try {
          const response = await axios.request(options);
          console.log(response);
          const sortedArr = response.data.results
            .filter(
              (mov) => mov.media_type === "tv" || mov.media_type === "movie"
            )
            .sort((a, b) => b.popularity - a.popularity);
          setMovies(sortedArr.slice(0, 5));
        } catch (error) {
          console.error(error);
        }
      })();
    }, 500);
  };

  const focusHandler = (e) => {
    setFocus(true);
  };
  const blurHandler = (e) => {
    // e.stopPropagation();
    e.preventDefault();
    // searchRef.current.value = "";
    // setMovies([]);
    setFocus(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const movieWord = searchRef.current.value;
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: movieWord,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
      },
    };

    navigate(`/movies-searched/${movieWord}`, { replace: true });
  };

  return (
    <Fragment>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <input
          className={styles.input}
          name="search"
          type="search"
          placeholder="Search..."
          ref={searchRef}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
        ></input>
        {focus && <SearchMovies movies={movies} setFocus={setFocus} />}
      </form>
    </Fragment>
  );
};

export default Search;