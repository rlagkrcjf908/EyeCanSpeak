import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
import SettingBtn from "./settingBtn"
import Connect from "../../pages/connect"

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
      </main>
    </>
  )
}

export default Layout
