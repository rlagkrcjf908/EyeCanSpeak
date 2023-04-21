import { Link } from "react-router-dom"
import style from "../../styles/home/header.module.css"

export default function Navbar() {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to='/' className={style.logoItem}>
          ECS
        </Link>
      </div>

      <div className={style.menu}>
        <Link to='/writing' data-hover='글쓰기'>
          <span>글쓰기</span>
        </Link>
        <Link to='/drawing' data-hover='그림그리기'>
          <span>그림그리기</span>
        </Link>
        <Link to='/board' data-hover='게시판'>
          <span>게시판</span>
        </Link>
        <Link to='/myPage' data-hover='마이페이지'>
          <span>마이페이지</span>
        </Link>
        <span>로그아웃</span>
      </div>
    </div>
  )
}
