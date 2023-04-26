import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Card, Grid, Modal, Typography, TextField, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function PlayPage() {

  const history = useHistory();
  const activeSong = useSelector(store => store.songs)
  let songObj = activeSong.activeSongReducer;
  // console.log('this is songObj taken from the store in PlayPage', songObj);
  
  // style for lyric display
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

  // style for input fields
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
  // console.log('these are the lyrics that will be displayed', displayLyrics);
  // console.log('this is how many blanks there are', songObj.missing_lyrics);

  // local state for each possible input field
  const [answer1, setAnswer1] = useState('**** 1 ****');
  const [answer2, setAnswer2] = useState('**** 2 ****');
  const [answer3, setAnswer3] = useState('**** 3 ****');
  const [answer4, setAnswer4] = useState('**** 4 ****');
  const [answer5, setAnswer5] = useState('**** 5 ****');
  const [answer6, setAnswer6] = useState('**** 6 ****');
  const [answer7, setAnswer7] = useState('**** 7 ****');
  const [answer8, setAnswer8] = useState('**** 8 ****');

  // console.logs to monitor input values
  // console.log('this is answer1', answer1);
  // console.log('this is answer1', answer2);
  // console.log('this is answer1', answer3);
  // console.log('this is answer1', answer4);
  // console.log('this is answer1', answer5);
  // console.log('this is answer1', answer6);
  // console.log('this is answer1', answer7);
  // console.log('this is answer1', answer8);


  // ********** HANDLE SUBMIT YOUR GUESSES BUTTON **********
  // local state to store resultsObj
  const [resultsObj, setResultsObj] = useState('');
  // this happens when the submit your guesses! button
  const sendGuesses = () => {
    // building an array of the user's answers
    let answersArray = [];
    if(answer1 !== '**** 1 ****') {
      answersArray.push(answer1)
    }
    if(answer2 !== '**** 2 ****') {
      answersArray.push(answer2)
    }
    if(answer3 !== '**** 3 ****') {
      answersArray.push(answer3)
    }
    if(answer4 !== '**** 4 ****') {
      answersArray.push(answer4)
    }
    if(answer5 !== '**** 5 ****') {
      answersArray.push(answer5)
    }
    if(answer6 !== '**** 6 ****') {
      answersArray.push(answer6)
    }
    if(answer7 !== '**** 7 ****') {
      answersArray.push(answer7)
    }
    if(answer8 !== '**** 8 ****') {
      answersArray.push(answer8)
    }
    console.log('this is the answersArray:', answersArray);

    // this function will replace the n!&x bundles with a word from the answersArray
    function insertAnswers(string, answerArray, count) {
      const blanker = /n!&x/;
      return(string.replace(blanker, answerArray[count]));
    }

    // this converts the edited version to a version with the user's answer inputs
    // will take in an array of the user's answers
    function convertToAnswers(string, arrLength, answerArray) {
      let editArray = [string];
      for(let i = 0; i < arrLength; i++) {
          editArray.push(insertAnswers(editArray[i], answerArray, i));
      }
      return editArray[editArray.length-1];
    }

    // console.log('**** this is the lyric string with the user answers ****', convertToAnswers(songObj.edited_lyrics, songObj.missing_lyrics, answersArray));
    // this is the lyric string with the user's guesses placed into the blanks
    const userGuess = convertToAnswers(songObj.edited_lyrics, songObj.missing_lyrics, answersArray);

    // this splits the lyric strings into spaces and words
      // NOTE: 'en' means english language
    const segmenter = new Intl.Segmenter(
      'en', { granularity: 'word' }
    );
    
    const userGuessString = segmenter.segment(userGuess.toLowerCase());
    const answerKeyString = segmenter.segment(songObj.answer_lyrics.toLowerCase());
    
    // compares the lyrics with the user's guesses against the answer key
    const generateResults = (array1, array2) => {
      let correctAnswerArray = [];
      let wrongAnswerArray = [];
      let resultsDisplayArray = [];
      let extrasArray = [];
      for(let i = 0; i < array1.length; i++) {
        if(array1[i].segment !== array2[i].segment) {
          wrongAnswerArray.push(array1[i]);
          correctAnswerArray.push(array2[i]);
          let blankNumber = answersArray.indexOf(array1[i].segment) + 1;
          console.log(blankNumber);
          let obj = {yourAnswer: array1[i].segment, correctAnswer: array2[i].segment, number: blankNumber};
          resultsDisplayArray.push(obj);
        } else {
          extrasArray.push(array1[i]);
        }
      }

      // calculating correct answers and incorrect answers
      const correctAnswers = songObj.missing_lyrics - wrongAnswerArray.length;

      let answersObj = {
        correctAnswersArray: correctAnswerArray,
        wrongAnswersArray: wrongAnswerArray,
        resultsDisplayArray: resultsDisplayArray,
        extrasArray: extrasArray,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswerArray.length
      };
      console.log(answersObj);
      setResultsObj(answersObj);
    }
    // END generateResults function

    // .filter(s => s.isWordLike) property spits filters out spaces or punctuation, leaving only words in the array to compare
    generateResults([...userGuessString].filter(s => s.isWordLike), [...answerKeyString].filter(s => s.isWordLike));
    // opens the modal
    handleOpen();
  }
  // END ********** HANDLE SUBMIT YOUR GUESSES BUTTON **********

  // ********** RESULTS MODAL **********
    // needed local state and two functions to toggle Modal on and off
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 235,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      align: 'center'
    };

    const returnToDash = () => {
      history.push('/home')
    }
  // END ********** RESULTS MODAL **********
  
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
            {displayLyrics}
          </Typography>
        </Paper>
        <Card sx={style}>
          {songObj.missing_lyrics > 0 ?
            <TextField key={1} sx={inputStyle} size="small" value={answer1} variant="outlined" onChange={(event) => setAnswer1(event.target.value)}/>
          : <TextField disabled key={1} sx={inputStyle} size="small" value={answer1} variant="outlined" onChange={(event) => setAnswer1(event.target.value)}/>}
          {songObj.missing_lyrics > 1 ?
            <TextField key={2} sx={inputStyle} size="small" value={answer2} variant="outlined" onChange={(event) => setAnswer2(event.target.value)}/>
          : <TextField disabled key={2} sx={inputStyle} size="small" value={answer2} variant="outlined" onChange={(event) => setAnswer2(event.target.value)}/>}
          {songObj.missing_lyrics > 2 ?
            <TextField key={3} sx={inputStyle} size="small" value={answer3} variant="outlined" onChange={(event) => setAnswer3(event.target.value)}/>
          : <TextField disabled key={3} sx={inputStyle} size="small" value={answer3} variant="outlined" onChange={(event) => setAnswer3(event.target.value)}/>}
          {songObj.missing_lyrics > 3 ?
            <TextField key={4} sx={inputStyle} size="small" value={answer4} variant="outlined" onChange={(event) => setAnswer4(event.target.value)}/>
          : <TextField disabled key={4} sx={inputStyle} size="small" value={answer4} variant="outlined" onChange={(event) => setAnswer4(event.target.value)}/>}
          {songObj.missing_lyrics > 4 ?
            <TextField key={5} sx={inputStyle} size="small" value={answer5} variant="outlined" onChange={(event) => setAnswer5(event.target.value)}/>
          : <TextField disabled key={5} sx={inputStyle} size="small" value={answer5} variant="outlined" onChange={(event) => setAnswer5(event.target.value)}/>}
          {songObj.missing_lyrics > 5 ?
            <TextField key={6} sx={inputStyle} size="small" value={answer6} variant="outlined" onChange={(event) => setAnswer6(event.target.value)}/>
          : <TextField disabled key={6} sx={inputStyle} size="small" value={answer6} variant="outlined" onChange={(event) => setAnswer6(event.target.value)}/>}
          {songObj.missing_lyrics > 6 ?
            <TextField key={7} sx={inputStyle} size="small" value={answer7} variant="outlined" onChange={(event) => setAnswer7(event.target.value)}/>
          : <TextField disabled key={7} sx={inputStyle} size="small" value={answer7} variant="outlined" onChange={(event) => setAnswer7(event.target.value)}/>}
          {songObj.missing_lyrics > 7 ?
            <TextField key={8} sx={inputStyle} size="small" value={answer8} variant="outlined" onChange={(event) => setAnswer8(event.target.value)}/>
          : <TextField disabled key={8} sx={inputStyle} size="small" value={answer8} variant="outlined" onChange={(event) => setAnswer8(event.target.value)}/>}
          <Button variant="outlined" size="small" sx={{mt: .5}} onClick={sendGuesses}>Submit Your Guesses!</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align='center' sx={{fontWeight: 'bold'}}>
                  Results:
                </Typography>
                <Typography align='center'>
                  <strong>Correct:</strong> {resultsObj.correctAnswers}/{songObj.missing_lyrics}
                </Typography>
                <Typography align='center'>
                  <strong>Incorrect:</strong> {resultsObj.wrongAnswers}/{songObj.missing_lyrics}
                </Typography>
                {resultsObj.wrongAnswers === 0 ? 
                  <Typography align='center' sx={{fontWeight: 'bold', mt: 4, fontSize: 32}}>Nicely Done!</Typography>
                    :
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{textAlign: "center", fontWeight: 'bold'}}>#</TableCell>
                        <TableCell sx={{textAlign: "center", fontWeight: 'bold'}}>Your Guesses</TableCell>
                        <TableCell sx={{textAlign: "center", fontWeight: 'bold'}}>Correct Answers</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {resultsObj ? 
                        resultsObj.resultsDisplayArray.map((answers, i) => (
                          <TableRow key={i}>
                                  <TableCell sx={{textAlign: "center"}}>{answers.number}</TableCell>
                                  <TableCell sx={{textAlign: "center", color: 'red'}}>{answers.yourAnswer}</TableCell>
                                  <TableCell sx={{textAlign: "center", color: 'green'}}>{answers.correctAnswer}</TableCell>
                          </TableRow>
                        ))
                      : <TableRow>
                          <TableCell>Results Table Loading</TableCell>
                        </TableRow>}
                    </TableBody>
                  </Table>
                }
              <Button variant='contained' sx={{ml: 1, mt: 4}} onClick={returnToDash}>Return to Dashboard</Button>
            </Box>
          </Modal>       
        </Card>
      </Grid>
    </>
  );
}

export default PlayPage;
