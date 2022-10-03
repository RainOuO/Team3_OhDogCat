import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { BiLike } from 'react-icons/bi';
import { FaPaw } from 'react-icons/fa';

import { IoHeartOutline } from 'react-icons/io5';

import './_communityKOLSwiper.scss';

import dog1 from '../../../images/Community_HomePage/petKOL/dog1.jpeg';
import dog2 from '../../../images/Community_HomePage/petKOL/dog2.jpeg';
import dog3 from '../../../images/Community_HomePage/petKOL/dog3.jpeg';
import dog4 from '../../../images/Community_HomePage/petKOL/dog4.jpeg';
import dog5 from '../../../images/Community_HomePage/petKOL/dog5.jpeg';
import dog6 from '../../../images/Community_HomePage/petKOL/dog6.jpeg';
import dog7 from '../../../images/Community_HomePage/petKOL/dog7.jpeg';
import dog8 from '../../../images/Community_HomePage/petKOL/dog8.jpeg';
import dog9 from '../../../images/Community_HomePage/petKOL/dog9.jpeg';
import dog10 from '../../../images/Community_HomePage/petKOL/dog10.jpeg';
import cat1 from '../../../images/Community_HomePage/petKOL/cat1.jpeg';
import cat2 from '../../../images/Community_HomePage/petKOL/cat2.jpeg';
import cat3 from '../../../images/Community_HomePage/petKOL/cat3.jpeg';
import cat4 from '../../../images/Community_HomePage/petKOL/cat4.jpeg';
import cat5 from '../../../images/Community_HomePage/petKOL/cat5.jpeg';
import cat6 from '../../../images/Community_HomePage/petKOL/cat6.jpeg';
import cat7 from '../../../images/Community_HomePage/petKOL/cat7.jpeg';
import cat8 from '../../../images/Community_HomePage/petKOL/cat8.jpeg';
import cat9 from '../../../images/Community_HomePage/petKOL/cat9.jpeg';
import cat10 from '../../../images/Community_HomePage/petKOL/cat10.jpeg';

export default function CommunityKOLSwiper(props) {
  const { comHomePageCard } = props;
  // console.log('props', props);
  const petKOL = [
    {
      id: 1,
      name: '墨鏡',
      img: cat1,
      like: '539',
    },
    {
      id: 2,
      name: '牛奶糖',
      img: cat2,
      like: '80',
    },
    {
      id: 3,
      name: 'Leo里歐',
      img: dog1,
      like: '332',
    },
    {
      id: 4,
      name: '五拉拉兄弟',
      img: dog2,
      like: '705',
    },
    {
      id: 5,
      name: '老大',
      img: cat3,
      like: '168',
    },
    {
      id: 6,
      name: '小黃花',
      img: cat4,
      like: '452',
    },
    {
      id: 7,
      name: '小短腿',
      img: dog3,
      like: '65',
    },
    {
      id: 8,
      name: '艾咪',
      img: dog4,
      like: '980',
    },
    {
      id: 9,
      name: '拖鞋',
      img: cat5,
      like: '4462',
    },
    {
      id: 10,
      name: '冬片仔',
      img: cat6,
      like: '790',
    },
    {
      id: 11,
      name: '雪花Snow',
      img: dog5,
      like: '472',
    },
    {
      id: 12,
      name: '冰冰',
      img: dog6,
      like: '1112',
    },
    {
      id: 13,
      name: '格雷',
      img: cat7,
      like: '483',
    },
    {
      id: 14,
      name: '臉黑雙胞胎',
      img: cat8,
      like: '880',
    },
    {
      id: 15,
      name: '我的二哈哪有那麼聰明',
      img: dog7,
      like: '462',
    },
    {
      id: 16,
      name: '菜市場名的冠宇',
      img: dog8,
      like: '388',
    },
    {
      id: 17,
      name: '奶油',
      img: cat9,
      like: '555',
    },
    {
      id: 18,
      name: '悠咪',
      img: cat10,
      like: '880',
    },
    {
      id: 19,
      name: '土狗王小黃',
      img: dog9,
      like: '432',
    },
    {
      id: 20,
      name: '滑板',
      img: dog10,
      like: '739',
    },
  ];

  return (
    <>
      <div className="CommunitySwiperLeft">
        <Swiper
          loop={true}
          freeMode={true}
          spaceBetween={22}
          slidesPerView={6}
          className="communitySwiper_Left"
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
            reverseDirection: true,
          }}
          onSlideChange={(e) => {}}
          onSwiper={(swiper) => {}}
        >
          {petKOL.map((data, index) => {
            return (
              <SwiperSlide key={'comHomePageCard' + index} className="h-100">
                <div className="communitySwiper_card d-flex flex-column">
                  <div className="obj-fit">
                    <img src={data.img} alt="123" />
                  </div>
                  <div className="d-flex flex-fill p-3 align-items-center">
                    <div className="communitySwiper_card_title flex-fill">
                      {/* TODO:狗掌icon */}
                      <h5>
                        <FaPaw className="faPaw" />
                        {data.name}
                      </h5>
                    </div>
                    <div className="communitySwiper_card_like d-flex align-items-center">
                      {data.like}
                      <BiLike />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
  // });
}
