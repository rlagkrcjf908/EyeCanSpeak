import "./test.css"
import icon1 from "../../assets/main-1.png"
import icon2 from "../../assets/main-2.png"
import icon3 from "../../assets/main-3.gif"
export default function Content() {
  return (
    <div className='container'>
      <div className='box'>
        {/* <div className='circle'></div> */}
        <img src={icon1} width={100} alt=''></img>
        <div>눈과 카메라의 높이를 맞춰주세요</div>
      </div>
      <div className='box'>
        {/* <div className='circle'></div> */}
        <img src={icon2} width={100} alt=''></img>
        <div>화면 비율은 100%로 설정해주세요</div>
      </div>
      <div className='box'>
        {/* <div className='circle'></div> */}
        <img src={icon3} width={100} alt=''></img>
        <div>눈을 3초 동안 감고 있으면 클릭할 수 있어요</div>
      </div>
    </div>
  )
}
