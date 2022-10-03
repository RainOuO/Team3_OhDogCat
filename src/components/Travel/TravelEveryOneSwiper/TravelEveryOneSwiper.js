import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { TiLocation } from 'react-icons/ti';
import { BiLike } from 'react-icons/bi';
import './_TravelEveryOneSwiper.scss';

const TravelEveryOneSwiper = ({ travelCommunity }) => {
  const [allPost, setAllPost] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;

  useEffect(() => {
    // 抓社群所有資料
    const fetchAllPostData = async () => {
      const result = await axios.get(`${API_URL}/communityHomePage/allPost`);
      console.log(result.data);
      setAllPost(result.data);
    };
    fetchAllPostData();
  }, []);

  console.log(allPost);
  return (
    <>
      <div className="TravelEveryOneSwiper">
        <Swiper
          className="MyTravelSwiper"
          slidesPerView={5}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          height={500}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log()}
        >
          {allPost.map((v, i) => {
            return (
              <>
                <SwiperSlide key={v.id} className="">
                  <div key={v.id} className="item">
                    <div className="mainPhotoSection">
                      <img
                        src={`${BASE_URL}/post/${v.post_main_photo}`}
                        alt=""
                      />
                    </div>
                    <section className="">
                      <div className="allPostTitle">
                        <div className="allPostMainTitle">{v.post_title}</div>
                      </div>
                      <p className="d-flex align-items-center allPostLocation">
                        <TiLocation />
                        {v.coordinate}
                      </p>
                      <div className="bottomSection">
                        <div className="userInfo">
                          <div className="userPhoto">
                            <img src={`${BASE_URL}${v.photo}`} alt="" />
                          </div>
                          <p className="userName">{v.social_name}</p>
                        </div>
                        <div>
                          <BiLike />
                          {v.likes}
                        </div>
                      </div>
                    </section>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default TravelEveryOneSwiper;
