import React, { useEffect } from "react"
import { BrowserRouter, useNavigate } from "react-router-dom"
import RoutesSetup from "./routes/routesSetup"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { RecoilRoot } from "recoil"
import "./styles/common/common.css"
import "./App.css"
import Mouse from "./components/common/mouse"
import { CookiesProvider } from "react-cookie"
import Cookies from "./services/cookies"

function App() {
  return (
    <>
      <RecoilRoot>
        <HelmetProvider>
          <Helmet>
            <title>ECS</title>
          </Helmet>
        </HelmetProvider>
        <CookiesProvider>
          <Cookies></Cookies>
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
