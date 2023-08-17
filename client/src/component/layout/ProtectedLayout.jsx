import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../common/header";
import { setAuthToken } from "../../api";
import {  useSelector } from "react-redux";
import { authS } from "../../redux/selector";

const ProtectedLayout = (props) => {
  const navigate = useNavigate();
  const auth = useSelector(authS)
  useEffect(() => {
    if (!auth.isAuthenticated) {
      //console.log("No token found");
      navigate("/auth/login");
    }
    else {
      //console.log("Token found");
      setAuthToken(auth.token);
    }
  });
  return (
    <>
      <Header></Header>
      <Outlet
      ></Outlet>
    </>
  );
};

export default ProtectedLayout;
