import axios, { AxiosResponse } from "axios"
import customAxios from "./api"
import { Cookies } from "react-cookie"

// export async function saveDrawing(subjectNM: string, drawDrawing: FormData) {
//   const cookies = new Cookies()
//   const token = cookies.get("accessToken")
//   console.log(drawDrawing.get("drawDrawing"))
//   const response: AxiosResponse = await axios({
//     method: "POST",
//     url: "http://192.168.100.207:8080/api/draw/store",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     },
//     data: {
//       subjectNM: subjectNM,
//       drawDrawing: drawDrawing,
//       drawPostTF: false,
//     },
//   })
//   return response
// }

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
