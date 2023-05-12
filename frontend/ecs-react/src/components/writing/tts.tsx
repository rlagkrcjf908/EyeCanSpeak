import style from "../../styles/writing/key.module.css"
import mic from "../../assets/icon/mic.png"
export default function Tts({
  sentence,
  isKorean,
}: {
  sentence: string
  isKorean: boolean
}) {
  const talk = () => {
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(sentence)
    utterThis.lang = isKorean ? "ko-KR" : "en-US"

    synth.speak(utterThis)
  }

  return (
    <button className={style.mic} onClick={talk}>
      <img src={mic} alt='' width={50}></img>
    </button>
  )
}
