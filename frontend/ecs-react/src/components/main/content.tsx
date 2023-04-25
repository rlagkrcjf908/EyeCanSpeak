import { useEffect, useState } from "react"
import style from "../../styles/main/content.module.css"
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
            <div className={style.imgBox}></div>
            <div className={style.text}>손대신 눈으로 클릭 !@#$#$</div>
          </div>
        </div>
        <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>
            <div className={style.imgBox}></div>
            <div className={style.text}>눈으로 글을 써 의사소통 어쩌고</div>
          </div>
        </div>
        <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>
            <div className={style.imgBox}></div>
            <div className={style.text}>눈으로 그림을 !@#@%*</div>
          </div>
        </div>
        <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>
            <div className={style.imgBox}></div>
            <div className={style.text}>다른 사람들의 그림을 !)#@($</div>
          </div>
        </div>
      </div>
      <div className={style.circle1}></div>
      <div className={style.circle2}></div>
    </>
  )
}
