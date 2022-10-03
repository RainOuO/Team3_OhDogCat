import React, { useState, useEffect } from 'react';
import './PostTripEdit.scss';
import CoverBackground from '../../images/社群假圖1280.png';
import { Link } from 'react-router-dom';
import { TiLocation } from 'react-icons/ti';
import { AiFillTag, AiOutlineConsoleSql } from 'react-icons/ai';
import dogIcon from '../../images/travel_dog_paws.svg';
import { MdTitle } from 'react-icons/md';
// import PostSwiper from '../../components/WYSIWYG/Swiper';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import { MdOutlineClose } from 'react-icons/md';
import PostMap from '../../components/Community/PostComponent/CommunityGoogleMaps';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import TripOutline from '../../components/Community/PostComponent/TripOutline';
import PhotoReviewSwiper from '../../components/WYSIWYG/PhotoView';
import { useParams, useLocation } from 'react-router-dom';
import { handleSuccess } from '../../utils/handler/card/handleStatusCard';
import { BE_URL } from '../../utils/config';
import moment from 'moment';
import { handleLoginCard } from '../../utils/handler/card/handleInputCard';
// import { handleInfoComfirm } from '../../utils/handler/card/handleStatusCard';
import GoogleMaps from '../../pages/Travel_map/Travel_map';

// 驗證登入
import { useUserInfo } from '../../hooks/useUserInfo';

function PostTripEdit() {
  const { user, setUser } = useUserInfo();

  // window.onbeforeunload = function (e) {
  //   var e = window.event || e;
  //   handleInfoComfirm('編輯狀態 確定離開當前頁面嗎？');
  // };
  //原始資料
  const [postTripEdit, setPostTripEdit] = useState([]);
  // 單一頁面ＩＤ

  // 景點資料存取狀態：
  // 景點ＩＤ
  const [locateID, setLocateID] = useState('');
  // 行程ＩＤ
  const [travelID, setTravelID] = useState('');
  // 貼文標題
  const [tripPostTitle, setTripPostTitle] = useState('');
  // 貼文封面照片
  const [tripPostCover, setTripPostCover] = useState('');
  // 行程地點
  const [tripPostLocMark, setTripPostLocMark] = useState('');
  // 行程標籤
  const [tripPostTags, setTripPostTags] = useState('');
  // 內文偵測
  const [ifUpdate, setIfUpdate] = useState(false);
  // 景點內文
  const [tripPostLocContext, setTripPostLocContext] = useState([]);
  // 景點停留備註
  const [tripPostIntro, setTripPostIntro] = useState([]);
  //貼文狀態
  const [postState, setPostState] = useState('');
  //預覽照片 (封面照片)
  const [selectedCoverFile, setSelectedCoverFile] = useState('');
  const [preview, setPreview] = useState('');
  const [coverFile, setCoverFile] = useState({ photo: '', postID: '' });

  // 貼文ＩＤ從網址字串抓
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const postID = urlSearchParams.get('postID');
  const updateTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

  //預計打回後端資料庫的物件 (文字編輯新增)
  // 打包整筆資料可編輯更新
  const updateObject = {
    travel_id: travelID,
    title: tripPostTitle,
    coordinate: tripPostLocMark,
    tags: tripPostTags,
    updateTime: updateTime,
  };

  //拆景點明細更新（需特別處理）
  const locateDetail = {
    id: locateID,
    locate_context: tripPostLocContext,
    locate_intro: tripPostIntro,
  };
  useEffect(() => {
    console.log('=====家豪看這===簡介==', tripPostIntro);
    console.log('=====家豪看這===內文==', tripPostLocContext);
    console.log('看這ＩＤ＝＝＝＝＝＝', locateID);
  }, [tripPostIntro, tripPostLocContext]);

  // 單獨取行程明細get
  useEffect(() => {
    const fetchPostTripEdit = async (req, res) => {
      // const user_id = req.session.user.id;
      // console.log('user', user_id);
      if (user.auth) {
        try {
          const result = await axios.get(
            `${API_URL}/community/tripPostDetail?postID=${postID}`
          );
          // 取得後端來的資料
          console.log('result,data', result.data);
          if (result) {
            let daysFilter = [];
            // 分組按照日期分組
            let locateIDData = [];
            let contextData = [];
            let photoData = [];
            let introData = [];

            for (const [index, item] of result.data.entries()) {
              if (daysFilter.length === 0) {
                daysFilter.push([item]);
                locateIDData.push([item.id]);
                contextData.push([item.locate_context]);
                photoData.push([item.locate_photo]);
                introData.push([item.locate_intro]);
              } else if (
                daysFilter[daysFilter.length - 1][0].days !== item.days
              ) {
                daysFilter.push([item]);
                locateIDData.push([item.id]);
                contextData.push([item.locate_context]);
                photoData.push([item.locate_photo]);
                introData.push([item.locate_intro]);
              } else {
                daysFilter[daysFilter.length - 1].push(item);
                locateIDData[daysFilter.length - 1].push(item.id);
                contextData[daysFilter.length - 1].push(item.locate_context);
                photoData[daysFilter.length - 1].push(item.locate_photo);
                introData[daysFilter.length - 1].push(item.locate_intro);
              }
            }
            console.log('dayfileter', daysFilter);
            setPostTripEdit(daysFilter);
            setLocateID(locateIDData);
            setTripPostLocContext(contextData);
            setTripPostIntro(introData);
            setTravelID(result.data[0].travel_id);
            setTripPostTitle(result.data[0].post_title);
            setTripPostCover(
              result.data[0].post_main_photo
                ? BE_URL + '/post/' + result.data[0].post_main_photo
                : CoverBackground
            );
            setTripPostLocMark(result.data[0].coordinate);
            setTripPostTags(result.data[0].tags);
          }
        } catch (err) {
          console.log('setPostTripEdit ', err);
        }
      } else {
        handleLoginCard({ isLogin: true }, setUser);
      }
    };
    fetchPostTripEdit();
  }, []);

  // 偵測改變

  //編輯後回傳資料庫post
  //文字儲存

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('需要回傳的景點明細', locateDetail);
    console.log('需要回傳的貼文明細', updateObject);
    let responseData = await axios.post(
      `${API_URL}/community/tripPostDetailEdit`,
      { updateObject, locateDetail }
    );

    console.log('回傳編輯資料', responseData);
    console.log('發布狀態', postState);
    handleSuccess('貼文儲存成功', '/admin/community');
  };

  //TODO: 發布改變貼文狀態(發布貼文)
  const handleRelease = async (e) => {
    e.preventDefault();
    setPostState(e.target.value);
    console.log('stew');
    console.log(postState, postID);
    let res = await axios.post(`${API_URL}/community/release`, {
      postID,
      postState,
    });
    console.log('貼文發布成功', res);
    handleSuccess('貼文發布成功', `/postTrip?postID=${postID}`);
  };

  //TODO:轉換成字串存放在對應陣列

  //預覽 上傳封面照片 我要哭了
  useEffect(() => {
    if (!selectedCoverFile) {
      setCoverFile({ photo: CoverBackground, postID: postID });
      //test
      setPreview('');
      return;
    }
    if (coverFile) {
      // async function changeCoverHandler(e) {
      let formData = new FormData();
      // setCoverFile({ ...coverFile, photo: e.name.value });
      // console.log('coverFile!', coverFile);
      console.log('該貼文ＩＤ', postID);
      formData.append('postID', coverFile.postID);
      formData.append('photo', coverFile.photo);

      //TODO:為何觸發事件無法即時設定useState?
      try {
        console.log('formData', formData);
        let response = axios.post(
          `${API_URL}/community/tripPostCoverUpload`,
          formData
        );
        console.log('封面照片新增成功', response);
      } catch (e) {
        console.log('錯誤', e);
      }
      // }
    }

    const objectUrl = URL.createObjectURL(selectedCoverFile);
    console.log(objectUrl);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [coverFile, postID, selectedCoverFile]);

  //預覽 上傳單點照片 ＱＱ

  return (
    <>
      {postTripEdit.length === 0 ? (
        '沒有資料' //* 是否做loading 頁面
      ) : (
        <div className="post_trip_edit_bar d-flex flex-column">
          <form className="post_edit_bar d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="mt-2 edit_title d-flex align-items-center">
                <img alt="" src={dogIcon} className="dog_paw_icon me-2"></img>
                <p className="mt-3">貼文編輯：行程貼文</p>
              </div>
              <div className="d-flex justify-content-end mt-4 post_edit_button ">
                <button className="btn" onClick={handleSubmit}>
                  儲存
                </button>
                {postTripEdit[0][0].status === 2 ? (
                  <button className="btn" value="1" onClick={handleRelease}>
                    發布
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="post_cover_photo d-flex flex-column justify-content-end align-items-end">
              <img
                src={preview ? preview : tripPostCover}
                style={{ objectFit: 'cover' }}
                alt=""
              ></img>
              <label className="cover_photo_upload d-flex flex-column justify-content-center align-items-center">
                <MdPhotoSizeSelectActual className="cover_photo_upload_icon"></MdPhotoSizeSelectActual>
                <div>封面照片上傳</div>
                <input
                  id="coverPhoto"
                  name="coverPhoto"
                  type="file"
                  className="form-control mt-2"
                  accept="image/*"
                  onChange={(e) => {
                    setCoverFile({ photo: e.target.files[0], postID: postID });
                    setSelectedCoverFile(e.target.files[0]);
                    // console.log('按鈕', coverFile);
                  }}
                  hidden
                />
              </label>
            </div>
            <label
              className="mt-2 post_detailBar"
              style={{ objectFit: 'cover' }}
            >
              <MdTitle className="mb-1 me-1"></MdTitle>貼文標題
            </label>
            <input
              type="text"
              className="form-control mt-2"
              maxLength="50"
              defaultValue={postTripEdit[0][0].post_title}
              //TODO:預設值直接設tripPostTitle
              onChange={(e) => {
                setTripPostTitle(e.target.value);
              }}
            />
            <div className="d-flex row">
              <div className="col-6">
                <label className="mt-3 post_detailBar">
                  <TiLocation className="mb-1 me-1"></TiLocation>地點
                </label>
                <input
                  type="loaction"
                  className="form-control mt-2"
                  placeholder="請輸入城市地區"
                  defaultValue={tripPostLocMark}
                  onChange={(e) => {
                    setTripPostLocMark(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-6">
                <label className="mt-3 post_detailBar">
                  <AiFillTag className="mb-1 me-1"></AiFillTag>標籤
                  (請輸入＃區分標籤)
                </label>
                <input
                  name="id"
                  type="location"
                  className="form-control mt-2"
                  placeholder="輸入標籤分類貼文類型"
                  defaultValue={tripPostTags}
                  onChange={(e) => {
                    setTripPostTags(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <hr></hr>
            <div className="d-flex align-items-start justify-content-around">
              <div className="article_edit">
                {postTripEdit.map((data, index) => {
                  return (
                    <>
                      <div>
                        <div className="date_count mt-1">
                          <p>Day {data[0].days} </p>
                        </div>
                        {data.map((data, i) => {
                          return (
                            <>
                              <li
                                className="trip_location mt-3"
                                id={`day${data.days}locate${i}`}
                                key={i}
                              >
                                <div className="trip_location_title d-flex align-items-start row ">
                                  <div className="d-flex my-1 flex-column col-7">
                                    <div className="d-flex">
                                      <div className="post_location_name mt-2 mx-1">
                                        <TiLocation className="mb-1 me-2"></TiLocation>{' '}
                                        {data.locate_name}
                                      </div>
                                      <input
                                        type="text"
                                        className="input_bar mx-2 mb-1 small"
                                        placeholder="請輸入行程簡介"
                                        defaultValue={data.locate_intro}
                                        onChange={(e) => {
                                          setTripPostIntro((intro) => {
                                            let newIntro = JSON.parse(
                                              JSON.stringify([...intro])
                                            );
                                            setIfUpdate(true);
                                            newIntro[index][i] = e.target.value;
                                            return newIntro;
                                          });
                                        }}
                                        //TODO:樣式太醜w
                                      ></input>
                                    </div>
                                    <textarea
                                      type="textarea"
                                      className="form-control"
                                      rows="14"
                                      maxLength="200"
                                      placeholder="為旅途留下回憶"
                                      defaultValue={data.locate_context}
                                      onChange={(e) => {
                                        setTripPostLocContext((context) => {
                                          let newState = JSON.parse(
                                            JSON.stringify([...context])
                                          );
                                          setIfUpdate(true);
                                          newState[index][i] = e.target.value;
                                          return newState;
                                        });
                                      }}
                                    ></textarea>
                                  </div>

                                  <div className="col-5">
                                    <PhotoReviewSwiper
                                      list={data}
                                    ></PhotoReviewSwiper>
                                  </div>
                                </div>
                              </li>
                              <hr></hr>
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
              <TripOutline post={postTripEdit}></TripOutline>
            </div>
            <div className="d-flex justify-content-end my-1 post_edit_button ">
              <button className="btn" onClick={handleSubmit}>
                儲存
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default PostTripEdit;
