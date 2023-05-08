import { Cookies } from "react-cookie"

export default function IsCookies() {
  const cookies = new Cookies()

  if (cookies.get("accessToken") === undefined) {
    document.location.href = "https://k8d204.p.ssafy.io"
  }
}
