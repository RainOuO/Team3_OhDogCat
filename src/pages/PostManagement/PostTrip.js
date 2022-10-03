import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { API_URL } from '../../utils/config';
import { API_URL } from '../../utils/config';

import './PostTrip.scss';

import PostLocateArticleWeb from '../../components/Community/PostComponent/PostLocateArticle';
import PostLocateArticleRWD from '../../components/Community/PostComponent/PostLocateArticleForMobile';
import PostStateBarTripPost from '../../components/Community/PostComponent/PostStateBarTripPost';
import CommunityGoogleMaps from '../../components/Community/PostComponent/CommunityGoogleMaps';
import CommentBar from '../../components/Community/PostComponent/CommentBar';
import CommentBarRWD from '../../components/Community/PostComponent/CommentBarRWD';
import RecommandProduct from '../../components/Community/PostComponent/RecommandProduct';
import TripOutline from '../../components/Community/PostComponent/TripOutline';
import { useParams, useLocation } from 'react-router-dom';
// import PostMap from '../../components/Community/PostComponent/PostMap';

function PostTrip() {
  const [postTrip, setPostTrip] = useState([]);

  // 貼文ＩＤ從網址字串抓
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const postID = urlSearchParams.get('postID');
  console.log('postID', postID);
  const [comment, setComment] = useState();

  // 留言內容

  useEffect(() => {
    // 單獨取行程明細
    const fetchPostTripEdit = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/community/tripPostDetail?postID=${postID}`
        );
        // 取得後端來的資料
        console.log('是否資料有進來？', postID);
        console.log('是否資料有進來 打ＡＰＩ 貼文內容？', result);
        if (result) {
          let daysFilter = [];
          // 分組按照日期分組

          for (const [index, item] of result.data.entries()) {
            if (daysFilter.length === 0) {
              daysFilter.push([item]);
            } else if (
              daysFilter[daysFilter.length - 1][0].days !== item.days
            ) {
              daysFilter.push([item]);
            } else {
              daysFilter[daysFilter.length - 1].push(item);
            }
          }
          setPostTrip(daysFilter);
        }
      } catch (err) {
        console.log('setPostTripEdit ', err);
      }
      // 存回 useState 狀態
    };
    fetchPostTripEdit();
  }, []);

  console.log('整理好的資料', postTrip);
  return (
    <>
      {postTrip.length === 0 ? (
        '沒有資料' //* 是否做loading 頁面
      ) : (
        <div
          key={postTrip.id}
          className="postTrip d-flex justify-content-center"
        >
          <div className="post_bar d-flex flex-column">
            <PostStateBarTripPost
              post={postTrip}
              postID={postID}
            ></PostStateBarTripPost>

            <hr></hr>
            <div className="postTrip article_forWeb d-flex align-items-start justify-content-between ">
              <div className="postLocateArticleWeb">
                <PostLocateArticleWeb post={postTrip}></PostLocateArticleWeb>
              </div>
              <div className="postLocateArticleRWD">
                <PostLocateArticleRWD post={postTrip}></PostLocateArticleRWD>
              </div>
              <TripOutline className="d-block" post={postTrip}></TripOutline>
            </div>
            <CommunityGoogleMaps post={postTrip}></CommunityGoogleMaps>
            <div className="recommandProduct">
              <RecommandProduct></RecommandProduct>
            </div>
            <hr></hr>
            <div className="commentBar ">
              <CommentBar comment={comment}></CommentBar>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostTrip;
