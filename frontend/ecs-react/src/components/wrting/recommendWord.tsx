import { useRecoilState, useRecoilValue } from "recoil"
import { recommendWord, textState } from "../../recoil/atoms/writing"
import style from "../../styles/writing/writing.module.css"
export default function RecommendWord() {
  const words = useRecoilValue(recommendWord)
  const [text, setText] = useRecoilState(textState)

  // 선택한 단어 input에 반영
  const onClick = (word: string) => {
    setText(text + word + " ")
  }

  return (
    <div className={style.container}>
      {words &&
        words.map((word, idx) => {
          return (
            <span onClick={() => onClick(word)} key={idx}>
              {word}
            </span>
          )
        })}
    </div>
  )
}
