import style from "../../styles/board/category.module.css"

export default function Sort({ changeSort }: { changeSort: any }) {
  return (
    <div className={style.btns}>
      <button
        className={style.sortBtn1}
        onClick={() => {
          changeSort(true)
        }}
      >
        최신순
      </button>
      <button
        className={style.sortBtn2}
        onClick={() => {
          changeSort(false)
        }}
      >
        인기순
      </button>
    </div>
  )
}
