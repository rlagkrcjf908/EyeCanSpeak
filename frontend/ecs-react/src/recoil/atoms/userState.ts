import { atom } from "recoil"

//로그인 된 사용자
export const userId = atom<number>({
  key: "userId",
  default: 1,
})
