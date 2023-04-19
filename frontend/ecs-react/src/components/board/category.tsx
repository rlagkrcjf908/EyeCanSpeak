import { useState } from "react"
import style from "../../styles/board/category.module.css"

export default function Category() {
  const [subIdx, setSubIdx] = useState(0)
  const subList: string[] = ["주제1", "주제2", "주제3", "주제4"]

  return (
    <div className={style.container}>
      <button
        className={style.item}
        onClick={() => {
          setSubIdx(0)
        }}
      >
        {subList[0]}
      </button>
      <button
        className={style.item}
        onClick={() => {
          setSubIdx(1)
        }}
      >
        {subList[1]}
      </button>
      <button
        className={style.item}
        onClick={() => {
          setSubIdx(2)
        }}
      >
        {subList[2]}
      </button>
      <button
        className={style.item}
        onClick={() => {
          setSubIdx(3)
        }}
      >
        {subList[3]}
      </button>
      <button className={style.sortBtn}>최신순</button>
      <button className={style.sortBtn}>인기순</button>
    </div>
  )
}
