import { atom } from "recoil"

export const settingState = atom<boolean>({
  key: "settingState",
  default: false,
})
