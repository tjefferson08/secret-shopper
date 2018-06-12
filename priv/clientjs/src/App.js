import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import registration from './registration/reducers';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  registration
});

const store = createStore(
  connectRouter(history)(rootReducer),
  {}, // initial state
  compose(applyMiddleware(routerMiddleware(history), thunk))
);

const App = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <hr />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/sign_up" render={props => <SignUp {...props} />} />
          <Route path="/sign_in" render={props => <SignIn {...props} />} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>;

export default App;
