import style from "../../styles/common/position.module.css"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  currerntXPosition,
  currerntYPosition,
  nextXPosition,
  nextYPosition,
  socketXPosition,
  socketYPosition,
} from "../../recoil/atoms/boxState"
import { useEffect } from "react"

export default function Position() {
  const X = useRecoilValue(socketXPosition)
  const Y = useRecoilValue(socketYPosition)
  const [currentXBox, setCurrentXBox] = useRecoilState(currerntXPosition)
  const [currentYBox, setCurrentYBox] = useRecoilState(currerntYPosition)
  const [nextX, setNextX] = useRecoilState(nextXPosition)
  const [nextY, setNextY] = useRecoilState(nextYPosition)

  let box: any

  useEffect(() => {
    move(X, Y)
  }, [X, Y])

  // 좌표값에 따라 이동
  const move = (randomX: number, randomY: number) => {
    box = document.querySelector("#box")
    const x = box.getBoundingClientRect().x
    const y = box.getBoundingClientRect().y

    setCurrentXBox(x)
    setCurrentYBox(y)
    setNextX(randomX)
    setNextY(randomY)
  }

  // 마우스오버
  const hoverHandler = () => {
    const element: any = document.elementFromPoint(nextX, nextY)
    if (!element) return

    element.dispatchEvent(
      new MouseEvent("mouseover", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    )
    // 마우스 오버 된 요소의 클래스네임에 호버가 있으면 마우스 변함
    if (element.className.indexOf("hover") === -1) {
      box = document.querySelector("#box")
      box.classList.remove(`${style.hover}`)
    } else {
      box = document.querySelector("#box")
      box.classList.add(`${style.hover}`)
    }
  }

  // 마우스리브하면 움직이기 전 좌표에 있던 요소의 className에 hover 지우기
  const leaveHandler = () => {
    const element: any = document.elementFromPoint(currentXBox, currentYBox)
    if (!element) return
    const className = element.className.replace("_hover__", "")
    element.className = className
  }

  // 위치 변할때 마다 마우스오버
  useEffect(() => {
    box = document.querySelector("#box")
    if (!box) return

    leaveHandler()
    hoverHandler()
  }, [currentXBox, currentYBox, nextX, nextY])

  const mouseClickEvents = ["mousedown", "click", "mouseup"]

  // // 클릭
  // function blinkhandler() {
  //   box = document.querySelector("#box")
  //   const x = box.getBoundingClientRect().x
  //   const y = box.getBoundingClientRect().y
  //   const element: any = document.elementFromPoint(x, y)

  //   if (element.className.indexOf("palette") === -1)
  //     setClick((current) => !current)

  //   mouseClickEvents.forEach((mouseEventType) =>
  //     element.dispatchEvent(
  //       new MouseEvent(mouseEventType, {
  //         view: window,
  //         bubbles: true,
  //         cancelable: true,
  //         buttons: 1,
  //       })
  //     )
  //   )
  // }

  return (
    <div
      className={style.box}
      id='box'
      style={{
        transform: `translate3d(calc(${nextX}px - 50%), calc(${nextY}px - 50%), 0)`,
        transition: "all 0.2s",
      }}
    ></div>
  )
}
