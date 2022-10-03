import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { TiLocation } from 'react-icons/ti';
import { BiLike } from 'react-icons/bi';
import { BE_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';
import noPhoto from '../../../images/noPhoto.png';
import parse from 'html-react-parser';

import './_communityListCard.scss';

export default function CommunityListCard({ postData, search }) {
  console.log('search', search);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-3">
        <h5 className="comList_search_result">
          搜尋結果如下，共{postData.length}筆資料:
        </h5>
      </div>
      {postData.map((data, index) => {
        let tags = postData[index].tags;
        const tag = tags.split(/[#,＃]/).filter((item) => item);
        return (
          <Link to={`/post?postID=${data.id}`} key={index}>
            <div className=" card border-primary" key={index}>
              <div className="row g-0">
                <div className="col-md-4 comList_main_card_img--box">
                  <img
                    src={BE_URL + '/post/' + data.post_main_photo}
                    className="comList_main_card_img"
                    alt="..."
                  />
                  <div></div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="card_content">
                      {/* 標題 */}
                      <div className="comList_main_card_title d-flex justify-content-between">
                        <h5 className="fw-bolder comList_card_title">
                          {data.post_title}
                        </h5>
                      </div>
                      {/* 標籤 */}
                      <div className="d-flex flex-row">
                        {tag.map((data, index) => {
                          if (index >= 0) {
                            return (
                              <p
                                key={index}
                                className="comList_main_card_tag my-2 me-2"
                              >
                                {data}
                              </p>
                            );
                          }
                        })}
                      </div>
                      {/* 內文 */}
                      <p className="comList_main_card_text my-2">
                        { (data.content.replace(/<\/?.+?>/g, ''))}
                        {/* {data.content} */}
                      </p>
                      {/* 地點、讚數 */}
                      <div className="comList_main_card_bottom_text d-flex justify-content-between align-items-center mt-4">
                        <p className="comList_main_card_locate_text align-items-center d-flex fw-bolder">
                          <TiLocation />
                          {data.coordinate}
                        </p>
                        <div className="comList-card-like text-right d-flex align-items-center">
                          <BiLike />
                          <p>{data.likes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
