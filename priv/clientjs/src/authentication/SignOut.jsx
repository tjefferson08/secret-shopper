import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './actions';

const SignOut = ({ isAuthenticated, logout, location }) => {
  // fire and forget
  logout();
  return (
    <Redirect
      to={{
        pathname: '/sign_in',
        state: { from: location }
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
