import styles from "./Input.module.css";

const Input = (props) => {
  const name = props.name[0].toUpperCase() + props.name.slice(1);

  return (
    <div className={styles["input-box"]}>
      <input
        className={`${styles.input} ${props.error && styles.error}`}
        name={props.name}
        type={props.type}
        placeholder={name}
        ref={props.reff}
      />
      {props.error && (
        <span className={styles["error-text"]}>{props.errorType}</span>
      )}
    </div>
  );
};

export default Input;
