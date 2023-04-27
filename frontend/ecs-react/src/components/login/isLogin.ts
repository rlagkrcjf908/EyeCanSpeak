import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const parseJwt = (token: any) => {
  let base64Url = token.split(".")[1]
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join("")
  )

  return JSON.parse(jsonPayload)
}

export const getCookie = () => {
  console.log(cookies.get("accessToken"))
  return !!cookies.get("accessToken")
}

const isLogin = () => !!localStorage.getItem("accessToken")
export default getCookie
