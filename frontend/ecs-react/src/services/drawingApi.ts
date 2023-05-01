import { AxiosResponse } from "axios"
import customAxios from "./api"

export async function saveDrawing(subject_nm: string, draw_drawing: FormData) {
  const response: AxiosResponse = await customAxios.post(`/draw/store`, {
    subject_nm: subject_nm,
    draw_drawing: draw_drawing,
  })
  return response
}

export async function postDrawing(
  draw_no: number,
  subject_nm: string,
  draw_drawing: FormData,
  draw_post_tf: boolean
) {
  const response: AxiosResponse = await customAxios.put(
    `/draw/store/${draw_no}`,
    {
      subjectNM: subject_nm,
      draw_drawing: draw_drawing,
      draw_post_tf: draw_post_tf,
    }
  )
  return response
}
