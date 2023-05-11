import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { socketXPosition, socketYPosition } from "../../recoil/atoms/boxState"
import { Socket } from "socket.io-client"

export default function WebSocketCall({ socket }: { socket?: Socket }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [X, setX] = useRecoilState(socketXPosition)
  const [Y, setY] = useRecoilState(socketYPosition)

  useEffect(() => {
    socket?.on("image", (data) => {
      setImgSrc(data.image.buffer)
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
  }, [socket, setImgSrc])

  return <></>
}
