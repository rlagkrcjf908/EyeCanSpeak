import axios, { AxiosResponse } from "axios"

import customAxios from "./api"
import Cookies from "universal-cookie"

export async function getCategory() {
  const cookies = new Cookies()
  const token = cookies.get("accessToken")
  const headers = { Authorization: `Bearer ${token}` }

  const response = axios.get("https://k8d204.p.ssafy.io/api/draw/category", {
    headers,
  })

  console.log(response)

  // const response: AxiosResponse = await customAxios.get(
  //   `https://k8d204.p.ssafy.io/api/draw/category`
  // )
  return response
}
