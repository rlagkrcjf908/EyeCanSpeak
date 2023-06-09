import { useRecoilState } from "recoil"
import { saveModal } from "../../recoil/atoms/modalState"
import style from "../../styles/modal/saveModal.module.css"
import { Cookies } from "react-cookie"
import axios, { AxiosResponse } from "axios"

export default function SaveModal({
  categoryNo,
  blob,
  isEdit,
  drawNo,
}: {
  categoryNo: any
  blob: any
  isEdit: boolean
  drawNo: any
}) {
  const [modal, setModal] = useRecoilState(saveModal)
  const cookies = new Cookies()

  const save = async (post: boolean) => {
    const token = cookies.get("accessToken")
    const formData: FormData = new FormData()
    const data = {
      categoryNo: categoryNo,
      drawPostTF: post ? true : false,
    }
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    )
    formData.append("drawDrawing", blob)

    if (isEdit) {
      const response: AxiosResponse = await axios.put(
        `https://k8d204.p.ssafy.io/api/draw/store/${drawNo}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status !== 200) console.log("저장 실패")
      setModal(false)
      window.location.href = "https://k8d204.p.ssafy.io/myPage"
    } else {
      const response: AxiosResponse = await axios.post(
        "https://k8d204.p.ssafy.io/api/draw/store",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status !== 200) console.log("저장 실패")
      setModal(false)
      window.location.href = "https://k8d204.p.ssafy.io/myPage"
    }
  }

  return (
    <div className={modal ? style.openModal : style.closeModal}>
      <div>
        <button
          className={style.btn}
          onClick={() => {
            save(false)
          }}
        >
          그냥 저장할래요
        </button>
        <button
          className={style.btn}
          onClick={() => {
            save(true)
          }}
        >
          작품 공유할래요!
        </button>
      </div>
    </div>
  )
}
