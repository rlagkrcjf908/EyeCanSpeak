import { useRecoilState } from "recoil"
import Key from "../components/wrting/key"
import { textState } from "../recoil/atoms/writing"
import style from "../styles/writing/writing.module.css"

export default function Writing() {
  const [text, setText] = useRecoilState(textState)

  return (
    <section className={style.section}>
      <Key />
    </section>
  )
}
