import style from "../../styles/drawing/palette.module.scss"
export default function Palette({
  changeColor,
  changeSize,
}: {
  changeColor: any
  changeSize: any
}) {
  return (
    <div className={style.container}>
      <div
        className={`${style.item} ${style.red}`}
        onClick={(e: any) => {
          changeColor("#ff0000")
        }}
      ></div>
      <div
        className={`${style.item} ${style.orange}`}
        onClick={() => {
          changeColor("#ff9900")
        }}
      ></div>
      <div
        className={`${style.item} ${style.yellow}`}
        onClick={() => {
          changeColor("#fef400")
        }}
      ></div>
      <div
        className={`${style.item} ${style.green}`}
        onClick={() => {
          changeColor("#01eb18")
        }}
      ></div>
      <div
        className={`${style.item} ${style.blue}`}
        onClick={() => {
          changeColor("#037fda")
        }}
      ></div>
      <div
        className={`${style.item} ${style.purple}`}
        onClick={() => {
          changeColor("#bf00cf")
        }}
      ></div>
      <div
        className={`${style.item} ${style.black}`}
        onClick={() => {
          changeColor("#bf00cf")
        }}
      ></div>
      <div
        className={`${style.item} ${style.white}`}
        onClick={() => {
          changeColor("#bf00cf")
        }}
      ></div>
    </div>
  )
}
