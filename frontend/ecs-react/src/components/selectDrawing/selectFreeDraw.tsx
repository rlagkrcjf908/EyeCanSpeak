import { Link } from "react-router-dom"
import freeDrawImg from "../../assets/image/freeDraw.png"
import style from "../../styles/selectDrawing/freeDraw.module.css"

export default function SelectFreeDraw() {
  return (
    <Link to='/drawing/5' id='freeCard' className={style.card}>
      <div
        id='card__background'
        className={`${style.card__background} `}
        style={{ backgroundImage: `url(${freeDrawImg})` }}
      >
        <h1>자유롭게 그리기</h1>
      </div>
    </Link>
  )
}
