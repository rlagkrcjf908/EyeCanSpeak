import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function postDrawing(
  drawNo: number,
  subjectNM: string,
  drawDrawing: FormData,
  drawPostTf: boolean
) {
  const response: AxiosResponse = await customAxios.put(
    `/draw/store/${drawNo}`,
    {
      subjectNM: subjectNM,
      drawDrawing: drawDrawing,
      drawPostTf: drawPostTf,
    }
  )
  return response
}
export async function editDrawing(drawNo: number) {
  // 그림 수정 완료
  const response: AxiosResponse = await customAxios.put(`/draw/store/${drawNo}`)
  return response
}
