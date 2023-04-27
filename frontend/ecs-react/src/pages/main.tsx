import { useNavigate } from "react-router-dom"
import { parseJwt } from "../services/jwtDecode"
import Content from "../components/main/content"
import MainBtn from "../components/main/mainBtn"
import Title from "../components/main/title"
import style from "../styles/main/main.module.css"
import { useEffect } from "react"
import { Cookies } from "react-cookie"
import { isLog, userName, userNo } from "../recoil/atoms/userState"
import { useRecoilState, useSetRecoilState } from "recoil"

export default function Main() {
  const setUserNo = useSetRecoilState(userNo)
  const setUserName = useSetRecoilState(userName)
  const [log, setLog] = useRecoilState(isLog)

  const navigate = useNavigate()
  const cookies = new Cookies()
  useEffect(() => {
    const token = cookies.get("accessToken")
    if (token !== undefined) {
      const obj = JSON.parse(parseJwt(token))
      setUserNo(obj.no)
      setUserName(obj.name)
      setLog(true)
    }
  }, [])
  return (
    <>
      <Title></Title>
      <Content></Content>
      {log ? (
        <div className={style.btnBox}>
          <button
            className={style.btn}
            onClick={() => {
              navigate("/selectMain")
            }}
          >
            시작하기
          </button>
        </div>
      ) : (
        <MainBtn></MainBtn>
      )}
    </>
  )
}
