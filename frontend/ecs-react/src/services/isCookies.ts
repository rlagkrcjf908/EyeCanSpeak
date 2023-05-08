import { Cookies } from "react-cookie"

export default function IsCookies() {
  const cookies = new Cookies()
  // const navigate = useNavigate()

  if (cookies.get("accessToken") === undefined) {
    console.log("time out !!")
    // navigate("/")
  }
}
