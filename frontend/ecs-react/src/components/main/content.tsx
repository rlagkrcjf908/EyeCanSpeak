import { useEffect } from "react"
import style from "../../styles/main/content.module.css"
import ContentNav from "./contentNav"
import drawing from "../../assets/drawing.gif"
import writing from "../../assets/writing.gif"
export default function Content() {
  let slideIndex: number = 0
  let timer: any

  function showSlides(): void {
    const temp = document.getElementsByClassName(`${style["mySlides"]}`)
    const slides = Array.prototype.slice.call(temp)
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"
    }

    slideIndex++

    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block"
    timer = setTimeout(showSlides, 3000)
  }

  useEffect(() => {
    showSlides()
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <div className={style.container}>
        <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>
            <div className={style.imgBox}>
              <div className={style.navbar}>
                <ContentNav></ContentNav>
              </div>
            </div>
            <div className={style.text}>손대신 눈으로 클릭 !@#$#$</div>
          </div>
        </div>
        {/* <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>
            <div className={style.imgBox}>
              <div className={style.navbar}>
                <ContentNav></ContentNav>
              </div>
              <div className={style.content}>
                <img src={writing} alt='' width={370}></img>
              </div>
            </div>
            <div className={style.text}>눈으로 글을 써 의사소통 어쩌고</div>
          </div>
        </div> */}
        {/* <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>
            <div className={style.imgBox}>
              <div className={style.navbar}>
                <ContentNav></ContentNav>
              </div>
              <div className={style.content}>
                <div className={style.board}>
                  <img src={drawing} alt='' width={200}></img>
                </div>
                <div className={style.palette}>
                  <div className={`${style.color} ${style.red}`}></div>
                  <div className={`${style.color} ${style.orange}`}></div>
                  <div className={`${style.color} ${style.yellow}`}></div>
                  <div className={`${style.color} ${style.green}`}></div>
                  <div className={`${style.color} ${style.blue}`}></div>
                  <div className={`${style.color} ${style.black}`}></div>
                </div>
              </div>
            </div>
            <div className={style.text}>눈으로 그림을 !@#@%*</div>
          </div>
        </div> */}
        {/* <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>
            <div className={style.imgBox}>
              <div className={style.navbar}>
                <img
                  src={closeIcon}
                  alt=''
                  width={10}
                  style={{ float: "right", margin: "7px 7px 0 0" }}
                ></img>
                <img
                  src={rectIcon}
                  alt=''
                  width={10}
                  style={{ float: "right", margin: "7px 7px 0 0" }}
                ></img>
              </div>
            </div>
            <div className={style.text}>다른 사람들의 그림을 !)#@($</div>
          </div>
        </div> */}
      </div>
      <div className={style.circle1}></div>
      <div className={style.circle2}></div>
    </>
  )
}
