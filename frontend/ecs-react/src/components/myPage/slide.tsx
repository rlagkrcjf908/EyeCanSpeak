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
  const navigate = useNavigate()
  const customeSlider: any = React.createRef()
  const [drawList, setDrawList] = useState<drawInfo[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const setting = {
    dots: false,
    infinite: true,
    touchThreshold: 100,
    speed: 300,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    centerMode: true,
    // centerPadding: "30px",
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const gotoNext = () => {
    customeSlider.current.slickNext()
    setCurrentPage(currentPage + 1 >= drawList.length ? 0 : currentPage + 1)
  }

  const gotoPrev = () => {
    customeSlider.current.slickPrev()
    setCurrentPage(currentPage - 1 < 0 ? drawList.length - 1 : currentPage - 1)
  }

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

  const saveDraw = () => {
    fetch(`${drawList[currentPage].draw_drawing}`, { method: "GET" })
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

  const deleteDraw = async () => {
    const response = await deleteDrawing(drawList[currentPage].draw_no)
    if (response.status === 400) console.log("삭제 실패")
  }

  useEffect(() => {
    // setList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(currentPage)
    // setList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <>
      <div className='slide-container pt-5'>
        <div className='slide-row'>
          <div className='slide-col-12'>
            <div className='slide-buttons'>
              <button className='prev-button' onClick={() => gotoPrev()}>
                <img src={prev} alt='' width={30}></img>
              </button>
              <button className='next-button' onClick={() => gotoNext()}>
                <img src={next} alt='' width={30}></img>
              </button>
            </div>
            <Slider {...setting} ref={customeSlider} className='slick'>
              {testList.map(
                (
                  item // drawList로 바꿔야함
                ) => (
                  <div className='slide-item' key={item.draw_no}>
                    <div
                      className='slide-bg'
                      style={{ backgroundImage: `url(${item.draw_drawing})` }}
                    >
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
                      <div className='slide-painter'> {item.user_nm}</div>
                      <div className='slide-category'></div>
                    </div>
                  </div>
                )
              )}

              {/* <div className='item'>
                <div
                  className='bg'
                  style={{
                    backgroundImage:
                      "url(https://images.pexels.com/photos/4319752/pexels-photo-4319752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
                  }}
                ></div>
              </div>
              <div className='item'>
                <div
                  className='bg'
                  style={{
                    backgroundImage:
                      "url(https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
                  }}
                ></div>
              </div>
              <div className='item'>
                <div
                  className='bg'
                  style={{
                    backgroundImage:
                      "url(https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
                  }}
                ></div>
              </div> */}
            </Slider>
          </div>
        </div>
        <div className={style.buttons}>
          <button className={style.btn} onClick={saveDraw}>
            이미지 다운로드
          </button>
          <button
            className={style.btn}
            onClick={() => {
              navigate(`/editDraw/${drawList[currentPage].draw_no}`)
            }}
          >
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
