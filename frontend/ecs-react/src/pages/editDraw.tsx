import { useState } from "react"
import Board from "../components/drawing/board"

export default function EditDraw() {
  return (
    <>
      <Board isEdit={true}></Board>
    </>
  )
}
