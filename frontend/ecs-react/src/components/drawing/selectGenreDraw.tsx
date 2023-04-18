import genreDrawImg from "../../assets/image/genreDraw.jpg"
import styles from "../../styles/drawing/genreDraw.module.css"
export default function SelectGenreDraw() {
  return (
    <div className={styles.card}>
      <div
        className={styles.front}
        style={{ backgroundImage: `url(${genreDrawImg})` }}
      >
        주제선택하기
      </div>

      <div
        className={styles.back}
        style={{ backgroundImage: `url(${genreDrawImg})` }}
      >
        <div className={styles.genre}>동물</div>
        <div className={styles.genre}>식물</div>
        <div className={styles.genre}>음식</div>
        <div className={styles.genre}>도형</div>
        <div className={styles.genre}>인물</div>
        <div className={styles.genre}>주제</div>
      </div>
    </div>
  )
}
