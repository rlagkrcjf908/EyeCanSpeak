import { AxiosResponse } from "axios"
// import customAxios from "./api"
import axios from "axios"

export async function getSubject(category_no: number) {
  const response: AxiosResponse = await axios.get(
    `http://192.168.100.191:8080/api/draw/subject/${category_no}`
  )
  return response
}
// export async function getSubject(category_no: number) {
//   const response: AxiosResponse = await customAxios.get(
//     `/draw/subject/${category_no}`
//   )
//   return response
// }
