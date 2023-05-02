import { AxiosResponse } from "axios"
import customAxios from "./api"
const user_no: number = 1

// 서버단어검색하기
export async function getHistory(payload: string) {
  const response: AxiosResponse = await customAxios.post(
    `/write/history?userNo=${user_no}`,
    {
      writeContent: payload,
    }
  )
  return response
}
// 로컬단어검색하기
export async function saveWord(payload: string) {
  const response: AxiosResponse = await customAxios.post(
    `/write?userNo=${user_no}`,
    {
      writeContent: payload,
    }
  )
  return response
}
