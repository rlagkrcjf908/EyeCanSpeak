import { atom } from "recoil"

export const isLog = atom<boolean>({
  key: "isLog",
  default: false,
})
