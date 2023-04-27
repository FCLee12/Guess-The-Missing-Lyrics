import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Box, Button, Card, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, Stack, TextField, Typography } from '@mui/material/';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

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
      <Grid container sx={{flexDirection: 'column'}}>
      <div style={{marginTop: '24px'}}>
        <img src='./images/music.svg' alt='game logo' style={{width: '250px', height: '250px'}}/>
      </div>
      <Typography variant='h5' sx={{fontWeight: 600, mt: 1}}>Welcome!</Typography>
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
          sx={{mb: 2, ml: 3.7, width: 240}}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}/>
        <div style={{marginBottom: '16px'}}>
          <Button variant='contained' size='small' sx={{width: 240}} onClick={login}>
            Login
          </Button>
        </div>
        <Stack direction='row' spacing={1.5} sx={{mb: 5}}>
          <Button variant='contained' sx={{ml: 3.7}}  size='small' onClick={onGuest}>
            Play As Guest
          </Button>
          <Button variant='outlined' sx={{width: 102}} size='small' onClick={onRegister}>
            Register
          </Button>
        </Stack>
    </Grid>
  );
}

export default LoginForm;
