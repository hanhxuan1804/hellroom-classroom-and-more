import { Container, Grid, Box } from '@mui/material'
import React from 'react'

const HomePage = () => {
  return (
    <Container 
    >       
    <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
        <Box height={300}
        
        >
            <h1>My Groups</h1>
            <>List My Groups</>
        </Box>
            <h1>Other group</h1>
            <>List Other Groups</>
        </Grid>
        <Grid item xs={12} sm={4}>
            <h1>Recent activity</h1>
            <>List Recent Activity</>
        </Grid>
    </Grid>
    </Container>
    
      )
}

export default HomePage