import React from "react"
import { BrowserRouter } from "react-router-dom"
import RoutesSetup from "./routes/routesSetup"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { RecoilRoot } from "recoil"
import "./styles/common/common.css"
import "./App.css"
import Mouse from "./components/common/mouse"
import Position from "./components/common/position"

function App() {
  return (
    <>
      <RecoilRoot>
        <Position></Position>
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
