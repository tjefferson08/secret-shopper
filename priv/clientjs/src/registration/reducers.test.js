import registration from './reducers';
import { REGISTER_USER_SUCCESS } from './actions';

describe('registration reducer', () => {
  test('should return the initial state', () => {
    expect(registration(undefined, {})).toEqual({});
  });

  test('should handle REGISTER_USER_SUCCESS', () => {
    const initialState = { other: 'state' };
    const action = { type: REGISTER_USER_SUCCESS, user: { some: 'user' } };
    const expectedState = {
      other: 'state',
      user: { some: 'user' }
    };
    expect(registration(initialState, action)).toEqual(expectedState);
  });
});
