//css
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";

//components
import Head from "next/head";
import Image from "next/image";
import baseData from "../baseData";
import LinkCard from "../components/linkCard";
import handler, { mysql } from "./api/endpoint";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { checkIfAdmin } from "./service/usersService";
import UserPinModal from "../components/userPinModal";
import TimeClockModal from "../components/TimeClockModal";

export default function Home(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [enterPin, setEnterPin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const openAdminModal = () => {
    setModalType("adminModal");
    openModal();
  };

  const openTimClockModal = () => {
    setModalType("timeClock");
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  let adminCookie;
  // this if statment is just becose next js is server side rendernig so window and document
  // isnt exist when rendering
  if (typeof window === "object") {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    adminCookie = getCookie("adminRequest");
  }

  useEffect(() => {
    setIsAdmin(adminCookie == "true" ? true : false);
  }, [adminCookie]);

  const enterAsAdmin = async (userPin) => {
    let { data } = await checkIfAdmin(userPin);
    console.log(data, "line 49");
    if ((data = 1)) {
      setIsAdmin(true);
      document.cookie = `adminRequest = ${true};path=/ `;
      console.log("set is admin run as true line 53");
    }
  };

  const exitAsAdmin = () => {
    setIsAdmin(false);
    document.cookie = `adminRequest=${false}`;
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
              callback={() => exitAsAdmin()}
            />
          ) : (
            <Card
              name={<b> enter as admin </b>}
              color={"rgb(65, 207, 8)"}
              key={"adminKey"}
              callback={() => {
                openAdminModal();
              }}
            />
          )}
          {modalOpen && modalType == "adminModal" ? (
            <UserPinModal
              callback={enterAsAdmin}
              modalState={modalOpen}
              setModalState={setModalOpen}
            />
          ) : modalOpen && modalType == "timeClock" ? (
            <TimeClockModal
              modalState={modalOpen}
              setModalState={setModalOpen}
            />
          ) : (
            ""
          )}

          <Card
            name={"time clock"}
            color={"rgb(190,10,80)"}
            callback={openTimClockModal}
          />
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
