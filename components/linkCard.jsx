import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const linkCard = ({ name, address, color }) => {
  let nevigateTo = `./${address}`;
  return (
    <Link href={`./${address}`}>
      <a className={styles.card} style={{ backgroundColor: color }}>
        {name}
      </a>
    </Link>
  );
};

export default linkCard;

/* <div className={styles.grid}>
          {baseData.map((item) => (
            <LinkCard
              className={styles.card}
              name={item.name}
              address={item.address}
              color={item.color}
            ></LinkCard>
          ))}
        </div> 
        
        
        { name, address, color }

        */
