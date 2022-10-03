// import FollowerPhoto from '../../images/logo_dog_body1.svg';
import React from 'react';
import './CommunityManagement.scss';
import { Tabs, Tab } from 'react-bootstrap';
import dogIcon from '../../images/travel_dog_paws.svg';
import { Link } from 'react-router-dom';
import { RiEditFill } from 'react-icons/ri';
import { MdOutlineClose } from 'react-icons/md';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { AiTwotoneLike } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import axios from 'axios';
import { API_URL } from '../../utils/config';
// import TripImport from '../../components/Community/PostComponent/TripImport';
import { handleSuccess } from '../../utils/handler/card/handleStatusCard';

// 驗證登入
import { useUserInfo } from '../../hooks/useUserInfo';

function CommunityManagement() {
  const { user, setUser } = useUserInfo();
  // console.log('使用者～！！', user.data.id);
  // let userID = user.data.id;
  // roll 全部貼文資料
  const [myTripPost, setMyTripPost] = useState([]);
  const [myPost, setMyPost] = useState([]);
  // 我的貼文ＩＤ點擊編輯查看內容跳轉
  const [myPostID, setMyPostID] = useState('');

  // 點擊按鈕狀態改變
  const [showCFBox, setShowCFBox] = useState(0);
  const [ifDelete, setIfDelete] = useState(false);
  const [ifLike, setifLike] = useState(true);

  const [unLikeID, setunLikeID] = useState('');
  // 我的貼文列表
  const [likeList, setLikeList] = useState([]);
  //匯入我的行程
  const [tripImport, setTripImport] = useState([]);
  //新增貼文
  const createTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  // 回傳新增貼文預設欄位
  const [tripID, setTripID] = useState('');
  //新增貼文預設標題欄位
  const [tripPostTitleDefault, setTripTitile] = useState('');

  // 取行程貼文總表
  useEffect(() => {
    const fetchMyTripPost = async () => {
      const result = await axios.get(`${API_URL}/community/tripPost`, {
        withCredentials: true,
      });
      // 取得後端來的資料
      console.log('行程貼文列表', result.data);
      setMyTripPost(result.data);
      // 存回 useState 狀態
    };
    fetchMyTripPost();
  }, [ifDelete]); //如果[]為空值只執行一次api // 若[]裡面的useState變數狀態改變重新執行api

  // 取一般貼文總表
  useEffect(() => {
    // let userID = user.data.id;
    // console.log(userID);
    const fetchMyPost = async () => {
      let userID = user.data.id;
      console.log('userID', userID);
      const result = await axios.get(`${API_URL}/community/postAll`, {
        userID,
      });
      // 取得後端來的資料
      console.log('一般貼文列表', result.data);
      setMyPost(result.data);
      // 存回 useState 狀態
    };
    fetchMyPost();
  }, [ifDelete]); //如果[]為空值只執行一次api // 若[]裡面的useState變數狀態改變重新執行api

  // // 取單一user 按讚貼文總表
  useEffect(() => {
    const fetchMyLikePost = async () => {
      const result = await axios.get(
        `${API_URL}/community/likesStatic`,

        {
          withCredentials: true,
        }
      );
      // 取得後端來的資料
      // console.log('取單一使用者按讚列表', result.data);
      setLikeList(result.data);
      console.log('我的按讚列表', likeList);
      // 存回 useState 狀態
    };
    fetchMyLikePost();
  }, [ifLike]);

  //匯入我的行程選單
  useEffect(() => {
    const fetchMyTrip = async () => {
      const result = await axios.get(
        `${API_URL}/community/tripDetailImport`,
        {},
        { withCredentials: true }
      );
      // 取得後端來的資料
      // console.log('fefefefe', result.data);
      // console.log(result.data);
      setTripImport(result.data);
      // 存回 useState 狀態
    };
    fetchMyTrip();
  }, []);

  //視窗狀態改變
  const ConfirmHandle = (e) => {
    setShowCFBox(e);
  };

  //刪除貼文
  const deleteConfirm = async (e) => {
    e.preventDefault();
    let deleteData = await axios.post(
      `${API_URL}/community`,
      {
        myPostID,
      },
      {
        withCredentials: true,
      }
    );
    console.log(deleteData, '資料刪除成功');
    handleSuccess('貼文刪除成功', '/admin/community');
    ConfirmHandle(0);
    setIfDelete(false);
  };
  //匯入行程新增貼文
  const creatNewTripPost = async (e) => {
    e.preventDefault();
    let creatData = await axios.post(`${API_URL}/community/tripPostNew`, {
      tripID,
      createTime,
      tripPostTitleDefault,
    });
    console.log(creatData, '行程貼文新增成功');
    handleSuccess('貼文匯入成功', '/admin/community');
    ConfirmHandle(0);
  };

  //TODO:取消按讚
  const unLikeHandle = async (e) => {
    e.preventDefault();
    console.log('取消按讚', unLikeID);
    let unlikeData = await axios.post(
      `${API_URL}/community/unlike`,
      { unLikeID },
      {
        withCredentials: true,
      }
    );
    console.log(unlikeData, '已取消按讚');
    setifLike(true);
    handleSuccess('已移除按讚');
    ConfirmHandle(0);
  };

  return (
    <>
      <div className="d-flex">
        <button className="post_new" onClick={() => ConfirmHandle(2)}>
          <RiEditFill color="#FFC715" className="edit-icon me-2"></RiEditFill>
          新增貼文
        </button>
        <div>
          <Tabs
            defaultActiveKey="article_list_post"
            id="uncontrolled-tab-example"
            className="communityManagementTab"
          >
            <Tab
              eventKey="article_list_post"
              title={
                <div className="d-flex">
                  <img className="tab_claw me-2 " src={dogIcon} alt="" />
                  <p className="my-2 tab_text_size">一般貼文</p>
                </div>
              }
            >
              <div className="post_list">
                <ul className="post_detail ">
                  {myPost.map((data, index) => {
                    return (
                      <>
                        <li
                          key={data.index}
                          className="d-flex justify-content-between align-items-center px-5"
                        >
                          <div className="post_description d-flex flex-column">
                            <div className="post_title">
                              <p className="">{data.post_title}</p>
                            </div>
                            <div className="post_date">
                              <p>發布日期：{data.create_time}</p>
                            </div>
                            <div className="post_edit_button d-flex">
                              <Link
                                to={
                                  data.post_type_id === 2
                                    ? `/postTripEdit?postID=${data.id}`
                                    : `/postEdit?postID=${data.id}`
                                }
                              >
                                <button
                                  value={data.id}
                                  className="btn post_edit my-1"
                                  onClick={(e) => {
                                    setMyPostID(e.target.value);
                                  }}
                                >
                                  編輯
                                </button>
                              </Link>
                              <button
                                key={data.id}
                                className="btn post_delete my-1"
                                onClick={(e) => {
                                  ConfirmHandle(1);
                                  setMyPostID(data.id);
                                }}
                              >
                                刪除
                              </button>
                              <Link
                                to={
                                  data.post_type_id === 2
                                    ? `/postTrip?postID=${data.id}`
                                    : `/post?postID=${data.id}`
                                }
                              >
                                <button
                                  className="btn check_post my-1"
                                  onClick={() => {
                                    setMyPostID(data.id);
                                  }}
                                >
                                  {data.status === 1 ? '查看內容' : '預覽'}
                                </button>
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-end py-5">
                            <div className="post_status ms-5">
                              {data.status === 1 ? '發布中' : '草稿'}
                            </div>
                            <div className="post_like mt-5 ms-5">
                              <AiTwotoneLike></AiTwotoneLike>
                              {data.likes}
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </Tab>
            <Tab
              eventKey="article_list_tripPost"
              title={
                <div className="d-flex">
                  <img className="tab_claw me-2 " src={dogIcon} alt="" />
                  <p className="my-2 tab_text_size">行程貼文</p>
                </div>
              }
            >
              <div className="post_list">
                <ul className="post_detail ">
                  {myTripPost.map((data, index) => {
                    return (
                      <>
                        <li
                          key={data.index}
                          className="d-flex justify-content-between align-items-center px-5"
                        >
                          <div className="post_description d-flex flex-column">
                            <div className="post_title">
                              <p className="">{data.post_title}</p>
                            </div>
                            <div className="post_date">
                              <p>發布日期：{data.create_time}</p>
                            </div>
                            <div className="post_edit_button d-flex">
                              <Link
                                to={
                                  data.post_type_id === 2
                                    ? `/postTripEdit?postID=${data.id}`
                                    : `/postEdit?postID=${data.id}`
                                }
                              >
                                <button
                                  value={data.id}
                                  className="btn post_edit my-1"
                                  onClick={(e) => {
                                    setMyPostID(e.target.value);
                                  }}
                                >
                                  編輯
                                </button>
                              </Link>
                              <button
                                key={data.id}
                                className="btn post_delete my-1"
                                onClick={(e) => {
                                  ConfirmHandle(1);
                                  setMyPostID(data.id);
                                }}
                              >
                                刪除
                              </button>
                              <Link
                                to={
                                  data.post_type_id === 2
                                    ? `/postTrip?postID=${data.id}`
                                    : `/post?postID=${data.id}`
                                }
                              >
                                <button
                                  className="btn check_post my-1"
                                  onClick={() => {
                                    setMyPostID(data.id);
                                  }}
                                >
                                  {data.status === 1 ? '查看內容' : '預覽'}
                                </button>
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-end py-5">
                            <div className="post_status ms-5">
                              {data.status === 1 ? '發布中' : '草稿'}
                            </div>
                            <div className="post_like mt-5 ms-5">
                              <AiTwotoneLike></AiTwotoneLike>
                              {data.likes}
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </Tab>
            <Tab
              eventKey="follow_post_list"
              title={
                <div className="d-flex">
                  <img className=" tab_claw me-2" src={dogIcon} alt="" />
                  <p className="my-2 tab_text_size">按讚貼文列表</p>
                </div>
              }
            >
              <div className="follow_post_list">
                <ul className="follow_post_detail">
                  {likeList.map((data, index) => {
                    return (
                      <>
                        <li className="d-flex flex-column" key={data.id}>
                          <div className="d-flex  justify-content-between ">
                            <div className="d-flex flex-column">
                              <div className="post_title ps-4 py-3">
                                <p className="">
                                  <BiLike className="me-2"></BiLike>
                                  {data.post_title}
                                </p>
                              </div>
                            </div>
                            <div className="post_edit_button d-flex ps-4 py-2 ">
                              <button
                                value={data.post_id}
                                className="btn remove_follow my-1 "
                                onClick={(e) => {
                                  ConfirmHandle(3);
                                  setunLikeID(e.target.value);
                                  setifLike(false);
                                }}
                              >
                                取消按讚
                              </button>
                              <Link
                                to={
                                  data.post_type_id === 2
                                    ? `/postTrip?postID=${data.id}`
                                    : `/post?postID=${data.id}`
                                }
                              >
                                <button className="btn follower_checked_detail my-1">
                                  查看內容
                                </button>
                              </Link>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </Tab>
          </Tabs>
        </div>
        <div
          className={
            showCFBox === 2
              ? 'confirmBox_background d-flex justify-content-center d-block'
              : 'd-none'
          }
          // onClick={() => {
          //   ConfirmHandle(0);
          // }}
        >
          <div
            className={
              showCFBox === 2
                ? 'create_post_confirm_box d-flex flex-column align-items-center justify-content-center d-block'
                : 'd-none'
            }
          >
            <p>
              請選擇貼文形式
              <MdOutlineClose
                className="close_icon"
                onClick={() => {
                  ConfirmHandle(0);
                }}
              ></MdOutlineClose>
            </p>
            <Link to="/postEdit">
              <button className="confirm_button">一般貼文</button>
            </Link>
            <button
              className="confirm_button"
              onClick={() => {
                ConfirmHandle(4);
              }}
            >
              行程貼文<br></br>（需匯入行程）
            </button>
          </div>
        </div>
        <div
          className={
            showCFBox === 1
              ? 'confirmBox_background d-flex justify-content-center d-block'
              : 'd-none'
          }
          // onClick={(e) => ConfirmHandle(0)}
        >
          <div
            className={
              showCFBox === 1
                ? 'delete_confirm_box d-flex flex-column align-items-center justify-content-center d-block'
                : 'd-none'
            }
          >
            <p>
              是否確認刪除？
              <MdOutlineClose
                className="close_icon"
                onClick={(e) => {
                  ConfirmHandle(0);
                  setIfDelete(true);
                }}
              ></MdOutlineClose>
            </p>
            <Link to="/admin">
              <button className="confirm_button" onClick={deleteConfirm}>
                確認
              </button>
            </Link>
          </div>
        </div>
        <div
          className={
            showCFBox === 3
              ? 'confirmBox_background d-flex justify-content-center d-block'
              : 'd-none'
          }
          // onClick={(e) => {
          //   ConfirmHandle(0);
          // }}
        >
          <div
            className={
              showCFBox === 3
                ? 'delete_follow_box d-flex flex-column align-items-center justify-content-center d-block'
                : 'd-none'
            }
          >
            <p>
              確認取消按讚？
              <MdOutlineClose
                className="close_icon"
                onClick={(e) => {
                  ConfirmHandle(0);
                }}
              ></MdOutlineClose>
            </p>
            <button className="confirm_button" onClick={unLikeHandle}>
              確認
            </button>
          </div>
        </div>
        {/* TODO: 跑不出來！！ 事件聆聽功能 */}
        <div
          className={
            showCFBox === 4
              ? 'confirmBox_background d-flex justify-content-center d-block'
              : 'd-none'
          }
          // onClick={(e) => {
          //   ConfirmHandle(0);
          // }}
        >
          <div className="trip-sample ">
            <div className="d-block d-flex flex-column align-items-center my-2 container">
              <p className="mb-2">
                請下拉選擇{' '}
                <MdOutlineClose
                  className="close_icon"
                  onClick={() => {
                    ConfirmHandle(0);
                  }}
                ></MdOutlineClose>
              </p>
              <select
                className="form-control mb-2"
                placeholder="請選擇我的行程"
                onChange={(e) => {
                  setTripID(tripImport[e.target.value].id);
                  setTripTitile(tripImport[e.target.value].title);
                  // console.log('name', tripImport[e.target.value].title);
                  // console.log('value', tripImport[e.target.value].id);
                }}
              >
                <option>請選擇匯入的行程</option>
                {tripImport.map((data, index) => {
                  return (
                    <>
                      <option
                        onClick={() => {
                          setTripTitile(data.title);
                          console.log('titlew', tripPostTitleDefault);
                        }}
                        value={index}
                      >
                        {data.title}
                      </option>
                    </>
                  );
                })}
              </select>
              <button className="confirm_button" onClick={creatNewTripPost}>
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityManagement;
