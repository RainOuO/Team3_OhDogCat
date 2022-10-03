import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  handlePasswordEditCard,
  handlePasswordCreateCard,
} from '../../utils/handler/card/handleInputCard';
import { handleInfoComfirm } from '../../utils/handler/card/handleStatusCard';
import {
  handleWarning,
  handleSuccess,
} from '../../utils/handler/card/handleStatusCard';
import { useUserInfo } from '../../hooks/useUserInfo';
import { getUserProfile, editProfile } from '../../api/userApi';
import { callSendValidationMail, callValidationApi } from '../../api/authApi';

import './_adminProfilePage.scss';

const AdminProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserInfo();
  const [searchParams] = useSearchParams();
  const [rowData, setRowData] = useState({});
  const [editTarget, setEditTarget] = useState(0);
  const [edit, setEdit] = useState({
    email: '',
    name: { firstName: '', lastName: '' },
    phone: '',
    photo: '',
    social_name: '',
    gender: 0,
  });

  const editSetDefault = () => {
    const editDefault = {
      email: rowData.email,
      name: {
        firstName: rowData.name ? rowData.name[1] + rowData.name[2] : '',
        lastName: rowData.name ? rowData.name[0] : '',
      },
      phone: rowData.phone ? rowData.phone : '',
      photo: rowData.photo,
      social_name: rowData.social_name,
      gender: rowData.gender,
    };
    setEdit(editDefault);
  };

  const handleSubmit = (num) => {
    console.log(num);
    let apiConfig = {
      target: '',
      data: {},
      rowData: JSON.parse(JSON.stringify(rowData)),
      setRowData: setRowData,
      objKey: '',
    };

    switch (num) {
      case 1:
        if (edit.social_name === '') return handleWarning('更新欄位不可為空');
        if (edit.social_name === rowData.social_name) return;
        apiConfig.target = 'social_name';
        apiConfig.data = { socialName: edit.social_name };
        apiConfig.objKey = 'social_name';
        break;
      case 2:
        if (edit.name.lastName + edit.name.firstName === '')
          return handleWarning('更新欄位不可為空');
        if (edit.name.lastName + edit.name.firstName === user.data.name) return;
        apiConfig.target = 'name';
        apiConfig.data = { name: edit.name.lastName + edit.name.firstName };
        apiConfig.objKey = 'name';
        break;
      case 3:
        if (edit.phone === '') return handleWarning('更新欄位不可為空');
        if (edit.phone === rowData.phone) return;
        if (edit.phone.length !== 10)
          return handleWarning('請確認電話號碼格式', false, 'e.g. 09xxxxxxxx');
        apiConfig.target = 'phone';
        apiConfig.data = { phone: edit.phone };
        apiConfig.objKey = 'phone';
        break;
      case 4:
        if (edit.gender === 0 || edit.gender === '')
          return handleWarning('更新欄位不可為空');
        if (edit.gender === rowData.gender) return;

        apiConfig.target = 'gender';
        apiConfig.data = { gender: edit.gender };
        apiConfig.objKey = 'gender';

        break;
      default:
        break;
    }
    if (editProfile(apiConfig, setUser)) setEditTarget(0);
  };

  const handleValidationBtn = () => {
    callSendValidationMail({ action: 'mail' });
    handleSuccess('已寄發帳戶驗證信', false, `請至您的信箱收取信件`);
  };

  const handlePasswordEditBtn = () => {
    if (user.data.password) {
      handlePasswordEditCard(setUser, navigate);
    } else {
      handleInfoComfirm(
        '目前使用第三方平台認證登入',
        () => handlePasswordCreateCard(setUser),
        '你仍然可以設定一組密碼作為平台一般登入密碼使用<br/>需要前往設定嗎？'
      );
    }
  };

  useEffect(() => {
    getUserProfile(setRowData, setEdit);
    if (searchParams.get('code') && !user.data.account_valid) {
      const reqeustBody = {
        action: 'validation',
        code: searchParams.get('code'),
      };
      callValidationApi(reqeustBody, setUser, navigate);
    }
  }, []);

  useEffect(() => {
    editSetDefault();
  }, [rowData]);

  useEffect(() => {
    editSetDefault();
  }, [editTarget]);

  return (
    <div className="d-flex flex-fill">
      <div className="flex-fill">
        <div className="admin_main_content">
          <h2>會員資料設定</h2>
          <hr />
          <div className="profile_content d-flex flex-column">
            <div className="d-flex profile_list">
              <div className="profile_label">使用者帳號/信箱</div>
              <div className="d-flex flex-fill align-items-center justify-content-between">
                <div className="profile_info">{edit.email}</div>
                <div className="profile_btn">
                  <div className="d-flex">
                    {user.data.account_valid ? (
                      <button className="valid">已通過驗證</button>
                    ) : (
                      <button
                        className="invalid"
                        onClick={() => handleValidationBtn()}
                      >
                        尚未驗證
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <SocialName
              edit={edit.social_name}
              rowData={rowData.social_name}
              editTarget={editTarget}
              handleSubmit={handleSubmit}
              setEdit={setEdit}
              setEditTarget={setEditTarget}
            />
            <RealName
              edit={edit.name}
              rowData={rowData.name}
              editTarget={editTarget}
              setEdit={setEdit}
              handleSubmit={handleSubmit}
              setEditTarget={setEditTarget}
            />
            <PhoneNumber
              edit={edit.phone}
              rowData={rowData.phone}
              editTarget={editTarget}
              setEdit={setEdit}
              handleSubmit={handleSubmit}
              setEditTarget={setEditTarget}
            />
            <Gender
              edit={edit.gender}
              rowData={rowData.gender}
              editTarget={editTarget}
              setEdit={setEdit}
              handleSubmit={handleSubmit}
              setEditTarget={setEditTarget}
            />
          </div>
          <div className="profile_password text-end pt-5 mb-5">
            <button onClick={() => handlePasswordEditBtn()}>更改密碼</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialName = ({
  edit,
  setEdit,
  rowData,
  editTarget,
  setEditTarget,
  handleSubmit,
}) => {
  return (
    <div className="d-flex profile_list">
      <div className="profile_label">社群暱稱</div>
      <div className="d-flex flex-fill align-items-center">
        {editTarget !== 1 && <div className="profile_info">{rowData}</div>}
        {editTarget === 1 && (
          <div className="profile_info">
            <div>
              <input
                type="text"
                className="form-control"
                value={edit}
                placeholder="社群暱稱"
                onChange={(e) =>
                  setEdit((data) => ({ ...data, social_name: e.target.value }))
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="profile_btn">
        <div className="d-flex">
          <Buttons
            num={1}
            target={editTarget}
            setEditTarget={setEditTarget}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const RealName = ({
  edit,
  setEdit,
  rowData,
  editTarget,
  setEditTarget,
  handleSubmit,
}) => {
  return (
    <div className="d-flex profile_list">
      <div className="profile_label">真實姓名</div>
      <div className="d-flex flex-fill align-items-center">
        {editTarget !== 2 && (
          <div className="profile_info">{rowData ? rowData : '尚未設置'}</div>
        )}
        {editTarget === 2 && (
          <div className="profile_info">
            <div>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={edit.firstName}
                placeholder="名字"
                onChange={(e) =>
                  setEdit((data) => {
                    const newData = JSON.parse(JSON.stringify(data));
                    newData.name.firstName = e.target.value;
                    return newData;
                  })
                }
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={edit.lastName}
                placeholder="姓氏"
                onChange={(e) =>
                  setEdit((data) => {
                    const newData = JSON.parse(JSON.stringify(data));
                    newData.name.lastName = e.target.value;
                    return newData;
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="profile_btn">
        <div className="d-flex">
          <Buttons
            num={2}
            target={editTarget}
            setEditTarget={setEditTarget}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const PhoneNumber = ({
  edit,
  setEdit,
  rowData,
  editTarget,
  setEditTarget,
  handleSubmit,
}) => {
  return (
    <div className="d-flex profile_list">
      <div className="profile_label">手機號碼</div>
      <div className="d-flex flex-fill align-items-center">
        {editTarget !== 3 && (
          <div className="profile_info">{rowData ? rowData : '尚未設置'}</div>
        )}
        {editTarget === 3 && (
          <div className="profile_info">
            <div>
              <input
                type="text"
                className="form-control"
                min={10}
                maxLength={10}
                placeholder="手機號碼"
                value={edit}
                onChange={(e) =>
                  setEdit((data) => ({ ...data, phone: e.target.value }))
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="profile_btn">
        <div className="d-flex">
          <Buttons
            num={3}
            target={editTarget}
            setEditTarget={setEditTarget}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const Gender = ({
  edit,
  setEdit,
  rowData,
  editTarget,
  setEditTarget,
  handleSubmit,
}) => {
  const text = (rowData) => {
    switch (rowData) {
      case 1:
        return '男';
      case 2:
        return '女';
      case 3:
        return '不想透漏';
      default:
        return '尚未設置';
    }
  };
  return (
    <div className="d-flex profile_list">
      <div className="profile_label">性別</div>
      <div className="d-flex flex-fill align-items-center">
        {editTarget !== 4 && (
          <div className="profile_info">{text(rowData)}</div>
        )}
        {editTarget === 4 && (
          <div className="profile_info">
            <div className="d-flex align-items-center">
              <select
                className="form-select"
                onChange={(e) =>
                  setEdit((data) => ({
                    ...data,
                    gender: Number(e.target.value),
                  }))
                }
              >
                <option value={0}>--- 請選擇 ---</option>
                <option value={1}>男性</option>
                <option value={2}>女性</option>
                <option value={3}>不想透漏</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="profile_btn">
        <div className="d-flex">
          <Buttons
            num={4}
            target={editTarget}
            setEditTarget={setEditTarget}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const Buttons = ({ target, num, setEditTarget, handleSubmit }) => {
  return (
    <>
      {target !== num && (
        <button onClick={() => setEditTarget(num)}>編輯</button>
      )}
      {target === num && (
        <button className="completed" onClick={() => handleSubmit(num)}>
          完成
        </button>
      )}
      {target === num && <button onClick={() => setEditTarget(0)}>取消</button>}
    </>
  );
};

export default AdminProfilePage;
