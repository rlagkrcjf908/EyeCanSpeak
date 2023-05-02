import style from "../styles/common/selectMain.module.css"
import drawing from "../assets/image/drawing.png"
import writing from "../assets/image/writing.png"
import { Link } from "react-router-dom"
export default function SelectMain() {
  return (
    <section className={style["hero-section"]}>
      <div className={style["card-grid"]}>
        <Link className={style.card} to='/writing'>
          <div
            className={style.card__background}
            style={{ backgroundImage: `url(${writing})` }}
          ></div>
          <div className={style.card__content}>
            <h3 className={style.card__heading}>글쓰기</h3>
          </div>
        </Link>
        <Link className={style.card} to='/selectDraw'>
          <div
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
