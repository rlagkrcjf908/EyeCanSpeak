import { atom } from "recoil"

export const currerntXPosition = atom<number>({
  key: "currerntXPosition",
  default: -1,
})

export const currerntYPosition = atom<number>({
  key: "currerntYPosition",
  default: -1,
})

export const nextXPosition = atom<number>({
  key: "nextXPosition",
  default: -1,
})

export const nextYPosition = atom<number>({
  key: "nextYPosition",
  default: -1,
})

export const isClickState = atom<boolean>({
  key: "isClickState",
  default: false,
})

export const socketXPosition = atom<number>({
  key: "socketXPosition",
  default: -1,
})
export const socketYPosition = atom<number>({
  key: "socketYPosition",
  default: -1,
})
