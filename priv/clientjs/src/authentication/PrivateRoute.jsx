import React from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/sign_in',
              state: { from: props.location }
            }}
          />}
  />;

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);
