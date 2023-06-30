import styles from "./Signup.module.css";
import { useSpring, useTransition, animated } from "@react-spring/web";
import { useState, Fragment } from "react";

const SignUp = () => {
  const [color, setColor] = useState(false);
  const [springs, api] = useSpring(() => ({
    // from: { color: color ? "red" : "blue" },
    // to: { color: color ? "blue" : "red" },
  }));

  const handleClick = () => {
    api.start({
      from: {
        color: color ? "red" : "blue",
      },
      to: {
        color: color ? "blue" : "red",
      },
    });
    setColor((prev) => !prev);
  };
  return (
    // <form className={styles.box}>
    //   <p className={styles.text}>ZDRASTI</p>
    // </form>
    <Fragment>
      <button onClick={handleClick}>Change color</button>
      <animated.p
        style={{
          fontSize: "4.8rem",
          color: "red",
          transition: "color, .3s",
          ...springs,
        }}
      >
        BARCELONA
      </animated.p>
      {/* <animated.div
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          background: "#ff6d6d",
          borderRadius: 8,
          ...springs,
        }}
      /> */}
    </Fragment>
  );
};

export default SignUp;
