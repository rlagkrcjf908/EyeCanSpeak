import { Cookies } from "react-cookie"

function IsCookies() {
  const cookies = new Cookies()

  if (cookies.get("accessToken") === undefined) {
    document.location.href = "https://k8d204.p.ssafy.io"
  }
}

function IsSocket() {
  const cookies = new Cookies()
  if (cookies.get("isSocket") === undefined) {
    return false
  }
  return true
}

export { IsCookies, IsSocket }
