import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import NavBar from './NavBar/NavBar';
import Router from './Router';
import { createStore } from './store';
import './App.css';

const { store, history } = createStore();

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
