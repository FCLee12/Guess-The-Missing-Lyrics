import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Grid, Typography, TextField, Paper } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function PlayPage() {

  const activeSong = useSelector(store => store.songs)
  let songObj = activeSong.activeSongReducer;
  // console.log('this is songObj taken from the store in PlayPage', songObj);
  
  const style = {
    position: 'fixed',
    top: 580,
    left: 160.5,
    transform: 'translate(-50%, -50%)',
    width: 234.5,
    height: 100,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexDirection:"column",
    textAlign:"center"
  };
  
  return (
    <>
      <Grid container sx={{flexDirection: "column", ml: 1.2, mb: 23}}>
        <Typography variant='h5' align='center' sx={{padding: 1, width: 300, ml: -1}}>
          {songObj.title}
        </Typography>
        <Typography variant='h6' align='center' sx={{padding: 1, width: 300, ml: -1}}>
          By: {songObj.artist}
        </Typography>
        <Paper sx={{width: 300, border: 'solid black 1px'}}>
          <Typography align='center' sx={{padding: 1}}>
            {songObj.edited_lyrics}
          </Typography>
        </Paper>
        <Card sx={style}>
          <Typography>This is some text</Typography>
        </Card>
      </Grid>
    </>
  );
}

export default PlayPage;
