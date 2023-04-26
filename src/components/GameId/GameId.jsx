import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, TextField, Typography } from '@mui/material/';

function GameId() {
  const [gameId, setGameId] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();



  const playGuest = (event) => {
    console.log('this is gameId', gameId);
    console.log('this is gameId.length', gameId.length);
    if (gameId.length === 6) {
    //this will go to the saga which will then make the call to the server
        // the server will then pull the registered user's collection of songs via
        // the gameId and SQL queries/joined tables
      dispatch({
        type: 'SEND_GAMEID',
        payload: gameId
      });
      // will navigate to the guest dashboard
      history.push('/dashboard')
    } else {
      alert("Please input a valid 6-digit registered user's GameID to continue")
    }
  };

  // Card style
  const cardStyle = {
    flexDirection:"column",
    marginLeft: 1.2,
    textAlign:"center",
    width: 300,
    border: 'solid black 1px'
  }

  // img style
  const imgStyle = {
    width: '250px',
    height: '250px',
    marginTop: '16px',
    marginBottom: '8px'
  }

  return (
    <Card sx={cardStyle}>
        <img src='./images/music.svg' alt='game logo' style={imgStyle}/>
        <Typography variant='h6' sx={{mb: 1}}>Enter a Registered User's GameID Number</Typography>
        <Box
          component="form"
          sx={{'& > :not(style)': { m: 1, width: '29ch'}}}
          noValidate
          autoComplete="off">
          <TextField
            size="small"
            label="gameID"
            type="number"
            value={gameId}
            onChange={(event) => {setGameId(event.target.value)}}/>
        </Box>
        <Button
          variant="contained"
          sx={{mt: 1.6, mb: 2}}
          onClick={playGuest}>Submit</Button>
    </Card>
  );
}

export default GameId;