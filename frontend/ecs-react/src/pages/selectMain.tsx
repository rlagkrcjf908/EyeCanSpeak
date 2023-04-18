import styles from "../styles/home/selectMain.module.css"
import drawing from "../assets/image/drawing.jpg"
import writing from "../assets/image/writing.png"
export default function SelectMain() {
  return (
    <section className={styles["hero-section"]}>
      <div className={styles["card-grid"]}>
        <a className={styles.card} href='#'>
          <div
            className={styles.card__background}
            style={{ backgroundImage: `url(${writing})` }}
          ></div>
          <div className={styles.card__content}>
            <h3 className={styles.card__heading}>글쓰기</h3>
          </div>
        </a>
        <a className={styles.card} href='#'>
          <div
            className={styles.card__background}
            style={{ backgroundImage: `url(${drawing})` }}
          ></div>
          <div className={styles.card__content}>
            <h3 className={styles.card__heading}>그리기</h3>
          </div>
        </a>
      </div>
    </section>
  )
}
