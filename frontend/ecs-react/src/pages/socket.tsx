import style from "../styles/common/socketTest.module.css"
import HttpCall from "../components/socket/HttpCall"
import WebSocketCall from "../components/socket/WebSocketCall"
import { io, Socket } from "socket.io-client"
import { useCallback, useRef, useEffect, useState } from "react"
import Webcam from "react-webcam"

function SocketTest() {
  const [socketInstance, setSocketInstance] = useState<Socket>()
  const [loading, setLoading] = useState(true)
  const [buttonStatus, setButtonStatus] = useState(true)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)

  // 소켓 연결/해제 버튼
  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true)
    } else {
      setButtonStatus(false)
    }
  }
  // 캠 화면
  const videoConstraints = {
    width: 1024,
    height: 768,
    // facingMode: { exact: "environment" }
  }
  // 연결 테스트
  const onClick = () => {
    console.log("socketInstance::::", socketInstance)
    socketInstance && socketInstance.emit("test", "emit Test")
    setInterval(() => {
      capture()
    }, 1000)
  }
  // 캠 화면 캡쳐하고 보냄
  const capture = useCallback(() => {
    if (!webcamRef.current) return
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
    socketInstance?.emit("imageConversionByClient", {
      image: true,
      buffer: imageSrc,
    })
  }, [webcamRef, setImgSrc, socketInstance])
  // 1초 마다 캡쳐화면 보내기
  useEffect(() => {
    if (socketInstance) {
      setInterval(capture, 1000)
    }
  }, [socketInstance])
  // 소켓 연결

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io("http://192.168.100.88:5000", {
        transports: ["websocket"],
        // cors: {
        //   origin: "http://localhost:3000/",
        // },
      })

      setSocketInstance(socket)

      socket.on("connect", () => {
        console.log("connect")
      })

      setLoading(false)

      socket.on("disconnect", (data:any) => {
        console.log(data)
      })

      return function cleanup() {
        socket.disconnect()
      }
    }
  }, [buttonStatus])

  return (
    <div className={style.App}>
      <h1>React/Flask App + socket.io</h1>
      <div className={style.line}>
        <HttpCall />
      </div>
      <button onClick={onClick}>클릭!</button>
      <>
        <Webcam
          muted={false}
          audio={false}
          mirrored={true}
          height={768}
          width={1024}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </>

      {!buttonStatus ? (
        <button onClick={handleClick}>turn chat on</button>
      ) : (
        <>
          <button onClick={handleClick}>turn chat off</button>
          <div className={style.line}>
            {!loading && <WebSocketCall socket={socketInstance} />}
          </div>
        </>
      )}
    </div>
  )
}

export default SocketTest
