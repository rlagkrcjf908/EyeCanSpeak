import { useRecoilState } from "recoil"
import style from "../../styles/modal/deleteModal.module.css"
import { deleteModal } from "../../recoil/atoms/modalState"
import { deleteDrawing } from "../../services/userApi"
export default function DeleteModal({
  drawNo,
  category,
  sort,
  setList,
}: {
  drawNo: any
  category: any
  sort: any
  setList: any
}) {
  const [modal, setModal] = useRecoilState(deleteModal)

  const deleteDraw = async () => {
    const response = await deleteDrawing(drawNo)
    if (response.status === 200) {
      setList(category, sort)
      setModal(false)
    } else console.log("삭제 실패")
  }

  return (
    <div className={modal ? style.openModal : style.closeModal}>
      <div>
        <div className={style.text}>정말 삭제하시겠습니까?</div>
        <div>
          <button className={style.btn} onClick={deleteDraw}>
            네!
          </button>
          <button
            className={style.btn}
            onClick={() => {
              setModal(false)
            }}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  )
}
