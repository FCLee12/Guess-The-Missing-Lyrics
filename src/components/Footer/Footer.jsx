import React from 'react';
import './Footer.css';
import { Typography } from '@mui/material'; 
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {

  const history = useHistory();

  const toAbout = () => {
    history.push('/about');
  }

  return (
    <footer>
      <Typography color='white' onClick={toAbout}>
        &copy; FCLee12
      </Typography>
      <Typography color='white'>
        Lyrics provided by &copy; MusixMatch API
      </Typography>
    </footer>
    );
}

export default Footer;
