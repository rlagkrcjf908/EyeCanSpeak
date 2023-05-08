import { Cookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export default function IsCookies() {
  const cookies = new Cookies()
  // const navigate = useNavigate()

  if (cookies.get("accessToken") === undefined) {
    console.log(cookies.get("accessToken"))
    console.log(typeof cookies.get("accessToken"))
    console.log("time out !!")
    document.location.href = "https://k8d204.p.ssafy.io"
    // navigate("/")
  }
}
