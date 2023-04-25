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
    top: 558,
    left: 160.5,
    transform: 'translate(-50%, -50%)',
    width: 284,
    height: 220,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
    textAlign:"center"
  };

  const inputStyle = {
    width: 100,
    height: 40,
    ml: 2,
    mr: 2,
    mt: .5,
    mb: .5
  }
  
  return (
    <>
      <Grid container sx={{flexDirection: "column", ml: 1.2, mb: 30}}>
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
          <Typography>Enter Your Guesses!</Typography>
          <TextField sx={inputStyle} size="small" placeholder="  *** 1 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 2 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 3 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 4 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 5 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 6 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 7 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 8 ***" variant="outlined" />
        </Card>
      </Grid>
    </>
  );
}

export default PlayPage;
