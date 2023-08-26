import {
  Modal,
  Button,
  Box,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Typography,
  Select,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authS, groupsS } from "../../redux/selector";
import { createPresentation } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { addPresentation } from "../../redux/slice/presentationSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  width:{
    xs: "80%",
    sm: "400px",
  },
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function CreatePresentationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("public");
  const [presentationName, setPresentationName] = useState("");
  //eslint-disable-next-line
  const [firstSubmit, setFirstSubmit] = useState(false);
  const user = useSelector(authS).user;
  const groups = useSelector(groupsS).groups;
  const groupList = groups.filter(
    (group) => group.owner === user._id || group.coowners.includes(user._id)
  );
  const [group, setGroup] = useState(groupList[0]);
  const [isHaveGroup] = useState(groupList.length > 0);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    handleOpen();
  }, []);
  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    //setOpen(false);
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const mutation = useMutation({
    mutationFn: (newPresentation) => createPresentation(newPresentation),
    onSuccess: (data) => {
      const presentation = data.data.presentation;
      const slides = data.data.slides;
      presentation.slides = slides;
      dispatch(addPresentation(presentation));
      navigate(`/presentation/${presentation._id}/edit`);
      enqueueSnackbar("Create presentation successfully", {
        variant: "success",
      });
    },
    onerror: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstSubmit(true);
    if (presentationName === "") return;
    // Xử lý việc tạo nhóm mới
    const newPresentation = {
      name: presentationName,
      type: type,
      group: group?._id,
      owner: user._id,
      slide: [],
    };
    //
    mutation.mutateAsync(newPresentation);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ ...style }}>
        <h2 id="simple-modal-title">Create new presentation</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              width={"50%"}
              fontSize={14}
              fontStyle={"italic"}
              fontWeight={"bold"}
            >
              Type:
            </Typography>
            <FormControl fullWidth>
              <Select
                size="small"
                native
                onChange={(event) => setType(event.target.value)}
                inputProps={{
                  name: "type",
                  id: "outlined-age-native-simple",
                }}
              >
                <option value={"public"}>Public</option>
                <option value={"private"} disabled={!isHaveGroup}>
                  {" "}
                  Private
                </option>
                {!isHaveGroup && (
                  <option
                    disabled={true}
                    style={{
                      color: "#FF9966",
                      fontStyle: "italic",
                      fontSize: "10px",
                    }}
                  >
                    *You don't have any group to create private presentation
                  </option>
                )}
              </Select>
            </FormControl>
          </div>
          {type === "private" && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Typography
                width={"50%"}
                fontSize={14}
                fontStyle={"italic"}
                fontWeight={"bold"}
              >
                Group:
              </Typography>
              <FormControl fullWidth>
                <Select
                  size="small"
                  native
                  onChange={(event) =>
                    setGroup(
                      groupList.find((item) => item._id === event.target.value)
                    )
                  }
                  inputProps={{
                    name: "group",
                    id: "outlined-age-native-simple",
                  }}
                >
                  {groupList.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              width={"50%"}
              fontSize={14}
              fontStyle={"italic"}
              fontWeight={"bold"}
            >
              Presentation Name:
            </Typography>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Name"
                value={presentationName}
                size="small"
                onChange={(event) => setPresentationName(event.target.value)}
              />
              <FormHelperText error={presentationName === "" && firstSubmit}>
                {presentationName === "" && firstSubmit
                  ? "*Presentation name is required"
                  : ""}
              </FormHelperText>
            </FormControl>
          </div>
          <br />
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: 100,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#e0e0e0",
                color: "black",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  color: "black",
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: 100,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#0b5c6d",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0b5c6d",
                  color: "white",
                },
              }}
            >
              Create
            </Button>
          </div>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={mutation.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
}
export default CreatePresentationPage;
