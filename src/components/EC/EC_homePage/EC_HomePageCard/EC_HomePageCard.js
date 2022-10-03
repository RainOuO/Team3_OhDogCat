import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { FaPaw } from 'react-icons/fa';
import './_EC_HomePageCard.scss';

const ECHomePageCard = (props) => {
  const { ecTypeCard, ecTypeCardTitle } = props;
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;
  return (
    <div className="ec_card_pc d-flex my-5">
      {/* 分類標題區 */}
      <div className="ec_card_pc_main_left">
        <h4 className="ec_card_pc_main_title m-3 d-flex justify-content-right position-absolute">
          {ecTypeCardTitle.name}
        </h4>
        <img
          className="ec_card_pc_main_img"
          alt=""
          src={ecTypeCardTitle.img}
        ></img>
      </div>
      {/*PC 輪播商品區  */}
      <div className="ec_card_pc_recommend_list align-items-end">
        <Swiper
          loop={true}
          slidesPerView={4}
          spaceBetween={1}
          className="ec_card_pc_swiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
            reverseDirection: false,
          }}
          onSlideChange={(e) => {}}
          onSwiper={(swiper) => {}}
        >
          {/* <div className="ec_card_pc_right_card"></div> */}
          {ecTypeCard.map((data, index) => {
            return (
              <div className="">
                <SwiperSlide
                  key={index}
                  className="ec_card_pc_recommend_swiper "
                >
                  <Link
                    type="submit"
                    to={`/ec-productdetail?id=${data.id}`}
                    className=" d-flex flex-column"
                  >
                    {/* <div className="d-flex justify-content-between"> */}
                    <div className="ec_card_pc_card d-flex flex-col">
                      <div className="ec_card_pc_product_photo">
                        <img
                          alt=""
                          src={`${BASE_URL}${data.photo_path}/${data.main_photo}`}
                        ></img>
                      </div>
                      <div className="ec_card_pc_content_title d-flex ">
                        <p>{data.name}</p>
                      </div>
                      <div className="ec_card_state d-flex justify-content-between align-items-end ">
                        <div className="ec_card_rank d-flex flex-row align-items-center pb-1">
                          <FaPaw />
                          {/* {Number(Math.round(data.per_score))} */}
                          {data.per_score.toFixed(1)}
                        </div>
                        <div className="ec_card_price">NT${data.price}</div>
                      </div>
                    </div>
                    {/* </div> */}
                  </Link>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </div>

      {/*RWD輪播商品區  */}
      <div className="ec_card_rwd_recommend_list align-items-end">
        <Swiper
          loop={true}
          slidesPerView={2}
          spaceBetween={1}
          className="ec_card_rwd_swiper"
          // modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={(e) => {}}
          onSwiper={(swiper) => {}}
        >
          {/* <div className="ec_card_rwd_right_card"></div> */}
          {ecTypeCard.map((data, index) => {
            return (
              <div className="">
                <SwiperSlide
                  key={'recommend' + index}
                  className="ec_card_rwd_recommend_swiper "
                >
                  <Link
                    type="submit"
                    to={`/ec-productdetail?id=${data.id}`}
                    className=" d-flex flex-column"
                  >
                    {/* <div className="d-flex justify-content-between"> */}
                    <div className="ec_card_rwd_card d-flex flex-col">
                      <div className="ec_card_rwd_product_photo">
                        <img
                          alt=""
                          // TODO
                          src={`http://localhost:3007${data.photo_path}/${data.main_photo}`}
                        ></img>
                      </div>
                      <div className="ec_card_rwd_content_title d-flex ">
                        <p>{data.name}</p>
                      </div>
                      <div className="ec_card_state d-flex justify-content-between align-items-end ">
                        <div className="ec_card_rank d-flex flex-row align-items-center pb-1">
                          <FaPaw />
                          {Number(data.per_score.toFixed(1))}
                        </div>
                        <div className="ec_card_price">NT${data.price}</div>
                      </div>
                    </div>
                    {/* </div> */}
                  </Link>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ECHomePageCard;
