import { AxiosResponse } from "axios"
import customAxios from "./api"

// 서버단어검색하기
export async function getHistory(payload: string) {
  const response: AxiosResponse = await customAxios.post(`/write/history`, {
    writeContent: payload,
  })
  return response
}
// 로컬단어검색하기
export async function saveWord(payload: string) {
  const response: AxiosResponse = await customAxios.post(`/write`, {
    writeContent: payload,
  })
  return response
}
