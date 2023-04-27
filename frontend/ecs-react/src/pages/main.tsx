import { useNavigate } from "react-router-dom"
import isLogin, { getCookie, parseJwt } from "../components/login/isLogin"
import Content from "../components/main/content"
import MainBtn from "../components/main/mainBtn"
import Title from "../components/main/title"
import style from "../styles/main/main.module.css"
import { useEffect } from "react"
import { Cookies } from "react-cookie"

export default function Main() {
  const navigate = useNavigate()
  const cookies = new Cookies()
  useEffect(() => {
    const token = cookies.get("accessToken")
    if (token !== undefined) {
      console.log(parseJwt(token))
    }
  }, [])
  return (
    <>
      <Title></Title>
      <Content></Content>
      {/* {isLogin("accessToken") ? (
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
      ) : ( */}
      <MainBtn></MainBtn>
      {/* )} */}
    </>
  )
}
