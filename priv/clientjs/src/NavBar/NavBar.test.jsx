import React from 'react';
import NavBar from './NavBar';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { render, cleanup } from 'react-testing-library';

let store;

afterEach(cleanup);

describe('when authenticated', () => {
  beforeEach(() => {
    store = configureMockStore([])({
      authentication: { isAuthenticated: true }
    });
  });

  test('it should render LoggedInLinks', () => {
    const nav = (
      <MemoryRouter>
        <NavBar store={store} />
      </MemoryRouter>
    );

    const { getByText, queryByText } = render(nav);
    expect(getByText('Sign Out')).toBeTruthy();
    expect(queryByText('Sign In')).toBeNull();
  });
});

describe('when not authenticated', () => {
  beforeEach(() => {
    store = configureMockStore([])({
      authentication: { isAuthenticated: false }
    });
  });

  test('it should render LoggedOutLinks', () => {
    const nav = (
      <MemoryRouter>
        <NavBar store={store} />
      </MemoryRouter>
    );

    const { getByText, queryByText } = render(nav);
    expect(getByText('Sign In')).toBeTruthy();
    expect(queryByText('Sign Out')).toBeNull();
  });
});
