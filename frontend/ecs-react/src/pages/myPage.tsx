import { useEffect, useState } from "react"
import Category from "../components/myPage/category"
import Slide from "../components/myPage/slide"
import Sort from "../components/myPage/sort"

export default function MyPage() {
  const [category, setCategory] = useState(0)
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
      <Slide category={category} sort={sort} />
    </>
  )
}
