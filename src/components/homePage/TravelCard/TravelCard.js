import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { AiTwotoneLike } from 'react-icons/ai';

import './_travelCard.scss';

const fakeData = [
  {
    title:
      '花東二日遊part2｜激似紐西蘭牧場、太魯閣國家公園、大坡池、伯朗大道～一次玩好玩滿',
    img: 'https://picsum.photos/id/129/600/300',
    author: '姓阿名尼基',
    like: '45',
  },
  {
    title: '新北｜瑞芳 大地寶藏在這裡-探索黃金山城',
    img: 'https://picsum.photos/id/229/600/300',
    author: 'RainOuO',
    like: '65685',
  },
  {
    title: '苗栗露營兩天一夜行程分享',
    img: 'https://picsum.photos/id/219/600/300',
    author: '老鐵給個雙基',
    like: '684',
  },
  {
    title:
      '花東二日遊part2｜激似紐西蘭牧場、太魯閣國家公園、大坡池、伯朗大道～一次玩好玩滿',
    img: 'https://picsum.photos/id/20/600/300',
    author: 'RainOuO',
    like: '3984',
  },
  {
    title: '新北｜瑞芳 大地寶藏在這裡-探索黃金山城',
    img: 'https://picsum.photos/id/29/600/300',
    author: '老鐵給個雙基',
    like: '753',
  },
];

export default function TravelCard() {
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState(fakeData);

  function logWidth() {
    if (document.body && document.body.offsetWidth) {
      if (document.body.offsetWidth > 1280) return setScreen(1);
      if (document.body.offsetWidth <= 1280 && document.body.offsetWidth > 980)
        return setScreen(2);
      if (document.body.offsetWidth <= 980 && document.body.offsetWidth > 540)
        return setScreen(2);
      if (document.body.offsetWidth <= 540) return setScreen(3);
    }
    if (
      document.compatMode === 'CSS1Compat' &&
      document.documentElement &&
      document.documentElement.offsetWidth
    ) {
      if (document.documentElement.offsetWidth > 1280) return setScreen(1);
      if (
        document.documentElement.offsetWidth <= 1280 &&
        document.documentElement.offsetWidth > 980
      )
        return setScreen(2);
      if (
        document.documentElement.offsetWidth <= 980 &&
        document.documentElement.offsetWidth > 540
      )
        return setScreen(2);
      if (document.documentElement.offsetWidth <= 540) return setScreen(3);
    }
    if (window.innerWidth) {
      if (window.innerWidth > 1280) return setScreen(1);
      if (window.innerWidth <= 1280 && window.innerWidth > 980)
        return setScreen(2);
      if (window.innerWidth <= 980 && window.innerWidth > 540)
        return setScreen(2);
      if (window.innerWidth <= 540) return setScreen(3);
    }
  }

  useEffect(() => {
    // TODO: 打 API，setData
    logWidth();
    window.addEventListener('resize', logWidth);
    return () => {
      window.removeEventListener('resize', logWidth);
    };
  }, []);

  function slidesPerView(size) {
    switch (size) {
      case 1:
        return 3;
      case 2:
        return 2;
      case 3:
        return 1;
      default:
        break;
    }
  }

  return screen && data.length > 0 ? (
    <Swiper
      loop={true}
      slidesPerView={slidesPerView(screen)}
      spaceBetween={12}
      className="travelSwiper"
      modules={[Autoplay]}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
    >
      {/* // TODO: Link 的 to 屬性要改 */}
      {data.map((data, index) => {
        return (
          <SwiperSlide key={'travel' + index} className="h-100">
            <Link to="/" className="travel_card d-flex flex-column">
              <div className="obj-fit">
                <img src={data.img} alt="" />
              </div>
              <div className="d-flex flex-fill flex-column p-3">
                <div className="travel_card_title flex-fill">
                  <h5>{data.title}</h5>
                </div>
                <div className="travel_card_info d-flex justify-content-between align-items-end">
                  <div className="travel_card_author">{data.author}</div>
                  <div className="travel_card_like">
                    {data.like}
                    <AiTwotoneLike />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    ''
  );
}
