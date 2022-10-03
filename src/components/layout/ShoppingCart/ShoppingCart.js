import { normalizeUnits } from 'moment';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoCart, IoCaretBack, IoCaretForward } from 'react-icons/io5';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { handleSuccess } from '../../../utils/handler/card/handleStatusCard';
import { TbTicket } from 'react-icons/tb';
import './_ShoppingCart.scss';

// 購物車跳出頁面
import { handleLoginCard } from '../../../utils/handler/card/handleInputCard';

function ShoppingCart({ name, ...props }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { cart, setCart } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, setUser } = useUserInfo();

  const addCart = async (e, id) => {
    // e.preventDefault();
    if (user.auth) {
      try {
        const result = await axios.post(
          `${API_URL}/cart/postmore/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        // console.log('-----addCart-----');
        // console.log(result.data[0]);

        // 如果想用假的數字結果可用：
        // let newCart = [...cart];
        // newCart = newCart.map(item=>{
        //   if(item.product_id === id){
        //     item.quantity ++;
        //   }
        //   return item
        // });
        // console.log(newCart);

        setCart(result.data[0]);
        // handleSuccess('已成功加入購物車');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      handleLoginCard({ isLogin: true }, setUser);
    }
  };

  const minusCart = async (e, id) => {
    e.preventDefault();
    if (user.auth) {
      try {
        const result = await axios.post(
          `${API_URL}/cart/postreduce/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        setCart(result.data[0]);
        // handleSuccess('-1');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      handleLoginCard({ isLogin: true }, setUser);
    }
  };
  // 如果沒有登入沒辦法按確定下單
  const cartOrder = async (e, id) => {
    e.preventDefault();
    if (user.auth) {
      try {
        navigate(`/ec-ordersteps?productId=${id}`);
        handleClose();
      } catch (error) {
        console.log('error', error);
      }
    } else {
      handleLoginCard({ isLogin: true }, setUser);
    }
  };

  useEffect(() => {
    if (show) {
      const fetchProductData = async () => {
        // 抓商品細節資料
        const result = await axios.get(`${API_URL}/cart/list`, {
          withCredentials: true,
        });
        // console.log('result', result.data);
        const cartData = result.data;
        setCart(cartData);
      };
      fetchProductData();
    }
  }, [show]);

  return (
    <>
      {/* <button onClick={handleShow}> */}
      <IoCart onClick={handleShow} className="ioCart flex-shrink-0" />
      {/* </button> */}
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <div className="ShoppingCart">
          <section>
            <div className="headerRow" onClick={handleClose}>
              {' '}
              <IoChevronBack />
              購物車-商品一覽
            </div>
            <div className="mainRow">
              {/* ----放進來的票券---- */}
              {cart.map((v, i) => {
                return (
                  <div key={v.product_id} className="mainRowObject">
                    <div className="mainRowObjectContent">
                      <div className="mainRowObjectPic">
                        <img
                          className="addSubSection_img"
                          src={`http://localhost:3007${v.photo_path}/${v.main_photo}`}
                          alt="..."
                        />
                      </div>
                      <div className="mainRowObjectText">
                        <p>{v.name}</p>
                        {/* <span>宜蘭傳藝中心</span> */}
                      </div>
                    </div>
                    <div className="mainRowObjectBtn">
                      <div>
                        <div className="cartAddButton">
                          <IoCaretBack
                            onClick={(e) => {
                              minusCart(e, v.product_id);

                              // console.log(e.v.product_id);
                            }}
                          />
                          <span>{v.quantity}</span>
                          <IoCaretForward
                            onClick={(e) => {
                              addCart(e, v.product_id);

                              // console.log(e.v.product_id);
                              // handleSuccess('已成功加入購物車');
                            }}
                          />
                        </div>

                        <p>NT${v.quantity * v.price}</p>
                      </div>
                      <button
                        value={v.product_id}
                        onClick={(e) => {
                          cartOrder(e, v.product_id);
                        }}
                      >
                        確定下單
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* ----放進來的票券---- */}
            </div>
            <div className="footerRow">
              <div className="leftColumn">
                <TbTicket />共 {cart.length} 件商品
              </div>
            </div>
          </section>
        </div>
      </Offcanvas>
    </>
  );
}
export default ShoppingCart;
