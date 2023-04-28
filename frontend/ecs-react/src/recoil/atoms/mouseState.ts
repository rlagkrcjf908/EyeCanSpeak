import { atom } from "recoil"

export const currerntXState = atom<number>({
  key: "currerntXState",
  default: -1,
})

export const currerntYState = atom<number>({
  key: "currerntYState",
  default: -1,
})

export const nextXState = atom<number>({
  key: "nextXState",
  default: -1,
})

export const nextYState = atom<number>({
  key: "nextYState",
  default: -1,
})

export const isClick = atom<boolean>({
  key: "isClick",
  default: false,
})
