import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeroSearch from '../../components/homePage/HeroSearch';
import NewsList from '../../components/homePage/NewsList';
import TourRoute from '../../components/homePage/TourRoute';
import LeaderBoardSlide from '../../components/homePage/LeaderBoardSlide';
import SocialBubble from '../../components/homePage/SocialBubble';
import TravelCard from '../../components/homePage/TravelCard/';
import Loading from '../../components/layout/Loading';
import sort_img1 from '../../images/home_travel_sort1.jpg';
import sort_img2 from '../../images/home_travel_sort2.jpg';
import sort_img3 from '../../images/home_travel_sort3.png';
import { useUserInfo } from '../../hooks/useUserInfo';

import './_homepage.scss';

const Homepage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserInfo();
  const [heroAnimation, setHeroAnimation] = useState(false);
  const [heroActive, setHeroActive] = useState(false);
  const [newsActive, setNewsActive] = useState(1);
  const [searchParam] = useSearchParams();

  const handleHeroActive = (num) => {
    setHeroActive(num);
  };
  const handleHeroAnimation = () => {
    setHeroAnimation(true);
  };

  useEffect(() => {
    if (!heroAnimation) return;
    setTimeout(() => {
      setHeroAnimation(false);
    }, 1500);
  }, [heroAnimation]);

  return searchParam.get('line_login') && user.data.social_name === '' ? (
    <Loading />
  ) : (
    <div className="home_main">
      <div className="home_section_hero">
        <div className="section_container">
          <div
            className={`hero_text_wrap wrap${
              heroActive + 1
            } hero_text_animation${heroActive + 1}`}
          >
            <div className="h-100 w-100"></div>
          </div>
          <div className="hero_search_wrap">
            <HeroSearch
              handleHeroAnimation={handleHeroAnimation}
              handleHeroActive={handleHeroActive}
            />
          </div>
          <div
            className={`hero_animation ${heroAnimation ? 'active' : ''}`}
          ></div>
        </div>
      </div>
      <div className="home_section_news">
        <div className="section_container justify-content-between d-flex">
          <div className="news_sidebar">
            <div className="news_sidebar_title">
              <p>走在時尚最尖端</p>
              <h2>最新情報</h2>
            </div>
            <div className="news_sidebar_nav">
              <ul className="list-unstyled m-0 desktop">
                <li className={newsActive === 1 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(1);
                    }}
                  >
                    消暑景點最chill
                  </button>
                </li>
                <li className={newsActive === 2 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(2);
                    }}
                  >
                    吃飽飽夯品推薦
                  </button>
                </li>
                <li className={newsActive === 3 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(3);
                    }}
                  >
                    喝茶開槓放風去
                  </button>
                </li>
                <li className={newsActive === 4 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(4);
                    }}
                  >
                    麻麻我要出去玩
                  </button>
                </li>
              </ul>
              <ul className="list-unstyled m-0 mobile">
                <li
                  className={newsActive === 1 ? 'active' : ''}
                  onClick={() => {
                    setNewsActive(1);
                  }}
                >
                  消暑景點
                </li>
                <li
                  className={newsActive === 2 ? 'active' : ''}
                  onClick={() => {
                    setNewsActive(2);
                  }}
                >
                  美食夯品
                </li>
                <li
                  className={newsActive === 3 ? 'active' : ''}
                  onClick={() => {
                    setNewsActive(3);
                  }}
                >
                  喝茶開槓
                </li>
                <li
                  className={newsActive === 4 ? 'active' : ''}
                  onClick={() => {
                    setNewsActive(4);
                  }}
                >
                  戶外景點
                </li>
              </ul>
            </div>
          </div>
          <div className="news_dog_img align-self-center">
            <div className={`dog${newsActive} active${newsActive}`}></div>
          </div>
          <div className="news_list">
            <NewsList active={newsActive} />
          </div>
        </div>
      </div>
      <div className="home_section_tour">
        <div className="section_container">
          <div className="tour_title">
            <p>跟著小編一起玩</p>
            <h2>小道消息報你知</h2>
          </div>
          <TourRoute />
        </div>
      </div>
      <div className="home_section_leaderboard">
        <div className="section_container">
          <div className="leaderboard_title">
            <p>銷售排行榜癡心推薦</p>
            <h2>排行榜</h2>
          </div>
        </div>
        <div className="leaderboard_slide">
          <LeaderBoardSlide />
        </div>
      </div>
      <div className="home_section_community">
        <div className="section_container position-relative d-flex">
          <div className="community_title flex-shrink-0">
            <p>社群分享最新消息</p>
            <h2>最夯出遊貼文</h2>
            <span>
              狗爸媽的口袋名單大公開
              <br />
              秋冬必去的「寵物景點」你 Follow 了嗎？
            </span>
            <br />
            <div>
              <button
                className="w-100"
                onClick={() => navigate('/communityHomePage')}
              >
                來去看看
              </button>
            </div>
          </div>
          <SocialBubble />
        </div>
      </div>
      <div className="home_section_travel">
        <div className="home_section_travel_bg">
          <div className="section_container">
            <div className="travel_header_wrap d-flex gap-5">
              <div className="travel_title">
                <p>哪裡好玩報給你</p>
                <h2>行程規劃</h2>
              </div>
              <div className="travel_search flex-fill align-self-end"></div>
            </div>
            <div className="travel_body_wrap d-flex gap-4 w-100">
              <div className="travel_map">
                <div className="travel_sort travel_sort1">
                  <div className="obj-fit">
                    <img src={sort_img1} alt="" />
                  </div>
                  <div className="travel_sort_text">
                    <div className="time">| 90 分鐘</div>
                    <div className="place">冬山河親水公園</div>
                    <div className="location">
                      268 宜蘭縣五結鄉親河路二段 2 號
                    </div>
                  </div>
                </div>
                <div className="travel_sort travel_sort2">
                  <div className="obj-fit">
                    <img src={sort_img2} alt="" />
                  </div>
                  <div className="travel_sort_text">
                    <div className="time">| 60 分鐘</div>
                    <div className="place">斑比山丘</div>
                    <div className="location">
                      269 宜蘭縣冬山鄉下湖路 285 號
                    </div>
                  </div>
                </div>
                <div className="travel_sort travel_sort3">
                  <div className="obj-fit">
                    <img src={sort_img3} alt="" />
                  </div>
                  <div className="travel_sort_text">
                    <div className="time">| 30 分鐘</div>
                    <div className="place">壯圍沙丘旅遊服務園區</div>
                    <div className="location">
                      263 宜蘭縣壯圍鄉壯濱路二段 196 巷 18 號
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel_content d-flex flex-column">
                <div className="travel_content_card flex-fill">
                  <TravelCard />
                </div>
                <button className="w-100" onClick={() => navigate('/travel')}>
                  開始規劃你的行程
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
