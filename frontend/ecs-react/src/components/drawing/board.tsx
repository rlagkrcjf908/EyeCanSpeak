import { useEffect, useRef, useState } from "react"
import style from "../../styles/drawing/board.module.css"
import { useRecoilValue } from "recoil"
import Palette from "./palette"
// import { saveDrawing } from "../../services/drawingApi"
import { useParams } from "react-router"
import {
  currerntXState,
  currerntYState,
  isClick,
  nextXState,
  nextYState,
} from "../../recoil/atoms/mouseState"
import axios, { AxiosResponse } from "axios"
import { Cookies } from "react-cookie"

interface CanvasProps {
  width: number
  height: number
}

function Board({ width, height }: CanvasProps) {
  const click = useRecoilValue(isClick)
  const currentX = useRecoilValue(currerntXState)
  const currentY = useRecoilValue(currerntYState)
  const nextX = useRecoilValue(nextXState)
  const nextY = useRecoilValue(nextYState)
  const [color, setColor] = useState("black")
  const [size, setSize] = useState(2)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [offsetTop, setOffsetTop] = useState(0)

  const cookies = new Cookies()

  const [initStart, setInitStart] = useState(true)
  const [start, setStart] = useState(true)

  const changeColor = (color: string) => {
    setColor(color)
  }
  const changeSize = (size: number) => {
    setSize(size)
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const params = useParams()

  const [isPainting, setIsPainting] = useState(false)

  // canvas에 선을 긋는 함수
  const drawLine = (
    currentX: number,
    currentY: number,
    nextX: number,
    nextY: number
  ) => {
    if (!canvasRef.current) {
      return
    }

    const canvas: HTMLCanvasElement = canvasRef.current
    const context = canvas.getContext("2d")
    if (start && context) {
      setStart(false)
    }

    if (initStart && context) {
      context.fillStyle = "#ffffff"
      context?.fillRect(0, 0, canvas.width, canvas.height)
      setInitStart(false)
    }

    if (context) {
      context.strokeStyle = color // 선 색깔
      context.lineJoin = "round" // 선 끄트머리(?)
      context.lineWidth = size // 선 굵기

      context.beginPath()
      context.moveTo(currentX, currentY)
      context.lineTo(nextX, nextY)
      context.closePath()

      context.stroke()
    }
  }

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    setOffsetLeft(canvas.offsetLeft)
    setOffsetTop(canvas.offsetTop)
  }, [])

  useEffect(() => {
    if (click && isPainting) {
      if (start)
        drawLine(
          currentX - offsetLeft + 25,
          currentY - offsetTop + 25,
          currentX - offsetLeft + 25,
          currentY - offsetTop + 25
        )
      else
        drawLine(
          currentX - offsetLeft + 25,
          currentY - offsetTop + 25,
          nextX - offsetLeft + 25,
          nextY - offsetTop + 25
        )
    }
  }, [isPainting, nextX, nextY])

  useEffect(() => {
    if (!canvasRef.current) return

    if (click) {
      setIsPainting(true)
      setStart(true)
    }

    if (!click) {
      setStart(false)
      setIsPainting(false)
    }
  }, [click])

  //------------------------------------------------------
  const saveDraw = async () => {
    const formData = new FormData()
    const canvas: any = document.getElementById("canvas")
    const data = {
      categoryNo: params.subjectNM,
      drawPostTF: false,
    }
    await canvas.toBlob((blob: any) => {
      // canvas 이미지 파일로 변환
      formData.append("drawDrawing", blob)
      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      )
      saveApi(formData)
    })
  }

  const saveApi = async (formData: FormData) => {
    const token = cookies.get("accessToken")
    const response: AxiosResponse = await axios.post(
      "https://k8d204.p.ssafy.io/api/draw/store",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response.status !== 200) console.log("저장 실패ㅠ")
  }
  const postDraw = async () => {}
  return (
    <div className={style.container}>
      <div
        className={style.board}
        style={{
          backgroundColor: "white",
        }}
      >
        <canvas
          ref={canvasRef}
          height={height}
          width={width}
          id='canvas'
        ></canvas>
      </div>
      <div style={{ textAlign: "center" }}>
        <Palette changeColor={changeColor} changeSize={changeSize} />
        <button className={style.btn} onClick={saveDraw}>
          저장
        </button>
        <button className={style.btn} onClick={postDraw}>
          공유
        </button>
      </div>
    </div>
  )
}
Board.defaultProps = {
  width: 1000,
  height: 700,
}

export default Board
