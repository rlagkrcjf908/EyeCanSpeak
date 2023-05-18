import { useNavigate } from "react-router-dom"
import { parseJwt } from "../services/jwtDecode"
import button from "../assets/image/kakao_button.png"
import Title from "../components/main/title"
import style from "../styles/main/main.module.css"
import { useEffect } from "react"
import { Cookies } from "react-cookie"
import { isLog, userName, userNo } from "../recoil/atoms/userState"
import { useRecoilState, useSetRecoilState } from "recoil"
import HelpModal from "../components/modal/helpModal"
import helpIcon from "../assets/help-bubble.png"
import { helpModal } from "../recoil/atoms/modalState"
export default function Main() {
  const setUserNo = useSetRecoilState(userNo)
  const setUserName = useSetRecoilState(userName)
  const [log, setLog] = useRecoilState(isLog)

  const navigate = useNavigate()
  const cookies = new Cookies()

  const [modal, setModal] = useRecoilState(helpModal)

  const closeModal = () => {
    setModal(false)
  }

  useEffect(() => {
    const token = cookies.get("accessToken")
    if (token !== undefined) {
      const obj = parseJwt(token)
      setUserNo(obj.no)
      setUserName(obj.name)
      setLog(true)
    }
  }, [])
  return (
    <div className={style.continer}>
      <div className={style.wrapper}>
        <Title></Title>
        {/* <Content></Content> */}
        {log ? (
          <div className={style.box}>
            <div className={style.btnBox}>
              <button
                className={style.btn}
                onClick={() => {
                  navigate("/setting")
                }}
              >
                시작하기
              </button>
            </div>
          </div>
        ) : (
          <div className={style.box}>
            <div style={{ textAlign: "center" }}>
              <button style={{ background: "none" }}>
                <img src={button} alt='' style={{ cursor: "pointer" }}></img>
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className={style.helpIcon}
        onClick={() => {
          setModal(true)
          setTimeout(closeModal, 5000)
        }}
      >
        <img src={helpIcon} alt='' width={100}></img>
      </div>
      {modal ? <HelpModal /> : null}
    </div>
  )
}
