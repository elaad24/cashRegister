import React, { useState } from "react";
import storeData from "../../storeData";
import Card from "../../components/Card";
import styles from "../../styles/Home.module.css";

const Store = () => {
  let [order, setOrder] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  let addToOrder = ({ name, price }) => {
    console.log("add to order!", name, price);
    setTotalPrice(totalPrice + price);
    setOrder([...order, { name: name, price: price, id: Math.random() }]);
    console.log(order);
  };

  let removeFromOrder = (e) => {
    let itemId = e.target.id;
    let itemPrice = e.target.attributes.price.value;
    let newOrder = order.filter((item) => {
      return item.id != itemId;
    });
    setOrder(newOrder);
    setTotalPrice(totalPrice - itemPrice);
  };

  return (
    <div /* className={styles.container} */>
      <h2 className={styles.title}>store</h2>
      <div className={styles.innerContainer}>
        <div className={styles.divOrderList}>
          <div className={styles.order} style={{ float: "inline-end" }}>
            <h2>order</h2>
            {order.map((item) => {
              return (
                <div className={styles.orderList}>
                  <div>{item.name}</div>
                  <div>{item.price}$</div>
                  <button
                    id={item.id}
                    price={item.price}
                    onClick={(e) => removeFromOrder(e)}
                  >
                    test
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.total}>
            <div className={styles.inTotal}> total price : {totalPrice} $</div>
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
