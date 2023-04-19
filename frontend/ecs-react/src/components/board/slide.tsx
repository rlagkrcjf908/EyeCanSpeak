import style from "../../styles/board/slide.module.css"
import { useEffect } from "react"

export default function Slide() {
  let currentIdx = 0
  let slideCount = 0
  let slides: any
  let start = true
  let slideWidth = 300 //슬라이드이미지 넓이
  let slideMargin = 100 //슬라이드 끼리의 마진값

  useEffect(() => {
    if (start === false) return
    let next: any = document.getElementsByClassName(`${style["next"]}`)[0]
    next.addEventListener("click", function () {
      //다음 버튼 눌렀을때
      if (currentIdx <= slideCount - 1) {
        //슬라이드이동
        slides.style.left =
          -(currentIdx + 2) * (slideWidth + slideMargin) + "px"
        slides.style.transition = `${0.5}s ease-out` //이동 속도
      }
      if (currentIdx === slideCount - 1) {
        //마지막 슬라이드 일때
        setTimeout(function () {
          //0.5초동안 복사한 첫번째 이미지에서, 진짜 첫번째 위치로 이동
          slides.style.left = -(slideWidth + slideMargin) + "px"
          slides.style.transition = `${0}s ease-out`
        }, 500)
        currentIdx = -1
      }
      currentIdx += 1
    })

    showSlides()
  }, [])

  function showSlides(): void {
    start = false
    slides = document.getElementsByClassName(`${style["slides"]}`)[0]
    let slideImg: any = document.getElementsByClassName(`${style["item"]}`)
    currentIdx = 0
    slideCount = slideImg.length

    makeClone() // 처음이미지와 마지막 이미지 복사 함수
    initfunction() //슬라이드 넓이와 위치값 초기화 함수
    function makeClone() {
      let cloneSlide_first = slides.firstElementChild.cloneNode(true)
      let cloneSlide_last = slides.lastElementChild.cloneNode(true)
      slides.append(cloneSlide_first)
      slides.insertBefore(cloneSlide_last, slides.firstElementChild)
      console.log(slides)
    }
    function initfunction() {
      slides.style.width = (slideWidth + slideMargin) * (slideCount + 2) + "px"
      slides.style.left = -(slideWidth + slideMargin) + "px"
    }
  }

  const nextEvent = () => {
    if (currentIdx <= slideCount - 1) {
      //슬라이드이동
      slides.style.left = -(currentIdx + 2) * (slideWidth + slideMargin) + "px"
      slides.style.transition = `${0.5}s ease-out` //이동 속도
    }
    if (currentIdx === slideCount - 1) {
      //마지막 슬라이드 일때
      setTimeout(function () {
        //0.5초동안 복사한 첫번째 이미지에서, 진짜 첫번째 위치로 이동
        slides.style.left = -(slideWidth + slideMargin) + "px"
        slides.style.transition = `${0}s ease-out`
      }, 500)
      currentIdx = -1
    }
    currentIdx += 1
  }

  const prevEvent = () => {
    if (currentIdx >= 0) {
      slides.style.left = -currentIdx * (slideWidth + slideMargin) + "px"
      slides.style.transition = `${0.5}s ease-out`
    }
    if (currentIdx === 0) {
      setTimeout(function () {
        slides.style.left = -slideCount * (slideWidth + slideMargin) + "px"
        slides.style.transition = `${0}s ease-out`
      }, 500)
      currentIdx = slideCount
    }
    currentIdx -= 1
  }

  return (
    <div id={`${style.slideShow}`}>
      <ul className={`${style.slides}`}>
        <li className={`${style.item}`}>111</li>
        <li className={`${style.item}`}>222</li>
        <li className={`${style.item}`}>333</li>
      </ul>
      <p className={`${style.controller}`}>
        <span className={`${style.prev}`} onClick={prevEvent}>
          &lang;
        </span>
        <span className={`${style.next}`} onClick={nextEvent}>
          &rang;
        </span>
      </p>
    </div>
  )
}
