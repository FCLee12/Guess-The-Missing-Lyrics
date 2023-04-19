import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
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
    <form className="formPanel" onSubmit={login}>
      {/* <h2>Login</h2> */}
      <div>
        <img src='./images/music.svg' alt='game logo' style={{width: '250px', height: '250px'}}/>
      </div>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <input className="btn btn_sizeSm" type="submit" name="submit" value="Log In" />
          <button className="btn btn_sizeSm" onClick={onRegister}>
                Register
          </button>
        </div>
        <div>
          <button className="btn btn_sizeSm" onClick={onGuest}>Play As Guest</button>
        </div>
    </form>
  );
}

export default LoginForm;
