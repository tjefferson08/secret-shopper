import cookie from 'js-cookie';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './actions';

const initialState = () => {
  return {
    isAuthenticated: !!cookie.get('token'),
    isFetching: false
  };
};

const authentication = (state = initialState(), action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        isAuthenticated: false,
        isFetching: true
      };
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        isFetching: false,
        currentUser: action.user
      };
    case LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        isFetching: false
      };
    default:
      return state;
  }
};

export default authentication;
