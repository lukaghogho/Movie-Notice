import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchMovies from "./search-movies/SearchMovies";
import styles from "./Search.module.css";
import instance from "../instance/instance";

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
      const options = {
        method: "GET",
        url: "search/tv",
        params: {
          query: `${movieWord}`,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
      };
      (async function () {
        try {
          const response = await instance(options);
          const sortedArr = response.data.results.sort(
            (a, b) => b.popularity - a.popularity
          );
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
    e.preventDefault();
    setFocus(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setFocus(false);
    searchRef.current.onBlur;
    const movieWord = searchRef.current.value;
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
