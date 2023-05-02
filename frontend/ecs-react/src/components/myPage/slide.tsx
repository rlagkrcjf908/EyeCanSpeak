import "../../styles/board/slide.css"
import Slider from "react-slick"
import style from "../../styles/myPage/slide.module.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React, { useCallback, useEffect, useState } from "react"
import next from "../../assets/icon/next.png"
import prev from "../../assets/icon/back.png"
import likeIco from "../../assets/icon/like.png"
import unlikeIco from "../../assets/icon/unlike.png"
import { like, unLike } from "../../services/boardApi"
import { deleteDrawing, getList } from "../../services/userApi"
import { useNavigate } from "react-router"
import { useSetRecoilState } from "recoil"
import { bgImg, drawInfoState } from "../../recoil/atoms/drawingState"

interface drawInfo {
  userNM: string
  drawNo: number
  drawDrawing: string
  drawDate: Date
  categoryNM: string
  like: boolean
}

export default function Slide({
  category,
  sort,
}: {
  category: number
  sort: boolean
}): React.ReactElement {
  const navigate = useNavigate()
  const customSlider: any = React.createRef()
  const [drawList, setDrawList] = useState<drawInfo[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const setBgImage = useSetRecoilState(bgImg)
  const setDrawInfo = useSetRecoilState(drawInfoState)
  const settings = {
    dots: false,
    draggable: false,
    arrows: false,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "300px",
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          centerPadding: "20vw",
        },
      },
      {
        breakpoint: 770,
        settings: {
          centerPadding: "0",
          arrows: false,
        },
      },
    ],
    beforeChange: (oldIndex: any, newIndex: any) => {
      if (oldIndex !== newIndex) {
        const cloned = document.querySelectorAll(
          ".slick-center + .slick-cloned"
        )
        cloned.forEach((node) => {
          setTimeout(() => {
            node.classList.add("slick-current")
            node.classList.add("slick-center")
          })
        })
      }
    },
  }

  const gotoNext = () => {
    customSlider.current.slickNext()
    setCurrentPage(currentPage + 1 >= drawList.length ? 0 : currentPage + 1)
  }

  const gotoPrev = () => {
    customSlider.current.slickPrev()
    setCurrentPage(currentPage - 1 < 0 ? drawList.length - 1 : currentPage - 1)
  }

  const setLike = async (drawNo: number) => {
    const response = await like(drawNo)
    if (response.status === 200) {
      console.log("좋아요")
    }
  }
  const setUnlike = async (drawNo: number) => {
    const response = await unLike(drawNo)
    if (response.status === 200) {
    }
  }

  const setList = useCallback(
    async (category: number, sort: boolean) => {
      const response = await getList(category, sort)
      setDrawList(() => [...response.data])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, sort]
  )

  useEffect(() => {
    setList(category, sort)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort])

  const saveDraw = () => {
    fetch(`${drawList[currentPage].drawDrawing}`, { method: "GET" })
      .then((res) => {
        return res.blob()
      })
      .then((blob) => {
        var url = window.URL.createObjectURL(blob)
        var a = document.createElement("a")
        a.href = url
        a.download = "myItem.extension"
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          window.URL.revokeObjectURL(url)
        }, 60000)
        a.remove()
      })
      .catch((err) => {
        console.error("err: ", err)
      })
  }

  const editDraw = () => {
    setBgImage(drawList[currentPage].drawDrawing)
    navigate(`/editDraw/${drawList[currentPage].drawNo}`)
    setDrawInfo({
      draw_no: drawList[currentPage].drawNo,
      subject_nm: drawList[currentPage].categoryNM,
    })
  }

  const deleteDraw = async () => {
    const response = await deleteDrawing(drawList[currentPage].drawNo)
    if (response.status === 400) console.log("삭제 실패")
  }

  useEffect(() => {
    // setList(-1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='slide-container pt-5'>
        <div className='slide-buttons'>
          <button className='prev-button' onClick={() => gotoPrev()}>
            <img src={prev} alt='' width={30}></img>
          </button>
          <button className='next-button' onClick={() => gotoNext()}>
            <img src={next} alt='' width={30}></img>
          </button>
        </div>
        <div className='v-story-wrap con'>
          <Slider
            ref={customSlider}
            className='v-story-slider'
            data-aos='fade-up'
            {...settings}
          >
            {drawList.map((item, index) => (
              <div className='slider-item' key={index}>
                <div className='img-box'>
                  <img src={item.drawDrawing} alt='' />
                </div>
                <div className='v-story-desc-list'>
                  <p className='v-story-desc-tt'>
                    <br />
                  </p>
                  <p className='v-story-desc'>{item.categoryNM}</p>
                  {item.like ? (
                    <button
                      className='slide-like'
                      onClick={() => {
                        setUnlike(item.drawNo)
                      }}
                    >
                      <img src={likeIco} alt='' width={50} />
                    </button>
                  ) : (
                    <button
                      className='slide-like'
                      onClick={() => {
                        setLike(item.drawNo)
                      }}
                    >
                      <img src={unlikeIco} alt='' width={50} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className={style.buttons}>
          <button className={style.btn} onClick={saveDraw}>
            이미지 다운로드
          </button>
          <button className={style.btn} onClick={editDraw}>
            수정
          </button>
          <button className={style.btn} onClick={deleteDraw}>
            삭제
          </button>
        </div>
      </div>
    </>
  )
}
