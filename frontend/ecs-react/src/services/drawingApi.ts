import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function saveDrawing(subject_nm: string, draw_drawing: FormData) {
  const response: AxiosResponse = await customAxios.post(`/draw/store`, {
    subject_nm: subject_nm,
    draw_drawing: draw_drawing,
  })
  return response
}
