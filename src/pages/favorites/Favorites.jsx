import styles from "./Favorites.module.css";
import axios from "axios";
import MoviesList from "../../components/movies-list/MoviesList";

const Favorites = () => {
  const optionsShows = {
    method: "GET",
    url: "account/19890581/favorite/tv",
    params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
  };

  const optionsMovies = {
    method: "GET",
    url: "account/19890581/favorite/movies",
    params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
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
