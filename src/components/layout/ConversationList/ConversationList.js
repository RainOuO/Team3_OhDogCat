import React, { useState } from 'react';
import fakeimg from '../../../images/home_newsList_dog_2.png';

import './_conversationList.scss';

const ConversationList = ({ list, handleOpenRooms, handleCloseList }) => {
  return list.map((item, index) => {
    return (
      <div
        key={item.store_id}
        className="conversation_list"
        onClick={() => {
          handleOpenRooms(index);
          handleCloseList();
        }}
      >
        <div className="conversation_list_img obj-fit">
          <img src={fakeimg} alt="" />
        </div>
        <div className="conversation_list_name obj-fit">
          <p className="m-0">{item.store_name}</p>
        </div>
      </div>
    );
  });
};

export default ConversationList;
