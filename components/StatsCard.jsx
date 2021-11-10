import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StatsCard = ({ header, prefix = "", data, suffix = "", cardType }) => {
  return (
    <div className="card text-center " style={{ width: "18rem" }}>
      <div className="card-header">{header}</div>
      <ul className="list-group list-group-flush ">
        {cardType == "singleLine" ? (
          <li className="list-group-item">
            {data} {suffix}
          </li>
        ) : cardType == "list" ? (
          data.map((item, index) => (
            <li className="list-group-item d-flex justify-content-between ">
              <b>{index + 1} </b>
              <div>{item.name}</div>
              <div>{item.amount}</div>
            </li>
          ))
        ) : cardType == "complex-singleLine" ? (
          <>
            <li className="list-group-item d-flex justify-content-between ">
              <div>amount of deals : </div>
              <div>{data.amount}</div>
            </li>
            <li className="list-group-item d-flex justify-content-between ">
              <div>Money amount : </div>
              <div>
                {data.deals_amount} {suffix}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between ">
              <div>Avrege for deal : </div>
              <div>
                {Math.round(data.deals_amount / data.amount)} {suffix}
              </div>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default StatsCard;
