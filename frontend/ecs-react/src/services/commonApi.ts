import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function getCategory() {
  const response: AxiosResponse = await customAxios.get(`/draw/category`)
  return response
}
