import recipes from './reducers';
import {
  FETCH_RECIPES_SUCCESS,
  SET_FAVORITE_REQUEST,
  SET_FAVORITE_FAILURE,
  SET_UNFAVORITE_REQUEST,
  SET_UNFAVORITE_FAILURE
} from './actions';

test('should return the initial state', () => {
  expect(recipes(undefined, {})).toEqual({ items: [] });
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

test('SET_FAVORITE_REQUEST should set favorited to true on the correct recipe', () => {
  const initialState = {
    other: 'state',
    items: [{ id: 321, favorited: false }, { id: 123, favorited: false }]
  };
  const action = {
    type: SET_FAVORITE_REQUEST,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    items: [{ id: 321, favorited: false }, { id: 123, favorited: true }]
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});

test('SET_FAVORITE_FAILURE should set favorited to false on the correct recipe', () => {
  const initialState = {
    other: 'state',
    items: [{ id: 321, favorited: true }, { id: 123, favorited: true }]
  };
  const action = {
    type: SET_FAVORITE_FAILURE,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    items: [{ id: 321, favorited: true }, { id: 123, favorited: false }]
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});

test('SET_UNFAVORITE_REQUEST should set favorited to false on the correct recipe', () => {
  const initialState = {
    other: 'state',
    items: [{ id: 321, favorited: true }, { id: 123, favorited: true }]
  };
  const action = {
    type: SET_UNFAVORITE_REQUEST,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    items: [{ id: 321, favorited: true }, { id: 123, favorited: false }]
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});

test('SET_UNFAVORITE_FAILURE should set favorited to true on the correct recipe', () => {
  const initialState = {
    other: 'state',
    items: [{ id: 321, favorited: false }, { id: 123, favorited: false }]
  };
  const action = {
    type: SET_UNFAVORITE_FAILURE,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    items: [{ id: 321, favorited: false }, { id: 123, favorited: true }]
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});
