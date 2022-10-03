import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from 'react';
import { useUserInfo } from './useUserInfo';
import webSocket from 'socket.io-client';

const socketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, setUser } = useUserInfo();
  const [socket, setSocket] = useState(null);
  const [messageData, setmessageData] = useState(null);

  useEffect(() => {
    if (user.auth && user.firstVerify && !user.socket) {
      console.log('觸發 socket connection');
      setSocket(webSocket('http://localhost:3007/'));
      setUser((user) => ({ ...user, socket: true }));
    }
    if (!user.auth && user.firstVerify && user.socket) {
      socket.disconnect();
    }
    if (user.auth && user.firstVerify && user.socket) {
      socket.connect();
      socket.emit('addUser', user.data.id);
    }
  }, [user.auth]);

  useEffect(() => {
    if (socket) {
      socket.emit('addUser', user.data.id);
      socket.on('receiveMessage', (message) => {
        console.log(message);
        setmessageData(message);
      });
    }
  }, [socket]);
  return (
    <socketContext.Provider value={{ socket, messageData }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);
