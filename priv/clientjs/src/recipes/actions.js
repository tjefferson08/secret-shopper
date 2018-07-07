import axios from 'axios';

export const FETCH_RECIPES_REQUEST = 'FETCH_RECIPES_REQUEST';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';

export const SET_FAVORITE_REQUEST = 'SET_FAVORITE_REQUEST';
export const SET_FAVORITE_SUCCESS = 'SET_FAVORITE_SUCCESS';
export const SET_FAVORITE_FAILURE = 'SET_FAVORITE_FAILURE';

export const SET_UNFAVORITE_REQUEST = 'SET_UNFAVORITE_REQUEST';
export const SET_UNFAVORITE_SUCCESS = 'SET_UNFAVORITE_SUCCESS';
export const SET_UNFAVORITE_FAILURE = 'SET_UNFAVORITE_FAILURE';

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

const setFavoriteRequest = recipeId => ({
  recipeId,
  type: SET_FAVORITE_REQUEST
});
const setFavoriteSuccess = recipeId => ({
  recipeId,
  type: SET_FAVORITE_SUCCESS
});
// const setFavoriteFailure = recipeId => ({
//   recipeId,
//   type: SET_FAVORITE_FAILURE
// });

const setUnfavoriteRequest = recipeId => ({
  recipeId,
  type: SET_UNFAVORITE_REQUEST
});
const setUnfavoriteSuccess = recipeId => ({
  recipeId,
  type: SET_UNFAVORITE_SUCCESS
});
// const setUnfavoriteFailure = recipeId => ({
//   recipeId,
//   type: SET_UNFAVORITE_FAILURE
// });

export const setFavoriteStatus = (recipeId, favoriteStatus) => {
  return dispatch => {
    return Promise.resolve().then(() => {
      if (favoriteStatus) {
        dispatch(setFavoriteRequest(recipeId));
        dispatch(setFavoriteSuccess(recipeId));
        // dispatch(setFavoriteFailure(recipeId));
        // TODO make axios request
      } else {
        dispatch(setUnfavoriteRequest(recipeId));
        dispatch(setUnfavoriteSuccess(recipeId));
        // TODO make axios request
        // dispatch(setUnfavoriteFailure(recipeId));
      }
    });
  };
};
