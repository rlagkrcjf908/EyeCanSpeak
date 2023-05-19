import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { Socket } from "socket.io-client"
import { dirState, getDirState } from "../../recoil/atoms/mouseState"

export default function WebSocketCall({
  socket,
  capture,
}: {
  socket?: Socket
  capture: any
}) {
  const window_width = window.screen.availWidth
  const window_height = window.screen.availHeight

  const [dir, setDir] = useRecoilState(dirState)
  const [isChange, setIsChange] = useRecoilState(getDirState)

  useEffect(() => {
    socket?.on("image", (data) => {
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
