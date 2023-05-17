import { useEffect, useState } from "react"
import "../../styles/common/mouse.scss"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  currerntXState,
  currerntYState,
  dirState,
  getDirState,
  isClick,
  nextXState,
  nextYState,
} from "../../recoil/atoms/mouseState"

export default function Mouse() {
  const [currentX, setCurrentX] = useRecoilState(currerntXState)
  const [currentY, setCurrentY] = useRecoilState(currerntYState)
  const [nextX, setNextX] = useRecoilState(nextXState)
  const [nextY, setNextY] = useRecoilState(nextYState)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const dir = useRecoilValue(dirState)
  const dirIsChange = useRecoilValue(getDirState)
  const setClick = useSetRecoilState(isClick)
  const [dir1, setDir1] = useState<number>(0)
  const [dir2, setDir2] = useState<number>(0)
  const [dir3, setDir3] = useState<number>(0)

  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight

  const dist = 20

  let mouse: any

  const onClick = (selected: number) => {
    // setDir(selected)
    move(selected)
  }

  const move = (dir: number) => {
    mouse = document.querySelector(".mouse")

    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y

    if (dir === 1) {
      // 왼쪽 위
      if (x < 0 || y < 0) console.log("화면 안에서 이동해주세요")
      else {
        setTop((current) => current - dist) // 위로 이동
        setLeft((current) => current - dist) // 왼쪽으로 이동
        setCurrentX(nextX)
        setCurrentY(nextY)
        setNextY((current) => current - dist)
        setNextX((current) => current - dist)
      }
    } else if (dir === 2) {
      // 중간 위
      setTop((current) => current - dist)
      setCurrentX(nextX)
      setCurrentY(nextY)
      setNextY((current) => current - dist)
    } else if (dir === 3) {
      // 오른쪽 위
      setTop((current) => current - dist)
      setLeft((current) => current + dist)
      setCurrentX(nextX)
      setCurrentY(nextY)
      setNextY((current) => current - dist)
      setNextX((current) => current + dist)
    } else if (dir === 4) {
      // 중간 왼쪽
      setLeft((current) => current - dist)
      setCurrentX(nextX)
      setCurrentY(nextY)
      setNextX((current) => current - dist)
    } else if (dir === 5) {
      // 중간 클릭...?
      // setLeft((current) => current + 20)
      // setCurrentX(nextX)
      // setCurrentY(nextY)
      // setNextX((current) => current + 20)
    } else if (dir === 6) {
      // 중간 오른쪽
      setLeft((current) => current + dist)
      setCurrentX(nextX)
      setCurrentY(nextY)
      setNextX((current) => current + dist)
    } else if (dir === 7) {
      // 아래 왼쪽
      setTop((current) => current + dist)
      setLeft((current) => current - dist)
      setCurrentX(nextX)
      setCurrentY(nextY)
      setNextY((current) => current + dist)
      setNextX((current) => current - dist)
    } else if (dir === 8) {
      // 아래 중간
      setTop((current) => current + dist)
      setCurrentX(nextX)
      setCurrentY(nextY)
      setNextY((current) => current + dist)
    } else if (dir === 9) {
      //아래 오른쪽
      setTop((current) => current + dist)
      setLeft((current) => current + dist)
      setCurrentX(nextX)
      setCurrentY(nextY)
      setNextY((current) => current + dist)
      setNextX((current) => current + dist)
    }

    // if (
    //   x < window_width ||
    //   x >= window_width ||
    //   y < window_height ||
    //   y >= window_height
    // )
    // alert("화면 벗어남")
  }

  useEffect(() => {
    setDir1(() => dir2)
    setDir2(() => dir3)
    setDir3(() => dir)
    if (dir1 === 5 && dir2 === 5 && dir3 === 5) clickHandler()
    move(dir)
  }, [dir, dirIsChange])

  const mouseClickEvents = ["mousedown", "click", "mouseup"]

  // 클릭
  function clickHandler() {
    mouse = document.querySelector(".mouse")

    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y
    const element: any = document.elementFromPoint(x, y)
    console.log(element)

    if (element.className.indexOf("palette") === -1)
      setClick((current) => !current)
    const element2: any = document.querySelector(".fancy-button1")
    const element3: any = document.querySelector(".fancy-button2")

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
          <button onClick={() => onClick(2)}>top</button>
        </div>
        <div>
          <button onClick={() => onClick(8)}>bottom</button>
        </div>
        <div>
          <button onClick={() => onClick(4)}>left</button>
        </div>
        <div>
          <button onClick={() => onClick(6)}>right</button>
        </div>
        <div>
          <button onClick={clickHandler}>click</button>
        </div>
      </div>
    </>
  )
}
