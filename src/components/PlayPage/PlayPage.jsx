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
    return(string.replace(blanker, `**** ${count+1} ****`));
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
  console.log('these are the lyrics that will be displayed', displayLyrics);
  console.log('this is how many blanks there are', songObj.missing_lyrics);

  // creates an array that will be used to create a number of input fields equal to the number of missing blanks
  function inputFieldGenerator() {
    const inputFields = [];
    for(let i = 0; i < songObj.missing_lyrics; i++) {
      // console.log(inputFields);
      inputFields.push(i+1);
    };
    // console.log('this is the array', inputFields);
    // console.log('this is the number of input fields needed:', inputFields.length);
    return inputFields;
  }
  console.log('this is inputFieldGenerator', inputFieldGenerator());

  // local state for each possible input field
  const [answer1, setAnswer1] = useState('**** 1 ****');
  const [answer2, setAnswer2] = useState('**** 2 ****');
  const [answer3, setAnswer3] = useState('**** 3 ****');
  const [answer4, setAnswer4] = useState('**** 4 ****');
  const [answer5, setAnswer5] = useState('**** 5 ****');
  const [answer6, setAnswer6] = useState('**** 6 ****');
  const [answer7, setAnswer7] = useState('**** 7 ****');
  const [answer8, setAnswer8] = useState('**** 8 ****');

  
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
          {inputFieldGenerator().length > 0 ?
            <TextField key={1} sx={inputStyle} size="small" value={answer1} variant="outlined" onChange={(event) => setAnswer1(event.target.value)}/>
          : <TextField disabled key={1} sx={inputStyle} size="small" value={answer1} variant="outlined" onChange={(event) => setAnswer1(event.target.value)}/>}
          {inputFieldGenerator().length > 1 ?
            <TextField key={2} sx={inputStyle} size="small" value={answer2} variant="outlined" onChange={(event) => setAnswer2(event.target.value)}/>
          : <TextField disabled key={2} sx={inputStyle} size="small" value={answer2} variant="outlined" onChange={(event) => setAnswer2(event.target.value)}/>}
          {inputFieldGenerator().length > 2 ?
            <TextField key={3} sx={inputStyle} size="small" value={answer3} variant="outlined" onChange={(event) => setAnswer3(event.target.value)}/>
          : <TextField disabled key={3} sx={inputStyle} size="small" value={answer3} variant="outlined" onChange={(event) => setAnswer3(event.target.value)}/>}
          {inputFieldGenerator().length > 3 ?
            <TextField key={4} sx={inputStyle} size="small" value={answer4} variant="outlined" onChange={(event) => setAnswer4(event.target.value)}/>
          : <TextField disabled key={4} sx={inputStyle} size="small" value={answer4} variant="outlined" onChange={(event) => setAnswer4(event.target.value)}/>}
          {inputFieldGenerator().length > 4 ?
            <TextField key={5} sx={inputStyle} size="small" value={answer5} variant="outlined" onChange={(event) => setAnswer5(event.target.value)}/>
          : <TextField disabled key={5} sx={inputStyle} size="small" value={answer5} variant="outlined" onChange={(event) => setAnswer5(event.target.value)}/>}
          {inputFieldGenerator().length > 5 ?
            <TextField key={6} sx={inputStyle} size="small" value={answer6} variant="outlined" onChange={(event) => setAnswer6(event.target.value)}/>
          : <TextField disabled key={6} sx={inputStyle} size="small" value={answer6} variant="outlined" onChange={(event) => setAnswer6(event.target.value)}/>}
          {inputFieldGenerator().length > 6 ?
            <TextField key={7} sx={inputStyle} size="small" value={answer7} variant="outlined" onChange={(event) => setAnswer7(event.target.value)}/>
          : <TextField disabled key={7} sx={inputStyle} size="small" value={answer7} variant="outlined" onChange={(event) => setAnswer7(event.target.value)}/>}
          {inputFieldGenerator().length > 7 ?
            <TextField key={8} sx={inputStyle} size="small" value={answer8} variant="outlined" onChange={(event) => setAnswer8(event.target.value)}/>
          : <TextField disabled key={8} sx={inputStyle} size="small" value={answer8} variant="outlined" onChange={(event) => setAnswer8(event.target.value)}/>}
          <Button variant="outlined" size="small" sx={{mt: .5}}>Submit Your Guesses!</Button>        
        </Card>
      </Grid>
    </>
  );
}

export default PlayPage;
