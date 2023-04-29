import React, { useState } from 'react';
import './LandingPage.css';
import { Card } from '@mui/material/';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  // Card style
  const cardStyle = {
      flexDirection:"column",
      marginLeft: 1.3,
      textAlign:"center",
      width: 298,
      border: 'solid white 1px'
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
