import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { socketXPosition, socketYPosition } from "../../recoil/atoms/boxState"
import { Socket } from "socket.io-client"
import { dirState, getDirState } from "../../recoil/atoms/mouseState"

export default function WebSocketCall({
  socket,
  capture,
}: {
  socket?: Socket
  capture: any
}) {
  const setX = useSetRecoilState(socketXPosition)
  const setY = useSetRecoilState(socketYPosition)
  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight

  const [dir, setDir] = useRecoilState(dirState)
  const [isChange, setIsChange] = useRecoilState(getDirState)

  useEffect(() => {
    socket?.on("image", (data) => {
      setX(Math.floor((1 - data.x) * window_width))
      setY(Math.floor(data.y * window_height))
      console.log("dir", data.dir)
      console.log(
        "X, Y",
        Math.floor(data.x * window_width),
        Math.floor(data.y * window_height)
      )
      setDir(data.dir)
      setIsChange((c) => !c)
      capture()
    })
    return () => {
      socket?.off("image", () => {
        console.log("image event was removed")
      })
    }
  }, [socket])

  return <></>
}
