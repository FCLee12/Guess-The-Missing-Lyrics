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
    top: 554,
    left: 160.5,
    transform: 'translate(-50%, -50%)',
    width: 284,
    height: 230,
    bgcolor: 'background.paper',
    border: '1px solid #000',
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

  // This adds blanks to wherever the set of characters are
    // NOTE: if you don't include the g after the regex statement (example /dog/g vs /dog/) then only the first instance of it will be replaced
        // meaning when adding in the guesses from the user, drop the 'g' so you can feed each answer to a specific instance of /n!&x/
        // also meaning the answers will likely be recorded in an array and pushed through a loop
  function addBlanks(string, count) {
    const blanker = /n!&x/;
    return(string.replace(blanker, `*** ${count+1} ***`));
  }

  // this function converts the edited version to a temporary display version
  function convertToBlanks(string, arrLength) {
    let editArray = [string];
    for(let i = 0; i < arrLength; i++) {
        editArray.push(addBlanks(editArray[i], i));
    }
    return editArray[editArray.length-1];
  }

  // calling the convertor function
  const displayLyrics = convertToBlanks(songObj.edited_lyrics, songObj.edited_lyrics.length);

  
  return (
    <>
      <Grid container sx={{flexDirection: "column", ml: 1.2, mb: 31}}>
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
          <TextField sx={inputStyle} size="small" placeholder="  *** 1 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 2 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 3 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 4 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 5 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 6 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 7 ***" variant="outlined" />
          <TextField sx={inputStyle} size="small" placeholder="  *** 8 ***" variant="outlined" />
          <Button variant="outlined" size="small" sx={{mt: .5}}>Submit Your Guesses!</Button>        
        </Card>
      </Grid>
    </>
  );
}

export default PlayPage;
