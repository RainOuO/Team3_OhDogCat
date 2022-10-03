import axios from 'axios';
import '../styles/_EC_subpages_OrderDetail.scss';
import { react, useState, useEffect } from 'react';
import { API_URL } from '../../../../utils/config';
import moment from 'moment/moment';

function OrderDetail(props) {
  const {
    pay,
    shipping,
    receipt,
    setReceipt,
    couponName,
    selected,
    setShippingData,
    cartProductData,
    setCartProductData,
  } = props;
  console.log('cartData=====OrderDetail===', cartProductData);

  // const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderBuying, setOrderBuying] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setOrder({
        amount: Number(
          cartProductData.quantity *
            cartProductData.price *
            (1 - selected / 100)
        ).toFixed(0),
        currency: 'TWD',
        packages: [
          {
            id: packageIdGenerater(cartProductData.user_id),
            amount: Number(
              cartProductData.quantity *
                cartProductData.price *
                (1 - selected / 100)
            ).toFixed(0),
            products: [
              {
                name: cartProductData.name,
                quantity: 1,
                price: Number(
                  cartProductData.quantity *
                    cartProductData.price *
                    (1 - selected / 100)
                ).toFixed(0),
                originalPrice: cartProductData.price,
              },
            ],
          },
        ],
        orderId: packageIdGenerater(cartProductData.user_id),
      });
      // console.log(order);
      setOrderBuying({
        user_id: cartProductData.user_id,
        product_id: cartProductData.product_id,
        product_name: cartProductData.product_name,
        product_quantity: cartProductData.quantity,
        product_price: cartProductData.price,
        order_no: packageIdGenerater(cartProductData.user_id),
        total: Number(
          cartProductData.quantity *
            cartProductData.price *
            (1 - selected / 100)
        ).toFixed(0),
        pay: 'LinePay',
        coupon_number: 8,
        coupon_name: '小確幸92折優惠',
        order_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
      // console.log('orderBuying', orderBuying);
    };

    fetchProductData();
  }, []);

  const packageIdGenerater = (user_id) => {
    let dt = new Date();
    return `${dt.getTime()}_${user_id}`;
  };

  const handlePay = () => {
    const createOrder = async (e, id) => {
      // e.preventDefault();
      try {
        console.log('----------createOrderBuying---------', orderBuying);
        let result = await axios.post(
          `${API_URL}/createorder/order`,
          { orderBuying },
          { withCredentials: true }
        );
      } catch (error) {
        console.log('error', error);
      }
    };
    createOrder();

    const deleteCart = async (e, id) => {
      // e.preventDefault();
      try {
        console.log(
          '---------deleteCartId---------',
          cartProductData.product_id
        );
        let result = await axios.post(
          `${API_URL}/deletecart/cart${cartProductData.product_id}`
        );
      } catch (error) {
        console.log('error', error);
      }
    };
    deleteCart();

    const linePay = async (e, id) => {
      // e.preventDefault();
      try {
        console.log('try-----order', order);
        // 打後端LinePayAPI
        let result = await axios.post(`${API_URL}/line/createOrder`, { order });
        if (result.data.status === 'ok') {
          window.location = result.data.redirect;
          // console.log(result.data.redirect);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    linePay();
  };

  return (
    <>
      <div className="OrderDetail">
        <div className="mainTitle">3.送出訂單</div>

        {!!cartProductData ? (
          <div className="bottomColumn">
            <div className="subSection2">
              <div className="calculateSection">
                <div className="subTitle">票券名稱：{cartProductData.name}</div>
                <div className="subInput">NT${cartProductData.price}</div>
              </div>
              <div className="calculateSection">
                <div className="subTitle">票券數量</div>
                <div className="subInput">{cartProductData.quantity}張</div>
              </div>
            </div>
            <div className="subSection2">
              <span className="middleTotal">
                NT${cartProductData.price * cartProductData.quantity}
              </span>
              <div className="calculateSection">
                <div className="subTitle">優惠券：{couponName}</div>
                <div className="subInput">{selected}%OFF</div>
              </div>
            </div>
            <div className="subSection3">
              <div className="calculateSection">
                <div className="subTitle">購買人</div>
                <div className="subInput">{shipping.name}</div>
              </div>
              <div className="calculateSection">
                <div className="subTitle">付款方式</div>
                <div className="subInput">{pay}</div>
              </div>
              <div className="calculateSection">
                <div className="subTitle">電子收據</div>
                <div className="subInput">{receipt}</div>
              </div>
            </div>
            <div className="calculateSection1">
              <div className="subTitle">總計(付款金額)</div>
              <div className="subInput">
                NT$
                {Number(
                  cartProductData.quantity *
                    cartProductData.price *
                    (1 - selected / 100)
                ).toFixed(0)}
              </div>
            </div>
            <button onClick={handlePay}>來去結帳</button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default OrderDetail;
