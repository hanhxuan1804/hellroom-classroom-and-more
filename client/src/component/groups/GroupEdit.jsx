import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Modal,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { Upload } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
const GroupEdit = (props) => {
  const { name, description, background } = props.groupData;
  const [groupName, setGroupName] = useState(name);
  const [groupDescription, setGroupDescription] = useState(description);
  const [groupImage, setGroupImage] = useState(background);

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            height: 200,
            background: `url(${groupImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Paper>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography fontStyle={"italic"}>Change group image</Typography>
          <Button variant="outlined" component="label" startIcon={<Upload />}>
            Upload Image
            <input
              type="file"
              multiple={false}
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                  setGroupImage(reader.result);
                };
              }}
            />
          </Button>
        </div>
        <Divider />
        <form
          onSubmit={props.handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography sx={{ mt: 2 }} fontStyle={"italic"}>
            Group Name:
          </Typography>
          <FormControl fullWidth>
            <OutlinedInput
              id="group-name"
              size="small"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              label="Group Name"
            />
            <FormHelperText error={props.firstSubmit && groupName === ""}>
              {props.firstSubmit && groupName === ""
                ? "Group name is required"
                : ""}
            </FormHelperText>
          </FormControl>
          <Typography sx={{ mt: 2 }} fontStyle={"italic"}>
            Group Description:
          </Typography>
          <FormControl fullWidth>
            <OutlinedInput
              id="group-description"
              size="small"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              label="Group Description"
              multiline
              rows={4}
            />
          </FormControl>
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
              onClick={props.handleClose}
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
              Save
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default GroupEdit;
