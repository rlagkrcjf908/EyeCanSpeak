import style from "../styles/common/selectMain.module.css"
import drawing from "../assets/image/drawing.png"
import writing from "../assets/image/writing.png"
import { Link } from "react-router-dom"
export default function SelectMain() {
  const handleMouseOver = (e: any) => {
    const Card = e.target
    Card?.classList.add(`${style.hover}`)
  }
  const handleMouseLeave = (e: any) => {
    const Card = e.target
    Card?.classList.remove(`${style.hover}`)
  }

  return (
    <section className={style["hero-section"]}>
      <div className={style["card-grid"]}>
        <Link className={style.card} id="writeCard" to='/writing'>
          <div
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className={style.card__background}
            style={{ backgroundImage: `url(${writing})` }}
          ></div>
          <div className={style.card__content}>
            <h3 className={style.card__heading}>글쓰기</h3>
          </div>
        </Link>
        <Link className={style.card} to='/selectDraw'>
          <div
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className={style.card__background}
            style={{ backgroundImage: `url(${drawing})` }}
          ></div>
          <div className={style.card__content}>
            <h3 className={style.card__heading}>그리기</h3>
          </div>
        </Link>
      </div>
    </section>
  )
}
