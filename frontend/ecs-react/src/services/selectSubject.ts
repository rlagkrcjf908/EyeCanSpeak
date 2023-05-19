import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function getSubject(category_no: number) {
  const response: AxiosResponse = await customAxios.get(
    `/draw/subject/${category_no}`
  )
  return response
}
