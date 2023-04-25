import { useLocation, useNavigate } from "react-router-dom"
import { isLog } from "../../recoil/atoms/userState"
import { useRecoilState, useSetRecoilState } from "recoil"
import { useEffect } from "react"

export default function KaKaoLogin() {
  const setIsLog = useSetRecoilState(isLog)
  const location = useLocation()
  useEffect(() => {
    const access_token: string = location.search.split(/[=,&]/)[1]
    const refresh_token: string = location.search.split(/[=,&]/)[3]

    if (access_token !== undefined && refresh_token !== undefined) {
      setIsLog(true)
      localStorage.setItem("access_token", access_token)
      localStorage.setItem("refresh_token", refresh_token)
    }
  }, [])

  return <></>
}
