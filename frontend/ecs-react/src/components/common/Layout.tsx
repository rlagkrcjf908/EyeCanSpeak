import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import SettingBtn from "./settingBtn"
import Connect from "../../pages/connect"
import Mouse from "./mouse"
import JoyStick from "./joyStick"

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
        <SettingBtn />
        <Connect />
        <Mouse />
        <JoyStick />
      </main>
    </>
  )
}

export default Layout
