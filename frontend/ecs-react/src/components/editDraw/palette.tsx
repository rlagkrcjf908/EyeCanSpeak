import style from "../../styles/drawing/palette.module.scss"
export default function Palette({
  changeColor,
  changeSize,
}: {
  changeColor: any
  changeSize: any
}) {
  return (
    <div>
      <div className={style.container}>
        <div
          className={style.item}
          onClick={() => {
            changeColor("#ff0000")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("rgb(255, 98, 185)")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("#ff9900")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("#fef400")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("#01eb18")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("#037fda")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("#bf00cf")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("black")
          }}
        ></div>
        <div
          className={style.item}
          onClick={() => {
            changeColor("white")
          }}
        ></div>
      </div>
      <div className={style.penText}>선 굵기</div>
      <div className={style.pens}>
        <button
          className={style.pen}
          onClick={() => {
            changeSize(2)
          }}
        >
          small
        </button>
        <button
          className={style.pen}
          onClick={() => {
            changeSize(5)
          }}
        >
          normal
        </button>
        <button
          className={style.pen}
          onClick={() => {
            changeSize(8)
          }}
        >
          large
        </button>
      </div>
    </div>
  )
}
