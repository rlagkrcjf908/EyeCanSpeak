import { useEffect, useState } from "react"
import style from "../../styles/common/mouse.module.css"

export default function Mouse() {
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [dir, setDir] = useState(2)

  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight

  let mouse: any

  const onClick = (selected: number) => {
    setDir(selected)
    move(selected)
  }

  const move = (selected: number) => {
    mouse = document.querySelector(`.${style["mouse"]}`)

    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y

    if (selected === 0) {
      if (y - 150 < -150) console.log("화면 안에서 이동해주세요")
      else setTop((current) => current - 50)
    } else if (selected === 1) {
      if (y + 150 > window_height + 100) console.log("화면 안에서 이동해주세요")
      else setTop((current) => current + 50)
    } else if (selected === 2) {
      if (x - 150 < -150) console.log("화면 안에서 이동해주세요")
      else setLeft((current) => current - 50)
    } else if (selected === 3) {
      if (x + 150 > window_width + 100) console.log("화면 안에서 이동해주세요")
      else setLeft((current) => current + 50)
    }

    console.log(x + " " + y)
  }
  const mouseClickEvents = ["mousedown", "click", "mouseup"]

  function clickHandler() {
    mouse = document.querySelector(`.${style["mouse"]}`)
    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y
    const element: any = document.elementFromPoint(x, y)
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
  }

  useEffect(() => {
    console.log(window.screen.availWidth + " " + window.screen.availHeight)
  }, [])
  return (
    <>
      <button
        className={style.mouse}
        style={{
          transform: `translate(${left}px, ${top}px)`,
          transition: "all 0.2s",
        }}
      ></button>
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
    </>
  )
}
