import { Link } from "react-router-dom"
import freeDrawImg from "../../assets/image/freeDraw.jpg"
import style from "../../styles/selectDrawing/freeDraw.module.css"

export default function SelectFreeDraw() {
  return (
    <Link to='/drawing' className={style.card}>
      <div
        className={style.card__background}
        style={{ backgroundImage: `url(${freeDrawImg})` }}
      >
        <h1>자유롭게 그리기</h1>
      </div>
    </Link>
  )
}
