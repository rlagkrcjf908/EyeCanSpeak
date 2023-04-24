import { useCallback, useEffect, useState } from "react"
import Subject from "../../assets/image/SubjectDraw.jpg"
import { getCategory } from "../../services/commonApi"
import { getSubject } from "../../services/selectSubject"
import style from "../../styles/selectDrawing/SubjectDraw.module.css"
import resetImg from "../../assets/image/reset.png"
import backImg from "../../assets/image/left.png"
import { Link } from "react-router-dom"

export default function SelectSubjectDraw() {
  interface categoryTypes {
    categoryNo: number
    categoryNM: string
  }
  interface subjectTypes {
    subjectNo: number
    subjectNM: string
  }
  // 서브젝트 리스트
  const [subjects, setSubjects] = useState<subjectTypes[]>([])

  // 랜덤으로 나온 서브젝트
  const [subject, setSubject] = useState<string>("")

  // 카테고리
  const [category, setCategory] = useState<categoryTypes[]>([])

  // isSelectCategory 가 true면 랜덤 서브젝트를 보여줌
  const [isSelectCategory, SetIsSelectCategory] = useState(false)

  const showSubject = () => {
    SetIsSelectCategory((prev) => !prev)
  }

  // 랜덤으로 subject선택
  const getRandomSubject = () => {
    const randomIndex = Math.floor(Math.random() * subjects.length)
    const randomSubject = subjects[randomIndex]
    if (randomSubject.subjectNM === subject) {
      getRandomSubject()
      return
    }
    setSubject(randomSubject.subjectNM)
    console.log(randomSubject.subjectNM)
  }

  // Category 선택하고 Category안의 subject 부르기

  const selectCategory = async (categoryNum: number) => {
    try {
      const response = await getSubject(categoryNum)
      const item = response.data

      showSubject()
      setSubjects(() => [...item])
    } catch (error: any) {
      console.log(error)
    }
  }

  //Category 부르기
  const loadCategory = useCallback(async () => {
    try {
      const response = await getCategory()

      const item = response.data

      setCategory(item)
    } catch (error: any) {
      console.log(error)
    }
  }, [setCategory])

  useEffect(() => {
    if (subjects.length > 0) {
      getRandomSubject()
    }
  }, [subjects])

  useEffect(() => {
    loadCategory()
  }, [])

  return (
    <div className={style.card}>
      <div
        className={style.front}
        style={{ backgroundImage: `url(${Subject})` }}
      >
        주제선택하기
      </div>
      {isSelectCategory ? (
        <div
          className={style.back}
          style={{ backgroundImage: `url(${Subject})` }}
        >
          {/* subject고르기 */}
          <div className={style.subjectItem}>
            <p>{subject && subject}</p>
            <Link to={`/drawing/${subject}`} className={style.draw}>
              그리기
            </Link>
            <div className={style.buttonBox}>
              <img onClick={showSubject} src={backImg} alt='back' />
              <img onClick={getRandomSubject} src={resetImg} alt='reset' />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={style.back}
          style={{ backgroundImage: `url(${Subject})` }}
        >
          {/* category 고르기 */}
          {category &&
            category.map((item, idx) => {
              return (
                <div
                  onClick={() => {
                    selectCategory(item.categoryNo)
                  }}
                  className={style.subject}
                  key={idx}
                >
                  {item.categoryNM}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
