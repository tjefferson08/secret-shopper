import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import authentication from './authentication/reducers';
import recipes from './recipes/reducers';
import registration from './registration/reducers';
import NavBar from './NavBar/NavBar';
import Router from './Router';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  authentication,
  recipes,
  registration
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  {}, // initial state
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

const App = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <hr />
        <Router />
      </div>
    </ConnectedRouter>
  </Provider>;

export default App;
