import button from "../../assets/image/kakao_button.png"
import { KAKAO_AUTH_URL } from "../../config/SocialOAuth"
export default function LoginButton() {
  return (
    <div
      style={{ textAlign: "center", marginTop: "30px" }}
      onClick={() => {
        window.location.href = KAKAO_AUTH_URL
      }}
    >
      <img src={button} alt='' style={{ cursor: "pointer" }}></img>
    </div>
  )
}
