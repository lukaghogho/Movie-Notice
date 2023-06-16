import styles from "./Trending.module.css";
import MoviesList from "../../components/movies-list/MoviesList";

const Trending = () => {
  const options = {
    method: "GET",
    url: "trending/all/week",
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
