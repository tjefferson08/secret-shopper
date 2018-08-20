import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent as rtlFireEvent } from 'react-testing-library';
import { MemoryRouter } from 'react-router';
import { createStore } from '../src/store';

export const renderWithRedux = (ui, { initialState, store } = {}) => {
  store = store || createStore(initialState);

  return {
    // "splat" return-value object into this obj. literal
    ...render(
      <MemoryRouter>
        <Provider store={store}>
          {ui}
        </Provider>
      </MemoryRouter>
    ),
    store
  };
};

export const flush = () => new Promise((resolve, _) => setTimeout(resolve, 0));

export const fireEvent = (...args) => {
  const originalVal = rtlFireEvent(...args);
  return flush().then(() => originalVal);
};

export const fireClick = (...args) => {
  const originalVal = rtlFireEvent.click(...args);
  return flush().then(() => originalVal);
};
