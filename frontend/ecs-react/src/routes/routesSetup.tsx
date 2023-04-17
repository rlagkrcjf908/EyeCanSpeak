import React from "react"
import { Routes, Route } from "react-router-dom"
import Main from "../pages/main"
export default function routesSetup() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  )
}
