import { atom } from "recoil"

export const textState = atom<string>({
  key: "textState",
  default: "",
})

export const searchWord = atom<string>({
  key: "searchWord",
  default: "",
})

export const recommendWord = atom<string[]>({
  key: "recommendWord",
  default: ["This", "is", "test", "word"],
})
