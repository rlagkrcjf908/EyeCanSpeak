import { useRecoilState, useRecoilValue } from "recoil"
import { useState, useRef } from "react"
import { recommendWord, textState } from "../../recoil/atoms/writingState"
import style from "../../styles/writing/writing.module.css"
import next from "../../assets/icon/next.png"
import prev from "../../assets/icon/back.png"

export default function RecommendWord() {
  const words = useRecoilValue(recommendWord)
  const [text, setText] = useRecoilState(textState)

  // 선택한 단어 input에 반영
  const onClick = (word: string) => {
    const textList = text.split(" ")
    textList.pop()
    const newText = textList.join(" ")
    setText(newText + " " + word + " ")
  }

  // 가로스크롤
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  // 오른쪽 스크롤 버튼
  const handleScrollRight = () => {
    const scrollWidth = scrollRef.current?.scrollWidth || 0
    const clientWidth = scrollRef.current?.clientWidth || 0
    const newPosition = Math.min(
      scrollPosition + clientWidth,
      scrollWidth - clientWidth
    )
    setScrollPosition(newPosition)
    smoothScroll(scrollRef.current, newPosition, 500)
  }
  // 왼쪽 스크롤 버튼
  const handleScrollLeft = () => {
    const newPosition = Math.max(
      scrollPosition - (scrollRef.current?.clientWidth || 0),
      0
    )
    setScrollPosition(newPosition)
    smoothScroll(scrollRef.current, newPosition, 500)
  }
  // 부드럽게 스크롤 넘기기
  const smoothScroll = (
    element: HTMLElement | null,
    to: number,
    duration: number
  ) => {
    if (!element) return
    const start = element.scrollLeft
    const change = to - start
    const increment = 20
    let currentTime = 0

    const animateScroll = () => {
      currentTime += increment
      const val = easeInOutQuad(currentTime, start, change, duration)
      element.scrollLeft = val
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }
    animateScroll()
  }

  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }
  return (
    <div className={style.container}>
      <button onClick={handleScrollLeft}>
        <img src={prev} alt='prev' style={{ background: "none" }} />
      </button>
      <div ref={scrollRef}>
        {words &&
          words.map((word, idx) => {
            return (
              <p onClick={() => onClick(word)} key={idx}>
                {word}
              </p>
            )
          })}
      </div>
      <button onClick={handleScrollRight}>
        <img src={next} alt='next' style={{ background: "none" }} />
      </button>
    </div>
  )
}
