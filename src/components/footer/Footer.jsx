import styles from "./Footer.module.css";
import tmdb from "../../assets/tmdb.svg";

const Footer = () => {
  return (
    <footer className={styles.box}>
      <h1 className={styles.logo}>movieNotice</h1>
      <ul className={styles.list}>
        <li>
          <p className={styles.text}>About</p>
        </li>
        <li>
          <p className={styles.text}>Pricing</p>
        </li>
        <li id={styles["li-terms"]}>
          <p className={styles.text}>Terms of Use</p>
        </li>
        <li>
          <p className={styles.text}>Privacy Policy</p>
        </li>
        <li>
          <p className={styles.text}>Contact Us</p>
        </li>
      </ul>
      <img className={styles.tmdb} src={tmdb} alt="tmdb" />
      <p className={styles.copyright}>
        © Copyright by Lorem Ipsum. Use for blah blah blah purposes only.
      </p>
    </footer>
  );
};

export default Footer;
