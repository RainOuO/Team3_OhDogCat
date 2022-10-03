import React, { useEffect, useRef, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { IoRemove, IoImageOutline, IoSend } from 'react-icons/io5';
import fakeimg from '../../../images/home_newsList_dog_2.png';
import sticker1 from '../../../images/home_newsList_dog_1.png';
import sticker2 from '../../../images/home_newsList_dog_2.png';
import sticker3 from '../../../images/home_newsList_dog_3.png';
import sticker4 from '../../../images/home_newsList_dog_4.png';
import { FaPaw } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

import './_conversationRoom.scss';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { useSocket } from '../../../hooks/useSocket';

const credentialsConfig = {
  withCredentials: true,
};
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const ConversationRoom = ({
  data,
  index,
  handleRemoveRooms,
  updateSubmitResult,
}) => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('');
  const [sticker, setSticker] = useState(false);
  const textRef = useRef(null);
  const viewRef = useRef(null);
  const { socket } = useSocket();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const content = text;
      content.trim();
      if (content === '') return;
      console.log('send text ', content);
      const result = await axios.post(
        `${API_URL}/user/conversation/text/${data.id}`,
        {
          content: text,
        },
        credentialsConfig
      );
      const newMessage = {
        content: text,
        conversation_id: data.id,
        id: result.data.result,
        sender: 1,
        sticker: 0,
        type: 1,
        create_time: result.data.create_time,
      };
      updateSubmitResult((old) => {
        const newData = JSON.parse(JSON.stringify(old));
        const i = newData.findIndex((v) => v.id === data.id);
        newData[i]['messages'].push(newMessage);
        return newData;
      });
      socket.emit('sendMassage', {
        sender: 1,
        receiverId: data.store_id,
        message: newMessage,
      });
      setText('');
      setSticker(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStickerSend = async (num) => {
    setSticker(false);
    try {
      const result = await axios.post(
        `${API_URL}/user/conversation/sticker/${data.id}`,
        {
          sticker: num,
        },
        credentialsConfig
      );
      const newMessage = {
        content: '',
        conversation_id: data.id,
        id: result.data.result,
        sender: 1,
        sticker: num,
        type: 3,
        create_time: result.data.create_time,
      };
      updateSubmitResult((old) => {
        const newData = JSON.parse(JSON.stringify(old));
        const i = newData.findIndex((v) => v.id === data.id);
        newData[i]['messages'].push(newMessage);
        return newData;
      });
      socket.emit('sendMassage', {
        sender: 1,
        receiverId: data.store_id,
        message: newMessage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoSend = async (e) => {
    try {
      let formData = new FormData();
      formData.append('photo', e.target.files[0]);
      let result = await axios.post(
        `${API_URL}/user/conversation/photo/${data.id}`,
        formData,
        credentialsConfig
      );
      const newMessage = {
        content: result.data.photoPath,
        conversation_id: data.id,
        id: result.data.result,
        sender: 1,
        sticker: 0,
        type: 2,
        create_time: result.data.create_time,
      };
      updateSubmitResult((old) => {
        const newData = JSON.parse(JSON.stringify(old));
        const i = newData.findIndex((v) => v.id === data.id);
        newData[i]['messages'].push(newMessage);
        return newData;
      });
      socket.emit('sendMassage', {
        sender: 1,
        receiverId: data.store_id,
        message: newMessage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    // if (textRef.current.scrollHeight < textRef.current.offsetHeight) {
    //   textRef.current.style.height = textRef.current.scrollHeight + -20 + 'px';
    // } else {
    //   textRef.current.style.height = textRef.current.scrollHeight + 'px';
    // }
    setText(e.target.value);
  };

  // function keyPressEvent(e) {
  //   if (e.key === 'Enter') {
  //     handleSubmit(e);
  //   }
  // }

  useEffect(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    // if (textRef.current) {
    //   textRef.current.addEventListener('keypress', keyPressEvent);
    // }
  }, [textRef]);

  useEffect(() => {
    viewRef.current?.scrollTo(0, viewRef.current.scrollHeight);
    console.log(data);
  }, [viewRef, data]);
  return (
    <div className={`conversation_room ${active ? 'active' : ''}`}>
      <div
        className="conversation_room_header"
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="header_img obj-fit">
          <img src={fakeimg} alt="" />
        </div>
        <div className="header_name obj-fit">
          <div className="m-0">{data.store_name}</div>
        </div>
        <div className="header_close" onClick={(e) => handleRemoveRooms(index)}>
          <IoRemove />
        </div>
      </div>
      <PhotoProvider maskOpacity={0.8}>
        <div className="conversation_room_main flex-fill" ref={viewRef}>
          {data.messages.map((value) => {
            if (value.type === 1)
              return (
                <TextType data={value} storeImg={fakeimg} key={value.id} />
              );
            if (value.type === 2)
              return <ImgType data={value} storeImg={fakeimg} key={value.id} />;
            if (value.type === 3)
              return (
                <StickrType data={value} storeImg={fakeimg} key={value.id} />
              );
          })}
        </div>
      </PhotoProvider>
      <form className="conversation_room_footer" onSubmit={handleSubmit}>
        <div className="message_type--text">
          <input
            className={`form-control text`}
            placeholder="Aa"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex">
          <div
            className="message_type--sticker"
            onClick={() => setSticker((status) => !status)}
          >
            <FaPaw />
          </div>
          <label htmlFor="messageImg" className="message_type--photo">
            <IoImageOutline />
          </label>
          <input
            id="messageImg"
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoSend(e)}
          />
          <div className="flex-fill flex-shrink-1"></div>
          <div className="message_type--button" onClick={handleSubmit}>
            <IoSend />
          </div>
        </div>
      </form>
      <div id="sticker" className={sticker ? 'active' : ''}>
        <div className="sticker obj-fit">
          <img src={sticker1} alt="" onClick={() => handleStickerSend(1)} />
        </div>
        <div className="sticker obj-fit">
          <img src={sticker2} alt="" onClick={() => handleStickerSend(2)} />
        </div>
        <div className="sticker obj-fit">
          <img src={sticker3} alt="" onClick={() => handleStickerSend(3)} />
        </div>
        <div className="sticker obj-fit">
          <img src={sticker4} alt="" onClick={() => handleStickerSend(4)} />
        </div>
      </div>
    </div>
  );
};

const TextType = ({ data, storeImg }) => {
  return data.sender !== 1 ? (
    <div className="message mb-3">
      <div className="message_img obj-fit">
        <img src={storeImg} alt="" />
      </div>
      <div className="message_content">{data.content}</div>
    </div>
  ) : (
    <div className="message own mb-3">
      <div className="message_content">{data.content}</div>
    </div>
  );
};

const ImgType = ({ data, storeImg }) => {
  return data.sender !== 1 ? (
    <div className="message mb-3">
      <div className="message_img obj-fit">
        <img src={storeImg} alt="" />
      </div>
      <div className="message_content type_img">
        <PhotoView key={data.content} src={`${BASE_URL}` + data.content} alt="">
          <img src={`${BASE_URL}` + data.content} alt="" />
        </PhotoView>
      </div>
    </div>
  ) : (
    <div className="message own mb-3">
      <div className="message_content type_img">
        <PhotoView key={data.content} src={`${BASE_URL}` + data.content} alt="">
          <img src={`${BASE_URL}` + data.content} alt="" />
        </PhotoView>
      </div>
    </div>
  );
};

const StickrType = ({ data, storeImg }) => {
  const showSticker = () => {
    switch (data.sticker) {
      case 1:
        return sticker1;
      case 2:
        return sticker2;
      case 3:
        return sticker3;
      case 4:
        return sticker4;
      default:
        break;
    }
  };
  return data.sender !== 1 ? (
    <div className="message mb-3">
      <div className="message_img obj-fit">
        <img src={storeImg} alt="" />
      </div>
      <div className="message_content type_sticker">
        <img src={showSticker()} alt="" />
      </div>
    </div>
  ) : (
    <div className="message own mb-3">
      <div className="message_content type_sticker">
        <img src={showSticker()} alt="" />
      </div>
    </div>
  );
};

export default ConversationRoom;
