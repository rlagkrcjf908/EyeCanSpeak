import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export default function IsCookies() {
  const [cookie] = useCookies(["accessToken"])
  // const navigate = useNavigate()

  if (cookie.accessToken === undefined) {
    console.log("time out !!")
    // navigate("/")
  }
}
