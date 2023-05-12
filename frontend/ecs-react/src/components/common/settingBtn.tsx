import style from "../../styles/common/settingBtn.module.css"
import icon from "../../assets/icon/setting.png"
import { useNavigate } from "react-router-dom"
export default function SettingBtn() {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate("/setting")
  }
  return (
    <button className={style.iconBtn} onClick={clickHandler}>
      <img className={style.icon} src={icon} alt=''></img>
    </button>
  )
}
