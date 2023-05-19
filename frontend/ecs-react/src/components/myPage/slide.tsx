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
import { getList } from "../../services/userApi"
import { useNavigate } from "react-router"
import { useSetRecoilState } from "recoil"
import { bgImg } from "../../recoil/atoms/drawingState"
import DeleteModal from "../modal/deleteModal"
import { deleteModal } from "../../recoil/atoms/modalState"

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
  const [drawNo, setDrawNo] = useState(0)
  const setBgImage = useSetRecoilState(bgImg)
  const setModal = useSetRecoilState(deleteModal)
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
    setCurrentPage((current) =>
      currentPage + 1 >= drawList.length ? 0 : currentPage + 1
    )
    setDrawNo(drawList[currentPage].drawNo)
  }

  const gotoPrev = () => {
    customSlider.current.slickPrev()
    setCurrentPage((current) =>
      currentPage - 1 < 0 ? drawList.length - 1 : currentPage - 1
    )
    setDrawNo(drawList[currentPage].drawNo)
  }

  const setLike = async (drawNo: number) => {
    const response = await like(drawNo)
    if (response.status === 200) {
      setDrawList(
        drawList.map((item) =>
          item.drawNo === drawList[currentPage].drawNo
            ? { ...item, like: !item.like }
            : item
        )
      )
    }
  }
  const setUnlike = async (drawNo: number) => {
    const response = await unLike(drawNo)
    if (response.status === 200) {
      setDrawList(
        drawList.map((item) =>
          item.drawNo === drawList[currentPage].drawNo
            ? { ...item, like: !item.like }
            : item
        )
      )
    }
  }

  const setList = useCallback(
    async (category: number, sort: boolean) => {
      const response = await getList(category, sort)
      setDrawList(() => [...response.data])
      if (response.data.length > 0) setDrawNo(response.data[0].drawNo)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, sort]
  )

  useEffect(() => {
    setList(category, sort)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort])

  const saveDraw = () => {
    const link = document.createElement("a")
    link.href = drawList[currentPage].drawDrawing
    link.download = "PaintIMG[🎨]"
    link.click()
  }

  const editDraw = () => {
    setBgImage(drawList[currentPage].drawDrawing)
    navigate(`/editDraw/${drawList[currentPage].drawNo}`)
  }

  return (
    <>
      <DeleteModal
        drawNo={drawNo}
        category={category}
        sort={sort}
        setList={setList}
      ></DeleteModal>
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
            {drawList.length === 0 ? (
              <div className={style.empty}>저장된 그림이 없습니다.</div>
            ) : (
              drawList.map((item, index) => (
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
              ))
            )}
          </Slider>
        </div>
        {drawList.length === 0 ? null : (
          <div className={style.buttons}>
            <button className={style.btn} onClick={saveDraw}>
              이미지 다운로드
            </button>
            <button className={style.btn} onClick={editDraw}>
              수정
            </button>
            <button
              className={style.btn}
              onClick={() => {
                setModal(true)
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </>
  )
}
