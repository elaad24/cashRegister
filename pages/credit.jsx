import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const CashPage = (props) => {
  const router = useRouter();
  // get to amout of order from url  params
  let [orderPrice, setOrderPrice] = useState(router.query.orderPrice);

  const pay = () => {
    console.log("pay");
    //continue
    // open cash drew
  };

  // function to tell the card reader that need to check for card
  // and to charge the card
  let swipeCard = () => {
    console.log("card swiped ");
    // read the card
    // make a trunsaction
    //redirect to store
    console.log("aproved");
    router.push("/subjects/Store");
  };

  // var to open boxes for insert card manually
  let [cardManually, setCardManually] = useState(false);

  // var of the cradit card that you enter manuly
  // details to send the info to the third part party class

  let [card_number, setCard_number] = useState("");
  let [card_date, setCard_date] = useState("");
  let [card_cvv, setCard_cvv] = useState("");
  let [user_id_number, setUser_id_number] = useState("");

  let addCardManually = () => {
    setCardManually(true);
  };

  let automaticSwaip = () => {
    setCardManually(false);
  };

  let deleteValues = () => {
    document.getElementsByName("card_number")[0].value = "";
    document.getElementsByName("card_date")[0].value = "";
    document.getElementsByName("card_cvv")[0].value = "";
    document.getElementsByName("user_id_number")[0].value = "";
    setCard_number(0);
    setCard_date(0);
    setCard_cvv(0);
    setUser_id_number(0);
  };

  return (
    <div className={styles.container}>
      <h2 className="d-flex justify-content-center mt-3">
        payment page - credit{" "}
      </h2>
      <h3 className="d-flex justify-content-center mt-3">
        total amount : {orderPrice}
      </h3>
      <div className={styles.innerContainer}>
        <div className="border" name="credit continer">
          {cardManually == false ? (
            <div>
              <div className={styles.find}>XxXxXxXxXxXxXxXxXxXxXxXxXxX</div>
              <button className="btn btn-primary" onClick={swipeCard}>
                swipe card{" "}
              </button>
              <button className="btn btn-warning" onClick={addCardManually}>
                add card manually{" "}
              </button>

              <Link href={`/cash?orderPrice=${orderPrice}`}>
                <button className="btn btn-success">pay with cash</button>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column ">
              <label htmlFor="card_number">credit card number</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="card_number"
                  type="number"
                  required
                  maxLength="14"
                  onChange={() =>
                    setCard_number(
                      document.getElementsByName("card_number")[0].value
                    )
                  }
                />
              </div>

              <label htmlFor="card_date">
                credit card expertion date [MMYY]
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="card_date"
                  type="number"
                  required
                  maxLength="4"
                  pattern="\d{2}-\d{2}"
                  onChange={() =>
                    setCard_date(
                      document.getElementsByName("card_date")[0].value
                    )
                  }
                />
              </div>

              <label htmlFor="card_cvv">credit card cvv</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="card_cvv"
                  type="number"
                  required
                  pattern="\d{3}"
                  onChange={() =>
                    setCard_cvv(document.getElementsByName("card_cvv")[0].value)
                  }
                />
              </div>

              <label htmlFor="user_id_number">customer id number</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="user_id_number"
                  type="number"
                  required
                  minLength="8"
                  maxLength="10"
                  pattern="\d{9}"
                  onChange={() =>
                    setUser_id_number(
                      document.getElementsByName("user_id_number")[0].value
                    )
                  }
                />
              </div>
              <button className="btn btn-success" onClick={pay}>
                pay
              </button>
              <br />
              <button className="btn btn-info" onClick={deleteValues}>
                reset
              </button>
              <br />

              <button className="btn btn-danger" onClick={automaticSwaip}>
                back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashPage;
