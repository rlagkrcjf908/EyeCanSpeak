import { atom } from "recoil"

export const isLog = atom<boolean>({
  key: "isLog",
  default: false,
})

export const userNo = atom<number>({
  key: "userNo",
  default: 0,
})

export const userName = atom<string>({
  key: "userName",
  default: "",
})
