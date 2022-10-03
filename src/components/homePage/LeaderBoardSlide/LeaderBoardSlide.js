import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import './_leaderBoardSlide.scss';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;
const Data = [
  {
    id: 531,
    rank: 1,
    category: '景點',
    title: '【2022合歡山杜鵑花季】 \u000A 南投｜合歡山北峰& 武嶺 1日遊',
    img: `${BASE_URL}/product/fun/13/travel_13_0.webp`,
  },
  {
    id: 526,
    rank: 2,
    category: '景點',
    title: '漫波星辰沙灘車 \u000A 天空之鏡｜花蓮必玩沙灘車',
    img: `${BASE_URL}/product/fun/8/travel_08_0.webp`,
  },
  {
    id: 532,
    rank: 3,
    category: '景點',
    title: '花蓮秘境溯溪一日遊',
    img: `${BASE_URL}/product/fun/14/travel_14_0.webp`,
  },
  {
    id: 543,
    rank: 1,
    category: '餐廳',
    title: '柚式餐酒館 家庭聚餐超划算 \u000A  優惠券',
    img: `${BASE_URL}/product/restaurant/5/restaurant_05_01.webp`,
  },
  {
    id: 558,
    rank: 2,
    category: '餐廳',
    title: '白圍牆景觀咖啡廳\u000A 下午茶餐券',
    img: `${BASE_URL}/product/restaurant/20/restaurant_20_01.jpg`,
  },
  {
    id: 542,
    rank: 3,
    category: '餐廳',
    title: '川御燒肉專門店 \u000A 優惠套券',
    img: `${BASE_URL}/product/restaurant/4/restaurant_04_01.webp`,
  },
  {
    id: 2682,
    rank: 1,
    category: '商品',
    title: 'PureLUXE 循味 天然無穀犬糧-室內老犬.低卡成犬4LB ',
    img: `${BASE_URL}/product/pet/8/21/main_photo_10_21.jpeg`,
  },
  {
    id: 2321,
    rank: 2,
    category: '商品',
    title: '【特價220元】\u000A 甘淨 超低粉塵凝結貓砂6KG',
    img: `${BASE_URL}/product/pet/1/11/main_photo_03_11.jpeg`,
  },
  {
    id: 2721,
    rank: 3,
    category: '商品',
    title: 'Menforsan 愛莎蓉 \u000A 犬用抗壓鎮定滴劑2管',
    img: `${BASE_URL}/product/pet/9/0/main_photo_11_0.jpeg`,
  },
];

export default function LeaderBoardSlide() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState(Data);

  const handleSlideClass = (e) => {
    if (screen === 1) {
      const slideAll = document.querySelectorAll(
        '.leaderBoardSwiper .swiper-slide'
      );
      const oldPrev2 = document.querySelector(
        '.leaderBoardSwiper .swiper-slide-prev2'
      );
      const oldNext2 = document.querySelector(
        '.leaderBoardSwiper .swiper-slide-next2'
      );
      const oldPrev3 = document.querySelector(
        '.leaderBoardSwiper .swiper-slide-prev3'
      );
      const oldNext3 = document.querySelector(
        '.leaderBoardSwiper .swiper-slide-next3'
      );
      const prev2 = slideAll[e.activeIndex - 2];
      const next2 = slideAll[e.activeIndex + 2];
      const prev3 = slideAll[e.activeIndex - 3];
      const next3 = slideAll[e.activeIndex + 3];
      if (oldPrev2 && oldNext2 && oldPrev3 && oldNext3) {
        oldPrev2.classList.remove('swiper-slide-prev2');
        oldNext2.classList.remove('swiper-slide-next2');
        oldPrev3.classList.remove('swiper-slide-prev3');
        oldNext3.classList.remove('swiper-slide-next3');
      }
      prev2.classList.add('swiper-slide-prev2');
      next2.classList.add('swiper-slide-next2');
      prev3.classList.add('swiper-slide-prev3');
      next3.classList.add('swiper-slide-next3');

      // console.log(e);
      // e.$el[0].style['width'] = 'calc(33% + 20px)';
    }
  };

  function logWidth() {
    if (document.body && document.body.offsetWidth) {
      if (document.body.offsetWidth > 1280) return setScreen(1);
      if (document.body.offsetWidth <= 1280 && document.body.offsetWidth > 780)
        return setScreen(2);
      if (document.body.offsetWidth <= 780) return setScreen(3);
    }
    if (
      document.compatMode == 'CSS1Compat' &&
      document.documentElement &&
      document.documentElement.offsetWidth
    ) {
      if (document.documentElement.offsetWidth > 1280) return setScreen(1);
      if (
        document.documentElement.offsetWidth <= 1280 &&
        document.documentElement.offsetWidth > 780
      )
        return setScreen(2);
      if (document.documentElement.offsetWidth <= 780) return setScreen(3);
    }
    if (window.innerWidth) {
      if (window.innerWidth > 1280) return setScreen(1);
      if (window.innerWidth <= 1280 && window.innerWidth > 780)
        return setScreen(2);
      if (window.innerWidth <= 780) return setScreen(3);
    }
  }

  function slidesPerView(size) {
    switch (size) {
      case 1:
        return 5;
      case 2:
        return 3;
      case 3:
        return 1;
      default:
        break;
    }
  }

  useEffect(() => {
    // TODO: 打API，setData，資料格式在上面
    logWidth();
    window.addEventListener('resize', logWidth);
    return () => {
      window.removeEventListener('resize', logWidth);
    };
  }, []);
  if (screen === 1 && data.length > 0) {
    return (
      <>
        <Swiper
          loop={true}
          slidesPerView={slidesPerView(screen)}
          spaceBetween={0}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          onSlideChange={handleSlideClass}
          onSwiper={handleSlideClass}
          modules={[Pagination, Autoplay]}
          className={`leaderBoardSwiper ${screen === 1 ? 'active1' : ''}`}
        >
          {data.map((data, index) => {
            return (
              <SwiperSlide key={'slide' + index}>
                {({ isActive }) => {
                  return (
                    <>
                      <div className="slide_rank position-absolute">
                        <div className="position-relative w-100 h-100 text-white fw-bold d-flex align-items-center flex-fill">
                          <span className="flex-fill text-center fw-bold">{`${data.category}  No. ${data.rank}`}</span>
                        </div>
                      </div>
                      <div className="slide_card obj-fit  d-flex position-relative">
                        <img
                          className={`slide_card_img position-absolute ${
                            isActive ? '' : 'opacity-75'
                          }`}
                          src={data.img}
                          alt=""
                        />
                        <div className="slide_card_content position-relative w-100">
                          <div className="card-text h-100 d-flex flex-column justify-content-center align-items-center position-relative">
                            <div className="title text-center fw-bold text-white mb-4">
                              {data.title}
                            </div>
                            <Link
                              to={`/ec-productdetail?id=${data.id}`}
                              className="button fw-bold"
                            >
                              查看更多
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
  if (screen === 2 && data.length > 0) {
    return (
      <>
        <Swiper
          loop={true}
          slidesPerView={slidesPerView(screen)}
          spaceBetween={12}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className={`leaderBoardSwiper ${screen === 2 ? 'active2' : ''}`}
        >
          {data.map((data, index) => {
            return (
              <SwiperSlide key={'slide' + index}>
                {({ isActive }) => {
                  return (
                    <>
                      <div className="slide_rank position-absolute">
                        <div className="position-relative w-100 h-100 text-white fw-bold d-flex align-items-center flex-fill">
                          <span className="flex-fill text-center fw-bold">{`${data.category}  No. ${data.rank}`}</span>
                        </div>
                      </div>
                      <div className="slide_card obj-fit  d-flex position-relative">
                        <img
                          className={`slide_card_img position-absolute ${
                            isActive ? '' : 'opacity-75'
                          }`}
                          src={data.img}
                          alt=""
                        />
                        <div className="slide_card_content position-relative w-100">
                          <div className="card-text h-100 d-flex flex-column justify-content-center align-items-center position-relative">
                            <div className="title text-center fw-bold text-white mb-4">
                              {data.title}
                            </div>
                            <Link
                              to={`/ec-productdetail?id=${data.id}`}
                              className="button fw-bold"
                            >
                              出遊 GoGo
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
  if (screen === 3 && data.length > 0) {
    return (
      <>
        <Swiper
          loop={true}
          slidesPerView={slidesPerView(screen)}
          spaceBetween={12}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className={`leaderBoardSwiper ${screen === 3 ? 'active3' : ''}`}
        >
          {data.map((data, index) => {
            return (
              <SwiperSlide key={'slide' + index}>
                {({ isActive }) => {
                  return (
                    <>
                      <div className="slide_rank position-absolute">
                        <div className="position-relative w-100 h-100 text-white fw-bold d-flex align-items-center flex-fill">
                          <span className="flex-fill text-center fw-bold">{`${data.category}  No. ${data.rank}`}</span>
                        </div>
                      </div>
                      <div className="slide_card obj-fit  d-flex position-relative">
                        <img
                          className={`slide_card_img position-absolute ${
                            isActive ? '' : 'opacity-75'
                          }`}
                          src={data.img}
                          alt=""
                        />
                        <div className="slide_card_content position-relative w-100">
                          <div className="card-text h-100 d-flex flex-column justify-content-center align-items-center position-relative">
                            <div className="title text-center fw-bold text-white mb-4">
                              {data.title}
                            </div>
                            <Link
                              to={`/ec-productdetail?id=${data.id}`}
                              className="button fw-bold"
                            >
                              出遊 GoGo
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
}
