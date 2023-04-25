import { atom } from "recoil"

export const textState = atom({
  key: "textState",
  default: "",
})

export const recommendWord = atom<string[]>({
  key: "recommendWord",
  default: ["This", "is", "test", "word"],
})
