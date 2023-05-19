import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function getList(subIdx: number, sort: boolean) {
  // 마이페이지 그림 리스트 불러오기
  let like: boolean = false,
    date: boolean = true

  if (!sort) {
    like = true
    date = false
  }
  const response: AxiosResponse = await customAxios.get(
    `/user/list?category_no=${subIdx}&like=${like}&date=${date}`
  )
  return response
}
export async function deleteDrawing(drawNo: number) {
  // 마이페이지 그림 삭제
  const response: AxiosResponse = await customAxios.delete(
    `/user/draw/${drawNo}`
  )
  return response
}

export async function getDrawing(drawNo: number) {
  // 그림 수정할 때 그림 가져오기
  const response: AxiosResponse = await customAxios.get(`/user/${drawNo}`)
  return response
}
