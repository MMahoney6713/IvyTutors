import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from './UserContext';
import PropTypes from 'prop-types';

/** 'Higher-Order Component' for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 * 
 * Taken from Springboard's Jobly exercise, 3/18/22
 */

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);


  if (!currentUser) {
    return <Redirect to='/signin' />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.any,
  path: PropTypes.any,
  children: PropTypes.any
};

export default PrivateRoute;
