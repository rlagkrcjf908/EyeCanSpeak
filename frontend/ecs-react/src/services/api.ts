import axios from "axios"
import { Cookies } from "react-cookie"
import { parseJwt } from "./jwtDecode"
// import { useSetRecoilState } from "recoil";
// import { tokenAtom } from "../atoms";

const BASE_URL = "https://k8d204.p.ssafy.io/api"
// const BASE_URL = "http://192.168.100.207:8080/api"
// const BASE_URL = "http://192.168.100.166:8000/api";
//
const customAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: { "Content-type": "application/json" },
})
const cookies = new Cookies()
const token = cookies.get("accessToken")
if (token !== undefined) {
  const obj = parseJwt(token)
  sessionStorage.setItem("userNo", obj.no)
  sessionStorage.setItem("userName", obj.name)
}
customAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`

// customAxios.interceptors.request.use(
//   (config) => {
//     const token = cookies.get("accessToken")
//     if (token) {
//       console.log("!")
//       config.headers["Authorization"] = "Bearer " + token
//     }
//     config.headers["Content-Type"] = "application/json"
//     return config
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )

export default customAxios
