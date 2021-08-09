import React from "react";
import styles from "../styles/Home.module.css";

// this callback should be a function that add the price to the total prive of order

const Card = ({ name, color, price, callback }) => {
  return (
    <button
      className={styles.card}
      style={{ backgroundColor: color }}
      onClick={() => callback({ name, price })}
    >
      {name} : {price}
    </button>
  );
};

export default Card;
