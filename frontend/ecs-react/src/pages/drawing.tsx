import { useEffect } from "react"
import usePreventLeave from "../hooks/usePreventLeave"
import Board from "../components/drawing/board"

export default function Drawing() {
  const { enablePrevent } = usePreventLeave()

  useEffect(() => {
    enablePrevent()
  }, [])

  function listener(e: any) {
    e.preventDefault()
    e.returnValue = ""
  }

  window.addEventListener("beforeunload", listener)
  return (
    <>
      <Board isEdit={false} />
    </>
  )
}
