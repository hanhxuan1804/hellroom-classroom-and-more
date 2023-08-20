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
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Upload } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteGroup, updateGroup } from "../../api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGroup as deleteGroupRedux } from "../../redux/slice/groupSlice"

const GroupEdit = (props) => {
  const { name, description, background } = props.groupData;
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [groupName, setGroupName] = useState(name);
  const [groupDescription, setGroupDescription] = useState(description);
  const [groupImage, setGroupImage] = useState(background);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [firstSubmit, setFirstSubmit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const updateMutation = useMutation({
    mutationFn: updateGroup,
    onSuccess: (data) => {
      props.handleEditSubmit({
        groupName: groupName,
        groupDescription: groupDescription,
        groupImage: groupImage,
      });
      props.handleClose();
      enqueueSnackbar("Update group successfully", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar("Update group failed", { variant: "error" });
    },
  });
  const handlleUpdate = async () => {
    await updateMutation.mutate({
      groupId: props.groupData._id,
      groupName: groupName,
      groupDescription: groupDescription,
      groupImage: groupImage,
    });
    setFirstSubmit(true);
  };
  const deleteMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: (data) => {
      props.handleClose();
      dispath(deleteGroupRedux(props.groupData._id));
      navigate("/groups/mygroups");
      enqueueSnackbar("Delete group successfully", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar("Delete group failed", { variant: "error" });
    },
  });
  const handleDelete = async () => {
    await deleteMutation.mutate(props.groupData._id);
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
        width={{
          xs: "90%",
          sm: "80%",
          md: "60%",
          lg: "50%",
          xl: "40%",
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
        <div
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
            <FormHelperText error={firstSubmit && groupName === ""}>
              {firstSubmit && groupName === "" ? "Group name is required" : ""}
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
              variant="outlined"
              color="error"
              sx={{
                width: 100,
                height: 40,
                borderRadius: 10,
              }}
              onClick={() => {
                setConfirmDelete(true);
              }}
            >
              Delete
            </Button>
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
              size="small"
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
              onClick={() => {
                handlleUpdate();
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <Dialog
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are you sure you want to delete this group?"}
          </DialogTitle>
          <DialogContent>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={deleteMutation.isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <DialogContentText id="alert-dialog-slide-description">
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button
              onClick={() => {
                handleDelete();
              }}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={updateMutation.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default GroupEdit;
