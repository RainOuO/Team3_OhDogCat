import React, { useState } from 'react';
import { createPassword } from '../../../api/userApi';
import './_createPwdCard.scss';

const CreatePwdCard = ({ cancel, setUser }) => {
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setPassword((value) => ({ ...value, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPassword(password, setUser);
  };
  return (
    <div>
      <div className="create_pwd_card--global d-flex">
        <div className={`create_pwd_card_content create_pwd_card`}>
          <h2>建立平台帳戶密碼</h2>
          <p>設定完成後將可使用一般登入方式登入平台</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="請輸入要設置的密碼"
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
              <button className="create_pwd_card_button" type="submit">
                送出
              </button>
              <button
                className="create_pwd_card_button cancel"
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

export default CreatePwdCard;
