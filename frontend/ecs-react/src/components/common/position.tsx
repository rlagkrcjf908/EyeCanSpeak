import style from "../../styles/common/position.module.css"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  nextXPosition,
  nextYPosition,
  socketXPosition,
  socketYPosition,
} from "../../recoil/atoms/boxState"
import { useEffect, useState } from "react"

export default function Position() {
  const X = useRecoilValue(socketXPosition)
  const Y = useRecoilValue(socketYPosition)
  const [moveX, setMoveX] = useState(0)
  const [moveY, setMoveY] = useState(0)

  let box: any

  useEffect(() => {
    move(X, Y)
  }, [X, Y])

  // 좌표값에 따라 이동
  const move = (XPosition: number, YPosition: number) => {
    setMoveX(XPosition)
    setMoveY(YPosition)
  }

  return (
    <div
      className={style.box}
      id='box'
      style={{
        transform: `translate3d(calc(${moveX}px - 50%), calc(${moveY}px - 50%), 0)`,
        transition: "all 0.2s",
      }}
    ></div>
  )
}
