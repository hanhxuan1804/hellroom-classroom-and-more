import socketio from "socket.io-client";
import React from "react";

export const getSocket = () => {
  const auth = localStorage.getItem("auth");
  const authJson = JSON.parse(auth);
  const token = authJson.data.token;
  if (token) {
    return socketio.connect(process.env.REACT_APP_SOCKET_URL, {
      query: { token },
    });
  }
  return null;
};

export const SocketContext = React.createContext();
