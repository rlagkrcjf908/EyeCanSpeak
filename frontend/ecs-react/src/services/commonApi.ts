import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function getCategory() {
  console.log("??")
  const response: AxiosResponse = await customAxios.get(`/draw/category`)

  return response
}
