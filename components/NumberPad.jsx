import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const NumberPad = ({ orderPrice, moneyAmount, setMoneyAmount }) => {
  const addNumber = (number) => {
    let tempAmount = moneyAmount * 10 + number;

    console.log(tempAmount);
    setMoneyAmount(tempAmount);
  };

  const clearAmount = () => {
    setMoneyAmount(0);
  };

  const pay = () => {
    console.log(orderPrice - moneyAmount, "change");
    //continue
  };
  return (
    <div name="number pad">
      <div className={styles.border_alingCenterText}>{moneyAmount} </div>
      <div className={styles.numberPad}>
        <button className="btn btn-primary " onClick={() => addNumber(1)}>
          1
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(2)}>
          2
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(3)}>
          3
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(4)}>
          4
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(5)}>
          5
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(6)}>
          6
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(7)}>
          7
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(8)}>
          8
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(9)}>
          9
        </button>
        <button className="btn btn-danger " onClick={clearAmount}>
          X
        </button>
        <button className="btn btn-primary " onClick={() => addNumber(0)}>
          0
        </button>
        <button className="btn btn-success " onClick={pay}>
          V
        </button>
      </div>
    </div>
  );
};

export default NumberPad;
