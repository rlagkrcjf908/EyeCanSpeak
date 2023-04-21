import Subject from "../../assets/image/SubjectDraw.jpg"
import style from "../../styles/selectDrawing/SubjectDraw.module.css"
export default function SelectSubjectDraw() {
  return (
    <div className={style.card}>
      <div
        className={style.front}
        style={{ backgroundImage: `url(${Subject})` }}
      >
        주제선택하기
      </div>

      <div
        className={style.back}
        style={{ backgroundImage: `url(${Subject})` }}
      >
        <div className={style.genre}>동물</div>
        <div className={style.genre}>식물</div>
        <div className={style.genre}>음식</div>
        <div className={style.genre}>도형</div>
      </div>
    </div>
  )
}
