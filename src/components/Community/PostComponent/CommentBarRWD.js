import React from 'react';
import { useState, useEffect } from 'react';
import { API_URL, BE_URL } from '../../../utils/config';
import axios from 'axios';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { useParams, useLocation } from 'react-router-dom';
import moment from 'moment/moment';

import './CommentBar.scss';

function CommentBarRWD() {
  // 網址postID 顯示該筆資料
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const postID = urlSearchParams.get('postID');
  console.log('postID', postID);

  // 留言內容
  const [commentData, setCommentData] = useState([]);

  // 取得留言輸入框內容
  const [getCommentData, getSetCommentData] = useState({});

  // 送出留言狀態
  const [ifSubmit, setIfSubmit] = useState(false);

  // API 取得留言資料表
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/post/postComment?postID=${postID}`,
          {
            withCredentials: true,
          }
        );
        // 取得後端來的資料
        // console.log('Comment result', result.data);
        setCommentData(result.data);
        setIfSubmit(false);
      } catch (err) {
        // console.log('setCommentData', err);
      }
      // 存回 useState 狀態
    };
    fetchComment();
  }, [ifSubmit]);

  // === 將輸入欄位資料存入State裡 ===
  function handleChange(e) {
    console.log('handleChange', e.target.name, e.target.value);
    let newComment = { ...getCommentData };
    newComment[e.target.name] = e.target.value;
    getSetCommentData(newComment);
  }

  // === 送出 ===
  async function handleSubmit(e) {
    console.log('getCommentData', getCommentData);
    // 把預設行為關掉
    e.preventDefault();
    try {
      let create_time = moment().format('YYYY-MM-DD HH:mm:ss');
      let commentText = getCommentData.commentText;
      let response = await axios.post(
        `${API_URL}/post/postCommentEdit`,
        { create_time, commentText, postID },
        { withCredentials: true }
      );
      console.log('response.data', response.data);
      setIfSubmit(true);
      getSetCommentData({ commentText: '' });
    } catch (e) {
      console.error('postCommentEdit', e);
    }
  }
  // === 清除 ===
  async function handleClear(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      getSetCommentData({ commentText: '' });
    } catch (e) {
      console.error('postCommentEdit', e);
    }
  }

  return (
    <div className="post_comment_list mt-3">
      <p className="post__comment_list_title">回應</p> {/* 關聯資料庫 */}
      <div className=" d-flex flex-column align-items-center">
        {commentData.map((data) => {
          return (
            <li
              key={data.id}
              className="d-flex justify-content-between comment_descript_list align-items-start"
            >
              <div className="d-flex justify-content-center">
                <div className="user_comment_photo">
                  <img alt="" src={BE_URL + data.photo}></img>
                </div>
                <div className="user_comment_detail mx-5">
                  <div className="user_comment_name">{data.social_name}</div>
                  <div className="user_comment_text">{data.comment}</div>
                </div>
              </div>
              <div className="user_comment_datetime d-flex align-self-end"></div>
            </li>
          );
        })}
      </div>
      <div className="leave_comment">
        <p>我要留言</p>
        <form className="d-flex flex-column align-items-center">
          <textarea
            // type="textarea"
            className="form-control comment_input"
            placeholder="有什麼想說的呢？"
            rows="4"
            maxLength="100"
            name="commentText"
            id="commentText"
            value={getCommentData.commentText}
            onChange={handleChange}
          />
        </form>
        <div className="d-flex justify-content-end my-3  post_edit_button ">
          <button className="btn" onClick={handleClear}>
            清除
          </button>
          <button
            className="btn"
            onClick={(e) => {
              handleSubmit(e);
              setIfSubmit(true);
            }}
          >
            送出
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentBarRWD;
