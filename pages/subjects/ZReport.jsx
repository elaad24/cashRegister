import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard";
import {
  getDealsDataInfo,
  getSoldItems,
  getTopSoldItems,
  getTotalMoneyLast24Hours,
} from "../service/statsService";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const ZReport = () => {
  const [totalMoneyLast24Hours, setTotalMoneyLast24Hours] = useState();
  const [topSoldItems, setTopSoldItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [cashdealsDataInfo, setCashDealsDataInfo] = useState({});
  const [creditCardDealsDataInfo, setCreditCardDealsDataInfo] = useState({});

  useEffect(async () => {
    const { data } = await getTotalMoneyLast24Hours();
    //console.log(data.result);
    setTotalMoneyLast24Hours([data.result]);
  }, []);

  useEffect(async () => {
    const { data } = await getTopSoldItems();
    console.log(typeof data);
    setTopSoldItems([...data.result]);
  }, []);

  useEffect(async () => {
    const { data } = await getSoldItems();
    setSoldItems([...data.result]);
  }, []);

  useEffect(async () => {
    const { data } = await getDealsDataInfo();
    setCashDealsDataInfo({
      name: "cash",
      amount: data.result.cash[0].pay_With_Cash,
      deals_amount: data.result.cash[0].amount,
    });
    setCreditCardDealsDataInfo({
      name: "credit card ",
      amount: data.result.creditCard[0].pay_With_CreditCard,
      deals_amount: data.result.creditCard[0].amount,
    });
  }, []);

  return (
    <div className="d-flex flex-column justify-content-around m-5">
      <div className="d-flex justify-content-between ">
        {/* <button className="m-4 btn btn-primary" onClick={}>home </button> */}

        <Link href={`/`}>
          <a className="m-4 btn btn-primary">home</a>
        </Link>
        <h2 className={styles.title}>Stats</h2>
        <div></div>
      </div>
      <main className="d-flex  justify-content-around m-5">
        <StatsCard
          header="Top sold item"
          prefix=""
          data={topSoldItems}
          suffix=""
          cardType="list"
        />
        <div className="d-flex flex-column gap-5">
          <StatsCard
            header="Total deal amount last 24H"
            prefix=""
            data={totalMoneyLast24Hours}
            suffix="$"
            cardType="singleLine"
          />
          <StatsCard
            header={`Total ${cashdealsDataInfo.name} deal amount `}
            prefix=""
            data={cashdealsDataInfo}
            suffix="$"
            cardType="complex-singleLine"
          />

          <StatsCard
            header={`Total ${cashdealsDataInfo.name} deal amount `}
            prefix=""
            data={creditCardDealsDataInfo}
            suffix="$"
            cardType="complex-singleLine"
          />
        </div>
        <StatsCard
          header="Sold items "
          prefix=""
          data={soldItems}
          suffix=""
          cardType="list"
        />
      </main>
    </div>
  );
};

export default ZReport;
