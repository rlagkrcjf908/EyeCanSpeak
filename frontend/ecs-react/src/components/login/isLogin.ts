import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const getCookie = () => {
  console.log(cookies.get("accessToken"))
  return cookies.get("accessToken")
}

const isLogin = () => !!localStorage.getItem("accessToken")
export default getCookie
