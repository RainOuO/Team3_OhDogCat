import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../../utils/config';
import { handleSuccess } from '../../../utils/handler/handleStatusCard';
import { FaPaw } from 'react-icons/fa';
import dog2 from '../../../images/home_newsList_dog_2.png';
import 'animate.css';
import './_CreateTravel.scss';

const CreateTravel = () => {
  const [loginMember, setLoginMember] = useState({
    title: '',
    start_time: '',
    end_time: '',
  });
  function handleChange(e) {
    setLoginMember({ ...loginMember, [e.target.name]: e.target.value });
  }
  //TODO: userid還沒寫進資料庫
  async function handleSubmit(e) {
    e.preventDefault();
    let response = await axios.post(`${API_URL}/submit/addDate`, loginMember, {
      withCredentials: true,
    });
    handleSuccess('成功建立此行程!', '/Travel');
  }

  return (
    <>
      <div className="CreateTravel">

      <img className="SloganImg disappear animate__animated animate__tada" src={dog2} alt="" />
          <div className="BGCircle1 disappear"></div>
          <div className="BGCircle2 disappear"></div>
          <div className="BGCircle3 disappear"></div>
          <div className="BGCircle4 disappear"></div>
          <div className="BGCircle5 disappear"></div>
          <div className="BGCircle6 disappear"></div>
          <p className='mainSlogan1'>我想出去玩！</p>
          <p className='slogan'>趕快跟著我一起規劃吧<FaPaw className="FaPaw"/></p>
        <div className="FormBody">
          <Form>
            {/* <h2 className="Title">新增行程 </h2> */}
            <div className="InputGroup">
              <InputGroup className="InputGroupForm">
                <div className='travelName'>
                  <Form.Control
                    type="text"
                    name="title"
                    value={loginMember.travel}
                    placeholder="請輸入行程名稱"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleChange}
                    className="inputSection"
                  />
                </div>
                <div className="">
                  <Form.Control
                    type="date"
                    name="start_time"
                    value={loginMember.starttime}
                    placeholder=""
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleChange}
                    className=""
                  />
                </div>
                <div className="">
                  <Form.Control
                    type="date"
                    name="end_time"
                    value={loginMember.endtime}
                    placeholder="請輸入景點關鍵字"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleChange}
                    className=""
                  />
                </div>

                <Button
                  variant="outline-secondary"
                  type="submit"
                  onClick={handleSubmit}
                  className="submitButton"
                >
                  新增
                </Button>
              </InputGroup>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateTravel;
