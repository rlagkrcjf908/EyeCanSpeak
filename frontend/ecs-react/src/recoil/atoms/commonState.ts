import { atom } from "recoil"

export const saveModal = atom<boolean>({
  key: "saveModal",
  default: false,
})
