import "./test.css"
export default function Content() {
  return (
    <div className='container'>
      <div className='box'>
        <div className='circle'></div>
        <div>눈과 카메라의 높이를 맞춰주세요</div>
      </div>
      <div className='box'>
        <div className='circle'></div>
        <div>화면 비율은 100%로 설정해주세요</div>
      </div>
      <div className='box'>
        <div className='circle'></div>
        <div>눈을 3초 동안 감고 있으면 클릭이 돼요</div>
      </div>
    </div>
  )
}
