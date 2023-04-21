import style from "../../styles/board/category.module.css"

export default function Sort({ changeSort }: { changeSort: any }) {
  return (
    <>
      <button
        className={style.sortBtn}
        onClick={() => {
          changeSort(true)
        }}
      >
        최신순
      </button>
      <button
        className={style.sortBtn}
        onClick={() => {
          changeSort(false)
        }}
      >
        인기순
      </button>
    </>
  )
}
