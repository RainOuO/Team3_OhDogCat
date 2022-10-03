import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoChevronBack } from 'react-icons/io5';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { IoChatbubblesOutline } from 'react-icons/io5';
import ConversationList from '../ConversationList/ConversationList';
import ConversationRoom from '../ConversationRoom';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

import './_conversation.scss';
import { useSocket } from '../../../hooks/useSocket';

const credentialsConfig = {
  withCredentials: true,
};

const Conversation = () => {
  const { user, setUser } = useUserInfo();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [openingRooms, setOpeningRooms] = useState([]);
  const [conversationList, setConversationList] = useState([]);
  const { socket, messageData } = useSocket();
  const handleOpenRooms = (index) => {
    if (openingRooms.find((item) => item === index) >= 0) return;
    setOpeningRooms((rooms) => [...rooms, index]);
  };
  const handleRemoveRooms = (index) => {
    setOpeningRooms((rooms) => rooms.filter((v, i) => i !== index));
  };

  const getConversation = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/user/conversation`,
        credentialsConfig
      );
      console.log(data);
      setConversationList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.auth) {
      getConversation();
    }
    if (!user.auth) {
      setOpeningRooms([]);
      setConversationList([]);
    }
  }, [user.auth]);

  useEffect(() => {
    if (conversationList.length > 0) {
      console.log(conversationList);
    }
  }, [conversationList]);

  useEffect(() => {
    if (messageData) {
      const i = conversationList.findIndex(
        (item) => item.id === messageData.conversation_id
      );
      if (i >= 0) {
        setConversationList((list) => {
          const newData = JSON.parse(JSON.stringify(list));
          newData[i]['messages'].push(messageData);
          return newData;
        });
      }
      console.log(conversationList);
    }
  }, [messageData]);
  return !user.auth ? (
    ''
  ) : (
    <div className="conversation">
      <IoChatbubblesOutline
        onClick={handleShow}
        id="conversationBtn"
        className={`${show ? 'hide' : ''}`}
      />
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={'end'}
        className="conversation"
      >
        <div className="conversation_box">
          <section>
            <div className="headerRow" onClick={handleClose}>
              <IoChevronBack />
              訊息中心
            </div>
            <div className="mainRow">
              <ConversationList
                list={conversationList}
                handleOpenRooms={handleOpenRooms}
                handleCloseList={handleClose}
              />
            </div>
          </section>
        </div>
      </Offcanvas>
      <div className="conversation_area">
        {openingRooms.map((item, index) => {
          return (
            <ConversationRoom
              key={conversationList[item].store_id}
              updateSubmitResult={setConversationList}
              data={conversationList[item]}
              index={index}
              handleRemoveRooms={handleRemoveRooms}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Conversation;
