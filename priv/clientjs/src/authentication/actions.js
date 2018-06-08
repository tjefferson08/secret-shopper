import axios from 'axios';
import cookie from 'js-cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
        },
        err => {
          dispatch(loginFailure(err));
        }
      );
  };
};
