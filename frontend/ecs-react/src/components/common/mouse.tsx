import { useEffect, useState } from "react"
import "../../styles/common/mouse.scss"

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
    mouse = document.querySelector(".mouse")

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
  }
  const mouseClickEvents = ["mousedown", "click", "mouseup"]

  function clickHandler() {
    mouse = document.querySelector(".mouse")
    console.log(mouse)
    const x = mouse.getBoundingClientRect().x
    const y = mouse.getBoundingClientRect().y
    const element: any = document.elementFromPoint(x, y)
    // const element2: any = document.querySelector(".fancy-button")

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

    // mouseClickEvents.forEach((mouseEventType) =>
    //   element2.dispatchEvent(
    //     new MouseEvent(mouseEventType, {
    //       view: window,
    //       bubbles: true,
    //       cancelable: true,
    //       buttons: 1,
    //     })
    //   )
    // )

    // mouse = document.querySelector(`.fancy-button`)
    // mouseClickEvents.forEach((mouseEventType) =>
    //   mouse.dispatchEvent(
    //     new MouseEvent(mouseEventType, {
    //       view: window,
    //       bubbles: true,
    //       cancelable: true,
    //       buttons: 1,
    //     })
    //   )
    // )
  }

  useEffect(() => {
    // mouseEvent()
  }, [])

  // ------------------------------------------------------------------------------
  const mouseEvent = () => {
    const fancyButtons = document.querySelectorAll(".fancy-button")
    console.log(fancyButtons)

    fancyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.addEventListener(
          "animationend",
          () => {
            console.log("click")
            button.classList.remove("active")
          },
          { once: true }
        )
        button.classList.add("active")
      })
    })
  }

  return (
    <>
      {/* <div
        className='fancy-button'
        style={{
          transform: `translate(${left}px, ${top}px)`,
          transition: "all 0.2s",
        }}
      > */}
      {/* <div className='leftFrills frills'></div> */}
      <button
        className='mouse'
        style={{
          transform: `translate(${left}px, ${top}px)`,
          transition: "all 0.2s",
        }}
      ></button>
      {/* <div className='rightFrills frills'></div> */}
      {/* </div> */}
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
