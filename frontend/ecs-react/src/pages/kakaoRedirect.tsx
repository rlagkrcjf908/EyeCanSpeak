export default function KakaoRedirect() {
  let code = new URL(window.location.href).searchParams.get("code")
  console.log(code)
  return <div>!!!!!!!!!!!!!</div>
}
