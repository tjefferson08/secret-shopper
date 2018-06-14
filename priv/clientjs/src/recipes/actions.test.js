import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  fetchRecipes
} from './actions';

import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('successful request', () => {
  beforeEach(() => {
    nock(process.env.REACT_APP_API_URL).get('/api/recipes').reply(
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
