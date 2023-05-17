import { atom } from "recoil"

export const currerntXState = atom<number>({
  key: "currerntXState",
  default: 0,
})

export const currerntYState = atom<number>({
  key: "currerntYState",
  default: 0,
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

export const dirState = atom<number>({
  key: "dirState",
  default: -2,
})

export const getDirState = atom<boolean>({
  key: "getDirState",
  default: true,
})

export const distState = atom<number>({
  key: "distState",
  default: 130,
})
