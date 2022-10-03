import React, { useState } from 'react';
import { editPassword } from '../../../api/userApi';
import { handleFailed } from '../../../utils/handler/card/handleStatusCard';
import './_passwordEditCard.scss';

const PasswordEditCard = ({ confirm, setUser, navigate }) => {
  const [data, setData] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });
  const [inputError, setInputError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (data.oldPassword === data.newPassword)
    //   return handleFailed('請輸入與舊密碼不同的新密碼');
    // if (data.confirmPassword !== data.newPassword)
    //   return handleFailed('兩次密碼輸入不一致');
    editPassword(data, setUser, navigate);
  };

  const handleInputChange = (e) => {
    setInputError('');
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="edit_pwd_card--global d-flex">
        <div className={`edit_pwd_card_content edit_pwd_card`}>
          <h2>重新設置密碼</h2>
          <form
            className="edit_pwd_card_form d-flex flex-column h-100"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <input
                type="password"
                name="oldPassword"
                className={`form-control ${inputError ? 'error' : ''}`}
                placeholder="輸入舊密碼"
                value={data.oldPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className={`form-control ${inputError ? 'error' : ''}`}
                placeholder="輸入新密碼"
                value={data.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${inputError ? 'error' : ''}`}
                placeholder="再次輸入新密碼"
                value={data.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <p className={`${inputError ? 'active' : ''}`}>{inputError}</p>
            <div>
              <button className=" edit_pwd_card_button" type="submit">
                送出
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordEditCard;
