import React, { useEffect, useState } from 'react';
import { API_URL, LINE_LOGIN_URL } from '../../../utils/config';
import { HiChevronLeft } from 'react-icons/hi';
import { LINE_CALLBACK_URL } from '../../../utils/config';
import { Popover } from 'antd';
import moment from 'moment';
import { handleForgetPwdCard } from '../../../utils/handler/card/handleInputCard';
import {
  callRegisterApi,
  callLoginApi,
  callLogoutApi,
} from '../../../api/authApi';
import './_loginCard.scss';

const LoginCard = ({ isLogin, confirm, setUser }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [registInfo, setRegistInfo] = useState({
    socialName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registerError, setRegisterError] = useState([]);
  const [errorText, setErrorText] = useState([]);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('call login API');
    callLoginApi(loginInfo, setUser, confirm);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log('call logout API');
    callLogoutApi(setUser, confirm);
  };

  const handleLineLogin = async (e) => {
    window.localStorage.setItem('last_page', window.location.pathname);
    window.localStorage.setItem(
      'line_login',
      moment().format('YYYYMMDDhhmmss')
    );
    window.location = LINE_LOGIN_URL + '&redirect_uri=' + LINE_CALLBACK_URL;
  };

  const handleRegisterRequest = (e) => {
    e.preventDefault();
    console.log('call register API');
    callRegisterApi(
      registInfo,
      setRegisterError,
      setUser,
      confirm,
      setErrorText
    );
  };

  const handleLoginChange = (e) => {
    setLoginInfo((oldInfo) => ({
      ...oldInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegistChange = (e) => {
    setRegistInfo((oldInfo) => ({
      ...oldInfo,
      [e.target.name]: e.target.value,
    }));
    setErrorText([]);
    let index = registerError.findIndex((i) => i === e.target.name);
    if (!(index < 0)) {
      setRegisterError((items) => {
        console.log(items);
        return items.filter((v, i) => i !== index);
      });
    }
  };
  const isError = (name) =>
    registerError.find((i) => i === name) ? 'error' : '';
  useEffect(() => {
    setErrorText([]);
    setRegisterError([]);
  }, [isNewUser]);

  return isLogin ? (
    <div className="login_card--global d-flex">
      <div
        className={`login_card_content login_card--login ${
          isNewUser ? '' : 'active'
        }`}
      >
        <h2>??????</h2>
        <p>Oh!DogCat ??????????????????</p>
        <form
          className="login_card_form d-flex flex-column h-100"
          onSubmit={handleLogin}
        >
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className={`form-control`}
              placeholder="????????????"
              value={loginInfo.email}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="??????"
              value={loginInfo.password}
              onChange={handleLoginChange}
              required
            />
          </div>
          <div
            className="login_card_reset_password text-end"
            onClick={() => handleForgetPwdCard()}
          >
            ????????????
          </div>
          <div className="flex-fill d-flex flex-column justify-content-end">
            <div className="login_card_line d-flex justify-content-center mb-3">
              <div onClick={handleLineLogin}>
                <div className="login_card_line--bg_mask d-flex">
                  <div className="login_card_line--logo flex-shrink-0"></div>
                  <div className="login_card_line--text text-center d-flex align-items-center">
                    ??? LINE ??????
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="mb-3 login_card_button--login" type="submit">
                ??????
              </button>
            </div>
            <div
              className="login_card_register--show"
              onClick={() => setIsNewUser(true)}
            >
              ???????????? Oh!DogCat ?????? ???????????????
            </div>
          </div>
        </form>
      </div>
      <div
        className={`login_card_content login_card--login ${
          isNewUser ? '' : 'active'
        }`}
      >
        <h2>??????</h2>
        <p>?????? Oh!DogCat ??????</p>
        <form
          className="login_card_form d-flex flex-column h-100"
          onSubmit={handleRegisterRequest}
        >
          <div className="mb-3">
            <Popover content={content[0]} trigger="focus" placement="topRight">
              <input
                type="text"
                name="socialName"
                className={`form-control ${isError('socialName')}`}
                placeholder="????????????"
                value={registInfo.socialName}
                onChange={handleRegistChange}
                required
              />
            </Popover>
          </div>
          <div className="mb-3">
            <Popover content={content[1]} trigger="focus" placement="topRight">
              <input
                type="email"
                name="email"
                className={`form-control ${isError('email')}`}
                placeholder="????????????"
                value={registInfo.email}
                onChange={handleRegistChange}
                required
              />
            </Popover>
          </div>
          <div className="mb-3">
            <Popover content={content[2]} trigger="focus" placement="topRight">
              <input
                type="password"
                name="password"
                className={`form-control ${isError('password')}`}
                placeholder="??????"
                value={registInfo.password}
                onChange={handleRegistChange}
                required
              />
            </Popover>
          </div>
          <div className="mb-3">
            <Popover content={content[3]} trigger="focus" placement="topRight">
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${isError('confirmPassword')}`}
                placeholder="????????????"
                value={registInfo.confirmPassword}
                onChange={handleRegistChange}
                required
              />
            </Popover>
          </div>
          <div className="flex-fill d-flex flex-column justify-content-end">
            <div>
              <button className="mb-3 login_card_button--regist" type="submit">
                ??????
              </button>
            </div>
            <div
              className="login_card_register--hide"
              onClick={() => setIsNewUser(false)}
            >
              ?????????????????????????????????
            </div>
          </div>
        </form>

        <div
          className="login_card_button--back"
          onClick={() => setIsNewUser(false)}
        >
          <HiChevronLeft />
        </div>
      </div>
      <div className={`login_card_error ${errorText[0] ? 'active' : ''}`}>
        {errorText.map((value) => (
          <div>{value}</div>
        ))}
      </div>
    </div>
  ) : (
    <div className="login_card--global">
      <h2>??????</h2>
      <p>?????????????????????</p>
      <button
        className="login_card_button--logout"
        type="button"
        onClick={handleLogout}
      >
        ????????????
      </button>
    </div>
  );
};

const content = [
  <div>
    <p className="m-0">
      ??????????????????
      <br />
      ???????????????????????????
    </p>
  </div>,
  <div>
    <p className="m-0">
      ?????????????????? Email ??????
      <br />
      ????????????????????????
    </p>
  </div>,
  <div>
    <p className="m-0">
      ????????????????????? 8<br />
      ?????????????????????????????????????????????
    </p>
  </div>,
  <div>
    <p className="m-0">????????????????????????</p>
  </div>,
];

export default LoginCard;
