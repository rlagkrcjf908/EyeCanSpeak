import axios, { AxiosResponse } from "axios"
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

export async function getList(subIdx: number, sort: boolean) {
  let like: boolean = false,
    date: boolean = true

  if (!sort) {
    like = true
    date = false
  }
  const response: AxiosResponse = await customAxios.get(
    `http://192.168.100.191:8080/api/draw/list?category_no=${subIdx}&like=${like}&date=${date}`
  )
  return response
}
export async function deleteDrawing(draw_no: number) {
  const response: AxiosResponse = await customAxios.delete(
    `http://192.168.100.191:8080/api/user/draw`,
    {
      data: { draw_no: draw_no },
    }
  )
  return response
}
