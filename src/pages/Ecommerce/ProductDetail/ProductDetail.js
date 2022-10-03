import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import './_ProductDetail.scss';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

// 加入購物車跳出視窗
import { handleSuccess } from '../../../utils/handler/card/handleStatusCard';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { handleLoginCard } from '../../../utils/handler/card/handleInputCard';

import StreetViewYT from '../../../components/EC/EC_productDetail/StreetView_YT';
import StreetViewYTRWD from '../../../components/EC/EC_productDetail/StreetView_YT_RWD';
import StreetViewGE from '../../../components/EC/EC_productDetail/StreetView_GE';
import StreetViewGEST from '../../../components/EC/EC_productDetail/StreetView_GE_ST';
// 商品照片
import ItemImage from '../../../components/EC/EC_productDetail/Image';
// 兌換方式照片
import Exchange from '../../../images/EC_detail/exchange.svg';
import ExchangeRWD01 from '../../../images/EC_detail/exchange_RWD_1.png';
import ExchangeRWD02 from '../../../images/EC_detail/exchange_RWD_2.png';
import ExchangeRWD03 from '../../../images/EC_detail/exchange_RWD_3.png';

// 街景
// import Streeview from '../../../components/EC/EC_productDetail/StreetView';
// 商品評價
import Score from './../../../components/EC/EC_productDetail/Score';

const ProductDetail = () => {
  const [productData, setProductData] = useState([]);
  const [tag, setTags] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [mainURL, setMainURL] = useState('');
  const [perScore, setPerScore] = useState(4);

  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const productId = urlSearchParams.get('id');
  // const typeId = urlSearchParams.get('typeid');
  // console.log('urlSearchParams', urlSearchParams);
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;

  useEffect(() => {
    // 抓商品細節資料
    const fetchProductData = async () => {
      const result = await axios.get(
        `${API_URL}/productdetail/item?id=${productId}`
      );
      // console.log(result);
      const tags = result.data.product_tag;
      const tag = tags.split(/[#]/).filter((item) => item);
      setTags(tag);
      const photos = result.data.photo;
      setPhoto(photos);
      const mainURL = result.data.photo_path;
      setMainURL(mainURL);
      setProductData(result.data);
      const score = Number(result.data.per_score.toFixed(1));
      setPerScore(score);

      // 抓推薦 第四館商品資料
      const recommend = await axios.get(`${API_URL}/productdetail/recommend`);
      setRecommend(recommend.data);
    };
    fetchProductData();
  }, [productId]);
  // console.log('productData', productData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // = 加入購物車
  const { user, setUser } = useUserInfo();
  const addCart = async (e, id) => {
    // e.preventDefault();
    if (user.auth) {
      try {
        await axios.post(
          `${API_URL}/cart/postmore/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        handleSuccess('已成功加入購物車');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      handleLoginCard({ isLogin: true }, setUser);
    }
  };

  // =地圖切換
  // const [map, setMap] = useState(1);
  function mapSection(productId) {
    switch (Number(productId)) {
      case 518:
        return (
          <div id="mapSection" className="description">
            <div className="detail_map">
              <h4>地圖</h4>
              <Tabs
                defaultActiveKey="mapbtn"
                id="uncontrolled-tab-example"
                className="mapbtn"
                style={{ borderWidth: '0px' }}
              >
                <Tab
                  eventKey="mapbtn"
                  title={<button className="detail_map_btn">環景影片</button>}
                >
                  {' '}
                  <div className="mapYT">
                    <StreetViewYT />
                  </div>
                  <div className="mapYTRWD">
                    <StreetViewYTRWD />
                  </div>
                </Tab>
                <Tab
                  eventKey="mapbtn_ST"
                  title={<button className="detail_map_btn">街景</button>}
                >
                  <StreetViewGEST />
                </Tab>
              </Tabs>
            </div>
          </div>
        );
      case 558:
        return (
          <div id="mapSection" className="description">
            <div className="detail_map d-flex flex-row mb-2">
              <h4>地圖</h4>
            </div>
            <div className="mapGE">
              <StreetViewGE />
            </div>
          </div>
        );
      default:
    }
  }

  const handleChage = () => {};

  return (
    <>
      {productData.length === 0 ? (
        console.log('沒有資料') //* 是否做loading 頁面
      ) : (
        <div className="productDetail">
          <div className="topRow row ">
            {/* 商品照區域 */}
            <div className="productDetail_itemImage">
              <ItemImage
                mainURL={mainURL}
                productData={productData}
                photo={photo}
              />
            </div>
            {/* 商品標題 */}
            <div className="productDesc col">
              <div className="productContainer">
                <div className="productContainer_content">
                  <h1 className="headText fw-bolder">{productData.name}</h1>
                  <div className="subText">{productData.intro}</div>
                  <div className=" d-flex flex-row productContainer_tags">
                    {tag.map((data, index) => {
                      return (
                        <p key={index} className="tags my-2 me-2">
                          {data}
                        </p>
                      );
                    })}
                  </div>
                </div>
                {/* 主要價格區域 */}
                <div className="costSection ">
                  <p className="mainCost">NT${productData.price}</p>
                  <p className="ogCost text-decoration-line-through">
                    NT${Number((productData.price * 1.2).toFixed(0))}
                  </p>
                </div>

                {/* 加購區 */}
                <div className="mainAddSection">
                  <p className="text-muted fw-bolder">+ 尚優惠的加購價</p>
                  <hr className="mainAddSection_hr" />
                  {/* 推薦商品 */}
                  {recommend.map((data, index) => {
                    console.log(data);
                    return (
                      <div
                        className="addSection d-flex flex-row mb-2"
                        key={index}
                      >
                        <Link to={`/ec-productdetail?id=${data.id}`}>
                          <div className="addSubSection d-flex align-items-center mb-0">
                            <img
                              className="addSubSection_img"
                              src={`${BASE_URL}${data.photo_path}/${data.main_photo}`}
                              alt=""
                            />
                            <p className="addSubSection_name fw-bolder mb-0 ms-2">
                              {data.name}
                            </p>
                          </div>
                        </Link>
                        <div className="addCartSection d-flex flex-row flex-shrink-0 row-4">
                          <div className="addCostSection">
                            <p className="addCost text-decoration-line-through m-0">
                              NT${Number((data.price * 1.2).toFixed(0))}
                            </p>
                            <p className="addMainCost fs-5 fw-bolder m-0">
                              NT${data.price}
                            </p>
                          </div>
                          <div className="d-flex align-items-end">
                            {/* TODO:同步更新購物車 */}
                            <button
                              className="addSubSection_btn ms-2 py-2"
                              onClick={(e) => {
                                addCart(e, data.id);
                                // console.log(e.target.value);
                                // handleSuccess('已成功加入購物車');
                              }}
                            >
                              加入購物車
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 此商品的加入購物車 */}
                <div className="buttonRow">
                  <button
                    className="addButton"
                    onClick={(e) => {
                      // console.log(e.target.value);
                      addCart(e, productData.id);
                      // handleSuccess('已成功加入購物車');
                    }}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="descriptionSelection">
            <div className="bottomRow">
              <div className="spec">
                <div className="anchor">
                  <a className="anchor_a" href="#description">
                    <span>商品說明</span>
                  </a>
                  <a className="anchor_a" href="#toKnow">
                    <span>購買須知</span>
                  </a>
                  <a className="anchor_a" href="#howToUse">
                    <span>如何使用</span>
                  </a>
                  <a className="anchor_a" href="#comment">
                    <span>票券評價</span>
                  </a>
                </div>
                <div className="anchor1"></div>
              </div>
              <div className="spec2">
                <div className="description">
                  <h4 id="description">商品說明</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productData.description,
                    }}
                  />
                </div>

                {/* 地圖區 */}
                {mapSection(productId)}
                <div id="toKnow" className="description">
                  <h4>購買須知</h4>
                  <p>
                    • 因應疫情及政府規範，現場兌換商品請符合防疫等相關規定。
                    <br />
                    • 購買景點票券使用時間將以景點公告為主，不另行告知。
                    <br />
                    •
                    購買餐廳票券請提前電話預約並告知使用兌換券，餐點有限避免向隅。
                    <br />
                    •
                    購買商品票券商家將保留依照庫存變更、修改商品之權利，無法配合規定者請勿預訂。
                    <br />
                  </p>
                </div>
                <div className="description">
                  <h4 id="howToUse">如何使用</h4>
                  <img className="exchangeImg" src={Exchange} alt="" />
                  <div className="exchangeRWD--box">
                    <img className="exchangeRWD" src={ExchangeRWD01} alt="" />
                    <img className="exchangeRWD" src={ExchangeRWD02} alt="" />
                    <img className="exchangeRWD" src={ExchangeRWD03} alt="" />
                  </div>
                </div>
                <Score perScore={perScore} productId={productId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
