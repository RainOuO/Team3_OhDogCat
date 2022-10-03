import './_RWDMasonry.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiLocation } from 'react-icons/ti';
import { BiLike } from 'react-icons/bi';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

export default function HomePageMasonry(props) {
  const [allPost, setAllPost] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;

  useEffect(() => {
    // 抓社群所有資料
    const fetchAllPostData = async () => {
      const result = await axios.get(`${API_URL}/communityHomePage/allPost`);
      // setAllPost(result.data)
      console.log(result.data);
      setAllPost(result.data);
    };
    fetchAllPostData();
  }, []);

  console.log(allPost);

  return (
    <>
      <div className="RWDMasonry">
        <div className="RWDMasonryBG">
          <div className="masonry">
            {allPost.map((v, i) => {
              return (
                <>
                  <Link
                    to={
                      v.post_type_id === 1
                        ? `/post?postID=${v.id}`
                        : `/postTrip?postID=${v.id}`
                    }
                  >
                    <div key={v.id} className="item">
                      <div>
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
                          <div className="LikeSection">
                            <BiLike />
                            {v.likes}
                          </div>
                        </div>
                      </section>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
