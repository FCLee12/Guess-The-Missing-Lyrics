import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Card } from '@mui/material/';

function RegisterPage() {
  const history = useHistory();

  const cardStyle = {
    flexDirection:"column",
    marginLeft: 1.1,
    textAlign:"center",
    width: 300,
    border: 'solid black 1px',
    mt: -.1
  }

  return (
    <>
      <Card sx={cardStyle}>
        <RegisterForm />
      </Card>
    </>
  );
}

export default RegisterPage;
