import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, createTheme, Grid, Stack, TextField, ThemeProvider, Typography } from '@mui/material/';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

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

  const registerUser = (event) => {
    if(username === '' || password === '' || emailAddress === '') {
      alert('Please provide input for each input field')
    } else {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          emailAddress: emailAddress
        },
      });
    }
  }; // end registerUser

  const toHome = (event) => {
    history.push('/home')
  }

  return (
    <>
      <ThemeProvider theme={theme}>
      <Grid container sx={{flexDirection: 'column', backgroundColor: '#424242', border: 'solid white 1px', width: 300}}>
        <div style={{marginTop: '24px'}}>
          <img src='./images/music.svg' alt='game logo' style={{width: '250px', height: '250px', border: 'solid white 2px'}}/>
        </div>
        <Typography variant='h5' color='#fbf7f7' sx={{fontWeight: 600, mt: 1}}>Register User</Typography>
        <div>
            <TextField
              variant='standard'
              type="text"
              name="username"
              label='Username'
              size='small'
              sx={{mb: 1.5, width: 200}}
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
            <TextField
              variant='standard'
              type="password"
              name="password"
              label='Password'
              size='small'
              sx={{mb: 1.5, width: 200}}
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div>
            <TextField
              variant='standard'
              type="email"
              name="emailAddress"
              label='Email Address'
              size='small'
              sx={{mb: 1.9, width: 200}}
              value={emailAddress}
              required
              onChange={(event) => setEmailAddress(event.target.value)}/>
        </div>
        <div style={{marginBottom: '20px', marginTop: '4px'}}>
          <Stack direction='row' spacing={2}>
            <Button variant='outlined' size='small' sx={{width: 90, ml: 6.5}} onClick={toHome}>
              Home
            </Button>
            <Button variant='contained' size='small' sx={{width: 90}} onClick={registerUser}>
              Register
            </Button>
          </Stack>
        </div>
      </Grid>
      </ThemeProvider>
    </>
  );
}

export default RegisterForm;
