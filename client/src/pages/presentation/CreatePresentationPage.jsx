import {
  Modal,
  Button,
  Box,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Typography,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authS } from "../../redux/selector";
import { createPresentation } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  with: "400px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const listOwnerGroup = [
  {
    id: 1,
    name: "Group 1",
  },
  {
    id: 2,
    name: "Group 2",
  },
  {
    id: 3,
    name: "Group 3",
  },
];
function CreatePresentationPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("public");
  const [presentationName, setPresentationName] = useState("");
  //eslint-disable-next-line
  const [group, setGroup] = useState(listOwnerGroup[0]);
  const [firstSubmit, setFirstSubmit] = useState(false);
  const user = useSelector(authS).user;
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    handleOpen();
  }, []);
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick" && reason === "escapeKeyDown")
      return;
    setOpen(false);
    navigate("/presentation/:1/edit");
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const mutation = useMutation(
    {
      mutationFn: (newPresentation) => createPresentation(newPresentation),
      onSuccess: (data) => {
        console.log(data);
        handleClose();
      },
      onerror: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    },
  )
  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstSubmit(true);
    if (presentationName === "") return;
    // Xử lý việc tạo nhóm mới
    const newPresentation = {
      name: presentationName,
      type: type,
      group: group,
      owner: user._id,
      slide: [],
    };
    mutation.mutate(newPresentation);

    console.log(`Đã tạo ${presentationName} `);
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
                <option value={"private"}>Private</option>
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
                      listOwnerGroup.find(
                        (item) => item.id === parseInt(event.target.value)
                      )
                    )
                  }
                  inputProps={{
                    name: "group",
                    id: "outlined-age-native-simple",
                  }}
                >
                  {listOwnerGroup.map((item) => (
                    <option value={item.id}>{item.name}</option>
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
                  ? "*Group name is required"
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
      </Box>
    </Modal>
  );
}
export default CreatePresentationPage;
