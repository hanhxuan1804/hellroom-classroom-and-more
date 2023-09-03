import socketio from "socket.io-client";
import React from "react";
import { API_URL } from "../config";

export const getSocket = () => {
  const auth = localStorage.getItem("auth");
  const authJson = JSON.parse(auth);
  const token = authJson.data.token;
  if (token) {
    return socketio.connect(API_URL, {
      query: { token },
    });
  }
  return null;
};

export const SocketContext = React.createContext();
