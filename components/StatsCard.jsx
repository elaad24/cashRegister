import React from "react";

const StatsCard = ({ header, prefix, data, suffix, cardType }) => {
  return (
    <div className="card text-center" style={{ width: "18rem" }}>
      <div className="card-header">{header}</div>
      <ul className="list-group list-group-flush">
        {data.map((row) => {
          if (cardType == "revenue") {
            prefix = Object.keys(row);
            row = Object.values(row);
          } else {
            const produtID = row.item_id;
            const productAmount = row.amount;

            row = `# ${produtID} , sold ${productAmount} times `;
          }

          return (
            <li className="list-group-item">
              {prefix} - {row} {suffix}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatsCard;
