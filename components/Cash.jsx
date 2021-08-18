import style from "../styles/Home.module.css";

const Cash = (props) => {
  const addMoney = (value) => {
    //round the number to the second decimel point
    let temp =
      Math.round((Number(value) + Number(props.moneyAmount)) * 100) / 100;

    props.setMoneyAmount(temp);
  };
  return (
    <button className={style.moneyBtn} value={props.value}>
      <img
        className={style.monieImg}
        src={props.image}
        onClick={() => addMoney(props.value)}
      />
    </button>
  );
};

export default Cash;
