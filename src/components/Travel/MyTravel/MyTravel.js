import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import CoverBackground from '../../../images/travels/travel_community.png';
import './_MyTravel.scss';

const MyTravel = ({ travelUser }) => {
  console.log('travelUser', travelUser);
  return (
    <>
      <div className="MyTravel">
        <div className='Title'>
          ｜我的行程
        </div>
        <div className="d-flex ">
          <Swiper
            className="MyTravelSwiper"
            slidesPerView={4}
            spaceBetween={20}
            height={500}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log()}
          >
            {travelUser.length === 0 ? (
              <SwiperSlide>
                <div className='noTravelSec'>
                  <h1 className="noTravel">還沒有建立任何行程喔！</h1>
                  <div className='noTravelBTN'>
                  <button>從景點票券開始下手</button>
                  <button>先看看大家的貼文分享</button>
                </div></div>
              </SwiperSlide>
            ) : (
              travelUser.map((data) => {
                return (
                  <>
                    <SwiperSlide key={data.id} className="">
                      <div className="MyTravelItem">
                        <Link to={`/Travel_map?travelid=${data.id}`}>
                          <div className="MyTravelImg">
                            <img
                              src={
                                data.main_photo === ''
                                  ? CoverBackground
                                  : process.env.REACT_APP_BASE_API_URL + '/' + data.main_photo
                              }
                              alt=""
                            />
                          </div>
                          <div className="MyTravelTitle">
                          <FaPaw className="FaPaw"/><p>{data.title}</p>
                          </div>
                          <div className="MyTravelTime">
                            {data.start_time}~{data.end_time}
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  </>
                );
              })
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default MyTravel;
