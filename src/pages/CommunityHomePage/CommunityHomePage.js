import './_CommunityHomePage.scss';
import dog3 from '../../images/home_newsList_dog_4_flip.png';
import React from 'react';
import { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar_community';
import HomePageMasonry from '../../components/Community/HomePageMasonry/HomePageMasonry';
import RWDMasonry from '../../components/Community/HomePageMasonry/RWDMasonry';
import 'animate.css';
import moment from 'moment';
import { handleSuccess } from '../../utils/handler/card/handleStatusCard';

// import CommunitySwiperRight from '../../components/Community/CommunitySwiper/CommunitySwiperRight';

import { API_URL } from '../../utils/config';

const CommunityHomePage = () => {
  const createTime = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
  const [showCFBox, setShowCFBox] = useState(0);
  //匯入我的行程
  const [tripImport, setTripImport] = useState([]);
  const [tripID, setTripID] = useState('');
  //新增貼文預設標題欄位
  const [tripPostTitleDefault, setTripTitile] = useState('');
  //視窗狀態改變
  const ConfirmHandle = (e) => {
    setShowCFBox(e);
  };

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

  //匯入行程新增貼文
  const creatNewTripPost = async (e) => {
    e.preventDefault();
    console.log('testet');
    let creatData = await axios.post(`${API_URL}/community/tripPostNew`, {
      tripID,
      createTime,
      tripPostTitleDefault,
    });
    console.log(creatData, '行程貼文新增成功');
    handleSuccess('貼文匯入成功', '/admin/community');
    ConfirmHandle(0);
  };
  // // 寵物網紅貼文
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const result = await axios.get(`${API_URL}/communityHomePage/kolPost`);
  //     setKolCard(result.data);
  //   };
  //   fetchPost();
  // }, []);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const result = await axios.get(`${API_URL}/communityHomePage/hotPost`);
  //     setHotCard(result.data);
  //   };
  //   fetchPost();
  // }, []);

  return (
    <>
      <div className="CommunityHomePage">
        <div className="searchBarSection">
          <div className="searchBarSec">
            <SearchBar
              searchBar_title="是不是在找我呢"
              searchBar_placeholder="我無處安放的可愛呀"
            />
          </div>
          <p className="mainSlogan1 disappear">Sharing the life,</p>
          <p className="mainSlogan2 disappear">Follow the paws!</p>
          <p className="slogan disappear" disappear>
            也想分享你跟毛孩的大小事嗎？
          </p>
          <img
            className="animate__animated animate__slideInRight SloganImg disappear"
            src={dog3}
            alt=""
          />
          <div className="BGCircle1 disappear"></div>
          <div className="BGCircle2 disappear"></div>
          <div className="BGCircle3 disappear"></div>
          <div className="BGCircle4 disappear"></div>
          <div className="BGCircle5 disappear"></div>
          <div className="BGCircle6 disappear"></div>
          <div className="btnSection disappear">
            <Link to="/postEdit">
              <button>一般貼文</button>
            </Link>
            <button
              onClick={() => {
                ConfirmHandle(4);
              }}
            >
              行程貼文
            </button>
            <div
              className={
                showCFBox === 4
                  ? 'trip-import d-flex justify-content-center d-block'
                  : 'd-none'
              }
            >
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
        <div className="CommunityHomePage_main">
          {/* <h2 className="comHomeKOL_title">最夯寵物網美底家</h2>
          <CommunityKOLSwiper /> */}
          {/* 
          <h2 className="comHomeKOL_title">最夯寵物網美</h2>
          <CommunitySwiperRight comHomePageCard={kolCard} /> */}
          <div className="masonrySection disappear">
            <HomePageMasonry />
          </div>
          <div className="masonrySection appear">
            <RWDMasonry />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityHomePage;
