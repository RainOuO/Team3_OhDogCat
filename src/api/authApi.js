import axios from 'axios';
import { LINE_CALLBACK_URL } from '../utils/config';
import { API_URL } from '../utils/config';
import {
  handleSuccess,
  handleFailed,
  handleWarning,
  handleSucccessComfirm,
} from '../utils/handler/card/handleStatusCard';

const credentialsConfig = {
  withCredentials: true,
};

export const callRegisterApi = async (
  registInfo,
  setRegisterError,
  setUser,
  confirm,
  setErrorText
) => {
  try {
    let res = await axios.post(
      `${API_URL}/auth/user/register`,
      registInfo,
      credentialsConfig
    );
    setUser((user) => ({ ...user, data: res.data.user, auth: true }));
    confirm();
    return res.data;
  } catch (err) {
    console.error('Register Error', err);
    let errorArr = [];
    let errorTextArr = [];
    if (err.response.data.error) {
      for (const errItem of err.response.data.error) {
        errorArr.push(errItem.param);
        errorTextArr.push(errItem.msg);
      }
      setRegisterError(errorArr);
      setErrorText(errorTextArr);
    }
  }
};

export const callLoginApi = async (loginInfo, setUser, confirm) => {
  try {
    const result = await axios.post(
      `${API_URL}/auth/user/login`,
      loginInfo,
      credentialsConfig
    );
    setUser((user) => ({ ...user, data: result.data.user, auth: true }));
    let isInfoCompleted = true;
    for (const key in result.data.user) {
      if (!result.data.user[key]) {
        isInfoCompleted = false;
        break;
      }
    }
    const action = isInfoCompleted ? confirm : handleSucccessComfirm;
    action(
      '登入成功',
      () => {
        window.location = '/admin/profile';
      },
      '但我們發現您的個人資料或是帳戶驗證尚未齊全，是否前往修改？'
    );
  } catch (error) {
    console.error(error);
    handleFailed('帳號或密碼錯誤');
  }
};

export const callLogoutApi = async (setUser, confirm) => {
  try {
    const result = await axios.get(
      `${API_URL}/auth/user/logout`,
      credentialsConfig
    );
    if (result.data.status === 'ok') {
      setUser((user) => ({ ...user, data: [], auth: false }));
      confirm();
    }
  } catch (err) {
    console.error(err);
  }
};

export const callVerifyApi = async (setUser) => {
  try {
    const result = await axios.get(
      `${API_URL}/auth/user/verify`,
      credentialsConfig
    );
    if (result.data.isLogin) {
      setUser((user) => ({
        ...user,
        data: result.data.user,
        auth: true,
        firstVerify: true,
      }));
    }
    setUser((user) => ({
      ...user,
      firstVerify: true,
    }));
  } catch (err) {
    console.error(err);
    setUser((user) => ({
      ...user,
      data: [],
      auth: false,
      firstVerify: true,
    }));
    handleFailed('登入憑證已逾時，請重新登入');
  }
};

export const callLineLoginApi = async (code, setUser, redirectPath) => {
  try {
    const result = await axios.post(
      `${API_URL}/auth/user/login/line`,
      {
        code: code,
        redirect_uri: LINE_CALLBACK_URL,
      },
      credentialsConfig
    );
    if (result.data.user.social_name === '') {
      return setUser((user) => ({
        ...user,
        data: result.data.user,
        auth: true,
      }));
    }
    setUser((user) => ({
      ...user,
      data: result.data.user,
      auth: true,
    }));
    const redirect =
      window.localStorage.getItem('last_page') === '/'
        ? false
        : window.localStorage.getItem('last_page');
    handleSuccess('LINE 連動登入成功', redirect);
    if (window.location.href.includes('?')) {
      window.history.pushState({}, null, window.location.href.split('?')[0]);
    }
    window.localStorage.removeItem('last_page');
  } catch (error) {
    const redirect =
      window.localStorage.getItem('last_page') === '/'
        ? false
        : window.localStorage.getItem('last_page');
    handleFailed('LINE 連動登入失敗', redirect);
    if (window.location.href.includes('?')) {
      window.history.pushState({}, null, window.location.href.split('?')[0]);
    }
    window.localStorage.removeItem('last_page');
    console.error(error);
  }
};

export const callSendValidationMail = async (data) => {
  try {
    const result = await axios.post(
      `${API_URL}/auth/user/validation`,
      data,
      credentialsConfig
    );
  } catch (err) {
    console.error(err);
  }
};

export const callValidationApi = async (data, setUser, navigate) => {
  try {
    const result = await axios.post(
      `${API_URL}/auth/user/validation`,
      data,
      credentialsConfig
    );
    navigate('/admin/profile');
    setUser(result.data.user);
    handleSuccess('信箱驗證成功');
  } catch (err) {
    console.error(err);
    navigate('/admin/profile');
    handleWarning(err.response.data.message);
  }
};
