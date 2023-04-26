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
  
  return (
    <>
      <Grid container sx={{flexDirection:"column", marginLeft: 1, textAlign:"center", width: 290}}>
        <Typography variant='h5'>
          {registeredUserInfo.songsReducer.username} Song Collection:
        </Typography>
        <UserSongList />
      </Grid>
    </>
  );
}

// this allows us to use <App /> in index.js
export default GuestDashboard;
