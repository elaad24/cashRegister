//css
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";

//components
import Head from "next/head";
import Image from "next/image";
import baseData from "../baseData";
import LinkCard from "../components/linkCard";
import handler, { mysql } from "./api/endpoint";
import { useState } from "react";
import Card from "../components/Card";
import { checkIfAdmin } from "./service/usersService";
import UserPinModal from "../components/userPinModal";

export default function Home(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [enterPin, setEnterPin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const enterAsAdmin = async (userPin) => {
    let { data } = await checkIfAdmin(userPin);
    if ((data = 1)) {
      setIsAdmin(true);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>cash register</title>
        <meta name="description" content="cash register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>cash register first page</h1>
        <div className={styles.grid}>
          {props.result.map((item) => {
            return (
              <LinkCard
                name={item.name}
                address={item.address}
                color={item.color}
                key={item.name}
              >
                name
              </LinkCard>
            );
          })}
          {isAdmin ? (
            <Card
              name={<b> exit from admin </b>}
              color={"rgb(189, 41, 8)"}
              key={"adminKey"}
              callback={() => setIsAdmin(false)}
            />
          ) : (
            <Card
              name={<b> enter as admin </b>}
              color={"rgb(65, 207, 8)"}
              key={"adminKey"}
              callback={() => {
                openModal();
              }}
            />
          )}
          {modalOpen ? (
            <UserPinModal
              callback={setIsAdmin}
              modalState={modalOpen}
              setModalState={setModalOpen}
            />
          ) : (
            ""
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>
          made by <b>Elaad24</b>
        </span>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const qry = `SELECT * FROM main_categories`;

  const result = await handler(mysql, qry);

  return {
    props: {
      result: result.map((item) => ({
        id: item.id,
        name: item.name,
        address: item.address,
        color: item.color,
      })),
    },
  };
}
