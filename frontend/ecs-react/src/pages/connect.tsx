import style from "../styles/common/socket.module.css"
import { useRef, useEffect, useState } from "react"
import Webcam from "react-webcam"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { settingState, userNo } from "../recoil/atoms/userState"
import { Cookies } from "react-cookie"
import axios, { AxiosResponse } from "axios"
import { socketXPosition, socketYPosition } from "../recoil/atoms/boxState"
import { dirState, getDirState } from "../recoil/atoms/mouseState"

function Connect() {
  const webcamRef = useRef<Webcam>(null)
  const [isSetting, setIsSetting] = useRecoilState(settingState)
  const userNumber = useRecoilValue(userNo)
  const [start, setStart] = useState(true)

  const setX = useSetRecoilState(socketXPosition)
  const setY = useSetRecoilState(socketYPosition)
  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight

  const setDir = useSetRecoilState(dirState)
  const setIsChange = useSetRecoilState(getDirState)

  // 캠 화면
  const videoConstraints = {
    width: 640,
    height: 480,
    // facingMode: { exact: "environment" }
  }

  // 캠 화면 캡쳐하고 보냄
  const capture = async () => {
    if (!webcamRef.current) return
    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) send(imageSrc)
  }

  const send = async (imageSrc: string) => {
    // base64로 보냄
    const response: AxiosResponse = await axios.post(
      // "https://k8d204.p.ssafy.io/flask/position",
      "http://192.168.100.207:5000/flask/position",
      { image: true, buffer: imageSrc, userNo: userNumber }
    )
    if (response.status === 200) {
      const data = response.data
      setX(Math.floor((1 - data.x) * window_width))
      setY(Math.floor(data.y * window_height))

      setDir(data.dir)
      setIsChange((c) => !c)
      capture()
    }
  }
  useEffect(() => {
    console.log("connect")
    const cookies = new Cookies()
    if (cookies.get("isSetting")) setIsSetting(true)
  }, [])
  useEffect(() => {
    if (start && isSetting) {
      console.log("Start")
      setTimeout(capture, 1000)
      setStart(false)
    }
  }, [start, isSetting])

  return (
    <>
      <Webcam
        muted={false}
        audio={false}
        mirrored={true}
        width={640}
        height={480}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
        className={style.cam}
      />

      {/* {!loading && <WebSocketCall socket={socketInstance} capture={capture} />} */}
    </>
  )
}

export default Connect
