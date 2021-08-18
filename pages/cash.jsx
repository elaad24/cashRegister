import Cash from "../components/Cash";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NumberPad from "../components/NumberPad";

import Cent from "../public/Cent.png";
import Nickel from "../public/Nickel.png";
import Dime from "../public/Dime.png";
import Quarter from "../public/Quarter.jpg";
import OneDollar from "../public/OneDollar.jpg";
import TwoDollars from "../public/TwoDollars.jpg";
import FiveDollars from "../public/FiveDollars.jpg";
import TenDollars from "../public/TenDollars.jpg";
import TwentyDollars from "../public/TwentyDollars.jpg";
import FiftyDollars from "../public/FiftyDollars.jpg";
import HundredDollars from "../public/HundredDollars.jpg";
import { useState } from "react";

const money = [
  { name: "Cent", value: "0.01", image: Cent, type: "coin" },
  { name: "FiveCents", value: "0.05", image: Nickel, type: "coin" },
  { name: "Dime", value: "0.1", image: Dime, type: "coin" },
  { name: "Qurter", value: "0.25", image: Quarter, type: "coin" },
  { name: "OneDollar", value: "1", image: OneDollar, type: "bill" },
  { name: "TwoDollar", value: "2", image: TwoDollars, type: "bill" },
  { name: "FiveDollar", value: "5", image: FiveDollars, type: "bill" },
  { name: "TenDollar", value: "10", image: TenDollars, type: "bill" },
  { name: "TwentyDollar", value: "20", image: TwentyDollars, type: "bill" },
  { name: "FiftyDollar", value: "50", image: FiftyDollars, type: "bill" },
  { name: "HundredDollar", value: "100", image: HundredDollars, type: "bill" },
];

const CashPage = () => {
  let [orderPrice, setOrderPrice] = useState(0);
  let [moneyAmount, setMoneyAmount] = useState(0);

  return (
    <div className={styles.container}>
      <h2 className="d-flex justify-content-center mt-3">payment page</h2>
      <div className={styles.innerContainer}>
        <div
          className={(styles.moneyConteiner, styles.my1)}
          name="mony conteiner"
        >
          <div className={styles.bills} name="bills">
            {money.map((item) =>
              item.type == "bill" ? (
                <Cash
                  image={item.image.src}
                  value={item.value}
                  moneyAmount={moneyAmount}
                  setMoneyAmount={setMoneyAmount}
                />
              ) : (
                ""
              )
            )}
          </div>
          <div className={styles.coins} name="coines">
            {money.map((item) =>
              item.type == "coin" ? (
                <Cash
                  image={item.image.src}
                  value={item.value}
                  moneyAmount={moneyAmount}
                  setMoneyAmount={setMoneyAmount}
                />
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div className={(styles.flexGrow1, styles.my1)}>
          <NumberPad
            orderPrice={orderPrice}
            moneyAmount={moneyAmount}
            setMoneyAmount={setMoneyAmount}
          />
          <h2> order price : {orderPrice}$</h2>
          <h2> left to pay : {orderPrice - moneyAmount}$</h2>
        </div>
      </div>
    </div>
  );
};

export default CashPage;
