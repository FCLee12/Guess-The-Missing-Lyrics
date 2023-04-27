import React, { useState } from 'react';
import './LandingPage.css';
import { Card } from '@mui/material/';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');

  // Card style
  const cardStyle = {
      flexDirection:"column",
      marginLeft: 1.2,
      textAlign:"center",
      width: 300,
      border: 'solid black 1px'
  }

  return (
    <>
      <Card sx={cardStyle}>
        <LoginForm />
      </Card>
    </>
  );
}

export default LandingPage;
