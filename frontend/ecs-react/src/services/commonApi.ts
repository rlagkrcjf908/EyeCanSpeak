import customAxios from "./api"
import Cookies from "universal-cookie"

export async function getCategory() {
  const cookies = new Cookies()
  const token = cookies.get("accessToken")
  const headers = { Authorization: `Bearer ${token}` }

  const response = customAxios.get("/draw/category", {
    headers,
  })

  return response
}
