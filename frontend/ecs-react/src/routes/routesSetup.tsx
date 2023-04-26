import { Routes, Route } from "react-router-dom"
import Layout from "../components/common/Layout"
import Board from "../pages/board"
import Drawing from "../pages/drawing"
import Main from "../pages/main"
import MyPage from "../pages/myPage"
import SelectDraw from "../pages/selectDraw"
import SelectMain from "../pages/selectMain"
import Writing from "../pages/writing"
import KakaoRedirect from "../pages/kakaoRedirect"
import EditDraw from "../pages/editDraw"
import NotFound from "../pages/404NotFound"
export default function routesSetup() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route element={<Layout />}>
        <Route path='/selectMain' element={<SelectMain />} />
        <Route path='/writing' element={<Writing />} />
        <Route path='/selectDraw' element={<SelectDraw />} />-
        <Route path='/drawing' element={<Drawing />} />
        <Route path='/drawing/:subject_nm' element={<Drawing />} />
        <Route path='/board' element={<Board />} />
        <Route path='/myPage' element={<MyPage />} />
        <Route path='/editDraw/:draw_no' element={<EditDraw />} />
      </Route>
      <Route path='/kakao/redirect' element={<KakaoRedirect />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
