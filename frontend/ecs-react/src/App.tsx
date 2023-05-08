import React, { useEffect } from "react"
import { BrowserRouter, useNavigate } from "react-router-dom"
import RoutesSetup from "./routes/routesSetup"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { RecoilRoot } from "recoil"
import "./styles/common/common.css"
import "./App.css"
import Mouse from "./components/common/mouse"
import { Cookies, CookiesProvider, useCookies } from "react-cookie"

function App() {
  const [cookie] = useCookies(["accessToken"])

  useEffect(() => {
    console.log("??")
    // if (cookie.accessToken === undefined) {
    //   console.log("timeout!")
    //   window.location.href = "https://k8d204.p.ssafy.io"
    // }
  }, [cookie.accessToken])

  return (
    <>
      <RecoilRoot>
        <HelmetProvider>
          <Helmet>
            <title>ECS</title>
          </Helmet>
        </HelmetProvider>
        <CookiesProvider>
          <BrowserRouter>
            <RoutesSetup></RoutesSetup>
          </BrowserRouter>
        </CookiesProvider>
        <Mouse></Mouse>
      </RecoilRoot>
    </>
  )
}

export default App
