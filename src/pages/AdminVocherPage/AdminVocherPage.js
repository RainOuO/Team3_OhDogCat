import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import dogIcon from '../../images/travel_dog_paws.svg';
import Vouchers from '../../components/adminPage/Vouchers';
import './_adminVocherPage.scss';

const AdminVocherPage = () => {
  return (
    <div className="d-flex flex-fill">
      <div className="flex-fill">
        <Tabs
          defaultActiveKey="1"
          id="uncontrolled-tab-example"
          className="communityManagementTab"
        >
          <Tab
            eventKey="1"
            title={
              <div className="d-flex">
                <img className="tab_claw me-2 " src={dogIcon} alt="" />
                <p className="my-2 tab_text_size">我的票券</p>
              </div>
            }
          >
            <Vouchers valid={true} />
          </Tab>
          <Tab
            eventKey="2"
            title={
              <div className="d-flex">
                <img className="tab_claw me-2 " src={dogIcon} alt="" />
                <p className="my-2 tab_text_size">已無效 / 兌畢</p>
              </div>
            }
          >
            <Vouchers valid={false} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminVocherPage;
