import {
  Box,
  FormControl,
  Modal,
  OutlinedInput,
  Typography,
  FormHelperText,
  Button,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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


const JoinGroupPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [code, setCode] = React.useState("");
  const [firstSubmit, setFirstSubmit] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    setOpen(false);
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstSubmit(true);
    if(code === "") return;
    navigate(`/groups/join/${code}`);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ ...style}}>
        <h2 id="simple-modal-title">Join group</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography fontSize={14} fontStyle={"italic"} fontWeight={"bold"}>
              Enter group code:
            </Typography>
            <FormControl sx={{ m: 1, width: "25ch" }}>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                }}
                label="Group code"
              />
              <FormHelperText error={firstSubmit && code === ""}>
                {firstSubmit && code === "" ? "Group code is required" : ""}
              </FormHelperText>
            </FormControl>
          </div>
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
              Join
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default JoinGroupPage;
