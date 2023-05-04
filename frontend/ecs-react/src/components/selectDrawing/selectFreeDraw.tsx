import { Link } from "react-router-dom"
import freeDrawImg from "../../assets/image/freeDraw.png"
import style from "../../styles/selectDrawing/freeDraw.module.css"

export default function SelectFreeDraw() {
  const handleMouseOver = () => {
    const freeCard = document.querySelector("#freeCard")
    const card__background = document.querySelector("#card__background")
    freeCard?.classList.add(`${style.card_hover}`)
    card__background?.classList.add(`${style.hover}`)
  }
  const handleMouseLeave = () => {
    const freeCard = document.querySelector("#freeCard")
    const card__background = document.querySelector("#card__background")
    freeCard?.classList.remove(`${style.card_hover}`)
    card__background?.classList.remove(`${style.hover}`)
  }

  return (
    <Link to='/drawing/5' id='freeCard' className={style.card}>
      <div
        id='card__background'
        className={style.card__background}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: `url(${freeDrawImg})` }}
      >
        <h1>자유롭게 그리기</h1>
      </div>
    </Link>
  )
}
