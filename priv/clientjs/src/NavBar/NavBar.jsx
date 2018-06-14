import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './NavBar.css';

const NavBar = ({ isAuthenticated }) => (
  <ul className="NavBar">
    {isAuthenticated ? <LoggedInLinks /> : <LoggedOutLinks />}
  </ul>
);

const LoggedInLinks = () => [
  <DashboardLink key="dashboard" />,
  <SignOutLink key="signOut" />
];

const LoggedOutLinks = () => [
  <SignUpLink key="signUp" />,
  <SignInLink key="signIn" />
];

const DashboardLink = () => {
  return (
    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>
  );
};

const SignUpLink = () => (
  <li>
    <Link to="/sign_up">Sign Up</Link>
  </li>
);

const SignInLink = () => (
  <li>
    <Link to="/sign_in">Sign In</Link>
  </li>
);

const SignOutLink = () => (
  <li>
    <Link to="/sign_out">Sign Out</Link>
  </li>
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps)(NavBar);
