import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function getList(subIdx: number, like: boolean, date: boolean) {
  const response: AxiosResponse = await customAxios.get(
    `/draw/list?category_no=${subIdx}&like=${like}&date=${date}`
  )
  return response
}

export async function like(draw_no: number) {
  const response: AxiosResponse = await customAxios.post(`/draw/like`, {
    draw_no: draw_no,
  })
  return response
}

export async function unLike(draw_no: number) {
  const response: AxiosResponse = await customAxios.delete(`/draw/like`, {
    data: { draw_no: draw_no },
  })
  return response
}
