// import React, { useState, useEffect } from 'react';
// import './PostTripEdit.scss';
// import CoverBackground from '../../images/post_edit_background_banner.png';
// // import { Link } from 'react-router-dom';
// import { TiLocation } from 'react-icons/ti';
// import { AiFillTag, AiOutlineConsoleSql } from 'react-icons/ai';
// import dogIcon from '../../images/travel_dog_paws.svg';
// import { MdTitle } from 'react-icons/md';
// // import PostSwiper from '../../components/WYSIWYG/Swiper';
// import { MdPhotoSizeSelectActual } from 'react-icons/md';
// import { RiEditFill } from 'react-icons/ri';
// import { MdOutlineClose } from 'react-icons/md';
// import PostMap from '../../components/Community/PostComponent/PostMap';
// import { IoMdAdd } from 'react-icons/io';
// import axios from 'axios';
// import { API_URL } from '../../utils/config';
// import TripOutline from '../../components/Community/PostComponent/TripOutline';
// import PhotoReviewSwiper from '../../components/WYSIWYG/PhotoView';

// function PostTripEdit() {
//   const [postTripEdit, setPostTripEdit] = useState([]);

//   // 景點資料存取狀態：
//   // 貼文標題
//   const [tripPostTitle, setTripPostTitle] = useState('');
//   // 貼文封面照片
//   const [tripPostCover, setTripPostCover] = useState('');
//   // 行程地點
//   const [tripPostLocMark, setTripPostLocMark] = useState('');
//   // 行程標籤
//   const [tripPostTags, setTripPostTags] = useState('');
//   // 景點內文
//   const [tripPostLocContext, setTripPostLocContext] = useState([]);
//   // 景點照片
//   const [tripPostLocPhoto, setTripPostLocPhoto] = useState([]);
//   // 景點停留時間
//   const [tripPostLocTime, setTripPostLocTime] = useState('');

//   // console.log('照片及',photoList);
//   //預計打回後端資料庫的物件 (新增)

//   // 單獨取行程明細
//   useEffect(() => {
//     const fetchPostTripEdit = async () => {
//       try {
//         const result = await axios.get(`${API_URL}/community/tripPostDetail`);
//         // 取得後端來的資料
//         // const data2 = await result.data;
//         if (result) {
//           let daysFilter = [];
//           // 分組按照日期分組
//           let contextData = [];
//           let photoData = [];
//           let timeData = [];

//           for (const [index, item] of result.data.entries()) {
//             // console.log('item==========', item);
//             // console.log('物件id==========', item.id);
//             // console.log('新陣列index==========', index);
//             if (daysFilter.length === 0) {
//               daysFilter.push([item]);
//               contextData.push([item.locate_context]);
//               photoData.push([item.locate_photo]);
//               timeData.push([item.locate_duration]);
//             } else if (
//               daysFilter[daysFilter.length - 1][0].days !== item.days
//             ) {
//               daysFilter.push([item]);
//               contextData.push([item.locate_context]);
//               photoData.push([item.locate_photo]);
//               timeData.push([item.locate_duration]);
//             } else {
//               daysFilter[daysFilter.length - 1].push(item);
//               contextData[daysFilter.length - 1].push(item.locate_context);
//               photoData[daysFilter.length - 1].push(item.locate_photo);
//               timeData[daysFilter.length - 1].push(item.locate_duration);
//             }
//           }
//           setPostTripEdit(daysFilter);
//           setTripPostLocContext(contextData);
//           setTripPostLocPhoto(photoData);
//           setTripPostLocTime(timeData);
//           // console.log('daysFilter==========', daysFilter);
//           setTripPostTitle(result.data[0].title);
//           setTripPostCover(result.data[0].main_photo);
//           setTripPostLocMark(result.data[0].coordinate);
//           setTripPostTags(result.data[0].tags);
//         }
//       } catch (err) {
//         console.log('setPostTripEdit ', err);
//       }
//       // 存回 useState 狀態
//     };
//     fetchPostTripEdit();
//   }, []);

//   //回傳資料庫
//   async function handleSubmit(e) {
//     e.preventDefault();
//     let response = await axios.post(`${API_URL}/community/tripPostDetailEdit`);
//     console.log('回傳', response);
//   }

//   // 打包整筆資料可編輯更新
//   const object = {
//     title: tripPostTitle,
//     main_photo: tripPostCover,
//     coordinate: tripPostLocMark,
//     tags: tripPostTags,
//     locate_photo: tripPostLocPhoto, //how to retreive the data
//     locate_context: tripPostLocContext, //how to retreive the data
//     locate_duration: tripPostLocTime,
//   };
//   console.log('object', object);

//   //預覽照片 (封面照片)
//   const [selectedCoverFile, setSelectedCoverFile] = useState('');

//   const [preview, setPreview] = useState('');
//   useEffect(() => {
//     if (!selectedCoverFile) {
//       setPreview('');
//       return;
//     }
//     const objectUrl = URL.createObjectURL(selectedCoverFile);
//     console.log(objectUrl);
//     setPreview(objectUrl);

//     return () => URL.revokeObjectURL(objectUrl);
//   }, [selectedCoverFile]);

//   const changeCoverHandler = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setTripPostCover(e.target.value);
//       setSelectedCoverFile(file);
//     } else {
//       setTripPostCover(e.target.value);
//       setSelectedCoverFile(null);
//     }
//   };

//   const [selectedPhotoFile, setSelectedPhotoFile] = useState('');
//   const changePhotoHandler = (e) => {
//     const files = e.target.files;
//     console.log(files);

//     const photoGroup = [];
//     for (let i = 0; i < files.length; i++) {
//       // console.log(files[i]['name']);
//       photoGroup.push(files[i]['name']);
//     }

//     console.log('Newphotogroup', photoGroup);
//     let a = photoGroup.toString();
//     console.log(a);

//     //TODO:轉換成字串存放在對應陣列

//     if (files) {
//       // setTripPostLocPhoto(photoGroup);
//       setSelectedPhotoFile(files);
//     } else {
//       // setTripPostLocPhoto(photoGroup);
//       setSelectedPhotoFile(null);
//     }
//   };

//   // reset the form input value

//   const resetForm = (e) => {
//     setTripPostLocContext('');
//     setTripPostLocPhoto('');
//     setTripPostLocTime('');
//     setTripPostTitle('');
//     setTripPostLocMark('');
//     setTripPostTags('');
//   };

//   return (
//     <>
//       {postTripEdit.length === 0 ? (
//         '沒有資料' //* 是否做loading 頁面
//       ) : (
//         <div className="post_trip_edit_bar d-flex flex-column">
//           <form className="post_edit_bar d-flex flex-column" method="post">
//             <div className="d-flex justify-content-between">
//               <div className="mt-2 edit_title d-flex align-items-center">
//                 <img alt="" src={dogIcon} className="dog_paw_icon me-2"></img>
//                 <p className="mt-3">貼文編輯：行程貼文</p>
//               </div>
//               <div className="d-flex justify-content-end mt-4 post_edit_button ">
//                 <button className="btn" onClick={resetForm}>
//                   清空
//                 </button>
//                 <button className="btn" onClick={handleSubmit}>
//                   儲存
//                 </button>
//                 <button className="btn">發布</button>
//               </div>
//             </div>
//             <div className="post_cover_photo d-flex flex-column justify-content-end align-items-end">
//               <img
//                 src={preview ? preview : postTripEdit[0][0].main_photo}
//                 alt=""
//               ></img>
//               <label className="cover_photo_upload d-flex flex-column justify-content-center align-items-center">
//                 <MdPhotoSizeSelectActual className="cover_photo_upload_icon"></MdPhotoSizeSelectActual>
//                 <div>封面照片上傳</div>
//                 <input
//                   type="file"
//                   className="form-control mt-2"
//                   accept="image/*"
//                   onChange={changeCoverHandler}
//                   hidden
//                 />
//               </label>
//             </div>
//             <label className="mt-2">
//               <MdTitle className="mb-1 me-1"></MdTitle>貼文標題
//             </label>
//             <input
//               type="text"
//               className="form-control mt-2"
//               maxLength="50"
//               defaultValue={postTripEdit[0][0].title}
//               //TODO:預設值直接設tripPostTitle
//               onChange={(e) => {
//                 setTripPostTitle(e.target.value);
//               }}
//             />
//             <div className="d-flex row">
//               <div className="col-6">
//                 <label className="mt-3">
//                   <TiLocation className="mb-1 me-1"></TiLocation>地點
//                 </label>
//                 <input
//                   type="loaction"
//                   className="form-control mt-2"
//                   placeholder="請輸入城市地區"
//                   defaultValue={tripPostLocMark}
//                   onChange={(e) => {
//                     setTripPostLocMark(e.target.value);
//                   }}
//                 ></input>
//               </div>
//               <div className="col-6">
//                 <label className="mt-3">
//                   <AiFillTag className="mb-1 me-1"></AiFillTag>標籤
//                   (請輸入＃區分標籤)
//                 </label>
//                 <input
//                   type="location"
//                   className="form-control mt-2"
//                   placeholder="輸入標籤分類貼文類型"
//                   defaultValue={tripPostTags}
//                   onChange={(e) => {
//                     setTripPostTags(e.target.value);
//                   }}
//                 ></input>
//               </div>
//             </div>
//             <hr></hr>
//             <div className="d-flex align-items-start justify-content-around">
//               <div className="article_edit">
//                 {postTripEdit.map((data, index) => {
//                   console.log('data================', data);
//                   return (
//                     <>
//                       <div>
//                         <div className="date_count mt-1">
//                           <p>Day {data[index].days} </p>
//                         </div>
//                         {data.map((data, i) => {
//                           return (
//                             <>
//                               <li
//                                 className="trip_location mt-3"
//                                 id={`day${data.days}locate${i}`}
//                                 key={data.i}
//                               >
//                                 <div className="d-flex justify-content-between align-items-center">
//                                   <div className="trip_location_title d-flex align-items-center">
//                                     <div className="d-flex my-1">
//                                       <div className="post_location_name mb-1 mx-1">
//                                         <TiLocation className="mb-1 me-2"></TiLocation>{' '}
//                                         {data.locate_name}
//                                       </div>
//                                       <input
//                                         type="text"
//                                         className="post_location_duration mx-1 mt-1 small"
//                                         defaultValue={data.locate_duration}
//                                         onChange={(e) => {
//                                           setTripPostLocTime((time) => {
//                                             let newTime = JSON.parse(
//                                               JSON.stringify([...time])
//                                             );
//                                             newTime[index][i] = e.target.value;
//                                             return newTime;
//                                           });
//                                         }}
//                                         //TODO:樣式太醜
//                                       ></input>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <textarea
//                                   type="textarea"
//                                   className="form-control"
//                                   rows="4"
//                                   maxLength="100"
//                                   placeholder="為旅途留下回憶"
//                                   defaultValue={data.locate_context}
//                                   onChange={(e) => {
//                                     setTripPostLocContext((context) => {
//                                       let newState = JSON.parse(
//                                         JSON.stringify([...context])
//                                       );
//                                       newState[index][i] = e.target.value;
//                                       return newState;
//                                     });
//                                   }}
//                                 ></textarea>
//                                 <label className="photo_upload d-flex align-items-center justify-content-center">
//                                   上傳照片
//                                   <input
//                                     type="file"
//                                     accept="images/*"
//                                     hidden
//                                     multiple
//                                     className="form-control"
//                                     onChange={changePhotoHandler}
//                                     //TODO:如何存取？
//                                     // onChange={(e) => {
//                                     //   setTripPostLocPhoto((photoGroup) => {
//                                     //     let newPic = JSON.stringify([
//                                     //       ...photoGroup,
//                                     //     ]);
//                                     //     newPic[index][i] = e.target.value;
//                                     //     console.log(newPic);
//                                     //     return newPic;
//                                     //   });
//                                     // }}
//                                     // defaultValue={data.locate_photo}
//                                   ></input>
//                                 </label>
//                                 <hr></hr>
//                                 <PhotoReviewSwiper
//                                   list={data}
//                                 ></PhotoReviewSwiper>
//                               </li>
//                             </>
//                           );
//                         })}
//                       </div>
//                     </>
//                   );
//                 })}
//               </div>
//               <TripOutline post={postTripEdit}></TripOutline>
//             </div>
//             <div className="d-flex justify-content-end my-2 me-4 post_edit_button ">
//               <button className="btn" onClick={resetForm} value="清除">
//                 {/* TODO:無法更新到input的value */}
//                 清空
//               </button>
//               <button className="btn" type="submit" onClick={handleSubmit}>
//                 儲存
//               </button>
//             </div>
//             <PostMap></PostMap>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

// export default PostTripEdit;
