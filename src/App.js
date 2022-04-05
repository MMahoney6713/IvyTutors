import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Page from './components/Page';
import useLocalStorage from './hooks/useLocalStorage';
import IvyTutorsApi from './api/api';
import UserContext from './auth/UserContext';
import Main from 'layouts/Main';


import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';

// Key name for storing token in localStorage for 'remember me' re-login
export const TOKEN_STORAGE_ID = 'ivy-tutors-token';



import jwt from 'jsonwebtoken';

/** IvyTutors application.
 *
 * - infoLoaded: has user data been pulled from API?
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *   Adapted from Springboards' Jobly application, 3/17/22
 */


const App = () => {

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {

    async function getCurrentUser() {
      if (token) {
        try {
          let { email } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          IvyTutorsApi.token = token;
          let currentUser = await IvyTutorsApi.getCurrentUser(email);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error('App loadUserInfo: problem loading', err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs user in (set token) upon signup.
   */
  async function signup(signupData) {
    try {
      let token = await IvyTutorsApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   */
  async function login(loginData) {
    try {
      let token = await IvyTutorsApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  return (
    
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Page>
          <Main logout={logout}> 
            {infoLoaded ? 
              <Routes login={login} signup={signup} />
              : '' 
            }
          </Main>
        </Page>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
