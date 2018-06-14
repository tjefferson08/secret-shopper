import recipes from './reducers';
import { FETCH_RECIPES_SUCCESS } from './actions';

test('should return the initial state', () => {
  expect(recipes(undefined, {})).toEqual({});
});

test('should handle FETCH_RECIPES_SUCCESS', () => {
  const initialState = { other: 'state' };
  const action = {
    type: FETCH_RECIPES_SUCCESS,
    recipes: [{ id: 123 }]
  };
  const expectedState = {
    other: 'state',
    isFetching: false,
    items: [{ id: 123 }]
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});
