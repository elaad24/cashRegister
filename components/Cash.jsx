import style from "../styles/Home.module.css";

const Cash = (props) => {
  const some = (value) => {
    console.log(value);
  };
  return (
    <button className={style.moneyBtn} value={props.value}>
      <img
        className={style.monieImg}
        src={props.image}
        onClick={() => some(props.value)}
      />
    </button>
  );
};

export default Cash;
