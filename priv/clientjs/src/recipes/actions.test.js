import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  SET_FAVORITE_REQUEST,
  SET_FAVORITE_SUCCESS,
  SET_FAVORITE_FAILURE,
  SET_UNFAVORITE_REQUEST,
  SET_UNFAVORITE_SUCCESS,
  SET_UNFAVORITE_FAILURE,
  fetchRecipes,
  setFavoriteStatus
} from './actions';

import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetching recipes', () => {
  describe('successful request', () => {
    beforeEach(() => {
      nock(process.env.REACT_APP_API_URL)
        .get('/api/recipes')
        .reply(
          200,
          {
            recipes: [{ id: '123', name: 'Mac n Cheese' }]
          },
          { 'Access-Control-Allow-Origin': '*' }
        );
    });

    afterEach(() => {
      expect(nock.isDone()).toBe(true);
    });

    test('creates FETCH_RECIPES_REQUEST and FETCH_RECIPES_SUCCESS', () => {
      const expectedActions = [
        { type: FETCH_RECIPES_REQUEST },
        {
          type: FETCH_RECIPES_SUCCESS,
          recipes: [{ id: '123', name: 'Mac n Cheese' }]
        }
      ];
      const store = mockStore({});
      return store.dispatch(fetchRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetch failure', () => {
    test('creates FETCH_RECIPES_REQUEST, then FETCH_RECIPES_FAILURE', () => {
      nock(process.env.REACT_APP_API_URL)
        .get('/api/recipes')
        .reply(500, {}, { 'Access-Control-Allow-Origin': '*' });

      const expectedActions = [
        { type: FETCH_RECIPES_REQUEST },
        { type: FETCH_RECIPES_FAILURE, error: expect.any(Error) }
      ];
      const store = mockStore({});

      return store.dispatch(fetchRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe('favoriting recipes', () => {
  test('should dispatch favorite request and then success actions', () => {
    const expectedActions = [
      { recipeId: 123, type: SET_FAVORITE_REQUEST },
      { recipeId: 123, type: SET_FAVORITE_SUCCESS }
    ];
    const store = mockStore({});

    return store.dispatch(setFavoriteStatus(123, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('unfavoriting recipes', () => {
  test('should dispatch unfavorite request and then success actions', () => {
    const expectedActions = [
      { recipeId: 123, type: SET_UNFAVORITE_REQUEST },
      { recipeId: 123, type: SET_UNFAVORITE_SUCCESS }
    ];
    const store = mockStore({});

    return store.dispatch(setFavoriteStatus(123, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
