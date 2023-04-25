import { useCallback, useEffect, useRef, useState } from "react"
import style from "../../styles/drawing/board.module.css"
import { useRecoilState } from "recoil"
import { penColor, penSize } from "../../recoil/atoms/drawingState"
import Palette from "./palette"
import { saveDrawing } from "../../services/drawingApi"
import { useParams } from "react-router"

interface CanvasProps {
  width: number
  height: number
}
interface Coordinate {
  x: number
  y: number
}

function Board({ width, height }: CanvasProps) {
  const [color, setColor] = useState("black")
  const [size, setSize] = useState(2)
  const changeColor = (color: string) => {
    setColor(color)
  }
  const changeSize = (size: number) => {
    setSize(size)
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [start, setStart] = useState(true)
  const params = useParams()

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  )
  const [isPainting, setIsPainting] = useState(false)

  // 좌표 얻는 함수
  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return
    }

    const canvas: HTMLCanvasElement = canvasRef.current
    // console.log(event.pageX + " " + event.pageY)
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    }
  }

  // canvas에 선을 긋는 함수
  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return
    }

    const canvas: HTMLCanvasElement = canvasRef.current
    const context = canvas.getContext("2d")
    console.log(start)
    if (start && context) {
      context.fillStyle = "#ffffff"
      context?.fillRect(0, 0, canvas.width, canvas.height)
      setStart(false)
    }

    if (context) {
      context.strokeStyle = color // 선 색깔
      context.lineJoin = "round" // 선 끄트머리(?)
      context.lineWidth = size // 선 굵기

      context.beginPath()
      context.moveTo(originalMousePosition.x, originalMousePosition.y)
      context.lineTo(newMousePosition.x, newMousePosition.y)
      context.closePath()

      context.stroke()
    }
  }

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event)
    if (coordinates) {
      setIsPainting(true)
      setMousePosition(coordinates)
    }
  }, [])

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault() // drag 방지
      event.stopPropagation() // drag 방지

      if (isPainting) {
        const newMousePosition = getCoordinates(event)
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition)
          setMousePosition(newMousePosition)
        }
      }
    },
    [isPainting, mousePosition]
  )

  const exitPaint = useCallback(() => {
    setIsPainting(false)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas: HTMLCanvasElement = canvasRef.current
    const context = canvas.getContext("2d")

    //-------ai 쪽에서 click이벤트를 받는거에 따라 수정
    // 예를 들어 클릭 시 -> startPaint, paint
    // 다시 클릭 시 -> exitPaint
    // 좌표가 canvas 범위 안에 있는 지도 확인해야할듯
    canvas.addEventListener("mousedown", startPaint) // 클릭하면
    canvas.addEventListener("mousemove", paint) // 클릭한 채로 움직이면
    canvas.addEventListener("mouseup", exitPaint) // 클릭 해제하면
    canvas.addEventListener("mouseleave", exitPaint) // 마우스가 canvas 범위 벗어나면

    return () => {
      // Unmount 시 이벤트 리스터 제거
      canvas.removeEventListener("mousedown", startPaint)
      canvas.removeEventListener("mousemove", paint)
      canvas.removeEventListener("mouseup", exitPaint)
      canvas.removeEventListener("mouseleave", exitPaint)
    }
  }, [startPaint, paint, exitPaint])

  // ----------받은 좌표에 해당하는 요소 이벤트----------
  const mouseClickEvents = ["mousedown", "click", "mouseup"]
  function simulateMouseClick() {
    const element: any = document.elementFromPoint(859, 761)

    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    )
  }
  //------------------------------------------------------
  const saveDraw = async () => {
    const canvas: any = document.getElementById("canvas")
    console.log(canvas)
    const dataURL = canvas.toDataURL("image/jpeg")

    const formData = new FormData()

    formData.append("multipartFiles", dataURL)
    const subject_nm: any = params.subject_nm
    const response = await saveDrawing(subject_nm, formData)
    if (response.status === 400) console.log("저장 실패")
  }
  return (
    <div className={style.container}>
      <div className={style.board}>
        <canvas
          ref={canvasRef}
          height={height}
          width={width}
          id='canvas'
        ></canvas>
      </div>
      <div>
        <Palette changeColor={changeColor} changeSize={changeSize} />{" "}
        <button className={style.saveBtn} onClick={saveDraw}>
          저장
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
