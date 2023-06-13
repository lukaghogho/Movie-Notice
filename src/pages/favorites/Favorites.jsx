import styles from "./Favorites.module.css";
import axios from "axios";
import MoviesList from "../../components/movies-list/MoviesList";

const Favorites = () => {
  const optionsShows = {
    method: "GET",
    url: "https://api.themoviedb.org/3/account/19890581/favorite/tv",
    params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  };

  const optionsMovies = {
    method: "GET",
    url: "https://api.themoviedb.org/3/account/19890581/favorite/movies",
    params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  };

  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <MoviesList
          options={optionsShows}
          type="tv"
          heading="Favorite TV Shows"
        />
        <MoviesList
          options={optionsMovies}
          type="movie"
          heading="Favorite Movies"
        />
      </div>
    </div>
  );
};

export default Favorites;
