import style from "../styles/common/socket.module.css"
import WebSocketCall from "../components/socket/webSocketCall"
import { io, Socket } from "socket.io-client"
import { useRef, useEffect, useState } from "react"
import Webcam from "react-webcam"
import { useRecoilState, useRecoilValue } from "recoil"
import { settingState, userNo } from "../recoil/atoms/userState"
import { Cookies } from "react-cookie"
import { base64toFile } from "../services/baseToFile"
import axios, { AxiosResponse } from "axios"
import image from "../assets/image/eye3.png"
import { file } from "@babel/types"
import { async } from "q"

function SocketTest() {
  const [socketInstance, setSocketInstance] = useState<Socket>()
  const [loading, setLoading] = useState(true)
  const webcamRef = useRef<Webcam>(null)
  const [isSetting, setIsSetting] = useRecoilState(settingState)
  const userNumber = useRecoilValue(userNo)
  const [start, setStart] = useState(true)

  // 캠 화면
  const videoConstraints = {
    width: 640,
    height: 480,
    // facingMode: { exact: "environment" }
  }

  // 캠 화면 캡쳐하고 보냄
  const capture = async () => {
    console.log("send")
    if (!webcamRef.current) return
    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) send(imageSrc)
  }

  // const send = async (imageSrc: string) => {
  //   // base64로 보냄

  //   const response: AxiosResponse = await axios.post(
  //     "http://192.168.100.207:5000/flask/position",
  //     { image: true, buffer: imageSrc, userNo: -1 }
  //   )
  //   if (response.status === 200) {
  //     console.log(response.data)
  //     capture()
  //   }
  // }

  const send = async (imageSrc: string) => {
    // formdata로 보냄

    var file = base64toFile(imageSrc, "image_file.png")

    const formdata = new FormData()
    formdata.append("image", file)
    formdata.append("buffer", file)

    const response: AxiosResponse = await axios.post(
      "http://192.168.100.207:5000/flask/position",
      { formdata: formdata },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  }

  useEffect(() => {
    if (start) {
      setTimeout(capture, 1000)
      setStart(false)
    }
  }, [start])

  useEffect(() => {
    const cookies = new Cookies()
    if (cookies.get("isSocket")) setIsSetting(true)
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
