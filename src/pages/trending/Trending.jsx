import styles from "./Trending.module.css";
import axios from "axios";
import MoviesList from "../../components/movies-list/MoviesList";
import instance from "../../components/api/instance";

const Trending = () => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/all/week",
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
    },
  };

  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <MoviesList options={options} heading="Trending this week" />
      </div>
    </div>
  );
};

export default Trending;
