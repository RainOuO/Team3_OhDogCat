import React from 'react';
import coverPhoto from '../../../images/社群假圖1280.png';
import { BE_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { AiTwotoneLike } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import './PostStateBarTripPost.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { handleSuccess } from '../../../utils/handler/card/handleStatusCard';
import { useUserInfo } from '../../../hooks/useUserInfo';

export default function PostStateBarTripPost({ post, postID }) {
  console.log('post', post);
  console.log('此貼文ＩＤ', postID);
  console.log(post[0][0].tags);
  // 資料按讚數 學儒調整中
  const [likes, setLikes] = useState(post[0][0].likes);
  console.log(post[0][0].likes);
  // 資料按讚數
  const { user, setUser } = useUserInfo();
  // console.log('user', user.data.id);
  const userID = user.data.id;

  // //判斷是否有按過讚
  const [likesState, setLikeState] = useState(0);
  //TODO: 如何設計初始值 判斷使用者是否已經按讚過了
  useEffect(() => {
    console.log('貼文ＩＤ使用者ＩＤ', postID, userID);
    const fetchLikeState = async () => {
      try {
        const result = await axios.get(`${API_URL}/community/likesStatus`);
        // 取得後端來的資料
        console.log('result,data', result.data);
        result.data.length === 0 ? setLikeState(0) : setLikeState(1);
      } catch (err) {
        console.log('fetchLikeState', err);
      }
    };
    fetchLikeState();
  }, []);

  console.log('poststatebar', post);

  // 按讚按鈕
  const LikeHandle = async (e) => {
    e.preventDefault();
    if (!likesState) {
      setLikes(likes + 1);
      console.log('現在按讚狀態', likesState);
      console.log('現在按讚數', likes);
      let likesData = await axios.post(`${API_URL}/community/likes`, {
        postID,
        likesState,
        likes,
        userID,
      });
      // console.log('按讚成功', likesData);
      handleSuccess('讚讚！');
      // TODO:傳值給資料庫做加減
      console.log(likes);
      console.log('現在按讚狀態', likesState);
    } else {
      setLikes(likes - 1);
      setLikeState(0);
      console.log('現在按讚狀態', likesState);
      console.log('現在按讚數', likes);
      let likesData = await axios.post(`${API_URL}/community/likes`, {
        postID,
        likesState,
        likes,
        userID,
      });
      console.log('收回讚', likesData);
      handleSuccess('讚還來');
      console.log(likes);
      console.log('現在按讚狀態', likesState);
    }
  };
  // 學儒調整中
  console.log('post', post);
  const time = post[0][0].create_time.split(' ');
  const tags = post[0][0].tags.split(/[#,＃]/).filter((item) => item);

  const [postState, setPostState] = useState('');
  const handleRelease = async (e) => {
    e.preventDefault();
    setPostState(e.target.value);
    // console.log(postState, postID);
    let res = await axios.post(`${API_URL}/community/release`, {
      postID,
      postState,
    });
    //TODO: 如何點擊按鈕改變狀態同時打api回去
    console.log('貼文發布成功', res);
    handleSuccess('貼文發布成功', `/postTrip?postID=${postID}`);
  };

  return (
    <>
      <div className="postStateBarTripPost">
        <div className="post_cover_photo">
          <img
            className="cover_photo"
            alt=""
            style={{ objectFit: 'cover' }}
            src={
              post[0][0].post_main_photo === ''
                ? coverPhoto
                : BE_URL + '/post/' + post[0][0].post_main_photo
            }
          ></img>
        </div>
        <div className="post_title">
          <p className="">{post[0][0].post_title}</p>
        </div>
        <div className="post_state_bar ">
          <div className="post_date px-2">
            <p>{time[0]}</p>
          </div>
          <div className="post_auther d-flex px-2">
            <Link to="/" className="pe-2">
              {post[0][0].social_name}
            </Link>
          </div>
          <div className="post_location pe-4">
            <p>
              <MdLocationOn className="mb-1"></MdLocationOn>
              {post[0][0].coordinate}
            </p>
          </div>
          <div className="postTages">
            {tags.map((data, index) => {
              return (
                <div key={tags.index} className="post_tags">
                  <p className="mx-1">{data}</p>
                </div>
              );
            })}
          </div>
          <div className="post_like me-2">
            {post[0][0].status === 2 ? (
              <>
                {' '}
                <div className="d-flex">
                  {' '}
                  <p>草稿尚未發布</p>
                  <button className="btn" value="1" onClick={handleRelease}>
                    發布
                  </button>
                </div>
              </>
            ) : (
              <>
                {' '}
                {likesState === 0 ? (
                  <p>
                    <BiLike
                      className="mb-1 me-2"
                      onClick={(e) => {
                        LikeHandle(e);
                        setLikeState(1);
                      }}
                    ></BiLike>
                    按讚人數：{likes}
                  </p>
                ) : (
                  <p>
                    {' '}
                    <AiTwotoneLike
                      className="mb-1 me-2"
                      onClick={(e) => {
                        LikeHandle(e);
                        setLikeState(0);
                      }}
                    ></AiTwotoneLike>
                    按讚人數：{likes}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
