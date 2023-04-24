import { HangulImeInputWrapper } from "mole-virtual-keyboard"
import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { textState } from "../../recoil/atoms/writing"
import { saveWord } from "../../services/writingApi"
import style from "../../styles/writing/keyboard.module.css"
import RecommendWord from "./recommendWord"

let inputWrapper: HangulImeInputWrapper | undefined = undefined

export default function Key() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isCapital, setIsCapital] = useState(false)
  const [isKorean, setIsKorean] = useState(true)
  const [text, setText] = useRecoilState(textState)
  useEffect(() => {
    if (!inputRef.current) return
    inputWrapper = new HangulImeInputWrapper(inputRef.current)
  }, [])
  const handleSaveWord = async () => {
    try {
      await saveWord(text)
      setText("")
    } catch (error) {
      console.log(error)
    }
  }
  const deleteInputValue = () => {
    setText("")
  }
  const onChange = () => {
    const newText = inputRef.current?.value
    if (newText) {
      setText(newText)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const key = event.currentTarget.textContent
    if (key) {
      if (key === "BACK") {
        inputWrapper?.backspace()
      } else if (key === "TAB") {
        inputWrapper?.insert("     ")
      } else if (key === "CAPS") {
        setIsCapital((prev) => !prev)
      } else if (key === "SHIFT") {
        setIsCapital((prev) => !prev)
      } else if (key === "space") {
        inputWrapper?.insert(" ")
      } else if (key === "한/영") {
        setIsKorean((prev) => !prev)
      } else {
        inputWrapper?.insert(key)
      }
    }
    onChange()
  }

  return (
    <div className={style.section}>
      <div>
        <input
          ref={inputRef}
          type='text'
          onSelect={() => {
            inputWrapper?.checkChangedSelect()
          }}
          value={text}
          onChange={onChange}
        />
      </div>
      <RecommendWord />
      {isKorean ? (
        // 한글키보드
        <div className={style.keyboard}>
          <ul className={`${style.row} ${style["row-0"]}`}>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "~" : "`"}
            </li>
            <li onClick={handleClick} className={style.pinky} id='1'>
              {isCapital ? "!" : "1"}
            </li>
            <li onClick={handleClick} className={style.ring} id='2'>
              {isCapital ? "@" : "2"}
            </li>
            <li onClick={handleClick} className={style.middle} id='3'>
              {isCapital ? "#" : "3"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='4'>
              {isCapital ? "$" : "4"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='5'>
              {isCapital ? "%" : "5"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='6'>
              {isCapital ? "^" : "6"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='7'>
              {isCapital ? "&" : "7"}
            </li>
            <li onClick={handleClick} className={style.middle} id='8'>
              {isCapital ? "*" : "8"}
            </li>
            <li onClick={handleClick} className={style.ring} id='9'>
              {isCapital ? "(" : "9"}
            </li>
            <li onClick={handleClick} className={style.pinky} id='10'>
              {isCapital ? ")" : "0"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "_" : "-"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "+" : "="}
            </li>
            <li onClick={handleClick} className={style.pinky} id={style.back}>
              BACK
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-1"]}`}>
            <li onClick={handleClick} className={style.pinky} id={style.tab}>
              TAB
            </li>
            <li onClick={handleClick} className={style.pinky} id='Q'>
              {isCapital ? "ㅃ" : "ㅂ"}
            </li>
            <li onClick={handleClick} className={style.ring} id='W'>
              {isCapital ? "ㅉ" : "ㅈ"}
            </li>
            <li onClick={handleClick} className={style.middle} id='E'>
              {isCapital ? "ㄸ" : "ㄷ"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='R'>
              {isCapital ? "ㄲ" : "ㄱ"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='T'>
              {isCapital ? "ㅆ" : "ㅅ"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='Y'>
              ㅛ
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='U'>
              ㅕ
            </li>
            <li onClick={handleClick} className={style.middle} id='I'>
              ㅑ
            </li>
            <li onClick={handleClick} className={style.ring} id='O'>
              {isCapital ? "ㅒ" : "ㅐ"}
            </li>
            <li onClick={handleClick} className={style.pinky} id='P'>
              {isCapital ? "ㅖ" : "ㅔ"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "{" : "["}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "}" : "]"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "|" : "\\"}
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-2"]}`}>
            <li onClick={handleClick} className={style.pinky} id={style.caps}>
              CAPS
            </li>
            <li onClick={handleClick} className={style.pinky} id='A'>
              ㅁ
            </li>
            <li onClick={handleClick} className={style.ring} id='S'>
              ㄴ
            </li>
            <li onClick={handleClick} className={style.middle} id='D'>
              ㅇ
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='F'>
              ㄹ
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='G'>
              ㅎ
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='H'>
              ㅗ
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='J'>
              ㅓ
            </li>
            <li onClick={handleClick} className={style.middle} id='K'>
              ㅏ
            </li>
            <li onClick={handleClick} className={style.ring} id='L'>
              ㅣ
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? ":" : ";"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? '"' : "'"}
            </li>
            <li
              onClick={handleSaveWord}
              className={style.pinky}
              id={style.enter}
            >
              ENTER
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-3"]}`}>
            <li
              onClick={handleClick}
              className={style.pinky}
              id={style.leftshift}
            >
              SHIFT
            </li>
            <li onClick={handleClick} className={style.pinky} id='Z'>
              ㅋ
            </li>
            <li onClick={handleClick} className={style.ring} id='X'>
              ㅌ
            </li>
            <li onClick={handleClick} className={style.middle} id='C'>
              ㅊ
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='V'>
              ㅍ
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='B'>
              ㅠ
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='N'>
              ㅜ
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='M'>
              ㅡ
            </li>
            <li onClick={handleClick} className={style.middle}>
              {isCapital ? "<" : ","}
            </li>
            <li onClick={handleClick} className={style.ring}>
              {isCapital ? ">" : "."}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "?" : "/"}
            </li>
            <li
              onClick={handleClick}
              className={style.pinky}
              id={style.rightshift}
            >
              SHIFT
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-3"]}`}>
            <li onClick={handleClick} id={style.space}>
              space
            </li>
            <li onClick={handleClick} id={style.lang}>
              한/영
            </li>
            <li
              onClick={deleteInputValue}
              className={style.pinky}
              id={style.del}
            >
              지우기
            </li>
          </ul>
        </div>
      ) : (
        // 영어키보드
        <div className={style.keyboard}>
          <ul className={`${style.row} ${style["row-0"]}`}>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "~" : "`"}
            </li>
            <li onClick={handleClick} className={style.pinky} id='1'>
              {isCapital ? "!" : "1"}
            </li>
            <li onClick={handleClick} className={style.ring} id='2'>
              {isCapital ? "@" : "2"}
            </li>
            <li onClick={handleClick} className={style.middle} id='3'>
              {isCapital ? "#" : "3"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='4'>
              {isCapital ? "$" : "4"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='5'>
              {isCapital ? "%" : "5"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='6'>
              {isCapital ? "^" : "6"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='7'>
              {isCapital ? "&" : "7"}
            </li>
            <li onClick={handleClick} className={style.middle} id='8'>
              {isCapital ? "*" : "8"}
            </li>
            <li onClick={handleClick} className={style.ring} id='9'>
              {isCapital ? "(" : "9"}
            </li>
            <li onClick={handleClick} className={style.pinky} id='10'>
              {isCapital ? ")" : "0"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "_" : "-"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "+" : "="}
            </li>
            <li onClick={handleClick} className={style.pinky} id={style.back}>
              BACK
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-1"]}`}>
            <li onClick={handleClick} className={style.pinky} id={style.tab}>
              TAB
            </li>
            <li onClick={handleClick} className={style.pinky} id='Q'>
              {isCapital ? "Q" : "q"}
            </li>
            <li onClick={handleClick} className={style.ring} id='W'>
              {isCapital ? "W" : "w"}
            </li>
            <li onClick={handleClick} className={style.middle} id='E'>
              {isCapital ? "E" : "e"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='R'>
              {isCapital ? "R" : "r"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='T'>
              {isCapital ? "T" : "t"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='Y'>
              {isCapital ? "Y" : "y"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='U'>
              {isCapital ? "U" : "u"}
            </li>
            <li onClick={handleClick} className={style.middle} id='I'>
              {isCapital ? "I" : "i"}
            </li>
            <li onClick={handleClick} className={style.ring} id='O'>
              {isCapital ? "O" : "o"}
            </li>
            <li onClick={handleClick} className={style.pinky} id='P'>
              {isCapital ? "P" : "p"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "{" : "["}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "}" : "]"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "|" : "\\"}
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-2"]}`}>
            <li onClick={handleClick} className={style.pinky} id={style.caps}>
              CAPS
            </li>
            <li onClick={handleClick} className={style.pinky} id='A'>
              {isCapital ? "A" : "a"}
            </li>
            <li onClick={handleClick} className={style.ring} id='S'>
              {isCapital ? "S" : "s"}
            </li>
            <li onClick={handleClick} className={style.middle} id='D'>
              {isCapital ? "D" : "d"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='F'>
              {isCapital ? "F" : "f"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='G'>
              {isCapital ? "G" : "g"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='H'>
              {isCapital ? "H" : "h"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='J'>
              {isCapital ? "J" : "j"}
            </li>
            <li onClick={handleClick} className={style.middle} id='K'>
              {isCapital ? "K" : "k"}
            </li>
            <li onClick={handleClick} className={style.ring} id='L'>
              {isCapital ? "L" : "l"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? ":" : ";"}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? '"' : "'"}
            </li>
            <li
              onClick={handleSaveWord}
              className={style.pinky}
              id={style.enter}
            >
              ENTER
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-3"]}`}>
            <li
              onClick={handleClick}
              className={style.pinky}
              id={style.leftshift}
            >
              SHIFT
            </li>
            <li onClick={handleClick} className={style.pinky} id='Z'>
              {isCapital ? "Z" : "z"}
            </li>
            <li onClick={handleClick} className={style.ring} id='X'>
              {isCapital ? "X" : "x"}
            </li>
            <li onClick={handleClick} className={style.middle} id='C'>
              {isCapital ? "C" : "c"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='V'>
              {isCapital ? "V" : "v"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='B'>
              {isCapital ? "B" : "b"}
            </li>
            <li onClick={handleClick} className={style.pointer2nd} id='N'>
              {isCapital ? "N" : "n"}
            </li>
            <li onClick={handleClick} className={style.pointer1st} id='M'>
              {isCapital ? "M" : "m"}
            </li>
            <li onClick={handleClick} className={style.middle}>
              {isCapital ? "<" : ","}
            </li>
            <li onClick={handleClick} className={style.ring}>
              {isCapital ? ">" : "."}
            </li>
            <li onClick={handleClick} className={style.pinky}>
              {isCapital ? "?" : "/"}
            </li>
            <li
              onClick={handleClick}
              className={style.pinky}
              id={style.rightshift}
            >
              SHIFT
            </li>
          </ul>
          <ul className={`${style.row} ${style["row-3"]}`}>
            <li onClick={handleClick} id={style.space}>
              space
            </li>
            <li onClick={handleClick} id={style.lang}>
              한/영
            </li>
            <li
              onClick={deleteInputValue}
              className={style.pinky}
              id={style.del}
            >
              지우기
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
