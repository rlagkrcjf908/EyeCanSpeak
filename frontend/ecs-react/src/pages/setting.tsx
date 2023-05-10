import style from "../styles/common/setting.module.css"
import { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam"
import { Cookies } from "react-cookie"
import axios, { AxiosResponse } from "axios"
import { useRecoilValue } from "recoil"
import { userNo } from "../recoil/atoms/userState"
export default function Setting() {
  const [count, setCount] = useState<number>(5)
  const webcamRef = useRef<Webcam>(null)
  const [TestimgSrc, setTestImgSrc] = useState<string>("")
  const [currentCircle, setCurrentCircle] = useState(0)
  const cookies = new Cookies()
  const userNumber = useRecoilValue(userNo)

  // 동그라미 위치 (좌상/우상/좌하/우하)
  const circles = [
    { top: "0", left: "0" },
    { top: "0", left: "calc(100% - 100px)" },
    { top: "calc(100% - 100px)", left: "0" },
    { top: "calc(100% - 100px)", left: "calc(100% - 100px)" },
  ]
  // 캠 화면, 나중에 안보이게 수정
  const videoConstraints = {
    width: 420,
    height: 420,
  }

  // 캡쳐화면 imgSrc에 저장
  const capture = async () => {
    if (!webcamRef.current) return
    //캡쳐된 이미지
    const imageSrc: string | null = webcamRef.current.getScreenshot()
    if (!imageSrc) return
    console.log("sendimage")
    const token = cookies.get("accessToken")
    // const formData: FormData = new FormData()
    // imgSrc.forEach((element) => {
    //   formData.append("settingImg", element)
    // })
    const response: AxiosResponse = await axios.post(
      // api 주소 적기
      // `https://k8d204.p.ssafy.io/api/?????`,
      `http://192.168.100.88:5000/setting`,
      // { imgSrc }
      { userNo: userNumber, imgSrc: imageSrc, index: currentCircle + 1 }
      // formData,
      // {
      //   headers: {
      // "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    )

    if (response.data === 200) {
      setCurrentCircle((c) => c + 1)
    }
    if (response.data === 400) {
      console.log("error")
    }
  }

  // 캡쳐보내기
  const sendImage = async () => {}

  /* circles 인덱스번호*6초 후에 각 위치의 동그라미 나타나고 5초부터 0초까지 카운트다운, 카운트가 다 끝나기 전에 화면 캡쳐*/
  useEffect(() => {
    if (count === -1) return
    const id = setInterval(() => {
      setCount((c) => c - 1)
    }, 1000)

    if (count === 0) {
      setCount(5)
      clearInterval(id)
      capture()
      sendImage()
    }
    if (currentCircle === 4) {
      clearInterval(id)
      return
    }
    return () => clearInterval(id)
  }, [count, currentCircle])

  useEffect(() => {
    if (currentCircle === 4) {
      setCount(-1)
    }
  }, [currentCircle])

  return (
    <div className={style.container}>
      <div className={style.circle} style={circles[currentCircle]}>
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
      <div className={style.text}>빨간 원을 쳐다봐주세요</div>
    </div>
  )
}
