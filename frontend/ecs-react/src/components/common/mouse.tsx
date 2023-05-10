import { useEffect, useState } from "react"
import "../../styles/common/mouse.scss"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  currerntXState,
  currerntYState,
  isClick,
  nextXState,
  nextYState,
} from "../../recoil/atoms/mouseState"

export default function Mouse() {
  const setCurrentX = useSetRecoilState(currerntXState)
  const setCurrentY = useSetRecoilState(currerntYState)
  const [nextX, setNextX] = useRecoilState(nextXState)
  const [nextY, setNextY] = useRecoilState(nextYState)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [dir, setDir] = useState(2)
  const setClick = useSetRecoilState(isClick)

  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight

  let mouse: any

  const onClick = (selected: number) => {
    setDir(selected)
    move(selected)
  }

  const move = (selected: number) => {
    mouse = document.querySelector(".mouse")

    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y

    if (selected === 0) {
      if (y < 0) console.log("화면 안에서 이동해주세요")
      else {
        setTop((current) => current - 20)
        setCurrentX(nextX)
        setCurrentY(nextY)
        setNextY((current) => current - 20)
      }
    } else if (selected === 1) {
      if (y + 20 > window_height) console.log("화면 안에서 이동해주세요")
      else {
        setTop((current) => current + 20)
        setCurrentX(nextX)
        setCurrentY(nextY)
        setNextY((current) => current + 20)
      }
    } else if (selected === 2) {
      if (x < 0) console.log("화면 안에서 이동해주세요")
      else {
        setLeft((current) => current - 20)
        setCurrentX(nextX)
        setCurrentY(nextY)
        setNextX((current) => current - 20)
      }
    } else if (selected === 3) {
      if (x + 20 > window_width) console.log("화면 안에서 이동해주세요")
      else {
        setLeft((current) => current + 20)
        setCurrentX(nextX)
        setCurrentY(nextY)
        setNextX((current) => current + 20)
      }
    }
  }

  const mouseClickEvents = ["mousedown", "click", "mouseup"]

  function clickHandler() {
    mouse = document.querySelector(".mouse")

    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y
    const element: any = document.elementFromPoint(x, y)

    if (element.className.indexOf("palette") === -1)
      setClick((current) => !current)
    const element2: any = document.querySelector(".fancy-button1")
    const element3: any = document.querySelector(".fancy-button2")
    console.log(element)

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

    mouseClickEvents.forEach((mouseEventType) =>
      element2.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    )

    mouseClickEvents.forEach((mouseEventType) =>
      element3.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    )
  }

  useEffect(() => {
    mouse = document.querySelector(".mouse")

    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y

    setCurrentX(x)
    setCurrentY(y)
    setNextX(x)
    setNextY(y)
    mouseEvent()
  }, [])

  // ------------------------------------------------------------------------------
  const mouseEvent = () => {
    const fancyButtons: any = document.querySelector(".fancy-button1")

    fancyButtons.addEventListener("click", () => {
      fancyButtons.addEventListener(
        "animationend",
        () => {
          console.log("click")
          fancyButtons.classList.remove("active")
        },
        { once: true }
      )
      fancyButtons.classList.add("active")
    })

    const fancyButtons2: any = document.querySelector(".fancy-button2")

    fancyButtons2.addEventListener("click", () => {
      fancyButtons2.addEventListener(
        "animationend",
        () => {
          console.log("click")
          fancyButtons2.classList.remove("active")
        },
        { once: true }
      )
      fancyButtons2.classList.add("active")
    })
  }

  return (
    <>
      <div>
        <div
          className='fancy-button1'
          style={{
            transform: `translate(${left}px, ${top}px)`,
            transition: "all 0.2s",
          }}
        >
          <div className='leftFrills frills'></div>
        </div>

        <input
          type='button'
          className='mouse'
          style={{
            transform: `translate(${left}px, ${top}px)`,
            transition: "all 0.2s",
          }}
        ></input>

        <div
          className='fancy-button2'
          style={{
            transform: `translate(${left}px, ${top}px)`,
            transition: "all 0.2s",
          }}
        >
          <div className='rightFrills frills'></div>
        </div>
      </div>

      <div className='controller'>
        <div>
          <button onClick={() => onClick(0)}>top</button>
        </div>
        <div>
          <button onClick={() => onClick(1)}>bottom</button>
        </div>
        <div>
          <button onClick={() => onClick(2)}>left</button>
        </div>
        <div>
          <button onClick={() => onClick(3)}>right</button>
        </div>
        <div>
          <button onClick={clickHandler}>click</button>
        </div>
      </div>
    </>
  )
}
