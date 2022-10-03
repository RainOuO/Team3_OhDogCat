import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleScoreCard } from '../../../utils/handler/card/handleInputCard';
import { getUserOrder } from '../../../api/userApi';

import './_orderList.scss';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const OrderList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUserOrder(setData);
  }, []);

  return data.length > 0
    ? data.map((value) => {
        const imgUrl = `${BASE_URL + value.photo_path}/${value.main_photo}`;
        return (
          <div key={value.order_time} className="order_list d-flex">
            <div className="order_info_header d-flex align-items-center">
              <p className="flex-fill">{value.store_name}</p>
              <div>
                {value.comment_status ? (
                  <div>已評價</div>
                ) : (
                  <button
                    className="info score_btn"
                    onClick={() =>
                      handleScoreCard(value.product_id, value.order_no, setData)
                    }
                  >
                    給予評價
                  </button>
                )}
              </div>
            </div>
            <div className="order_info_main">
              <div className="detail d-flex">
                <div className="obj-fit">
                  <img src={imgUrl} alt="" />
                </div>
                <div className="detail_content d-flex flex-fill">
                  <div className="detail_title flex-fill">
                    <h4>{value.product_name}</h4>
                  </div>
                  <div className="detail_payment_type d-flex">
                    <span className="flex-shrink-0">支付方式：</span>
                    {value.pay === 'LinePay' ? (
                      <div className="line_pay"></div>
                    ) : (
                      <div>信用卡</div>
                    )}
                  </div>
                  <div className="detail_num_wrap d-flex justify-content-between align-items-end">
                    <div className="quantity">
                      數量：{value.product_quantity} 張
                    </div>
                    <div className="price">
                      TWD <span>{value.product_price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order_info_footer d-flex align-items-center gap-3">
              <p className="order_no flex-fill ">訂單編號：{value.order_no}</p>
              {value.coupon_number ? (
                <div className="discount d-flex">
                  <div className="d-flex align-items-center">
                    {100 - value.coupon_number} 折
                  </div>
                  <div className="d-flex align-items-center">
                    {value.coupon_name}
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className="total_price d-flex">
                <div className="price">
                  總金額：
                  <span>
                    TWD <span>{value.total}</span>
                  </span>
                </div>
              </div>
              <div className="button_wrap d-flex gap-2">
                {value.comment_status ? (
                  ''
                ) : (
                  <button
                    className="info score_btn"
                    onClick={() =>
                      handleScoreCard(value.product_id, value.order_no, setData)
                    }
                  >
                    給予評價
                  </button>
                )}
                <button
                  className="primary"
                  onClick={() =>
                    navigate(`/ec-productdetail?id=${value.product_id}`)
                  }
                >
                  再買一次
                </button>
              </div>
            </div>
          </div>
        );
      })
    : '';
};

export default OrderList;
