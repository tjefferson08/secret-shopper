import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () =>
  <ul>
    <li>
      <Link to="/dashboard">Dashboard</Link>
    </li>
    <li>
      <Link to="/sign_up">Sign Up</Link>
    </li>
    <li>
      <Link to="/sign_in">Sign In</Link>
    </li>
    <li>
      <Link to="/sign_out">Sign Out</Link>
    </li>
  </ul>;

export default NavBar;
