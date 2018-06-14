import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';

const RootRoute = ({ isAuthenticated, location, ...rest }) => {
  if (isAuthenticated) {
    return <Dashboard {...rest} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/sign_in',
          state: { from: location }
        }}
      />
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
};

export default connect(mapStateToProps)(RootRoute);
