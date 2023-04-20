import styles from "../styles/home/selectMain.module.css"
import drawing from "../assets/image/drawing.jpg"
import writing from "../assets/image/writing.png"
import { Link } from "react-router-dom"
export default function SelectMain() {
  return (
    <section className={styles["hero-section"]}>
      <div className={styles["card-grid"]}>
        <Link className={styles.card} to='/writing'>
          <div
            className={styles.card__background}
            style={{ backgroundImage: `url(${writing})` }}
          ></div>
          <div className={styles.card__content}>
            <h3 className={styles.card__heading}>글쓰기</h3>
          </div>
        </Link>
        <Link className={styles.card} to='/selectDraw'>
          <div
            className={styles.card__background}
            style={{ backgroundImage: `url(${drawing})` }}
          ></div>
          <div className={styles.card__content}>
            <h3 className={styles.card__heading}>그리기</h3>
          </div>
        </Link>
      </div>
    </section>
  )
}
