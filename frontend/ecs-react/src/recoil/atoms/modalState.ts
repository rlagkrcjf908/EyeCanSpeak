import { atom } from "recoil"

export const saveModal = atom<boolean>({
  key: "saveModal",
  default: false,
})

export const deleteModal = atom<boolean>({
  key: "deleteModal",
  default: false,
})
