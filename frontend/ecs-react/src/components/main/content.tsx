import { useEffect, useState } from "react"
import style from "../../styles/main/content.module.css"
export default function Content() {
  let slideIndex: number = 0
  let start = true
  useEffect(() => {
    if (start === false) return
    showSlides()
  }, [])

  function showSlides(): void {
    start = false
    const slides: any = document.getElementsByClassName(`${style["mySlides"]}`)
    for (let i = 0; i < slides.length; i++) {
      ;(slides[i] as HTMLElement).style.display = "none"
    }

    slideIndex++

    if (slideIndex > slides.length) {
      slideIndex = 1
    }

    console.log(slideIndex)
    slides[slideIndex - 1].style.display = "block"
    setTimeout(showSlides, 3000) // Change image every 2 seconds}
  }
  return (
    <>
      <div className={style.container}>
        <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>11</div>
        </div>

        <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>22</div>
        </div>

        <div className={`${style.mySlides} ${style.fade}`}>
          <div className={style.contentBox}>33</div>
        </div>
      </div>
      <div className={style.circle1}></div>
      <div className={style.circle2}></div>
    </>
  )
}
