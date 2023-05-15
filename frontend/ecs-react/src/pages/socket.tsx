import style from "../styles/common/socket.module.css"
import WebSocketCall from "../components/socket/webSocketCall"
import { io, Socket } from "socket.io-client"
import { useRef, useEffect, useState } from "react"
import Webcam from "react-webcam"
import { useRecoilState, useRecoilValue } from "recoil"
import { settingState, userNo } from "../recoil/atoms/userState"
import { Cookies } from "react-cookie"

function SocketTest() {
  const [socketInstance, setSocketInstance] = useState<Socket>()
  const [loading, setLoading] = useState(true)
  const webcamRef = useRef<Webcam>(null)
  const isSetting = useRecoilValue(settingState)
  const userNumber = useRecoilValue(userNo)
  const [start, setStart] = useState(false)

  const [isSet, setIsSet] = useRecoilState(settingState)

  // 캠 화면
  const videoConstraints = {
    width: 640,
    height: 480,
    // facingMode: { exact: "environment" }
  }
  // 캠 화면 캡쳐하고 보냄
  const capture = () => {
    if (!webcamRef.current) return
    const imageSrc = webcamRef.current.getScreenshot()

    if (imageSrc == null) return
    console.log("send")
    socketInstance?.emit("imageConversionByClient", {
      image: true,
      buffer: imageSrc,
      userNo: userNumber,
    })
  }

  // 소켓 연결
  useEffect(() => {
    if (isSetting) {
      // const socket = io("https://k8d204.p.ssafy.io", {
      const socket = io("http://192.168.100.207:5000", {
        path: "/socket.io",
        // transports: ["websocket"],
        // cors: {
        //   origin: "http://localhost:3000/",
        // },
      })

      const cookies = new Cookies()
      cookies.set("isSocket", true)
      console.log(cookies.get("isSocket"))

      setSocketInstance(socket)

      socket.on("connect", () => {
        console.log("connect")
        if (socket.connected) {
          setStart(true)
        }
      })

      setLoading(false)

      socket.on("disconnect", (data: any) => {
        console.log(data)
      })

      return function cleanup() {
        socket.disconnect()
      }
    }
  }, [isSetting])

  useEffect(() => {
    if (start) {
      setTimeout(capture, 3000)
      capture()
    }
  }, [start])

  useEffect(() => {
    const cookies = new Cookies()
    if (cookies.get("isSocket")) setIsSet(true)
  }, [])

  const click = () => {
    var element = document.querySelector("clickCapture")
    element?.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    )
  }

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

      {!loading && <WebSocketCall socket={socketInstance} capture={capture} />}
    </>
  )
}

export default SocketTest
