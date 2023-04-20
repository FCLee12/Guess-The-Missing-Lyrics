import React from 'react';
import {useSelector} from 'react-redux';
import UserSongList from '../UserSongList/UserSongList';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Typography } from '@mui/material/';

function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <Grid container style={{"flex-direction":"column", "margin-left":"8px", "textAlign":"center"}} xs={5}>
        <Button 
          variant="contained" 
          endIcon={<AddIcon />}
          size="large">Add a New Song</Button>
        <Typography variant='h5'>
          Your Song Collection:
        </Typography>
        <UserSongList />
      </Grid>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
