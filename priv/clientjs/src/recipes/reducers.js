import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE
} from './actions';

const recipes = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
      return {
        isFetching: true,
        ...state
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        isFetching: false,
        items: action.recipes,
        ...state
      };
    case FETCH_RECIPES_FAILURE:
      return {
        isFetching: false,
        error: action.error,
        ...state
      };
    default:
      return state;
  }
};

export default recipes;
