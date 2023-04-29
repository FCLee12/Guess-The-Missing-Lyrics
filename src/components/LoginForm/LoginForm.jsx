import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, createTheme, Grid, Stack, TextField, ThemeProvider, Typography } from '@mui/material/';



function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const onRegister = (event) => {
    history.push('/registration');
  };

  const onGuest = (event) => {
    history.push('/gameId')
  }

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
      <ThemeProvider theme={theme}>
      <Grid container sx={{flexDirection: 'column', backgroundColor: '#424242'}}>
      <div style={{marginTop: '24px'}}>
        <img src='./images/music.svg' alt='game logo' style={{width: '250px', height: '250px', border: 'solid 2px white'}}/>
      </div>
      <Typography variant='h5' sx={{fontWeight: 600, mt: 1, color: 'white'}}>Welcome!</Typography>
        <TextField
          variant='standard'
          type="text"
          name="username"
          label='Username'
          size='small'
          sx={{mb: .5, ml: 3.7, width: 240}}
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}/>
        <TextField
          variant='standard'
          type="password"
          name="password"
          label='Password'
          size='small'
          color="primary"
          sx={{mb: 2, ml: 3.7, width: 240}}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}/>
        
        <div style={{marginBottom: '16px'}}>
          <Button variant='contained' size='small' sx={{width: 240}} onClick={login}>
            Login
          </Button>
        </div>
        <Stack direction='row' spacing={1.5} sx={{mb: 5.18}}>
          <Button variant='contained' sx={{ml: 3.7}}  size='small' onClick={onGuest}>
            Play As Guest
          </Button>
          <Button variant='outlined' sx={{width: 102}} size='small' onClick={onRegister}>
            Register
          </Button>
        </Stack>
    </Grid>
    </ThemeProvider>
  );
}

export default LoginForm;
