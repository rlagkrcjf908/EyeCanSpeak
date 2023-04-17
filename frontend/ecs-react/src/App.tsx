import React from "react"
import { BrowserRouter } from "react-router-dom"
import RoutesSetup from "./routes/routesSetup"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { RecoilRoot } from "recoil"
import "./App.css"

function App() {
  return (
    <RecoilRoot>
      <HelmetProvider>
        <Helmet>
          <title>PICSTORY</title>
        </Helmet>
      </HelmetProvider>
      <BrowserRouter>
        <RoutesSetup></RoutesSetup>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
