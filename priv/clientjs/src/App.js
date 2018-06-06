import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp';
import SignInForm from './SignInForm';

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const recipeApp = combineReducers({
  registration: reducers.registration
});

const store = createStore(recipeApp, applyMiddleware(thunk));

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
          <Link to="/sign_in">Sign In</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/sign_up" render={props => <SignUp store={store} {...props} />} />
      <Route path="/sign_in" component={SignInForm} />
    </div>
  </Router>;

class App extends Component {
  render() {
    return <BasicExample />;
  }
}

export default App;
