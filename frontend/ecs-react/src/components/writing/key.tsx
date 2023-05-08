import { HangulImeInputWrapper } from "mole-virtual-keyboard"
import { useCallback, useEffect, useRef, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  recommendWord,
  searchWord,
  textState,
} from "../../recoil/atoms/writingState"
import { getHistory, saveWord } from "../../services/writingApi"
import style from "../../styles/writing/keyboard.module.css"
import RecommendWord from "./recommendWord"

let inputWrapper: HangulImeInputWrapper | undefined = undefined

export default function Key() {
  // 추천단어 리스트
  const setWords = useSetRecoilState(recommendWord)
  // 추천 단어 검색에 사용할 단어
  const [word, setWord] = useRecoilState(searchWord)
  // input 요소
  const inputRef = useRef<HTMLInputElement>(null)
  // 대소문자
  const [isCapital, setIsCapital] = useState(false)
  // 한글키보드/영어키보드
  const [isKorean, setIsKorean] = useState(true)
  const [text, setText] = useRecoilState(textState)

  useEffect(() => {
    if (!inputRef.current) return
    inputWrapper = new HangulImeInputWrapper(inputRef.current)
  }, [])

  // 추천단어 받아오기
  const loadWords = useCallback(async () => {
    try {
      const response = await getHistory(word)
      const item = response.data.writeContents
      setWords(item)
    } catch (error: any) {
      console.log(error)
    }
  }, [setWords, word])

  // 글 저장
  const handleSaveWord = async () => {
    try {
      await saveWord(text)
      setText("")
    } catch (error) {
      console.log(error)
    }
  }

  // 글 모두 지우기
  const deleteInputValue = () => {
    if (!inputRef.current) return
    inputWrapper?.backspace()
    inputRef.current.value = ""
    setText("")
  }

  // input 박스에 쓴 내용 반영
  const onChange = () => {
    const newText = inputRef.current?.value
    if (newText) {
      setText(newText)
    }
  }

  useEffect(() => {
    if (!text) return
    const textList = text.split(" ")
    const lastText = textList[textList.length - 1]
    setWord(lastText)
    inputRef.current?.focus()
  }, [text, setWord])

  useEffect(() => {
    if (!text) return
    loadWords()
  }, [word, text, loadWords])
  // 누른 키에 따라 다른 함수 실행
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
  // Enter,Backspace 키보드로 입력
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveWord()
    }
    if (e.key === "Backspace") {
      e.preventDefault()
      inputWrapper?.backspace()
    }
  }

  // 키보드 키(li)에 마우스 오버 됐을 때
  const handleMouseOver = (e: any) => {
    const activeKey = e.target

    if (activeKey.tagName === "DIV" || activeKey.tagName === "UL") return

    activeKey?.classList.add(`${style.hover}`)
  }
  // 마우스 리브
  const handleMouseLeave = (e: any) => {
    const activeKey = e.target

    if (activeKey.tagName === "DIV" || activeKey.tagName === "UL") return

    activeKey?.classList.remove(`${style.hover}`)
  }

  return (
    <div className={style.section}>
      <div>
        {/* input */}
        <input
          ref={inputRef}
          type='text'
          onSelect={() => {
            inputWrapper?.checkChangedSelect()
          }}
          value={text}
          onChange={onChange}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      {/* 추천단어 */}
      <RecommendWord />
      {isKorean ? (
        // 한글키보드
        <div
          className={style.keyboard}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
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
