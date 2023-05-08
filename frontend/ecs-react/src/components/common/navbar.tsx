import { Link, useNavigate } from "react-router-dom"
import style from "../../styles/common/navbar.module.css"
import { Cookies } from "react-cookie"
import { useSetRecoilState } from "recoil"
import { isLog, userName, userNo } from "../../recoil/atoms/userState"
import logo from "../../assets/image/ECS.png"
import IsCookies from "../../services/isCookies"
import { useEffect } from "react"
export default function Navbar() {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const setUserNo = useSetRecoilState(userNo)
  const setUserName = useSetRecoilState(userName)
  const setLog = useSetRecoilState(isLog)

  const logout = () => {
    cookies.remove("accessToken")
    cookies.remove("refreshToken")
    setUserNo(-1)
    setUserName("")
    setLog(false)
    navigate("/")
  }

  useEffect(() => {
    console.log("isCookie?")
    // IsCookies()
  }, [])
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to='/' className={style.logoItem}>
          <img src={logo} alt='logo' />
        </Link>
      </div>

      <div className={style.menu}>
        <Link to='/writing' data-hover='글쓰기'>
          <span>글쓰기</span>
        </Link>
        <Link to='/selectDraw' data-hover='그림그리기'>
          <span>그림그리기</span>
        </Link>
        <Link to='/board' data-hover='게시판'>
          <span>게시판</span>
        </Link>
        <Link to='/myPage' data-hover='마이페이지'>
          <span>마이페이지</span>
        </Link>
        <span onClick={logout}>로그아웃</span>
      </div>
    </div>
  )
}
