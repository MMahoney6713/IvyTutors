import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// import viewsRoutes from 'views/routes';

import LandingPage from './views/LandingPage';
import SigninPage from './views/SigninSimple';
import SignupPage from './views/SignupSimple';
import AccountSettingsPage from './views/AccountSettings';
import DashboardPage from './views/Dashboard';
import NotFound from './views/NotFound';
import PrivateRoute from 'auth/PrivateRoute';

// import UserContext from './auth/UserContext';

const Routes = ({login, signup}) => {

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <Switch>

      
      <PrivateRoute exact path="/dashboard">
        <DashboardPage />
      </PrivateRoute>
      <PrivateRoute exact path="/account">
        <AccountSettingsPage />
      </PrivateRoute>
      
      <Route exact path="/signin">
        <SigninPage login={login}/>
      </Route>
      <Route exact path="/signup">
        <SignupPage signup={signup}/>
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
      {/* {viewsRoutes.map((item, i) => (
        <Route key={i} exact path={item.path} element={item.renderer()} />
      ))}
      <Route path="*" element={<Redirect to="/not-found" />} /> */}
    </Switch>
  );
};

Routes.propTypes = {
  login: PropTypes.func,
  signup: PropTypes.func
};

export default Routes;
