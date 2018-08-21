import {
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  SET_FAVORITE_REQUEST,
  SET_FAVORITE_SUCCESS,
  SET_FAVORITE_FAILURE,
  SET_UNFAVORITE_REQUEST,
  SET_UNFAVORITE_SUCCESS,
  SET_UNFAVORITE_FAILURE,
  fetchRecipe,
  fetchRecipes,
  setFavoriteStatus
} from './actions';
import nock, { isDone } from '../../test/nock';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetching (single) recipe', () => {
  describe('successful request', () => {
    beforeEach(() => {
      nock()
        .get('/api/recipes/123')
        .reply(200, {
          recipe: { id: '123', name: 'Mac n Cheese' }
        });
    });

    afterEach(() => {
      expect(isDone()).toBe(true);
    });

    test('creates FETCH_RECIPE_REQUEST and FETCH_RECIPE_SUCCESS', () => {
      const expectedActions = [
        { type: FETCH_RECIPE_REQUEST },
        {
          type: FETCH_RECIPE_SUCCESS,
          recipe: { id: '123', name: 'Mac n Cheese' }
        }
      ];
      const store = mockStore({});
      return store.dispatch(fetchRecipe(123)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetch failure', () => {
    test('creates FETCH_RECIPE_REQUEST, then FETCH_RECIPE_FAILURE', () => {
      nock()
        .get('/api/recipes/123')
        .reply(500, {});

      const expectedActions = [
        { type: FETCH_RECIPE_REQUEST },
        { type: FETCH_RECIPE_FAILURE, error: expect.any(Error) }
      ];
      const store = mockStore({});

      return store.dispatch(fetchRecipe(123)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe('fetching (multiple) recipes', () => {
  describe('successful request', () => {
    beforeEach(() => {
      nock()
        .get('/api/recipes')
        .reply(200, {
          recipes: [{ id: '123', name: 'Mac n Cheese' }]
        });
    });

    afterEach(() => {
      expect(isDone()).toBe(true);
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
      nock()
        .get('/api/recipes')
        .reply(500, {});

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
  test('successful request should dispatch request, then success', () => {
    nock()
      .post('/api/favorites', { recipe_id: 123 })
      .reply(200, {});

    const expectedActions = [
      { recipeId: 123, type: SET_FAVORITE_REQUEST },
      { recipeId: 123, type: SET_FAVORITE_SUCCESS }
    ];
    const store = mockStore({});

    return store.dispatch(setFavoriteStatus(123, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('unsuccessful request should dispatch request, then failure', () => {
    nock()
      .post('/api/favorites', { recipe_id: 123 })
      .reply(500, {});

    const expectedActions = [
      { recipeId: 123, type: SET_FAVORITE_REQUEST },
      { recipeId: 123, type: SET_FAVORITE_FAILURE, err: expect.any(Error) }
    ];
    const store = mockStore({});

    return store.dispatch(setFavoriteStatus(123, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('unfavoriting recipes', () => {
  test('should dispatch unfavorite request and then success actions', () => {
    nock()
      .delete('/api/favorites/123')
      .reply(200, {});

    const expectedActions = [
      { recipeId: 123, type: SET_UNFAVORITE_REQUEST },
      { recipeId: 123, type: SET_UNFAVORITE_SUCCESS }
    ];
    const store = mockStore({});

    return store.dispatch(setFavoriteStatus(123, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('unsuccessful request should dispatch unfavorite request, then failure actions', () => {
    nock()
      .delete('/api/favorites/123')
      .reply(500, {});

    const expectedActions = [
      { recipeId: 123, type: SET_UNFAVORITE_REQUEST },
      { recipeId: 123, type: SET_UNFAVORITE_FAILURE, err: expect.any(Error) }
    ];
    const store = mockStore({});

    return store.dispatch(setFavoriteStatus(123, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
