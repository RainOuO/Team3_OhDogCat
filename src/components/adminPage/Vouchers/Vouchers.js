import React, { useEffect, useState } from 'react';
import moment from 'moment';
import voucherDetail from '../VoucherDetail/VoucherDetail';
import { handleHtmlCard } from '../../../utils/handler/card/handleHtmlCard';
import { handleVoucherExchangeCard } from '../../../utils/handler/card/handleInputCard';
import { getUserVoucher } from '../../../api/userApi';

import './_vouchers.scss';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const Vouchers = ({ valid }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserVoucher(setData);
  }, []);
  if (data === null) return '';
  return valid ? <ValidVoucher data={data} /> : <InValidVoucher data={data} />;
};

const handleDetailBtn = (item, isValid) => {
  handleHtmlCard(voucherDetail, item, isValid);
};

const showQRcode = (item) => {
  handleVoucherExchangeCard(item);
};

const ValidVoucher = ({ data }) => {
  if (!isListNotEmpty(data, { validList: true })) {
    return (
      <div className="voucher_content text-center h4 opacity-25 lh-base">
        你現在都沒有票券欸好可憐
        <br />
        毛小孩都要哭哭了啦
      </div>
    );
  }
  return data.map((item) => {
    const validityTime = validityTimeResult(
      item.valid_time_start,
      item.valid_time_end
    );
    let dateValid = moment().isBefore(
      item.valid_time_end ? item.valid_time_end : '9999-12-31'
    );

    return dateValid && item.quantity > 0 ? (
      <div key={item.product_id} className="voucher_content">
        <div className="voucher_list d-flex">
          <div className="voucher_img obj-fit flex-shrink-0 position-relative">
            <img
              src={`${BASE_URL}${item.photo_path}/${item.main_photo}`}
              alt="alt"
            />
            <span className="voucher_info_quantity position-absolute fw-bold text-white">
              {item.quantity} 張
            </span>
          </div>
          <div className="voucher_info flex-fill d-flex flex-column p-3">
            <div className="voucher_info_title fw-bold">
              <h5>{item.product_name}</h5>
            </div>
            <div className="voucher_info_intro flex-fill">{item.intro}</div>
            <div className="voucher_info_detail d-flex justify-content-between">
              <div className="d-flex flex-column ">
                <div className="store d-flex">
                  <span className="flex-shrink-0">店家：</span>
                  <span className="date_range flex-shrink-1">
                    {item.store_name}
                  </span>
                </div>
                <div className="validity d-flex">
                  <span className="flex-shrink-0">有效兌換日期：</span>
                  <span className="date_range flex-shrink-1">
                    {validityTime}
                  </span>
                </div>
              </div>
              <div className="d-flex gap-3 flex-shrink-0 justify-content-end">
                <div className="d-flex align-items-end">
                  <button onClick={() => handleDetailBtn(item, true)}>
                    查看
                  </button>
                </div>
                <div className="d-flex align-items-end">
                  <button onClick={() => showQRcode(item)}>兌換</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ''
    );
  });
};

const InValidVoucher = ({ data }) => {
  if (!isListNotEmpty(data, { validList: false })) {
    return (
      <div className="voucher_content text-center h4 opacity-25">
        沒有無效或兌畢的票券紀錄
      </div>
    );
  }
  return data.map((item) => {
    const validityTime = validityTimeResult(
      item.valid_time_start,
      item.valid_time_end
    );
    let dateValid = moment().isBefore(
      item.valid_time_end ? item.valid_time_end : '9999-12-31'
    );
    return !dateValid || item.quantity === 0 ? (
      <div key={item.product_id} className="voucher_content invalid">
        <div className="voucher_list d-flex">
          <div className="voucher_img obj-fit flex-shrink-0 position-relative">
            <img
              src={`${BASE_URL}${item.photo_path}/${item.main_photo}`}
              alt="alt"
            />
            <span className="voucher_info_quantity position-absolute fw-bold text-white">
              {item.quantity === 0 ? '兌畢' : `${item.quantity} 張`}
            </span>
          </div>
          <div className="voucher_info flex-fill d-flex flex-column p-3">
            <div className="voucher_info_title fw-bold">
              <h5>{item.product_name}</h5>
            </div>
            <div className="voucher_info_intro flex-fill">{item.intro}</div>
            <div className="voucher_info_detail d-flex justify-content-between">
              <div className="d-flex flex-column ">
                <div className="store d-flex">
                  <span className="flex-shrink-0">店家：</span>
                  <span className="date_range flex-shrink-1">
                    {item.store_name}
                  </span>
                </div>
                <div className="validity d-flex">
                  <span className="flex-shrink-0">有效兌換日期：</span>
                  <span className="date_range flex-shrink-1">
                    {validityTime}
                  </span>
                </div>
              </div>
              <div className="d-flex gap-3 flex-shrink-0 justify-content-end">
                <div className="d-flex align-items-end">
                  <button onClick={() => handleDetailBtn(item)}>查看</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ''
    );
  });
};

function validityTimeResult(start, end) {
  let validityTime = `${start} - ${end}`;
  if (!start && !end) {
    validityTime = '隨時可用';
  } else if (!start) {
    validityTime = end + ' 前';
  } else if (!end) {
    validityTime = start + ' 後';
  }
  return validityTime;
}

function isListNotEmpty(data, { validList }) {
  if (validList) {
    return data.some(
      (item) =>
        moment().isBefore(
          item.valid_time_end ? item.valid_time_end : '9999-12-31'
        ) && item.quantity > 0
    );
  } else {
    return data.some(
      (item) =>
        !moment().isBefore(
          item.valid_time_end ? item.valid_time_end : '9999-12-31'
        ) || item.quantity === 0
    );
  }
}
export default Vouchers;
