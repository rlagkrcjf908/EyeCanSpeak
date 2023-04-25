import { useNavigate } from "react-router-dom"
import isLogin from "../components/login/isLogin"
import Content from "../components/main/content"
import MainBtn from "../components/main/mainBtn"
import Title from "../components/main/title"
import style from "../styles/main/main.module.css"

export default function Main() {
  const navigate = useNavigate()
  return (
    <>
      <Title></Title>
      <Content></Content>

      {isLogin() ? (
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
