import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { socketXPosition, socketYPosition } from "../../recoil/atoms/boxState"
import { Socket } from "socket.io-client"

export default function WebSocketCall({ socket }: { socket?: Socket }) {
  const setX = useSetRecoilState(socketXPosition)
  const setY = useSetRecoilState(socketYPosition)
  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight
  useEffect(() => {
    socket?.on("image", (data) => {
      setX(Math.floor(data.x * window_width))
      setY(Math.floor(data.y * window_height))
      console.log("dir", data.dir)
      console.log(
        "X, Y",
        Math.floor(data.x * window_width),
        Math.floor(data.y * window_height)
      )
    })
    return () => {
      socket?.off("image", () => {
        console.log("image event was removed")
      })
    }
  }, [socket])

  return <></>
}
