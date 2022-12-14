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
              <p>?????????????????????</p>
              <h2>????????????</h2>
            </div>
            <div className="news_sidebar_nav">
              <ul className="list-unstyled m-0 desktop">
                <li className={newsActive === 1 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(1);
                    }}
                  >
                    ???????????????chill
                  </button>
                </li>
                <li className={newsActive === 2 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(2);
                    }}
                  >
                    ?????????????????????
                  </button>
                </li>
                <li className={newsActive === 3 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(3);
                    }}
                  >
                    ?????????????????????
                  </button>
                </li>
                <li className={newsActive === 4 ? 'active' : ''}>
                  <button
                    onClick={() => {
                      setNewsActive(4);
                    }}
                  >
                    ?????????????????????
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
                  ????????????
                </li>
                <li
                  className={newsActive === 2 ? 'active' : ''}
                  onClick={() => {
                    setNewsActive(2);
                  }}
                >
                  ????????????
                </li>
                <li
                  className={newsActive === 3 ? 'active' : ''}
                  onClick={() => {
                    setNewsActive(3);
                  }}
                >
                  ????????????
                </li>
                <li
                  className={newsActive === 4 ? 'active' : ''}
                  onClick={() => {
                    setNewsActive(4);
                  }}
                >
                  ????????????
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
            <p>?????????????????????</p>
            <h2>?????????????????????</h2>
          </div>
          <TourRoute />
        </div>
      </div>
      <div className="home_section_leaderboard">
        <div className="section_container">
          <div className="leaderboard_title">
            <p>???????????????????????????</p>
            <h2>?????????</h2>
          </div>
        </div>
        <div className="leaderboard_slide">
          <LeaderBoardSlide />
        </div>
      </div>
      <div className="home_section_community">
        <div className="section_container position-relative d-flex">
          <div className="community_title flex-shrink-0">
            <p>????????????????????????</p>
            <h2>??????????????????</h2>
            <span>
              ?????????????????????????????????
              <br />
              ???????????????????????????????????? Follow ?????????
            </span>
            <br />
            <div>
              <button
                className="w-100"
                onClick={() => navigate('/communityHomePage')}
              >
                ????????????
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
                <p>?????????????????????</p>
                <h2>????????????</h2>
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
                    <div className="time">| 90 ??????</div>
                    <div className="place">?????????????????????</div>
                    <div className="location">
                      268 ????????????????????????????????? 2 ???
                    </div>
                  </div>
                </div>
                <div className="travel_sort travel_sort2">
                  <div className="obj-fit">
                    <img src={sort_img2} alt="" />
                  </div>
                  <div className="travel_sort_text">
                    <div className="time">| 60 ??????</div>
                    <div className="place">????????????</div>
                    <div className="location">
                      269 ??????????????????????????? 285 ???
                    </div>
                  </div>
                </div>
                <div className="travel_sort travel_sort3">
                  <div className="obj-fit">
                    <img src={sort_img3} alt="" />
                  </div>
                  <div className="travel_sort_text">
                    <div className="time">| 30 ??????</div>
                    <div className="place">??????????????????????????????</div>
                    <div className="location">
                      263 ????????????????????????????????? 196 ??? 18 ???
                    </div>
                  </div>
                </div>
              </div>
              <div className="travel_content d-flex flex-column">
                <div className="travel_content_card flex-fill">
                  <TravelCard />
                </div>
                <button className="w-100" onClick={() => navigate('/travel')}>
                  ????????????????????????
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
