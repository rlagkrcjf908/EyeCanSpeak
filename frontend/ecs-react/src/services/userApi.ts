import { AxiosResponse } from "axios"
import customAxios from "./api"
export async function signup( // 참고
  email: string,
  password: string,
  nickname: string,
  code: string
) {
  const response: AxiosResponse = await customAxios.post(`/accounts/signup/`, {
    email: email,
    password: password,
    nickname: nickname,
    code: code,
  })
  return response
}
