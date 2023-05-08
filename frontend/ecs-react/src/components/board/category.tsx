import { useCallback, useEffect, useState } from "react"
import style from "../../styles/board/category.module.css"
import { getCategory } from "../../services/commonApi"

interface categoryType {
  categoryNo: number
  categoryNM: string
}

export default function Category({ changeCategory }: { changeCategory: any }) {
  const [categoryList, setCategoryList] = useState<categoryType[]>([])

  const setCategory = useCallback(async () => {
    const response = await getCategory()
    setCategoryList(() => [...response.data])
  }, [])

  useEffect(() => {
    setCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={style.container}>
      {categoryList.map((item, index) => (
        <button
          className={style.item}
          onClick={() => {
            changeCategory(index)
          }}
          key={index}
        >
          {categoryList[index].categoryNM}
        </button>
      ))}
    </div>
  )
}
