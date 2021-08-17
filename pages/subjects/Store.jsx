import React, { useState } from "react";
import Card from "../../components/Card";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

import handler, { mysql } from "../api/endpoint";

const Store = (props) => {
  let [order, setOrder] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  const addToOrder = ({ name, price }) => {
    setTotalPrice(totalPrice + price);
    setOrder([...order, { name: name, price: price, id: Math.random() }]);
  };

  const removeFromOrder = (e) => {
    let itemId = e.target.id;
    let itemPrice = e.target.attributes.price.value;
    let newOrder = order.filter((item) => {
      return item.id != itemId;
    });
    setOrder(newOrder);
    setTotalPrice(totalPrice - itemPrice);
  };

  const deleteOrder = () => {
    setOrder([]);
    setTotalPrice(0);
  };

  const pay = () => {
    console.log("pay ");
  };

  return (
    <div>
      <div className="d-flex justify-content-between ">
        {/* <button className="m-4 btn btn-primary" onClick={}>home </button> */}

        <Link href={`/`}>
          <a className="m-4 btn btn-primary">home</a>
        </Link>
        <h2 className={styles.title}>store</h2>
        <div></div>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.divOrderList}>
          <div className={styles.order} style={{ float: "inline-end" }}>
            <div className="d-flex  justify-content-around ">
              {order.length != 0 ? (
                <button className="btn btn-danger " onClick={deleteOrder}>
                  delete
                </button>
              ) : (
                ""
              )}
              <h2>order</h2>
            </div>
            {order.map((item) => {
              return (
                <div className={styles.orderList}>
                  <div>{item.name}</div>
                  <div>{item.price}$</div>
                  <div>
                    <button
                      className="btn btn-danger"
                      id={item.id}
                      price={item.price}
                      onClick={(e) => removeFromOrder(e)}
                    >
                      X
                    </button>
                  </div>
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
          {/*           <div className={styles.find}>location</div>
           */}{" "}
          <div className={styles.grid}>
            {props.result.map((item) => {
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
      <div className="d-flex gap-4">
        <h4>pay : </h4>
        <button className="btn btn-success" onClick={() => pay()}>
          cash
        </button>
        <button className="btn btn-success" onClick={() => pay()}>
          credit
        </button>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  const qry = `SELECT * FROM products`;

  const result = await handler(mysql, qry);

  return {
    props: {
      result: result.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        item_group: item.item_group,
        color: item.color,
      })),
    },
  };
}

export default Store;
