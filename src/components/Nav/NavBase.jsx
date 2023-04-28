import * as React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material/';


import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const pages = [`Dashboard`, `Play Other's Songs`];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {

  const history = useHistory();
  const user = useSelector((store) => store.user)

  const toLandingPage = () => {
    history.push('/home')
  }

  return (
    <AppBar position="relative" sx={{mb: 2, backgroundColor: '#ffb300'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{m:2}}></Box>
          <Typography
            variant="h6"
            component="a"
            align='center'
            onClick={toLandingPage}
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexWrap: 'wrap',
              fontWeight: 500,
              letterSpacing: '.2rem',
              color: 'black',
              textDecoration: 'none',
            }}>
            Guess The Missing Lyrics
          </Typography>
        <Box sx={{m:2}}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;