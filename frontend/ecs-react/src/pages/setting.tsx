import style from "../styles/common/setting.module.css"
import { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam"

export default function Setting() {
  const [count, setCount] = useState<number>(5)
  const [circleStyle, setCircleStyle] = useState({ top: "0", left: "0" })
  const webcamRef = useRef<Webcam>(null)
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  const videoConstraints = {
    width: 420,
    height: 420,
  }
  const capture = () => {
    if (!webcamRef.current) return
    //캡쳐된 이미지
    // const imageSrc = webcamRef.current.getScreenshot()
    // setImgSrc(imageSrc)
    console.log(1)
    // console.log("Sent Image::::", imageSrc)
  }
  // 동그라미 위치 (좌상/우상/좌하/우하)
  const circles = [
    { top: "0", left: "0" },
    { top: "0", left: "calc(100% - 100px)" },
    { top: "calc(100% - 100px)", left: "0" },
    { top: "calc(100% - 100px)", left: "calc(100% - 100px)" },
  ]

  const circleCount = circles.length
  // circles 인덱스번호*6초 후에 각 위치의 동그라미 나타나고 5초 카운트다운
  const createCircle = () => {
    for (let i = 0; i < circleCount; i++) {
      const circle = circles[i]
      setTimeout(() => {
        setCount(5)

        setTimeout(() => {
          capture()
        }, 4000)

        const countInterval = setInterval(() => {
          setCount((prevCount) => prevCount - 1)
        }, 1000)

        setTimeout(() => {
          clearInterval(countInterval)
        }, 5000)

        setCircleStyle(circle)
      }, i * 6000)
    }
  }

  useEffect(() => {
    createCircle()
  }, [])

  return (
    <div className={style.container}>
      <div className={style.circle} style={circleStyle}>
        {count}
      </div>
      <Webcam
        className={style.cam}
        muted={false}
        audio={false}
        mirrored={true}
        height={400}
        width={400}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  )
}
