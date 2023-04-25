import { useCallback, useEffect } from "react"
import { useRecoilState } from "recoil"
import { recommendWord, textState } from "../../recoil/atoms/writing"
import { getWords } from "../../services/writingApi"
import style from "../../styles/writing/writing.module.css"
export default function RecommendWord() {
  const [words, setWords] = useRecoilState(recommendWord)
  const [text, setText] = useRecoilState(textState)

  // 선택한 단어 input에 반영
  const onClick = (word: string) => {
    setText(text + word + " ")
  }

  // 추천단어 받아오기
  const loadWords = useCallback(async () => {
    try {
      const response = await getWords()

      const item = response.data
      console.log(response)
      setWords(() => [...item])
    } catch (error: any) {
      console.log(error)
    }
  }, [setWords])

  useEffect(() => {
    loadWords()
  }, [loadWords])

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
