import style from "../../styles/common/position.module.css"
import { useRecoilState } from "recoil"
import {
  currerntXPosition,
  currerntYPosition,
  nextXPosition,
  nextYPosition,
  socketXPosition,
  socketYPosition,
} from "../../recoil/atoms/boxState"
import { isClick } from "../../recoil/atoms/mouseState"
import { useEffect } from "react"

export default function Position() {
  const [X, setX] = useRecoilState(socketXPosition)
  const [Y, setY] = useRecoilState(socketYPosition)
  const [currentXBox, setCurrentXBox] = useRecoilState(currerntXPosition)
  const [currentYBox, setCurrentYBox] = useRecoilState(currerntYPosition)
  const [nextX, setNextX] = useRecoilState(nextXPosition)
  const [nextY, setNextY] = useRecoilState(nextYPosition)
  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight
  console.log("window_width", window_width, "window_height", window_height)
  const [click, setClick] = useRecoilState(isClick)

  let box: any

  //랜덤 좌표값 생성
  const onClick = () => {
    let randomX = Math.floor(Math.random() * Math.floor(window_width))
    let randomY = Math.floor(Math.random() * Math.floor(window_height))
    console.log(randomX, randomY)
    move(randomX, randomY)
  }

  useEffect(() => {
    console.log("!!!", socketXPosition, socketYPosition)
    console.log("???", X, Y)
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
    console.log("mouseover", element.className)
    // console.log("mouseover", nextX, nextY)
    element.dispatchEvent(
      new MouseEvent("mouseover", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    )
  }

  // 마우스리브
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

  // 클릭
  function blinkhandler() {
    box = document.querySelector("#box")
    const x = box.getBoundingClientRect().x
    const y = box.getBoundingClientRect().y
    const element: any = document.elementFromPoint(x, y)

    if (element.className.indexOf("palette") === -1)
      setClick((current) => !current)

    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    )
    console.log("blinking")
  }

  return (
    <>
      <button onClick={onClick}>랜덤좌표</button>
      <button onClick={blinkhandler}> 눈깜빡클릭</button>
      <div
        className={style.box}
        id='box'
        style={{
          transform: `translate(${nextX}px, ${nextY}px)`,
          transition: "all 0.2s",
        }}
      ></div>
    </>
  )
}
