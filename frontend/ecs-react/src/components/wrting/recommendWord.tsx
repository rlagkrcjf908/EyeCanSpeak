import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { recommendWord } from "../../recoil/atoms/writing"
import { getWords } from "../../services/WritingApi"
import style from "../../styles/writing/writing.module.css"
export default function RecommendWord() {
  const navigate = useNavigate()

  const [words, setWords] = useRecoilState(recommendWord)

  const loadWords = useCallback(async () => {
    try {
      const response = await getWords()
      if (!response) return

      const item = response.data

      setWords(() => [...item])
    } catch (error: any) {
      if (error.response.status === 404) {
        return
      }
      navigate("/404")
    }
  }, [navigate, setWords])

  useEffect(() => {
    loadWords()
  }, [loadWords])

  return (
    <div className={style.container}>
      <ul>
        {words &&
          words.map((word, idx) => {
            return <li key={idx}>{word}</li>
          })}
      </ul>
    </div>
  )
}
