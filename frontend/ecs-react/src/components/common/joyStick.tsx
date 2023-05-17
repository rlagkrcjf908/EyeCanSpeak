import { useRecoilValue } from "recoil"
import style from "../../styles/common/joyStick.module.css"
import { dirState } from "../../recoil/atoms/mouseState"
import { useEffect, useState } from "react"
interface colorType {
  color: string
}
export default function JoyStick() {
  const dir = useRecoilValue(dirState)
  let [colors, setColors] = useState<colorType[]>([
    { color: "" },
    { color: "" },
    { color: "" },
    { color: "" },
    { color: "" },
    { color: "" },
    { color: "" },
    { color: "" },
    { color: "" },
  ])
  const classNames: string[] = [
    "top1",
    "top2",
    "top3",
    "center1",
    "center2",
    "center3",
    "bottom1",
    "bottom2",
    "bottom3",
  ]

  useEffect(() => {
    // setColors(colors.map((item, index) => ({ ...item, color: "" })))
    setColors(
      colors.map((it, index) =>
        index + 1 === dir ? { ...it, color: "dir" } : { ...it, color: "" }
      )
    )
  }, [dir])

  return (
    <div className={style.joyStick}>
      {colors.map((item, index) => (
        <button
          className={`${style["item"]} ${style[classNames[index]]} ${
            style[item.color]
          }`}
        ></button>
      ))}

      {/* {colors.map((item, index) => (
        <div>{colors.length}</div>
      ))} */}

      {/* <button
        className={`${style["item"]} ${style["top1"]} ${style[colors[0]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["top2"]} ${style[colors[1]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["top3"]} ${style[colors[2]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["center1"]} ${style[colors[3]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["center2"]} ${style[colors[4]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["center3"]} ${style[colors[5]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["bottom1"]} ${style[colors[6]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["bottom2"]} ${style[colors[7]]}`}
      ></button>
      <button
        className={`${style["item"]} ${style["bottom3"]} ${style[colors[8]]}`}
      ></button> */}
    </div>
  )
}
