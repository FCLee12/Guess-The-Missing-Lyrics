import React from 'react';
import {useSelector} from 'react-redux';
import UserSongList from '../UserSongList/UserSongList';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, Typography } from '@mui/material/';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function GuestDashboard() {
  
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const registeredUserInfo = useSelector((store) => store.songs)
  console.log('this is registeredUserInfo in Guest Dash', registeredUserInfo.songsReducer.data[0].username);
  
  return (
    <>
      <Grid container sx={{flexDirection:"column", marginLeft: 1, textAlign:"center", width: 290}}>
        {registeredUserInfo ? 
        <Typography variant='h5' sx={{mb: 2}}>
          {registeredUserInfo.songsReducer.data[0].username}'s Playable Song Collection:
        </Typography>
        :
        <Typography>Song Collection:</Typography>
        }
        <UserSongList />
      </Grid>
    </>
  );
}

// this allows us to use <App /> in index.js
export default GuestDashboard;
