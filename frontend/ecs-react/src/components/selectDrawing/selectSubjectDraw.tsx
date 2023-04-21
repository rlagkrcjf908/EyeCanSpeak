import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import Subject from "../../assets/image/SubjectDraw.jpg"
import {
  categoryList,
  subjectList,
  subjectState,
} from "../../recoil/atoms/selectSubject"
import { getCategory } from "../../services/commonApi"
import { getSubject } from "../../services/selectSubject"
import style from "../../styles/selectDrawing/SubjectDraw.module.css"
import resetImg from "../../assets/image/reset.png"
import backImg from "../../assets/image/left.png"
import { Link } from "react-router-dom"

export default function SelectSubjectDraw() {
  const [subjects, setSubjects] = useRecoilState(subjectList)
  const [subject, setSubject] = useRecoilState(subjectState)
  const [category, setCategory] = useRecoilState(categoryList)
  const [isSelectCategory, SetIsSelectCategory] = useState(false)

  const showSubject = () => {
    SetIsSelectCategory((prev) => !prev)
  }
  // 랜덤으로 subject선택
  const getRandomSubject = () => {
    const randomIndex = Math.floor(Math.random() * subjects.length)
    const randomSubject = subjects[randomIndex]
    // console.log("ChoiceSubjects:", subjects)
    // console.log("randomSubject", randomSubject)
    setSubject(randomSubject.subjectNM)
  }
  // Category 선택하고 Category안의 subject 부르기
  const selectCategory = async (category: number) => {
    showSubject()
    console.log("selectCategory:", category)
    try {
      const response = await getSubject(category)
      const item = response.data
      setSubjects(item)
      console.log("GETsubjects:", subjects)

      if (item) {
        getRandomSubject()
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  //Category 부르기
  const loadCategory = useCallback(async () => {
    try {
      const response = await getCategory()
      if (!response) return

      const item = response.data

      setCategory(item)
    } catch (error: any) {
      console.log(error)
    }
  }, [setCategory])

  useEffect(() => {
    loadCategory()
  }, [loadCategory])

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
            <p>{subject}</p>
            <Link to='/drawing' className={style.draw}>
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
