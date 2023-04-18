import { Routes, Route } from "react-router-dom"
import Layout from "../components/main/Layout"
import Board from "../pages/board"
import Drawing from "../pages/drawing"
import Main from "../pages/main"
import MyPage from "../pages/myPage"
import SelectMain from "../pages/selectMain"
import Writing from "../pages/writing"
export default function routesSetup() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route element={<Layout />}>
        <Route path='/selectMain' element={<SelectMain />} />
        <Route path='/writing' element={<Writing />} />
        <Route path='/drawing' element={<Drawing />} />
        <Route path='/board' element={<Board />} />
        <Route path='/myPage' element={<MyPage />} />
      </Route>
    </Routes>
  )
}