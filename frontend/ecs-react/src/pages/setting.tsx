import style from "../styles/common/setting.module.css"
import { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam"
import { Cookies } from "react-cookie"
import axios, { AxiosResponse } from "axios"
export default function Setting() {
  const [count, setCount] = useState<number>(5)
  const [circleStyle, setCircleStyle] = useState({ top: "0", left: "0" })
  const webcamRef = useRef<Webcam>(null)
  const [imgSrc, setImgSrc] = useState<string[]>([])
  const cookies = new Cookies()

  // 캠 화면, 나중에 안보이게 수정
  const videoConstraints = {
    width: 420,
    height: 420,
  }

  // 캡쳐화면 imgSrc에 저장
  const capture = () => {
    if (!webcamRef.current) return
    //캡쳐된 이미지
    const imageSrc: string | null = webcamRef.current.getScreenshot()
    if (!imageSrc) return
    setImgSrc((imgSrc) => [...imgSrc, imageSrc])
    // console.log(1)
    // console.log(imageSrc)
  }

  useEffect(() => {
    console.log(imgSrc)
    if (imgSrc.length === 4) sendImage()
  }, [imgSrc])

  // 캡쳐보내기
  const sendImage = async () => {
    console.log("sendImage")
    console.log("----------------------", imgSrc)
    const token = cookies.get("accessToken")
    const formData: FormData = new FormData()
    imgSrc.forEach((element) => {
      formData.append("settingImg", element)
    })
    const response: AxiosResponse = await axios.put(
      // api 주소 적기
      `https://k8d204.p.ssafy.io/api/?????`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response.status === 200) {
      console.log("저장")
    } else {
      console.log("ERROR")
    }
  }

  // 동그라미 위치 (좌상/우상/좌하/우하)
  const circles = [
    { top: "0", left: "0" },
    { top: "0", left: "calc(100% - 100px)" },
    { top: "calc(100% - 100px)", left: "0" },
    { top: "calc(100% - 100px)", left: "calc(100% - 100px)" },
  ]

  const circleCount = circles.length
  /* circles 인덱스번호*6초 후에 각 위치의 동그라미 나타나고 5초부터 0초까지 카운트다운, 카운트가 다 끝나기 전에 화면 캡쳐*/
  const createCircle = async () => {
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
