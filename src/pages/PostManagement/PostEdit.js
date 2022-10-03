import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, BE_URL } from '../../utils/config';
import './PostEdit.scss';
import CoverBackground from '../../images/社群假圖1280.png';
import mapPhoto from '../../images/screenshop map_photo.png';
import { MdLocationOn } from 'react-icons/md';
import dogIcon from '../../images/travel_dog_paws.svg';
import PostEditor from '../../components/WYSIWYG/PostEditor';
import { AiFillTag } from 'react-icons/ai';
import { MdTitle } from 'react-icons/md';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useParams, useLocation } from 'react-router-dom';
import { handleSuccess } from '../../utils/handler/handleStatusCard';
import moment from 'moment';

function PostWYSIWYGEdit() {
  // === 貼文ID從網址字串抓 ===
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const postID = urlSearchParams.get('postID');
  console.log(postID);

  // === 編輯時預覽圖片用 ===
  const [showPhoto, setShowPhoto] = useState('');

  // 登入狀態驗證
  const { user, setUser } = useUserInfo();
  // console.log('useUserInfo', user.data.id);

  // === 學儒封面照片上傳可直接預覽State ===
  const [selectedFile, setSelectedFile] = useState('');
  const [preview, setPreview] = useState('');

  // === 取得所見即所得欄位資料  ===
  const [getData, setGetData] = useState('');

  // === 取得一般欄位資料 ===
  const [postData, setPostData] = useState({
    title: '',
    location: '',
    tags: '',
    photo: '',
    content: '',
  });
  // const [postTitle, setPostTitle] = useState('');

  // 匯入資料庫資料
  // TODO: showPhoto預覽圖片完成
  useEffect(() => {
    const userID = user.data.id;
    const fetchPost = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/post/postDetail?postID=${postID}`,
          {
            withCredentials: true,
            userID,
          }
        );
        // 取得後端來的資料
        console.log('result,data', result.data);
        setPostData(result.data);
        setShowPhoto(
          result.data[0].post_main_photo
            ? BE_URL + '/' + result.data[0].post_main_photo
            : CoverBackground
        );
      } catch (err) {
        console.log('setPost', err);
      }

      // 存回 useState 狀態
    };
    fetchPost();
  }, []);

  // === 將輸入欄位資料存入State裡 ===
  function handleChange(e) {
    console.log('handleChange', e.target.name, e.target.value);
    let newPostData = { ...postData };
    newPostData[e.target.name] = e.target.value;
    setPostData(newPostData);
  }

  // === 所見即所得，輸入資料更新用 ===
  const handleGetDataChange = (e, editor) => {
    const data = editor.getData();
    setGetData(data);
  };

  // === 清空按鈕 ===
  const handleClick = (e) => {
    e.preventDefault();
    setPostData({ title: '', location: '', tags: '', photo: '' });
    setGetData('');
  };

  // === 圖片上傳 ===
  function handleUpload(e) {
    setPostData({ ...postData, photo: e.target.files[0] });

    const file = e.target.files[0];

    if (file) {
      // setIsFilePicked(true);
      setSelectedFile(file);
      // setImgServerUrl('');
    } else {
      // setIsFilePicked(false);
      setSelectedFile(null);
      // setImgServerUrl('');
    }
  }

  // 圖片預覽
  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // === 送出 (發布狀態1) ===
  async function handleSubmit(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      let status = 1;
      let post_type = 1;
      let userID = user.data.id;
      let post_id = postID;
      console.log('userID', userID);
      let create_time = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log(userID);
      // 要上傳的FormData
      let formData = new FormData();
      formData.append('title', postData.title);
      formData.append('location', postData.location);
      formData.append('content', getData);
      formData.append('tags', postData.tags);
      formData.append('photo', postData.photo);
      formData.append('create_time', create_time);
      formData.append('user_id', userID);
      formData.append('status', status);
      formData.append('post_type_id', post_type);
      formData.append('post_id', post_id);

      let response = await axios.post(`${API_URL}/post/postEdit`, formData);
      console.log(response.data);
      handleSuccess('貼文發布成功', '/admin/community');
    } catch (e) {
      console.error('postEdit', e);
    }
  }

  /// === 草稿 (草稿狀態2) ===
  async function handleDraft(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      let post_id = postID;
      let status = 2;
      let post_type = 1;
      let userID = user.data.id;
      console.log('userID', userID);
      let create_time = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log(userID);
      // 要上傳的FormData
      let formData = new FormData();
      formData.append('title', postData.title);
      formData.append('location', postData.location);
      formData.append('content', getData);
      formData.append('tags', postData.tags);
      formData.append('photo', postData.photo);
      formData.append('create_time', create_time);
      formData.append('user_id', userID);
      formData.append('status', status);
      formData.append('post_type_id', post_type);
      formData.append('post_id', post_id);

      let response = await axios.post(`${API_URL}/post/postEdit`, formData);
      console.log(response.data);
      handleSuccess('貼文儲存成功', '/admin/community');
    } catch (e) {
      console.error('postEdit', e);
    }
  }

  // console.log('postData', postData);
  // console.log('postData[0]', postData[0] ? postData[0].user_id : '');
  console.log('postData', postData);
  return (
    <>
      <div className="cummunity_postEdit">
        <div className="d-flex justify-content-center">
          <form className="post_edit_bar d-flex flex-column">
            <div className="d-flex justify-content-between">
              <div className="mt-2 edit_title d-flex align-items-center">
                <img alt="" src={dogIcon} className="dog_paw_icon me-2"></img>
                <p className="mt-3">貼文編輯：一般貼文</p>
              </div>
              <div className="d-flex justify-content-end mt-4 post_edit_button ">
                <button className="btn" onClick={handleClick}>
                  清空
                </button>
                <button className="btn" onClick={handleDraft}>
                  儲存草稿
                </button>
                <button className="btn" onClick={handleSubmit}>
                  發布
                </button>
              </div>
            </div>

            <div className="post_cover_photo d-flex flex-column justify-content-end align-items-end">
              <img src={preview ? preview : showPhoto} alt=""></img>

              <label className="cover_photo_upload d-flex flex-column justify-content-center align-items-center">
                <MdPhotoSizeSelectActual className="cover_photo_upload_icon"></MdPhotoSizeSelectActual>
                <div>封面照片上傳</div>
                <input
                  className="form-control mt-2"
                  accept="image/*"
                  hidden
                  type="file"
                  id="photo"
                  name="photo"
                  // defaultValue={postData[0] ? postData[0].photo : ''}
                  onChange={handleUpload}
                />
              </label>
            </div>
            <label className="mt-2">
              <MdTitle className="mb-1 me-1"></MdTitle>貼文標題
            </label>
            <input
              className="form-control mt-2"
              placeholder="請輸入貼文標題"
              maxLength="50"
              type="text"
              id="title"
              name="title"
              defaultValue={postData[0] ? postData[0].post_title : ''}
              onChange={handleChange}
            />
            <div className="d-flex row">
              <div className="col-6">
                <label className="mt-3">
                  <MdLocationOn className="mb-1 me-1"></MdLocationOn>地點
                </label>
                <input
                  className="form-control mt-2"
                  placeholder="請輸入城市地區"
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={postData[0] ? postData[0].coordinate : ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label className="mt-3">
                  <AiFillTag className="mb-1 me-1"></AiFillTag>標籤
                  (請輸入＃區分標籤)
                </label>
                <input
                  className="form-control mt-2"
                  placeHolder="#台北市"
                  type="text"
                  id="tags"
                  name="tags"
                  defaultValue={postData[0] ? postData[0].coordinate : ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr></hr>
            <form className="my-2">
              <p>貼文編輯器</p>
              <PostEditor
                // getData={getData}
                postData={postData}
                setGetData={setGetData}
                handleContentChange={handleGetDataChange}
              />
              {/* <h3>{getData}</h3> */}
              {/* <PostEditor /> */}
              {/* <label
              className="photo_upload d-flex align-items-center
              justify-content-center"
            >
              上傳照片
              <input
                type="file"
                accept="images/*"
                hidden
                // onChange={changeHandler}
                multiple
                className="form-control"
              ></input>
            </label>

            <label className="post_photo_upload">
              <input type="file" accept="image/*" multiple hidden />
            </label>
            <PhotoReviewSwiperDefault></PhotoReviewSwiperDefault> */}
            </form>
            {/* <div className="post_map">
              <p>行程地圖</p>
              <div className="map_photo">
                <img alt="" src={mapPhoto} />
              </div>
            </div> */}
            <div className="d-flex justify-content-end my-3  post_edit_button ">
              <button className="btn" onClick={handleClick}>
                清空
              </button>
              <button className="btn" onClick={handleDraft}>
                儲存草稿
              </button>
              <button className="btn" onClick={handleSubmit}>
                發布
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostWYSIWYGEdit;
