import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { useLocation } from 'react-router-dom';
import './styles/_EC_orderSteps.scss';

// 子頁面(區域)
import Cart from './subpages/Cart';
import Payment from './subpages/Payment';
import OrderDetail from './subpages/OrderDetail';

// 進度條
import ProgressBar from '../../../components/EC/EC_ordersteps/ProgressBar/ProgressBar';

// css樣式

function OrderSteps() {
  const maxSteps = 3;
  const [step, setStep] = useState(1);
  const [pay, setPay] = useState('');
  const [receipt, setReceipt] = useState('');

  const [shipping, setShippingData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // 動態元件語法
  const components = [Cart, Payment, OrderDetail];
  const BlockComponent = components[step - 1];

  // 進度條使用
  const progressNames = ['確認購物車內容', '確認付款資訊', '送出訂單'];

  // 上一步 下一步按鈕
  const next = () => {
    // 運送表單用檢查
    // TODO:記得改回2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (step === 2) {
      const { name, email, phone } = shipping;

      // 有錯誤訊息會跳出警告，不會到"下一步"
      const errors = [];

      if (!name) errors.push('姓名沒有填喔！ ');

      if (!email) errors.push('信箱沒有填喔！ ');

      if (errors.length > 0) {
        alert(errors.join(','));
        return;
      }
    }

    // 沒錯誤才會到下一步
    if (step < maxSteps) setStep(step + 1);
  };

  // 上一步按鈕
  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  // 拿網址資料=======================================

  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const productId = urlSearchParams.get('productId');
  console.log(productId);

  // 抓購物車資訊
  const [cartProductData, setCartProductData] = useState([]);
  // 優惠券
  const [selected, setSelected] = useState(0);
  const [couponName, setCouponName] = useState();

  useEffect(() => {
    // 抓商品細節資料
    const fetchProductData = async () => {
      const result = await axios.get(
        `${API_URL}/cart/showcart?productId=${productId}`
      );
      // setProductData(result.data);
      // console.log('------------------here---------------------', result.data[0]);
      setCartProductData(result.data[0]);
    };
    fetchProductData();
  }, []);
  console.log('------------------here---------------------', cartProductData);

  return (
    <>
      {/* {console.log(step, maxSteps)} */}
      {/* 進度條 */}
      <div>
        <ProgressBar
          maxSteps={maxSteps}
          step={step}
          progressNames={progressNames}
        />
      </div>
      {/* 子頁面區域 */}
      <div>
        <BlockComponent
          shipping={shipping}
          setShippingData={setShippingData}
          cartProductData={cartProductData}
          setCartProductData={setCartProductData}
          productId={productId}
          selected={selected}
          setSelected={setSelected}
          couponName={couponName}
          setCouponName={setCouponName}
          pay={pay}
          setPay={setPay}
          receipt={receipt}
          setReceipt={setReceipt}
        />
      </div>
      {/* 按鈕 */}
      <div className="orderButton">
        {step < maxSteps && (
          <button
            className="nextBnt"
            onClick={next}
            disabled={step === maxSteps}
          >
            前往下一步
          </button>
        )}
        <button className="prevBnt" onClick={prev} disabled={step === 1}>
          回到上一步
        </button>
      </div>
    </>
  );
}

export default OrderSteps;
