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
          key={index}
        ></button>
      ))}
    </div>
  )
}
