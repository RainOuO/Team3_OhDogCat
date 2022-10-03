import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Swiper, SwiperSlide } from 'swiper/react';

import React, { useRef, useState } from 'react';
// Import Swiper React components

// import required modules
import { Navigation } from 'swiper';
import { useEffect } from 'react';

export default function PhotoReviewSwiper({ list }) {
  // console.log('list', list);
  let [viewList, setViewList] = useState([]);

  useEffect(() => {
    let newPhotoList = list.locate_photo.split(',').filter((item) => item);
    setViewList(newPhotoList);
  }, [list]);

  const ShowSwiper = ({ data }) => {
    return (
      <Swiper
        slidesPerView={5}
        spaceBetween={1}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="post_mySwiper"
      >
        {data.map((v, index) => {
          return (
            <SwiperSlide key={'swiper' + index}>
              <PhotoProvider maskOpacity={0.8}>
                {data.map((img, imgIndex, i) => {
                  return index === imgIndex ? (
                    <PhotoView key={'img' + imgIndex} src={img}>
                      <img
                        src={img}
                        value={data[imgIndex]}
                        alt=""
                        style={{ objectFit: 'fill' }}
                      />
                    </PhotoView>
                  ) : (
                    <PhotoView
                      src={img}
                      style={{ objectFit: 'fill' }}
                    ></PhotoView>
                  );
                })}
              </PhotoProvider>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };
  return (
    <>
      <ShowSwiper data={viewList}></ShowSwiper>
    </>
  );
}
