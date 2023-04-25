import style from "../../styles/drawing/palette.module.scss"
import { useRecoilState } from "recoil"
import { penColor, penSize } from "../../recoil/atoms/drawingState"
export default function Palette() {
  const [color, setColor] = useRecoilState(penColor)
  const [size, setSize] = useRecoilState(penSize)

  return (
    <div className={style.palette}>
      <div>
        <button
          className={`${style.colorBtn} ${style.red}`}
          onClick={(e: any) => {
            setColor("#ff0000")
            setSize(2)
          }}
        ></button>
        <button
          className={`${style.colorBtn} ${style.orange}`}
          onClick={() => {
            setColor("#ff9900")
            setSize(2)
          }}
        ></button>
      </div>
      <div>
        <button
          className={`${style.colorBtn} ${style.yellow}`}
          onClick={() => {
            setColor("#fef400")
            setSize(2)
          }}
        ></button>
        <button
          className={`${style.colorBtn} ${style.green}`}
          onClick={() => {
            setColor("#01eb18")
            setSize(2)
          }}
        ></button>
      </div>
      <div>
        <button
          className={`${style.colorBtn} ${style.blue}`}
          onClick={() => {
            setColor("#037fda")
            setSize(2)
          }}
        ></button>
        <button
          className={`${style.colorBtn} ${style.purple}`}
          onClick={() => {
            setColor("#bf00cf")
            setSize(2)
          }}
        ></button>
      </div>
      <div>
        <button
          className={`${style.colorBtn} ${style.black}`}
          onClick={() => {
            setColor("black")
            setSize(2)
          }}
        ></button>
        <button
          className={`${style.colorBtn} ${style.white}`}
          onClick={() => {
            setColor("white")
            setSize(20)
          }}
        ></button>
      </div>
    </div>
  )
}
