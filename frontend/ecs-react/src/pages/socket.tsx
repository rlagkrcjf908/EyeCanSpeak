import style from "../styles/common/socket.module.css"
import WebSocketCall from "../components/socket/webSocketCall"
import { io, Socket } from "socket.io-client"
import { useCallback, useRef, useEffect, useState } from "react"
import Webcam from "react-webcam"
import { useRecoilValue } from "recoil"
import { settingState, userNo } from "../recoil/atoms/userState"
import { Cookies } from "react-cookie"

function SocketTest() {
  const [socketInstance, setSocketInstance] = useState<Socket>()
  const [loading, setLoading] = useState(true)
  const webcamRef = useRef<Webcam>(null)
  const isSetting = useRecoilValue(settingState)
  const userNumber = useRecoilValue(userNo)

  const [start, setStart] = useState(true)

  // 캠 화면
  const videoConstraints = {
    width: 640,
    height: 480,
    // facingMode: { exact: "environment" }
  }
  // 캠 화면 캡쳐하고 보냄
  const capture = useCallback(() => {
    if (!webcamRef.current) return

    console.log("send")
    const imageSrc =
      "https://cdn.pixabay.com/photo/2017/03/05/23/14/girl-2120196_960_720.jpg"
    socketInstance?.emit("imageConversionByClient", {
      image: true,
      buffer: imageSrc,
      userNo: 2,
    })
  }, [webcamRef, socketInstance])

  // 1초 마다 캡쳐화면 보내기
  useEffect(() => {
    if (socketInstance) {
      capture()
    }
  }, [socketInstance])

  // 소켓 연결
  useEffect(() => {
    if (isSetting === true) {
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

      setSocketInstance(socket)

      socket.on("connect", () => {
        console.log("connect")
        console.log(socket.connected)
        if (socket.connected) capture()
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
      <button onClick={capture}>소켓테스트</button>
      {!loading && <WebSocketCall socket={socketInstance} />}
    </>
  )
}

export default SocketTest
