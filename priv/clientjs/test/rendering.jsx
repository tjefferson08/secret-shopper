import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
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
