import React, { useState } from 'react';
import { resetPassword } from '../../../api/userApi';
import './_resetPwdCard.scss';

const ResetPwdCard = ({ cancel, code, setUser, navigate }) => {
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setPassword((value) => ({ ...value, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(
      {
        action: 'reset',
        code: code,
        password: password.password,
        confirmPassword: password.confirmPassword,
      },
      setUser,
      navigate
    );
  };
  return (
    <div>
      <div className="reset_pwd_card--global d-flex">
        <div className={`reset_pwd_card_content reset_pwd_card`}>
          <h2>忘記密碼</h2>
          <p>平台將會寄發密碼重設信件至您的信箱</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="請輸入新密碼"
                value={password.password}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="請再輸入一次密碼"
                value={password.confirmPassword}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <button className="reset_pwd_card_button" type="submit">
                送出
              </button>
              <button
                className="reset_pwd_card_button cancel"
                onClick={() => cancel()}
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPwdCard;
