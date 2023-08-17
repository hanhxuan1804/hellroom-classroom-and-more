import {Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { authS } from '../../redux/selector';

function ProfilePage() {
  const user = useSelector(authS).user;
  return (
    <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Email</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body1">{user.email}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Name</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body1">{user.firstName} {user.lastName}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Date of Birth</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body1">{new Date(user.birthDate).toISOString().slice(0, 10)  }</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Phone</Typography>
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
