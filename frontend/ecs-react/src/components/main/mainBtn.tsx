import button from "../../assets/image/kakao_button.png"
export default function MainBtn() {
  return (
    <div
      style={{ textAlign: "center", marginTop: "30px" }}
      onClick={() => {
        window.location.href =
          "https://k8d204.p.ssafy.io/api/oauth2/authorization/kakao"
      }}
    >
      <img src={button} alt='' style={{ cursor: "pointer" }}></img>
      <a href='https://k8d204.p.ssafy.io/api/oauth2/authorization/kakao'>
        adas
      </a>
    </div>
  )
}
