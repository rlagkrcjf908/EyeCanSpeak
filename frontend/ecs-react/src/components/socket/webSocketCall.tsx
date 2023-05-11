import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { socketXPosition, socketYPosition } from "../../recoil/atoms/boxState"
import { Socket } from "socket.io-client"

export default function WebSocketCall({ socket }: { socket?: Socket }) {
  const setX = useSetRecoilState(socketXPosition)
  const setY = useSetRecoilState(socketYPosition)

  useEffect(() => {
    socket?.on("image", (data) => {
      console.log(data)
      console.log(data.x)
      console.log(data.y)
      setX(data.x)
      setY(data.y)
      console.log("x , y, dir", data.x, data.y, data.dir)
    })
    return () => {
      socket?.off("image", () => {
        console.log("image event was removed")
      })
    }
  }, [socket])

  return <></>
}
