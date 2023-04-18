import freeDrawImg from "../../assets/image/freeDraw.jpg"
import styles from "../../styles/drawing/freeDraw.module.css"

export default function SelectFreeDraw() {
  return (
    <div className={styles.card}>
      <div
        className={styles.card__background}
        style={{ backgroundImage: `url(${freeDrawImg})` }}
      >
        <h1>자유롭게 그리기</h1>
      </div>
    </div>
  )
}
