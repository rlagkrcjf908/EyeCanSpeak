import SelectFreeDraw from "../components/selectDrawing/selectFreeDraw"
import SelectSebjectDraw from "../components/selectDrawing/selectSubjectDraw"
import style from "../styles/selectDrawing/freeDraw.module.css"

export default function Drawing() {
  return (
    <div className={style.container}>
      <SelectSebjectDraw />
      <SelectFreeDraw />
    </div>
  )
}
