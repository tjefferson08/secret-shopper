import { push } from 'connected-react-router';
import cookie from 'js-cookie';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, login } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const token = ['abc', JSON.stringify({ email: 'bob@bob.com' }), 'def']
  .map(btoa)
  .join('.');

describe('successful login', () => {
  beforeEach(() => {
    nock(process.env.REACT_APP_API_URL).post('/api/sessions').reply(
      200,
      {
        token: token
      },
      { 'Access-Control-Allow-Origin': '*' }
    );
  });

  afterEach(() => {
    expect(nock.isDone()).toBe(true);
  });

  test('creates LOGIN_REQUEST and LOGIN_SUCCESS', () => {
    const expectedActions = [
      { type: LOGIN_REQUEST },
      { type: LOGIN_SUCCESS, user: { email: 'bob@bob.com' } },
      push('/')
    ];
    const store = mockStore({});
    return store
      .dispatch(login({ email: 'bob@bob.com', password: 'secret' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('stores token in cookie', () => {
    jest.spyOn(cookie, 'set');
    const store = mockStore({});
    return store
      .dispatch(login({ email: 'bob@bob.com', password: 'secret' }))
      .then(() => {
        expect(cookie.set).toBeCalledWith('token', token, {
          expires: 1
        });
        expect(true).toBe(true);
      });
  });
});

describe('login failure', () => {
  test('creates LOGIN_REQUEST, then LOGIN_FAILURE', () => {
    nock(process.env.REACT_APP_API_URL)
      .post('/api/sessions')
      .reply(500, {}, { 'Access-Control-Allow-Origin': '*' });

    const expectedActions = [{ type: LOGIN_REQUEST }, { type: LOGIN_FAILURE }];

    const store = mockStore({});

    return store
      .dispatch(login({ email: 'bob@bob.com', password: 'secret' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
