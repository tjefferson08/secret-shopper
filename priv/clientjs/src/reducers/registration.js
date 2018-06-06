import { REGISTER_USER_SUCCESS } from '../actions';

const registration = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...action.user
      };
    default:
      return state;
  }
};

export default registration;
