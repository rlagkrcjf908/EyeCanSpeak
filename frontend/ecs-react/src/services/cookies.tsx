import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export default function Cookies() {
  const [cookie] = useCookies(["accessToken"])
  const navigate = useNavigate()
  useEffect(() => {
    console.log("??")
    if (cookie.accessToken === undefined) {
      console.log("timeout!")
      navigate("/")
    }
  }, [cookie.accessToken])
  return <></>
}
