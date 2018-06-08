import cookie from 'js-cookie';
import authentication from './reducers';
import { LOGIN_SUCCESS } from './actions';

describe('authentication reducer', () => {
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
});
