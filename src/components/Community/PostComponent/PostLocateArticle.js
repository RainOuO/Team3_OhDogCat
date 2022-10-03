import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { TiLocation } from 'react-icons/ti';
import './PostLocateArticle.scss';
import { BE_URL } from '../../../utils/config';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import defaultPhoto from '../../../images/社群照片假圖300px.png';

export default function PostLocateArticle({ post }) {
  const [locFiles, setLocFiles] = useState({ photos: '', locateID: '' });
  // let daycount = post.days
  // console.log('tew',daycount);
  // const [tripDetail, setTripDetail] = useState([]);
  let locateID = post.id;
  console.log('原始父層', locateID);

  useEffect(() => {
    if (locFiles) {
      let formData = new FormData();
      formData.append('locateID', locFiles.locateID);
      formData.append('photo', locFiles.photos);
      try {
        console.log('formData', formData);
        let response = axios.post(
          `${API_URL}/community/tripPostLocUpload`,
          formData
        );
        console.log('景點照片新增成功', response);
      } catch (e) {
        console.log('錯誤', e);
      }
    }
    console.log(locFiles);
  }, [locFiles]);

  return (
    <>
      {post.length === 0 ? (
        '沒有資料'
      ) : (
        <ul className="article_section">
          {post.map((data, index) => {
            return (
              <>
                <div className="my-2 post_dayCount">Day {data[0].days}</div>
                {data.map((data, i) => {
                  {
                    /* console.log('datajijijfe', data);
                  console.log('jijiejt', data.locate_photo);
                  console.log(BE_URL + '/' + data.locate_photo); */
                  }
                  return (
                    <>
                      <li
                        className="trip_record_section"
                        id={`day${data.days}locate${i}`}
                      >
                        <div className="post_content d-flex row align-items-start">
                          <div className="post_location_mark d-flex flex-column justify-content-between align-items-start col-7 mt-1">
                            <div className="d-flex locate_title">
                              <p>
                                <TiLocation className="mb-1 me-1 h5"></TiLocation>
                                <strong className="ms-1 h5">
                                  {data.locate_name}
                                </strong>
                              </p>
                              <p className="ms-2 post_location_duration middle">
                                {data.locate_intro}
                              </p>
                            </div>
                            <div className="locate_context">
                              <p style={{ color: ' #747474' }}>
                                {data.locate_context}
                              </p>
                            </div>
                          </div>

                          <div className="photoBar col-5">
                            {data.locate_photo ? (
                              <>
                                <PhotoProvider maskOpacity={0.8}>
                                  <div className="foo locate_photo_single">
                                    <PhotoView
                                      key={index}
                                      style={{ objectFit: 'cover' }}
                                      src={
                                        BE_URL +
                                        '/tripPost/' +
                                        data.locate_photo
                                      }
                                    >
                                      <img
                                        alt=""
                                        style={{ objectFit: 'cover' }}
                                        src={
                                          BE_URL +
                                          '/tripPost/' +
                                          data.locate_photo
                                        }
                                      />
                                    </PhotoView>
                                  </div>
                                </PhotoProvider>
                              </>
                            ) : (
                              <img alt="" src={defaultPhoto}></img>
                            )}
                          </div>
                        </div>
                        <hr></hr>
                      </li>
                    </>
                  );
                })}
              </>
            );
          })}
        </ul>
      )}
    </>
  );
}
