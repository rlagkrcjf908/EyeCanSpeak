import axios from "axios"
import { Cookies } from "react-cookie"
// import { useSetRecoilState } from "recoil";
// import { tokenAtom } from "../atoms";

const BASE_URL = "https://k8d204.p.ssafy.io/api"
// const BASE_URL = "http://192.168.100.140:8000/api";
// const BASE_URL = "http://192.168.100.166:8000/api";
//
const customAxios = axios.create({
  baseURL: `${BASE_URL}`,
  headers: { "Content-type": "application/json" },
})
const cookies = new Cookies()

customAxios.interceptors.request.use(function (config) {
  let access_token = cookies.get("accessToken")
  // let refresh_token = localStorage.getItem("refresh_token");
  if (!access_token) {
    // if (!access_token) {
    config.headers["Authorization"] = ""
    // config.headers["Refresh-Token"] = null;
    return config
  }
  // refresh_token = JSON.parse(refresh_token);
  config.headers["Authorization"] = `Bearer ${access_token}`
  // config.headers["Refresh-Token"] = `Bearer ${refresh_token}`;
  return config
})

// customAxios.interceptors.response.use(
// 	function (response) {
// 		// console.log("get response", response);
// 		return response;
// 	},
// 	async function (error) {
// 		if (error.response && error.response.status === 401) {
// 			try {
// 				const SetToken = useSetRecoilState(tokenAtom);

// 				localStorage.removeItem("access_token");
// 				localStorage.removeItem("refresh_token");
// 				sessionStorage.removeItem("userEmail");
// 				sessionStorage.removeItem("userNick");
// 				SetToken(null);
// const originalRequest = error.config;
// const response = await customAxios.post("/accounts/token/refresh/");
// if (response) {
// 	const accessToken = response.data.access_token;
// 	console.log("accessToken=", accessToken);
// 	const refreshToken = response.data.refresh_token;
// 	localStorage.removeItem("access_token");
// 	localStorage.removeItem("refresh_token");
// 	localStorage.setItem("access_token", JSON.stringify(accessToken));
// 	localStorage.setItem("refresh_token", JSON.stringify(refreshToken));
// 	originalRequest.headers["Authorization"] = accessToken;
// 	originalRequest.headers["Refresh_Token"] = refreshToken;
// 	return await customAxios.request(originalRequest);
// }
// 			} catch (error) {
// 				localStorage.removeItem("access_token");
// 				localStorage.removeItem("refresh_token");
// 				console.log(error);
// 			}
// 			return Promise.reject(error);
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default customAxios
