import './_TravelGoPlaySwiper.scss';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import travel_HsinchuI from '../../../images/travels/travel_HsinchuI.jpg';
import travel_Tainan from '../../../images/travels/travel_Tainan1.webp';
import travel_TainanA from '../../../images/travels/travel_Tainan2.webp';
import travel_Chiayi from '../../../images/travels/travel_Chiayi1.jpeg';
import travle_Yilan from '../../../images/travels/travle_Yilan.webp';
import travle_YilanA from '../../../images/travels/travel_Yilan1.webp';
import travle_Taipei from '../../../images/travels/TRAVEL_TAIPEI.webp';

const goTrip = [
  {
    id: 1,
    name: '桃園近郊三天兩夜度假',
    start_time: 20220823,
    end_time: 20220830,
    img: travel_HsinchuI,
  },

  {
    id: 2,
    name: '台南西區吃不完',
    start_time: 20220820,
    end_time: 20220825,
    img: travel_Tainan,
  },
  {
    id: 3,
    name: '嘉義-阿里山眠月線',
    start_time: 20220820,
    end_time: 20220825,
    img: travel_Chiayi,
  },
  {
    id: 4,
    name: '宜蘭龜山島秘境牛奶湖',
    start_time: 20220820,
    end_time: 20220825,
    img: travle_Yilan,
  },
  {
    id: 5,
    name: '新北賞螢秘境兩日遊',
    start_time: 20220820,
    end_time: 20220825,
    img: travle_Taipei,
  },
  {
    id: 6,
    name: '台南-台版亞馬遜河',
    start_time: 20220820,
    end_time: 20220825,
    img: travel_TainanA,
  },
  {
    id: 7,
    name: '宜蘭-斑比山丘遊',
    start_time: 20220820,
    end_time: 20220825,
    img: travle_YilanA,
  },
];
const TravelGoPlaySwiper = () => {
  return (
    <>
      <div className="TravelGoPlaySwiper">
        <Swiper
          className="travel_goplay"
          loop={true}
          freeMode={true}
          spaceBetween={40}
          slidesPerView={6}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSlideChange={(e) => {}}
          onSwiper={(swiper) => {}}
        >
          {goTrip.map((v, i) => {
            return (
              <>
                <SwiperSlide>
                  <div className="goTripItem">
                    <div className="goTripImg">
                      <img src={v.img} alt="" />
                    </div>
                    <div className="goTripName">
                      <p>{v.name}</p>
                    </div>
                  </div>
                </SwiperSlide>
                ;
              </>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default TravelGoPlaySwiper;
