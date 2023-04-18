import { atom } from "recoil"

export const penColor = atom<string>({
  key: "penColor",
  default: "black",
})
export const penSize = atom<number>({
  key: "penSize",
  default: 2,
})
