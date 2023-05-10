import "../../styles/board/slide.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React, { useCallback, useEffect, useState } from "react"
import next from "../../assets/icon/next.png"
import prev from "../../assets/icon/back.png"
import likeIco from "../../assets/icon/like.png"
import unlikeIco from "../../assets/icon/unlike.png"
import { like, unLike } from "../../services/boardApi"
import { getList } from "../../services/boardApi"

interface drawInfo {
  categoryNM: string
  drawDate: Date
  drawDrawing: string
  drawNo: number
  like: boolean
  likeCnt: number
  userNM: string
}

export default function Slide({
  category,
  sort,
}: {
  category: number
  sort: boolean
}): React.ReactElement {
  const customSlider: any = React.createRef()
  const [drawList, setDrawList] = useState<drawInfo[]>([])
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
  }

  const gotoPrev = () => {
    customSlider.current.slickPrev()
  }

  const setLike = async (drawNo: number) => {
    const response = await like(drawNo)
    if (response.status === 200) {
      setDrawList(
        drawList.map((item) =>
          item.drawNo === drawNo ? { ...item, like: !item.like } : item
        )
      )
    }
  }
  const setUnlike = async (drawNo: number) => {
    const response = await unLike(drawNo)
    if (response.status === 200) {
      setDrawList(
        drawList.map((item) =>
          item.drawNo === drawNo ? { ...item, like: !item.like } : item
        )
      )
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
                  <p className='v-story-desc-tt'>{item.userNM}</p>
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
      </div>
    </>
  )
}
