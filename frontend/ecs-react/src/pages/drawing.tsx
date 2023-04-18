import SelectFreeDraw from "../components/drawing/selectFreeDraw"
import SelectGenreDraw from "../components/drawing/selectGenreDraw"
import styles from "../styles/drawing/freeDraw.module.css"

export default function Drawing() {
  return (
    <div className={styles.container}>
      <SelectGenreDraw />
      <SelectFreeDraw />
    </div>
  )
}
