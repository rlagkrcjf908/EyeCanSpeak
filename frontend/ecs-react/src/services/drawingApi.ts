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

export async function getDrawing(drawNo: number) {
  const response: AxiosResponse = await customAxios.get(`/user/${drawNo}`)
  return response
}
