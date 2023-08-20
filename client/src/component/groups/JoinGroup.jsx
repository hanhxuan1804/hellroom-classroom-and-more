import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../../pages/common/LoadingPage";
import { joinGroup } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { addGroup } from "../../redux/slice/groupSlice";
import { useDispatch } from "react-redux";

const JoinGroup = () => {
  const code = useParams().code;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const mutation = useMutation({
    mutationFn: joinGroup,
    onSuccess: (data) => {
      data = data.data;
      if (data.message) {
        enqueueSnackbar(data.message, { variant: "warning" });
      } else {
        enqueueSnackbar("Joined group successfully", { variant: "success" });
        const group = data.group;
        const ownerData = data.ownerData;
        const newGroup = {
          ...group,
          ownerData: ownerData,
        };
        //console.log(newGroup);
        dispatch(addGroup(newGroup));

      }
      navigate(`/groups/${data.group._id}`);
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
      navigate("/groups/join");
    },
  });

  useEffect(() => {
    mutation.mutate({
      code: code,
    });
    // eslint-disable-next-line
  }, []);

  return <LoadingPage />;
};

export default JoinGroup;
