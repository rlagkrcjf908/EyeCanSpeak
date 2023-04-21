import { atom } from "recoil"

export const subjectState = atom<string>({
  key: "subjectState",
  default: "",
})

export interface categoryTypes {
  categoryNo: number
  categoryNM: string
}
export interface subjectTypes {
  subjectNo: number
  subjectNM: string
}

export const categoryList = atom<categoryTypes[]>({
  key: "categoryList",
  default: [],
})

export const subjectList = atom<subjectTypes[]>({
  key: "subjectList",
  default: [],
})
