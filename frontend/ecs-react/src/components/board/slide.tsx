import "../../styles/board/slide.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React, { useState } from "react"

export default function Slide() {
  const customeSlider: any = React.createRef()
  const setting = {
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
  }
  const gotoNext = () => {
    customeSlider.current.slickNext()
  }

  const gotoPrev = () => {
    customeSlider.current.slickPrev()
  }

  return (
    <div className='main'>
      <div>
        <Slider {...setting} ref={customeSlider} className='slider slider-nav'>
          <div>
            <h3>
              {" "}
              <img
                src='https://cdn.pixabay.com/photo/2023/04/11/15/39/art-7917562__340.jpg'
                alt=''
              />
            </h3>
          </div>
          <div>
            <h3>
              {" "}
              <img
                src='https://cdn.pixabay.com/photo/2023/03/22/04/26/pagoda-7868621__340.jpg'
                alt=''
              />
            </h3>
          </div>
          <div>
            <h3>
              <img
                src='https://cdn.pixabay.com/photo/2023/03/29/13/19/sea-7885432__340.jpg'
                alt=''
              />
            </h3>
          </div>
          <div>
            <h3>
              <img
                src='https://cdn.pixabay.com/photo/2023/03/27/10/53/brutalism-7880446__340.jpg'
                alt=''
              />
            </h3>
          </div>
        </Slider>
      </div>
      <div className='slide-buttons'>
        <button className='prev-button' onClick={() => gotoPrev()}>
          Prev
        </button>
        <button className='next-button' onClick={() => gotoNext()}>
          Next
        </button>
      </div>
    </div>
  )
}
