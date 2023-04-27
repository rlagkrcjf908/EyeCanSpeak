import { AxiosResponse } from "axios"
import customAxios from "./api"
const user_no: number = 1

export async function getWords(payload: string) {
  const response: AxiosResponse = await customAxios.post(
    `/write/history?user_no=${user_no}/`,
    {
      write_content: payload,
    }
  )
  return response
}

export async function saveWord(payload: string) {
  const response: AxiosResponse = await customAxios.post(
    `/write?user_no=${user_no}/`,
    {
      write_content: payload,
    }
  )
  return response
}

// export async function getWords(payload: string) {
//   console.log("단어요청중")
//   console.log(payload)
//   const response: AxiosResponse = await axios.post(
//     `http://192.168.100.191:8080/api/write/history?user_no=${user_no}`,
//     {
//       write_content: payload,
//     }
//   )
//   return response
// }

// export async function saveWord(payload: string) {
//   const response: AxiosResponse = await axios.post(
//     `http://192.168.100.191:8080/api/write?user_no=${user_no}`,
//     {
//       write_content: payload,
//     }
//   )
//   return response
// }
