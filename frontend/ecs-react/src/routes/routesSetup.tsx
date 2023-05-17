import { Routes, Route } from "react-router-dom"
import Layout from "../components/common/Layout"
import Board from "../pages/board"
import Drawing from "../pages/drawing"
import Main from "../pages/main"
import MyPage from "../pages/myPage"
import SelectDraw from "../pages/selectDraw"
import SelectMain from "../pages/selectMain"
import Writing from "../pages/writing"
import EditDraw from "../pages/editDraw"
import NotFound from "../pages/404NotFound"
import Setting from "../pages/setting"
import Connect from "../pages/connect"
import DistSmall from "../components/common/distSmall"
import DistBig from "../components/common/distBig"
import SaveModal from "../components/modal/saveModal"
export default function routesSetup() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/setting' element={<Setting />} />
      <Route path='/connect' element={<Connect />} />
      <Route element={<Layout />}>
        <Route element={<DistBig />}>
          <Route path='/selectMain' element={<SelectMain />} />
          <Route path='/selectDraw' element={<SelectDraw />} />
          <Route path='/board' element={<Board />} />
          <Route path='/myPage' element={<MyPage />} />
        </Route>
        <Route element={<DistSmall />}>
          <Route path='/writing' element={<Writing />} />
          <Route path='/drawing/:categoryNo' element={<Drawing />} />
          <Route path='/editDraw/:draw_no' element={<EditDraw />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
