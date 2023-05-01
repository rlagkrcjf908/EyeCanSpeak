import { atom } from "recoil"

export const bgImg = atom<string>({
  key: "bgImg",
  default: "",
})

interface drawInfoType {
  draw_no: number
  subject_nm: string | null
}
export const drawInfoState = atom<drawInfoType>({
  key: "drawInfo",
  default: { draw_no: -1, subject_nm: null },
})
