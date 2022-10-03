import { AiOutlineSetting } from 'react-icons/ai';
import { FiFile } from 'react-icons/fi';
import { TbTicket } from 'react-icons/tb';
import { IoHeartOutline } from 'react-icons/io5';
import { RiMessage3Line } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { HiOutlineCamera } from 'react-icons/hi';
import { API_URL } from '../../../utils/config';
import {
  handleSuccess,
  handleFailed,
} from '../../../utils/handler/card/handleStatusCard';
import axios from 'axios';

import './adminCenter.scss';

const AdminCenter = () => {
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;
  const { user, setUser } = useUserInfo();
  const { data } = user;

  const handlePhotoChange = async (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    try {
      let formData = new FormData();
      formData.append('photo', e.target.files[0]);
      let result = await axios.post(`${API_URL}/user/edit/photo`, formData, {
        withCredentials: true,
      });
      setUser((data) => ({ ...data, data: result.data.user }));
      handleSuccess('個人照片更新成功！');
    } catch (error) {
      console.error(error);
      handleFailed('個人照片更新失敗');
    }
  };
  return (
    <div>
      <div className="admin_side">
        <div className="profile_bar d-flex justify-content-center">
          <div className="user_photobox">
            <div className="position-relative h-100 w-100">
              <label htmlFor="image"></label>
              <img
                className="admin_user_photo w-100 h-100"
                src={data.photo[0] === 'h' ? data.photo : BASE_URL + data.photo}
                alt=""
              />
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <HiOutlineCamera />
            </div>
          </div>
          <div className="admin_user_name_bar">
            <div className="admin_user_name ">
              <p>{data.social_name}</p>
            </div>
            <Link
              to="/admin/profile"
              className="text-decoration-none admin_myfile"
            >
              <AiOutlineSetting className="settingicon admin_my_profile_text "></AiOutlineSetting>
              我的檔案
            </Link>
          </div>
        </div>
        <ul className="admin_sidemenu list-unstyled d-flex flex-column ">
          <li className="">
            <Link
              to="/admin/order"
              className="text-decoration-none admin_select d-flex"
            >
              <div className="d-flex align-items-center">
                <FiFile
                  className="icon_size d-block mt-3 ms-1 "
                  alt="orderIcon"
                ></FiFile>
                <p className="d-block mt-3">我的訂單</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/collection"
              className="text-decoration-none admin_select icons d-flex"
            >
              <IoHeartOutline
                className="icon_size d-block mt-3 ms-1"
                alt="likeIcon"
              ></IoHeartOutline>
              <p className="d-block mt-3">我的收藏</p>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/voucher"
              className="admin_select text-decoration-none icons d-flex"
            >
              <TbTicket
                className="icon_size d-block mt-3 ms-1"
                alt="ticketIcon"
              ></TbTicket>
              <p className="d-block mt-3">我的票券</p>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/admin/messages"
              className="admin_select text-decoration-none icons d-flex"
            >
              <RiMessage3Line
                className="icon_size d-block mt-3 ms-1"
                alt="messageIcon"
              ></RiMessage3Line>
              <p className="d-block mt-3">訊息管理</p>
            </Link>
          </li> */}
          <li>
            <Link
              to="/admin/community"
              className="text-decoration-none admin_select icons d-flex
              community"
            >
              <BsPeople
                className="icon_size d-block mt-3 ms-1"
                alt="communityIcon"
              ></BsPeople>
              <p className="d-block mt-3">社群設定</p>
            </Link>

            {/* <Link to="/" className=""><img alt="" src={HoverBottom}></img><p>tesing</p></Link> */}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AdminCenter;
