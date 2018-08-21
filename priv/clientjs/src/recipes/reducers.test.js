import recipes from './reducers';
import {
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPES_SUCCESS,
  SET_FAVORITE_REQUEST,
  SET_FAVORITE_FAILURE,
  SET_UNFAVORITE_REQUEST,
  SET_UNFAVORITE_FAILURE
} from './actions';

test('should return the initial state', () => {
  expect(recipes(undefined, {})).toEqual({
    activeId: null,
    allIds: [],
    byId: {},
    error: null
  });
});

test('should handle FETCH_RECIPE_SUCCESS', () => {
  const initialState = {
    other: 'state',
    byId: { 321: { id: 321, title: 'Beans and Rice' } },
    allIds: [321]
  };
  const action = {
    type: FETCH_RECIPE_SUCCESS,
    recipe: { id: 123, title: 'Mac and Cheese' }
  };
  const expectedState = {
    other: 'state',
    isFetching: false,
    byId: {
      123: { id: 123, title: 'Mac and Cheese' },
      321: { id: 321, title: 'Beans and Rice' }
    },
    allIds: [321],
    activeId: 123
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
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
    byId: { 123: { id: 123 } },
    allIds: [123]
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});

test('SET_FAVORITE_REQUEST should set favorited to true on the correct recipe', () => {
  const initialState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: false },
      321: { id: 321, favorited: false }
    }
  };
  const action = {
    type: SET_FAVORITE_REQUEST,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: true },
      321: { id: 321, favorited: false }
    }
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});

test('SET_FAVORITE_FAILURE should set favorited to false on the correct recipe', () => {
  const initialState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: true },
      321: { id: 321, favorited: true }
    }
  };
  const action = {
    type: SET_FAVORITE_FAILURE,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: false },
      321: { id: 321, favorited: true }
    }
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});

test('SET_UNFAVORITE_REQUEST should set favorited to false on the correct recipe', () => {
  const initialState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: true },
      321: { id: 321, favorited: true }
    }
  };
  const action = {
    type: SET_UNFAVORITE_REQUEST,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: false },
      321: { id: 321, favorited: true }
    }
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});

test('SET_UNFAVORITE_FAILURE should set favorited to true on the correct recipe', () => {
  const initialState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: false },
      321: { id: 321, favorited: false }
    }
  };
  const action = {
    type: SET_UNFAVORITE_FAILURE,
    recipeId: 123
  };
  const expectedState = {
    other: 'state',
    byId: {
      123: { id: 123, favorited: true },
      321: { id: 321, favorited: false }
    }
  };
  expect(recipes(initialState, action)).toEqual(expectedState);
});
