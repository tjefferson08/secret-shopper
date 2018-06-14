import axios from 'axios';

export const FETCH_RECIPES_REQUEST = 'FETCH_RECIPES_REQUEST';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';

const fetchRecipesRequest = () => ({ type: FETCH_RECIPES_REQUEST });
const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  recipes
});
const fetchRecipesFailure = err => ({
  type: FETCH_RECIPES_FAILURE,
  error: err
});

export const fetchRecipes = () => {
  return dispatch => {
    dispatch(fetchRecipesRequest());
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then(
        response => dispatch(fetchRecipesSuccess(response.data.recipes)),
        err => dispatch(fetchRecipesFailure(err))
      );
  };
};
