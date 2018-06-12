import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <ul className="NavBar">
        {this.dashboardLink()}
        {this.signUpLink()}
        {this.signInLink()}
        {this.signOutLink()}
      </ul>
    );
  }

  dashboardLink() {
    if (!this.props.isAuthenticated) {
      return;
    }
    return (
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    );
  }
  signUpLink() {
    if (this.props.isAuthenticated) {
      return;
    }

    return (
      <li>
        <Link to="/sign_up">Sign Up</Link>
      </li>
    );
  }

  signInLink() {
    if (this.props.isAuthenticated) {
      return;
    }

    return (
      <li>
        <Link to="/sign_in">Sign In</Link>
      </li>
    );
  }

  signOutLink() {
    if (!this.props.isAuthenticated) {
      return;
    }

    return (
      <li>
        <Link to="/sign_out">Sign Out</Link>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
};

export default connect(mapStateToProps)(NavBar);
