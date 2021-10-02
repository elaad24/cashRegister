import Cash from "../components/Cash";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NumberPad from "../components/NumberPad";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/sllice/storeSlice";
import { placeOrder } from "./service/orderService";

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

const CashPage = (props) => {
  const router = useRouter();

  // get to amout of order from url  params
  let [orderPrice, setOrderPrice] = useState(router.query.orderPrice);

  // amount of money that we recived in the order
  let [moneyAmount, setMoneyAmount] = useState(0);

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.storeReducer.products);

  console.log("orderList", orderList);
  const payWithCash = async () => {
    let orderObjFormat = {
      products: orderList,
      payType: { pay_With_Cash: true, amount_Of_Cash: moneyAmount },
    };
    console.log(orderPrice - moneyAmount, "change");
    try {
      await placeOrder(orderObjFormat);
      await dispatch(clearCart());
    } catch (error) {
      console.log("error :", error);
    }

    //continue
    // open cash drew
  };

  //check if the money amount isn't 0

  let orderPriceIsZero = true;
  if (orderPrice > 0) {
    orderPriceIsZero = false;
  }

  return (
    <div className={styles.container}>
      <div className="d-flex flex-row justify-content-between">
        <Link href={`/subjects/Store`}>
          <a className="m-4 btn btn-primary">store </a>
        </Link>
        <h2 className=" mt-3">payment page</h2>
        <div></div>
      </div>
      <div className={styles.innerContainer}>
        <div
          className={(styles.moneyConteiner, styles.my1)}
          name="mony conteiner"
        >
          <div className={styles.bills} name="bills">
            {money.map((item) =>
              item.type == "bill" ? (
                <Cash
                  key={item.value}
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
                  key={item.value}
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
          <div className="d-flex flex-column">
            <h2> order price : {orderPrice}$</h2>

            {orderPrice - moneyAmount > 0 ? (
              <>
                <h2> left to pay : {orderPrice - moneyAmount}$</h2>
                <Link href={`/credit?orderPrice=${orderPrice}`}>
                  <button className="btn btn-warning">
                    pay with credit card{" "}
                  </button>
                </Link>
              </>
            ) : (
              <Link href={`/subjects/Store?change=${moneyAmount - orderPrice}`}>
                <button
                  className="btn btn-success "
                  onClick={payWithCash}
                  disabled={orderPriceIsZero}
                >
                  <h1>finsh oreder</h1>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashPage;
