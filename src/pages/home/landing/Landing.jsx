import styles from "./Landing.module.css";
import mastika from "../../../assets/mastika.png";
const Landing = () => {
  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <div className={styles["text-box"]}>
          <h2 className={styles.heading}>Never miss an episode AGAIN</h2>
          <p className={styles.text}>
            Subscribe and get notified whenever your favorite movie or new
            episode of tv show gets released. Wherever you are, whenever it is!
          </p>
          <button className={styles.btn}>Get Started</button>
        </div>
        <img className={styles.img} src={mastika}></img>
      </div>
    </div>
  );
};

export default Landing;
