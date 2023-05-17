import style from "../../styles/common/joyStick.module.css"
export default function JoyStick() {
  return (
    <div className={style.joyStick}>
      <button className={`${style["item"]} ${style["top1"]}`}>1</button>
      <button className={`${style["item"]} ${style["top2"]}`}>1</button>
      <button className={`${style["item"]} ${style["top3"]}`}>1</button>
      <button className={`${style["item"]} ${style["center1"]}`}>1</button>
      <button className={`${style["item"]} ${style["center2"]}`}>1</button>{" "}
      <button className={`${style["item"]} ${style["center3"]}`}>1</button>
      <button className={`${style["item"]} ${style["bottom1"]}`}>1</button>
      <button className={`${style["item"]} ${style["bottom2"]}`}>1</button>{" "}
      <button className={`${style["item"]} ${style["bottom3"]}`}>1</button>
    </div>
  )
}
