import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import NavBar from './NavBar/NavBar';
import Router from './Router';
import rootReducer from './rootReducer';

const history = createBrowserHistory();

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
