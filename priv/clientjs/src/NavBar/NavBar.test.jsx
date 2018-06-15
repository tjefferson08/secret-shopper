import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';
import configureMockStore from 'redux-mock-store';

let store;

describe('when authenticated', () => {
  beforeEach(() => {
    store = configureMockStore([])({
      authentication: { isAuthenticated: true }
    });
  });

  test('it should render LoggedInLinks', () => {
    const navBar = shallow(<NavBar store={store} />);
    expect(navBar.dive().text()).toContain('LoggedInLinks');
    expect(navBar.dive().text()).not.toContain('LoggedOutLinks');
  });
});

describe('when not authenticated', () => {
  beforeEach(() => {
    store = configureMockStore([])({
      authentication: { isAuthenticated: false }
    });
  });

  test('it should render LoggedOutLinks', () => {
    const navBar = shallow(<NavBar store={store} />);
    expect(navBar.dive().text()).not.toContain('LoggedInLinks');
    expect(navBar.dive().text()).toContain('LoggedOutLinks');
  });
});
