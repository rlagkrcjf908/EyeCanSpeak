import React, { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import RoutesSetup from "./routes/routesSetup"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { RecoilRoot } from "recoil"
import "./styles/common/common.css"
import "./App.css"
import Mouse from "./components/common/mouse"
import { useCookies } from "react-cookie"

function App() {
  const [cookie, setCookie] = useCookies(["accessToken"])
  useEffect(() => {}, [cookie])
  useEffect(() => {
    console.log(typeof cookie)
  }, [])
  return (
    <>
      <RecoilRoot>
        <HelmetProvider>
          <Helmet>
            <title>ECS</title>
          </Helmet>
        </HelmetProvider>
        <BrowserRouter>
          <RoutesSetup></RoutesSetup>
        </BrowserRouter>
        <Mouse></Mouse>
      </RecoilRoot>
    </>
  )
}

export default App
