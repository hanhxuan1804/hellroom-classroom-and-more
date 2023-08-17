import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { CancelOutlined, Save } from "@mui/icons-material";
import { updateProfile } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { authS } from "../../redux/selector";
import { updateProfileSuccess, updateProfileRequest, updateProfileFailure } from "../../redux/slice/authSlice";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(authS).user;
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(updateProfile);

  const onSubmit = async (data) => {
    dispatch(updateProfileRequest())
    const result = await mutation.mutateAsync(data);
    if (result) {
      const newUser = { ...user, ...data };
      dispatch(updateProfileSuccess(newUser));
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      navigate("/user/profile");
    }
    if (mutation.isError) {
      dispatch(updateProfileFailure());
      enqueueSnackbar("Something went wrong. Please try again", {
        variant: "error",
      });
    }
  };

  return (
    <Grid item xs={12} sm={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={user.email}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      disabled
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={user.firstName}
                  rules={{
                    required: "First name is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Last Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={user.lastName}
                  rules={{
                    required: "Last name is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Date of Birth
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="birthDate"
                  control={control}
                  defaultValue={new Date(user.birthDate).toISOString().slice(0, 10)}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      variant="outlined"
                      error={!!errors.birthDate}
                      helperText={errors.birthDate?.message}
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue={user.phoneNumber}
                  rules={{
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2, mr: 2 }}
            onClick={() => navigate("/user/profile")}
            startIcon={<CancelOutlined />}
            size="small"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: 100 }}
            startIcon={<Save />}
            
            size="small"
          >
            {mutation.isLoading ? <CircularProgress
              size={20}
              color="inherit"
            /> : "Save"}
          </Button>
        </Box>
      </form>
    </Grid>
  );
};

export default EditProfilePage;
