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
  // 마우스 오버
  const handleMouseOver = (e: any) => {
    const activeItem = e.target
    activeItem?.classList.add(`${style.hover}`)
  }
  // 마우스 리브
  const handleMouseLeave = (e: any) => {
    const activeItem = e.target
    activeItem?.classList.remove(`${style.hover}`)
  }

  // useEffect(() => {
  //   IsCookies()
  // }, [])
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={style.header}
    >
      <div className={style.logo}>
        <Link to='/' className={style.logoItem}>
          <img src={logo} alt='logo' />
        </Link>
      </div>

      <div className={style.menu}>
        <Link to='/writing' data-hover='글쓰기'>
          <span className={style.menuItem}>글쓰기</span>
        </Link>
        <Link to='/selectDraw' data-hover='그림그리기'>
          <span className={style.menuItem}>그림그리기</span>
        </Link>
        <Link to='/board' data-hover='게시판'>
          <span className={style.menuItem}>게시판</span>
        </Link>
        <Link to='/myPage' data-hover='마이페이지'>
          <span className={style.menuItem}>마이페이지</span>
        </Link>
        <span className={style.menuItem} onClick={logout}>
          로그아웃
        </span>
      </div>
    </div>
  )
}
