import style from "../../styles/modal/helpModal.module.css"
import icon1 from "../../assets/main-1.png"
import icon2 from "../../assets/main-2.png"
import icon3 from "../../assets/main-3.gif"

export default function HelpModal() {
  return (
    <div className={style.continer}>
      <div className={style.wrapper}>
        <div className={style.box}>
          <img src={icon1} width={200} alt=''></img>
          <div>눈과 카메라의 높이를 맞춰주세요</div>
        </div>
        <div className='box'>
          <img src={icon2} width={200} alt=''></img>
          <div>화면 비율은 100%로 설정해주세요</div>
        </div>
        <div className='box'>
          <img src={icon3} width={200} alt=''></img>
          <div>눈을 2초 동안 감고 있으면 클릭할 수 있어요</div>
        </div>
      </div>
    </div>
  )
}
