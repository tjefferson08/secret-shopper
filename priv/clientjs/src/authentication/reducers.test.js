import cookie from 'js-cookie';
import authentication from './reducers';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from './actions';

describe('when cookie is set', () => {
  test('should return the initial logged in state', () => {
    spyOn(cookie, 'get').and.returnValue('cookie');
    const expectedState = {
      isAuthenticated: true,
      isFetching: false
    };
    const actualState = authentication(undefined, {});
    expect(actualState).toEqual(expectedState);
  });
});

describe('when cookie is not set', () => {
  test('should return the initial logged out state', () => {
    spyOn(cookie, 'get').and.returnValue(undefined);
    const expectedState = {
      isAuthenticated: false,
      isFetching: false
    };
    const actualState = authentication(undefined, {});
    expect(actualState).toEqual(expectedState);
  });
});

test('should handle LOGIN_REQUEST', () => {
  const action = { type: LOGIN_REQUEST };
  const expectedState = {
    isFetching: true,
    extra: 'value'
  };
  const actualState = authentication({ extra: 'value' }, action);
  expect(actualState).toEqual(expectedState);
});

test('should handle LOGIN_SUCCESS', () => {
  const action = { type: LOGIN_SUCCESS, user: { email: 'bob@bob.com' } };
  const expectedState = {
    isAuthenticated: true,
    isFetching: false,
    currentUser: { email: 'bob@bob.com' }
  };
  const actualState = authentication({}, action);
  expect(actualState).toEqual(expectedState);
});

test('should handle LOGIN_FAILURE', () => {
  const action = { type: LOGIN_FAILURE };
  const expectedState = {
    isAuthenticated: false,
    isFetching: false
  };
  const actualState = authentication({}, action);
  expect(actualState).toEqual(expectedState);
});

test('should handle LOGOUT_REQUEST', () => {
  const action = { type: LOGOUT_REQUEST };
  const expectedState = {
    extra: 'value',
    isFetching: true
  };
  const actualState = authentication({ extra: 'value' }, action);
  expect(actualState).toEqual(expectedState);
});

test('should handle LOGOUT_SUCCESS', () => {
  const action = { type: LOGOUT_SUCCESS };
  const expectedState = {
    isAuthenticated: false,
    isFetching: false
  };
  const actualState = authentication({}, action);
  expect(actualState).toEqual(expectedState);
});

test('should handle LOGOUT_FAILURE', () => {
  const action = { type: LOGOUT_FAILURE };
  const expectedState = {
    isFetching: false,
    extra: 'value'
  };
  const actualState = authentication({ extra: 'value' }, action);
  expect(actualState).toEqual(expectedState);
});
