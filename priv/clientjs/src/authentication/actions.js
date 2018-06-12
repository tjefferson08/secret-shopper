import axios from 'axios';
import cookie from 'js-cookie';
import { push } from 'connected-react-router';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const loginRequest = () => {
  return { type: LOGIN_REQUEST };
};

const loginSuccess = user => {
  return { type: LOGIN_SUCCESS, user };
};

const loginFailure = err => {
  return { type: LOGIN_FAILURE };
};

const claimsFromToken = token => {
  const encodedClaims = token.split('.')[1];
  if (!encodedClaims) {
    throw new Error('Invalid token');
  }
  return JSON.parse(atob(encodedClaims));
};

export const login = ({ email, password }) => {
  return dispatch => {
    dispatch(loginRequest());
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/sessions`, {
        session: {
          email,
          password
        }
      })
      .then(
        response => {
          const token = response.data.token;
          cookie.set('token', token, { expires: 1 });
          dispatch(loginSuccess(claimsFromToken(token)));
          dispatch(push('/'));
        },
        err => {
          dispatch(loginFailure(err));
        }
      );
  };
};

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutFailure = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

// TODO: server logout?
export const logout = () => {
  return dispatch => {
    return Promise.resolve().then(() => {
      try {
        dispatch(logoutRequest());
        cookie.remove('token');
        dispatch(logoutSuccess());
      } catch (err) {
        dispatch(logoutFailure());
      }
    });
  };
};
