import { AxiosResponse } from "axios"
import axios from "axios"

// import customAxios from "./api"

export async function getCategory() {
  const response: AxiosResponse = await axios.get(
    `http://192.168.100.191:8080/api/draw/category`
  )
  console.log(response)

  return response
}
