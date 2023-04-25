import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, TextField, Paper } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function PlayPage() {

  const activeSong = useSelector(store => store.songs)
  let songObj = activeSong.activeSongReducer;
  // console.log('this is songObj taken from the store in PlayPage', songObj);
  
  
  return (
    <>
      <Paper>
        <Typography>

        </Typography>
      </Paper>
    </>
  );
}

export default PlayPage;
