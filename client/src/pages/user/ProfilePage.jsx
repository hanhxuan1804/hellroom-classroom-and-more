import { Box, Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import ErrorPage from "../common/ErrorPage";

function ProfilePage() {
  const context = useOutletContext();
  const user = context.user;
  if (user===null || user===undefined || user==={}) {
    return <ErrorPage />;
  }
  const birthDate = user?.birthDate ? new Date(user.birthDate).toISOString().slice(0, 10) : "";
  return (
    <Grid item xs={12} sm={8}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" fontWeight={"bold"} sx={{ mb: 1 }}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" fontWeight={"bold"} sx={{ mb: 1 }}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">
                {user.firstName} {user.lastName}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" fontWeight={"bold"} sx={{ mb: 1 }}>
                Date of Birth
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">
                {birthDate}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" fontWeight={"bold"} sx={{ mb: 1 }}>
                Phone
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">{user.phoneNumber}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default ProfilePage;
