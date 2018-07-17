import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  registerUser
} from './actions';
import nock, { isDone } from '../../test/nock';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('successful login', () => {
  beforeEach(() => {
    nock()
      .post('/api/users')
      .reply(200, {
        user: {
          email: 'bob@bob.com',
          name: 'bob'
        }
      });
  });

  afterEach(() => {
    expect(isDone()).toBe(true);
  });

  test('creates REGISTER_USER_REQUEST and REGISTER_USER_SUCCESS', () => {
    const expectedActions = [
      { type: REGISTER_USER_REQUEST },
      {
        type: REGISTER_USER_SUCCESS,
        user: {
          name: 'bob',
          email: 'bob@bob.com'
        }
      }
    ];
    const store = mockStore({});
    return store
      .dispatch(
        registerUser({
          name: 'bob',
          email: 'bob@bob.com',
          password: 'secret',
          password_confirmation: 'secret'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('registration failure', () => {
  test('creates REGISTER_USER_REQUEST, then REGISTER_USER_FAILURE', () => {
    nock()
      .post('/api/users')
      .reply(500, {});

    const expectedActions = [
      { type: REGISTER_USER_REQUEST },
      { type: REGISTER_USER_FAILURE }
    ];

    const store = mockStore({});

    return store
      .dispatch(
        registerUser({
          name: 'bob',
          email: 'bob@bob.com',
          password: 'secret',
          password_confirmation: 'secret'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
