import axios from 'axios';
import { BACKEND_OPEN_URL } from '../utils/config';
import { handleQRcodeCard } from '../utils/handler/card/handleQRcodeCard';
import {
  handleFailed,
  handleInfo,
} from '../utils/handler/card/handleStatusCard';
import { API_URL } from '../utils/config';

import {
  handleSuccess,
  handleWarning,
} from '../utils/handler/card/handleStatusCard';
import { handleResetPwdCard } from '../utils/handler/card/handleInputCard';

const BASE_URL = API_URL + '/user';

const credentialsConfig = {
  withCredentials: true,
};

export const editSocialName = async (
  socailName,
  confirm,
  setInputError,
  setUser
) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/edit/social_name`,
      {
        socialName: socailName,
      },
      credentialsConfig
    );
    if (result.status === 201) {
      setUser((user) => ({ ...user, data: result.data.user, auth: true }));
      confirm();
    }
  } catch (error) {
    console.error(error);
    if (error.response.data.login === false) {
      handleWarning('登入逾時，請重新登入', '/');
    } else if (error.response.data.message === '無法使用') {
      return setInputError(error.response.data.error.msg);
    }
  }
};

export const editProfile = async (
  { target, data, rowData, setRowData, objKey },
  setUser
) => {
  console.log(target);
  console.log(data);
  try {
    const result = await axios.post(
      `${BASE_URL}/edit/${target}`,
      data,
      credentialsConfig
    );
    if (result.status === 201) {
      rowData[objKey] = result.data.value;
      setUser((data) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData.data[objKey] = result.data.value;
        return newData;
      });
      setRowData(rowData);
      handleSuccess('資料更新成功');
      return true;
    }
  } catch (error) {
    console.error(error);
    if (error.response.data.login === false) {
      handleWarning('登入逾時，請重新登入', '/');
    } else if (error.response.data.message === '無法使用') {
      handleFailed(error.response.data.error.msg);
    } else {
    }
  }
};

export const getUserVoucher = async (setData) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/voucher`, credentialsConfig);
    setData(data.data);
  } catch (error) {
    console.error(error);
  }
};

export const exchangeUserVoucher = async (itemData, quantity) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/voucher/exchange/${itemData.product_id}?quantity=${quantity}`,
      credentialsConfig
    );
    handleQRcodeCard(`${BACKEND_OPEN_URL}${data.data.path}`);
  } catch (error) {
    console.error(error);
    if (error.response.status === 400) {
      handleFailed('請確認使用時間或兌換數量');
    }
  }
};

export const getUserProfile = async (setRowData) => {
  try {
    let { data } = await axios.get(`${API_URL}/user`, credentialsConfig);
    setRowData(data.data);
  } catch (error) {
    console.error(error);
  }
};

export const getUserOrder = async (setData) => {
  try {
    let { data } = await axios.get(`${API_URL}/user/order`, credentialsConfig);
    setData(data.data);
  } catch (error) {
    console.error(error);
  }
};

export const postScore = async (product_id, scoreData, setData, confirm) => {
  try {
    let { data } = await axios.post(
      `${API_URL}/user/score/${product_id}`,
      scoreData,
      credentialsConfig
    );
    setData(data.updateData);
    confirm();
  } catch (error) {
    console.error(error);
    handleFailed('輸入商品評論失敗');
  }
};

export const resetPassword = async (data, setUser, navigate) => {
  try {
    console.log('api', data);
    let result = await axios.post(
      `${API_URL}/user/reset/password`,
      data,
      credentialsConfig
    );
    if (result.data.action === 'mail')
      return handleSuccess(
        '密碼重設信件已寄出',
        false,
        `請至 ${data.email} 收取信件`
      );
    if (result.data.action === 'reset') {
      navigate('/');
      setUser((user) => ({ ...user, data: {}, auth: false }));
      return handleSuccess('密碼重設成功', false, '請使用新密碼登入');
    }
  } catch (error) {
    console.error(error);
    navigate('/');
    handleFailed(error.response.data.message);
  }
};

export const getUserCollection = async (setData) => {
  try {
    let { data } = await axios.get(
      `${API_URL}/user/collection`,
      credentialsConfig
    );
    setData(data.data);
  } catch (error) {
    console.error(error);
  }
};

export const updateCollectionItem = async (id) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/collect/product/${id}`,
      {},
      credentialsConfig
    );

    return data.action === 'delete' ? true : false;
  } catch (error) {
    console.error(error);
  }
};

export const editPassword = async (data, setUser, navigate) => {
  try {
    const result = await axios.post(
      `${API_URL}/user/edit/password`,
      data,
      credentialsConfig
    );
    navigate('/');
    setUser((user) => ({ ...user, data: {}, auth: false }));
    handleSuccess(
      '新密碼設置成功',
      false,
      '由於更新密碼，平台已將您登出<br>請使用新密碼登入'
    );
  } catch (error) {
    console.error(error);
    handleFailed(error.response.data.message);
  }
};

export const createPassword = async (data, setUser) => {
  try {
    const result = await axios.post(
      `${API_URL}/user/password`,
      data,
      credentialsConfig
    );
    setUser((user) => ({ ...user, data: { ...user.data, password: true } }));
    handleSuccess('密碼設置成功', false, '未來可使用此組密碼進行平台一般登入');
  } catch (error) {
    console.error(error);
    handleFailed(error.response.data.message);
  }
};
