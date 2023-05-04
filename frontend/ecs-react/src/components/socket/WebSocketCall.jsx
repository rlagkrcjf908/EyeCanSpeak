import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { socketXPosition, socketYPosition } from "../../recoil/atoms/boxState"
export default function WebSocketCall({ socket }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [X, setX] = useRecoilState(socketXPosition)
  const [Y, setY] = useRecoilState(socketYPosition)
  const handleText = (e) => {
    const inputMessage = e.target.value
    setMessage(inputMessage)
  }

  const handleSubmit = () => {
    if (!message) {
      return
    }
    socket.emit("data", message)
    setMessage("")
  }

  useEffect(() => {
    socket.on("data", (data) => {
      console.log(data)
      console.log(data.x)
      console.log(data.y)
      setX(data.x)
      setY(data.y)
      setMessages([...messages, data.data])
    })
    return () => {
      socket.off("data", () => {
        console.log("data event was removed")
      })
    }
  }, [socket, messages])

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <input type='text' value={message} onChange={handleText} />
      <button onClick={handleSubmit}>submit</button>
      <ul>
        {messages.map((message, ind) => {
          return <li key={ind}>{message}</li>
        })}
      </ul>
    </div>
  )
}
