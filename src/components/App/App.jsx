import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import NavBase from '../Nav/NavBase';
import NavMui from '../Nav/NavMui';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserDashboard from '../UserDashboard/UserDashboard';
import GuestDashboard from '../GuestDashboard/GuestDashboard';
import PlayPage from '../PlayPage/PlayPage';
import LandingPage from '../LandingPage/LandingPage';
import EditPage from '../EditPage/EditPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import GameId from '../GameId/GameId';

import './App.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import { ThemeProvider, createTheme } from '@mui/system';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div style={{backgroundColor: '#252525'}}>
        {/* <Nav /> */}

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserDashboard if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LandingPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserDashboard else shows LandingPage
            exact
            path="/userDashboard"
          >
            <NavMui />
            <UserDashboard />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProfilePage else shows LandingPage
            exact
            path="/profile"
          >
            <NavMui />
            <ProfilePage />
          </ProtectedRoute>

          <Route
            exact
            path="/dashboard"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/userDashboard" />
              :
              // Otherwise, show the landing page
              <>
                <NavMui />
                <GuestDashboard />
              </>
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/userDashboard" />
              :
              // Otherwise, show the landing page
              <>
                <NavBase />
                <LandingPage />
              </>
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/userDashboard" />
              :
              // Otherwise, show the registration page
              <>
                <NavBase/>
                <RegisterPage />
              </>
            }
          </Route>

          <Route
            exact
            path="/edit"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /edit page
              <>
                <NavMui />
                <EditPage />
              </>
              :
              // Otherwise, show the Landing page
              <>
                <NavBase />
                <LandingPage />
              </>
            }
          </Route>

          <Route
            exact
            path="/gameId"
          >
            <NavBase />
            <GameId />
          </Route>

          <Route
            exact
            path="/play"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /userDashboard page
              <>
                <NavMui />
                <PlayPage />
              </>
              :
              // Otherwise, show the Landing page
              <>
                <NavMui />
                <PlayPage />
              </>
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <NavBase />
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
