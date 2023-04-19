import React, { useState } from 'react';
import './LandingPage.css';

// CUSTOM COMPONENTS
// import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');

  return (
    <div className="container">
      {/* <h2>{heading}</h2> */}

      <div>
        <div style={{display: 'flexbox', justifyContent: 'center'}}>
          <LoginForm />

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
