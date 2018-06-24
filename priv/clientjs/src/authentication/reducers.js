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
        ...state,
        isFetching: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        currentUser: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default authentication;
