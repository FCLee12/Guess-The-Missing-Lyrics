import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, createTheme, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, TextField, ThemeProvider, Typography } from '@mui/material/';

function GameId() {
  const [gameId, setGameId] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ffb300',
        contrastText: 'rgba(0, 0, 0, 0.87)'
      },
      secondary: {
        main: '#619bb9',
        light: 'rgb(128, 175, 199)',
        dark: 'rgb(67, 108, 129)',
        contrastText: '#fff'
      },
      background: {
        default: '#252525',
        paper: '#424242'
      },
      text: {
        primary: '#fbf7f7',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        hint: 'rgba(255, 255, 255, 0.5)'
      },
    }
  })

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
    marginLeft: 1.3,
    textAlign:"center",
    width: 298,
    height: 550.5,
    border: 'solid white 1px'
  }

  // img style
  const imgStyle = {
    width: '250px',
    height: '250px',
    marginTop: '24px',
    marginBottom: '8px',
    border: 'solid 2px white'
  }

  const toLandingPage = () => {
    history.push('/home')
  }

  return (
    <ThemeProvider theme={theme}>
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
            sx={{mt: 1.6, mb: 2, width: 200}}
            onClick={playGuest}>Submit</Button>
          <Button
            variant="outlined"
            sx={{mb: 2, ml: 11, display: 'block', width: 120}}
            onClick={toLandingPage}>
            Home
          </Button>
      </Card>
    </ThemeProvider>
  );
}

export default GameId;