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
  user_nm: string
  draw_no: number
  draw_drawing: string
  draw_date: Date
  category_nm: string
  like: boolean
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

  const setLike = async (draw_no: number) => {
    const response = await like(draw_no)
    if (response.status === 200) {
    }
  }
  const setUnlike = async (draw_no: number) => {
    const response = await unLike(draw_no)
    if (response.status === 200) {
    }
  }

  const setList = useCallback(async () => {
    const response = await getList(category, sort)
    setDrawList(() => [response.data])
  }, [category, sort])

  useEffect(() => {
    // setList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const testList: drawInfo[] = [
    {
      user_nm: "김학철",
      draw_no: 1,
      draw_drawing:
        "https://images.pexels.com/photos/4319752/pexels-photo-4319752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      draw_date: new Date(),
      category_nm: "동물",
      like: true,
    },
    {
      user_nm: "박소희",
      draw_no: 2,
      draw_drawing:
        "https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      draw_date: new Date(),
      category_nm: "과일",
      like: false,
    },
    {
      user_nm: "이찬석",
      draw_no: 3,
      draw_drawing:
        "https://cdn.pixabay.com/photo/2021/08/23/01/03/cubic-house-6566412__340.jpg",
      draw_date: new Date(),
      category_nm: "물건",
      like: true,
    },
  ]
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
            {testList.map((item, index) => (
              <div className='slider-item'>
                <div className='img-box'>
                  <img src={item.draw_drawing} alt='' />
                </div>

                <div className='v-story-desc-list'>
                  <p className='v-story-desc-tt'>{item.user_nm}</p>
                  <p className='v-story-desc'>{item.category_nm}</p>
                  {item.like ? (
                    <button
                      className='slide-like'
                      onClick={() => {
                        setUnlike(item.draw_no)
                      }}
                    >
                      <img src={likeIco} alt='' width={50} />
                    </button>
                  ) : (
                    <button
                      className='slide-like'
                      onClick={() => {
                        setLike(item.draw_no)
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
