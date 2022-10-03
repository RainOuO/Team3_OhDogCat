import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCollection } from '../../../api/userApi';
import { FaHeart } from 'react-icons/fa';
import { updateCollectionItem } from '../../../api/userApi';

import './_collectionList.js.scss';
import {
  handleFailed,
  handleSuccess,
  handleInfoComfirm,
} from '../../../utils/handler/card/handleStatusCard';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const OrderList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/ec-productdetail?id=${id}`);
  };

  const handleUpdateCollection = async (id) => {
    handleInfoComfirm('確定要移除該收藏嗎？', () => callApi(id));
  };

  const callApi = async (id) => {
    let result = await updateCollectionItem(id);
    if (result) {
      setData((data) => data.filter((item) => item.product_id !== id));
      return handleSuccess('成功移除收藏');
    }
    handleFailed('移除收藏商品失敗');
  };

  useEffect(() => {
    getUserCollection(setData);
  }, []);
  console.log(data);
  return data.length > 0
    ? data.map((value) => {
        const imgUrl = `${BASE_URL + value.photo_path}/${value.main_photo}`;
        return (
          <div key={value.product_id} className="collection_list d-flex">
            <div className="collection_img obj-fit flex-shrink-0 position-relative">
              <img
                src={`${imgUrl}`}
                alt="alt"
                onClick={() => handleNavigate(value.product_id)}
              />
            </div>
            <div className="collection_info flex-fill d-flex flex-column p-3">
              <div className="collection_info_title fw-bold d-flex">
                <h5
                  className="flex-fill"
                  onClick={() => handleNavigate(value.product_id)}
                >
                  {value.product_name}
                </h5>
                <div
                  className="collection_btn d-flex justify-content-center align-items-center"
                  onClick={() => handleUpdateCollection(value.product_id)}
                >
                  <FaHeart />
                </div>
              </div>
              <div
                className="collection_info_intro flex-fill"
                onClick={() => handleNavigate(value.product_id)}
              >
                {value.intro}
              </div>
              <div className="collection_info_detail d-flex justify-content-between">
                <div className="d-flex flex-column justify-content-end">
                  <div className="store d-flex">
                    <span className="flex-shrink-0">
                      店家：{value.store_name}
                    </span>
                    <span className="date_range flex-shrink-1">{}</span>
                  </div>
                </div>
                <div className="d-flex gap-3 flex-shrink-0">
                  <div className="d-flex align-items-end">
                    <span className="price--og">TWD 1,099</span>
                  </div>
                  <div className="d-flex align-items-end">
                    <span className="price">TWD 999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    : '';
};

export default OrderList;
