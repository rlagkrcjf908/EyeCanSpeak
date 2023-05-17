import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import SettingBtn from "./settingBtn"
import Connect from "../../pages/connect"
import Mouse from "./mouse"
import Position from "./position"
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
        <Mouse /> <Position />
        <JoyStick />
      </main>
    </>
  )
}

export default Layout
