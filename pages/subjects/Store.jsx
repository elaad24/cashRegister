import React, { useState } from "react";
import storeData from "../../storeData";
import Card from "../../components/Card";
import styles from "../../styles/Home.module.css";

const Store = () => {
  let orderAssist = [];
  let totalPriceAssist = 0;

  let [order, setOrder] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  let addToOrder = ({ name, price }) => {
    console.log("add to order!", name, price);
    setTotalPrice(totalPrice + price);
    setOrder([...order, name]);
  };

  return (
    <div /* className={styles.container} */>
      <h2 className={styles.title}>store</h2>
      <div className={styles.innerContainer}>
        <div className={styles.divOrderList}>
          <div className={styles.order}>
            <h2>order</h2>
          </div>
          <div className={styles.total}>
            <div className={styles.inTotal}> total price : {totalPrice}</div>
            <div className={styles.inTotal}>{order.length} items</div>
          </div>
        </div>
        <div className={styles.grid}>
          {storeData.map((item) => {
            return (
              <Card
                key={item.nama}
                name={item.name}
                price={item.price}
                color={item.color}
                callback={addToOrder}
              >
                {" "}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Store;
