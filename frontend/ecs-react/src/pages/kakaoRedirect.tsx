import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

export default function KakaoRedirect() {
  const navigate = useNavigate()

  const location = useLocation()
  useEffect(() => {
    const access_token: string = location.search.split(/[=,&]/)[1]
    const refresh_token: string = location.search.split(/[=,&]/)[3]

    if (access_token !== undefined && refresh_token !== undefined) {
      localStorage.setItem("access_token", access_token)
      localStorage.setItem("refresh_token", refresh_token)
    }
    navigate("/")
  }, [])

  return <></>
}
