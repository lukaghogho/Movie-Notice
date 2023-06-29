import styles from "./Input.module.css";
import { useForm } from "react-hook-form";

const Input = (props) => {
  const { register } = useForm();
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
      <input {...register(props.name)}></input>
      {props.error && (
        <span className={styles["error-text"]}>{props.errorType}</span>
      )}
      {props.type === "password" && (
        <span className={styles.forgot}>Forgot Password?</span>
      )}
    </div>
  );
};

export default Input;
