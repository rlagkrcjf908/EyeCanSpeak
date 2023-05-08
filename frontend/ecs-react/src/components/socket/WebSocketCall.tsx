import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { socketXPosition, socketYPosition } from "../../recoil/atoms/boxState"
import { Socket } from "socket.io-client"

export default function WebSocketCall({ socket }: { socket?: Socket }) {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
  const [imgSrc, setImgSrc] = useState(null)
  const [X, setX] = useRecoilState(socketXPosition)
  const [Y, setY] = useRecoilState(socketYPosition)

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputMessage = e.target.value
    setMessage(inputMessage)
  }

  const handleSubmit = () => {
    if (!message) {
      return
    }
    socket?.emit("data", message)
    setMessage("")
  }

  useEffect(() => {
    socket?.on("data", (data) => {
      console.log(data)
      // console.log(data.x)
      // console.log(data.y)
      // setX(data.x)
      // setY(data.y)
      setMessages([...messages, data.data])
    })
    return () => {
      socket?.off("data", () => {
        console.log("data event was removed")
      })
    }
  }, [socket, messages])

  useEffect(() => {
    socket?.on("image", (data) => {
      setImgSrc(data.image.buffer)
      console.log("Received image::::", data.image)
      console.log("x , y, dir", data.x, data.y, data.dir)
    })
    return () => {
      socket?.off("image", () => {
        console.log("image event was removed")
      })
    }
  }, [socket, setImgSrc])

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <input type='text' value={message} onChange={handleText} />
      <button onClick={handleSubmit}>submit</button>
      <ul>
        {messages.map((message, ind) => {
          return <li key={ind}>{message}</li>
        })}

        {imgSrc && <img src={imgSrc} />}
      </ul>
    </div>
  )
}
