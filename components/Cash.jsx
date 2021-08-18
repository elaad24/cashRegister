import style from "../styles/Home.module.css";

const Cash = (props) => {
  const addMoney = (value) => {
    let temp = Number(value) + Number(props.moneyAmount);
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
