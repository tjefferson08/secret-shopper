import React from 'react';
import { createMemoryHistory } from 'history';
import { render, fireEvent as rtlFireEvent } from 'react-testing-library';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { createStore } from '../src/store';

export const renderWithRedux = (ui, { initialState, route = '/' } = {}) => {
  const { history, store } = createStore(
    initialState,
    createMemoryHistory({ initialEntries: [route] })
  );

  return {
    // "splat" return-value object into this obj. literal
    ...render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {ui}
        </ConnectedRouter>
      </Provider>
    ),
    store,
    history
  };
};

export const flush = () => new Promise((resolve, _) => setTimeout(resolve, 10));

export const fireEvent = (...args) => {
  const originalVal = rtlFireEvent(...args);
  return flush().then(() => originalVal);
};

export const fireClick = (...args) => {
  const originalVal = rtlFireEvent.click(...args);
  return flush().then(() => originalVal);
};
