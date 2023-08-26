import React from "react";
import GroupCard from "./GroupCard";

const GroupCardExtend = (props) => {
  const { group } = props;
  //TODO: Add presentation beside group
  return <GroupCard group={group} />;
};

export default GroupCardExtend;
