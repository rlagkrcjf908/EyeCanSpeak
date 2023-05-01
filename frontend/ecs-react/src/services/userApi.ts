import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function getList(subIdx: number, sort: boolean) {
  let like: boolean = false,
    date: boolean = true

  if (!sort) {
    like = true
    date = false
  }
  const response: AxiosResponse = await customAxios.get(
    `/draw/list?category_no=${subIdx}&like=${like}&date=${date}`
  )
  return response
}
export async function deleteDrawing(drawNo: number) {
  const response: AxiosResponse = await customAxios.delete(`/user/draw`, {
    data: { drawNo: drawNo },
  })
  return response
}
