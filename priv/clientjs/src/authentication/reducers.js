import cookie from 'js-cookie';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from './actions';

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
        isFetching: true,
        ...state
      };
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        isFetching: false,
        currentUser: action.user,
        ...state
      };
    case LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        isFetching: false,
        ...state
      };
    case LOGOUT_REQUEST:
      return {
        isFetching: true,
        ...state
      };
    case LOGOUT_SUCCESS:
      return {
        isFetching: false,
        isAuthenticated: false,
        ...state
      };
    case LOGOUT_FAILURE:
      return {
        isFetching: false,
        ...state
      };
    default:
      return state;
  }
};

export default authentication;
