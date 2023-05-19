import { useState } from "react"
import Category from "../components/board/category"
import Slide from "../components/board/slide"
import Sort from "../components/board/sort"
import style from "../styles/board/board.module.css"

export default function Board() {
  const [category, setCategory] = useState(-1)
  const [sort, setSort] = useState(true)

  const changeCategory: any = (idx: number) => {
    setCategory(idx)
  }

  const changeSort: any = (state: boolean) => {
    if (state === sort) return
    setSort(state)
  }

  return (
    <>
      <Category changeCategory={changeCategory} />
      <Sort changeSort={changeSort} />
      <div className={style.container}>
        <Slide category={category} sort={sort} />
      </div>
    </>
  )
}
