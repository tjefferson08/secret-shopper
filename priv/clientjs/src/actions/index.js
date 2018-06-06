import axios from 'axios';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

const registerUserRequest = () => {
  return { type: REGISTER_USER_REQUEST };
};

const registerUserSuccess = user => {
  console.log('succes', user);
  return { type: REGISTER_USER_SUCCESS, user };
};

const registerUserFailure = err => {
  console.log('failure', err);
  return { type: REGISTER_USER_FAILURE };
};

export const registerUser = ({ name, email, password, passwordConfirm }) => {
  return dispatch => {
    dispatch(registerUserRequest());
    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/users`, {
        user: {
          name,
          email,
          password,
          passwordConfirm
        }
      })
      .then(
        user => {
          dispatch(registerUserSuccess(user));
        },
        err => {
          dispatch(registerUserFailure(err));
        }
      );
  };
};
