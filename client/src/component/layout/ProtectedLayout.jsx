import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../common/header";
import { setAuthToken } from "../../api";
import {  useSelector } from "react-redux";
import { authS, groupsS } from "../../redux/selector";
import { useQuery } from "@tanstack/react-query";
import { getGroups, getUser } from "../../api";
import { useDispatch } from "react-redux";
import { setGroups } from "../../redux/slice/groupSlice";
import { setPath } from "../../redux/slice/pathSlice";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const dispatch = useDispatch();
  const auth = useSelector(authS)
  useEffect(() => {
    if (!auth.isAuthenticated) {
      //console.log("No token found");
      dispatch(setPath(path));
      navigate("/auth/login");
    }
    else {
      //console.log("Token found");
      setAuthToken(auth.token);
    }
    // eslint-disable-next-line
  },[]);
  const {
    isLoading: isLoadingGroups,
    data } = useQuery({
    queryKey: ["groups", auth?.user?._id],
    queryFn: () => getGroups(auth?.user?._id),
  });
  const groups = useSelector(groupsS).groups;
  useEffect(() => {
    if (data) {
      const fetchOwnerData = async () => {
        const changedGroups = data.data.groups.filter((group) => {
          const isExist = groups.find((g) => g._id === group._id);
          return !isExist;
        });

        const updatedGroups = await Promise.all(
          changedGroups.map(async (group) => {
            const owner = await getUser(group.owner);
            return {
              ...group,
              ownerData: owner.data,
            };
          })
        );
        dispatch(setGroups([...groups, ...updatedGroups]));
      };
      fetchOwnerData();
    }
    // eslint-disable-next-line
  }, [data]);
  return (
    <>
      <Header></Header>
      <Outlet
      ></Outlet>
    </>
  );
};

export default ProtectedLayout;
