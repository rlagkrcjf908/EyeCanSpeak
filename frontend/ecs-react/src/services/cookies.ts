import { Cookies } from "react-cookie"

function IsCookies() {
  const cookies = new Cookies()
  if (cookies.get("accessToken") === undefined) {
    document.location.href = "https://k8d204.p.ssafy.io"
  }
}

function IsSetting() {
  const cookies = new Cookies()
  if (cookies.get("isSetting") === undefined) {
    return false
  }
  return true
}

export { IsCookies, IsSetting }
