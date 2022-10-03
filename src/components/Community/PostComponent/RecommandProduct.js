import React from 'react';
import { Link } from 'react-router-dom';
import dogIcon from '../../../images/travel_dog_paws.svg';
import './RecommandProduct.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

function Recommand_product() {
  const [card, setCard] = useState([]);

  useEffect(() => {
    const fetchCard = async (index) => {
      const result = await axios.get(`${API_URL}/post/recommendbar`);
      setCard(result.data);
    };
    fetchCard();
  }, []);
  // console.log(card);

  return (
    <>
      <div className="mt-2 recommand_product_title">
        <p className="post__comment_list_title">推薦行程/商品</p>{' '}
        {/* 關聯資料庫 */}
      </div>
      <div className="d-flex justify-content-between">
        {card.map((data, index) => {
          return (
            <div className="recommand_product_list">
              <div className="d-flex justify-content-between">
                <Link to="/">
                  <div className="rec_product_card">
                    <div className="product_photo">
                      <img
                        alt=""
                        src={`http://localhost:3007${data.photo_path}/${data.main_photo}`}
                      ></img>
                    </div>
                    <div className="product_title d-flex aligin-items-center ">
                      <p>{data.name}</p>
                    </div>
                    <div className="rec_product_state d-flex justify-content-between align-items-end ">
                      <div className="rec_product_rank mb-1 ms-1">
                        <img
                          className="rank_paws mb-1 me-2"
                          alt=""
                          src={dogIcon}
                        ></img>
                        {Number(data.per_score.toFixed(1))}
                      </div>
                      <div className="rec_product_price">NT${data.price}</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Recommand_product;
