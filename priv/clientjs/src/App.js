import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import SignUpForm from './SignUpForm';

const Home = () =>
  <div>
    <h2>Home</h2>
  </div>;

const BasicExample = () =>
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign_up">Sign Up</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/sign_up" component={SignUpForm} />
    </div>
  </Router>;

class App extends Component {
  render() {
    return <BasicExample />;
  }
}

export default App;
