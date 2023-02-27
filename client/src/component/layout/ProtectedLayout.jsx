import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import useLocalStorage from "../../hooks/useLocalStorage";
import Header from "../common/header";

const ProtectedLayout = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useLocalStorage("user", {}); // store user info
  useEffect(() => {
    if (!auth.token) {
      // console.log("No token found");
      navigate("/auth/login");
    }
  });
  return (
    <>
      <Header user={user}></Header>
      <Outlet
        context={{
          user: user,
          setUser: setUser,
        }}
      ></Outlet>
    </>
  );
};

export default ProtectedLayout;
