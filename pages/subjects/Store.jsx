import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

import handler, { mysql } from "../api/endpoint";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { addItem, clearCart, removeItem } from "../../redux/sllice/storeSlice";
import { useSelector } from "react-redux";

const Store = (props) => {
  const dispatch = useDispatch();
  // the order list with all the data from the order
  let [order, setOrder] = useState([]);
  // the order total price amount - only the final price
  let [totalPrice, setTotalPrice] = useState(0);
  // the change that need to return to the costumer from the last order
  const router = useRouter();
  let [change, setChange] = useState(router.query.change);

  const orderFromRedux = useSelector((state) => state.storeReducer.products);
  const orderPriceFromRedux = useSelector(
    (state) => state.storeReducer.totalPrice
  );
  useEffect(async () => {
    await setOrder(orderFromRedux);
    await setTotalPrice(orderPriceFromRedux);
  }, []);

  const addToOrder = ({ name, price, item_id, item_group }) => {
    //qty 1 temp ! need to change and calc the thumber of the same item
    let product = {
      name: name,
      price: price,
      id: Math.random(),
      item_id,
      item_group,
      qty: 1,
    };
    setTotalPrice(totalPrice + price);
    setOrder([...order, product]);
    dispatch(addItem(product));
  };

  const removeFromOrder = (e) => {
    let itemId = e.target.id;
    let itemPrice = e.target.attributes.price.value;
    let newOrder = order.filter((item) => {
      return item.id != itemId;
    });
    setOrder(newOrder);
    setTotalPrice(totalPrice - itemPrice);
    console.dir(e.target);
    dispatch(removeItem(e.target.id));
  };

  const deleteOrder = () => {
    setOrder([]);
    setTotalPrice(0);
    dispatch(clearCart());
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
            {order.length != 0 ? (
              order.map((item) => {
                return (
                  <div className={styles.orderList} key={item.id}>
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
              })
            ) : change > 0 ? (
              <h1>change : {change}$</h1>
            ) : (
              ""
            )}
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
                  item_id={item.id}
                  item_group={item.item_group}
                  callback={addToOrder}
                ></Card>
              );
            })}
          </div>
        </div>
      </div>
      <div className="d-flex gap-4">
        <h4>pay : </h4>
        <Link href={`/cash?orderPrice=${totalPrice}`}>
          <button className="btn btn-success">cash</button>
        </Link>
        <Link href={`/credit?orderPrice=${totalPrice}`}>
          <button className="btn btn-success">credit</button>
        </Link>
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
