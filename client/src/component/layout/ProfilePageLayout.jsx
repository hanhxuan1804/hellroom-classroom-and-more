import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { Edit, EditOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { uploadAvatar } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";


function ProfilePageLayout() {
  const {user , setUser} = useOutletContext();
  const navigate = useNavigate();
  const [isEidt, setIsEdit] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/user/edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [location.pathname]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [avatar, setAvatar] = useState(user.avatar); 
  const [file, setFile] = useState(null); // store file to upload
  const [isUpload, setIsUpload] = useState(false);
  const handleAvatarChange = (e) => {
    e.stopPropagation();
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setIsUpload(true);
  };
  const mutation = useMutation(uploadAvatar);
  const { enqueueSnackbar } = useSnackbar();
  const handleUploadAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", file);
    const result = await mutation.mutateAsync(formData);
    if (result.status === 200) {
      setUser({ ...user, avatar: result.data.avatar });
      enqueueSnackbar("Upload avatar successfully", {
        variant: "success",
      });
      setAvatar(result.data.avatar);
      setIsUpload(false);
      
    }
    else{
      enqueueSnackbar(result.data, {
        variant: "error",
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardHeader title={`${user.firstName} ${user.lastName}`} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 0,
            }}
          >
            {!isSmallScreen && (
              <Button
                variant="outlined"
                style={{
                  borderColor: "#778899",
                  height: "30px",
                  marginRight: "10px",
                  padding: "0 10px",
                }}
                size="small"
                color={isEidt ? "error" : "primary"}
                startIcon={isEidt ? <EditOff /> : <Edit />}
                onClick={() => {
                  if (isEidt) {
                    navigate(-1);
                  } else {
                    navigate("edit");
                  }
                }}
              >
                {isEidt ? "Cancel" : "Edit Profile"}
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar src={isUpload ? avatar : `${process.env.REACT_APP_API_URL}/user/avatar/${user.avatar}`} sx={{ width: 100, height: 100 }}>
                  {user.firstName.charAt(0)}
                </Avatar>
              </Box>
              <form
                encType="multipart/form-data"
              >
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {isUpload ? (
                    <Box>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        component="label"
                        style={{
                          borderColor: "#778899",
                          marginRight: "10px",
                        }}
                        onClick={() => {
                          setAvatar(user.avatar);
                          setIsUpload(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outlined"
                        style={{
                          borderColor: "#778899",
                        }}
                        size="small"
                        component="label"
                        type="submit"
                        onClick={()=>{
                          handleUploadAvatar()
                        }}
                      >
                        {mutation.isLoading ? (
                          <CircularProgress size={20} color="primary" />
                        ) : (
                          "Save"
                        )}
                       
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      style={{
                        borderColor: "#778899",
                      }}
                      size="small"
                      component="label"
                    >
                      Update Avatar
                      <input
                        name="file"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleAvatarChange}
                      />
                    </Button>
                  )}
                </Box>
              </form>
            </Grid>
            <Outlet />
          </Grid>
          {isSmallScreen && !isEidt && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="outlined"
                style={{
                  borderColor: "#778899",
                  height: "30px",
                  marginRight: "10px",
                  padding: "0 10px",
                }}
                size="small"
                color={"primary"}
                startIcon={<Edit />}
                onClick={() => {
                  if (isEidt) {
                    navigate(-1);
                  } else {
                    navigate("edit");
                  }
                }}
              >
                {"Edit Profile"}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProfilePageLayout;
