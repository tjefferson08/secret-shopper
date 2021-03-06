// @flow

import type Dispatch from 'redux';
import http from '../http';

export const FETCH_RECIPE_REQUEST = 'FETCH_RECIPE_REQUEST';
export const FETCH_RECIPE_SUCCESS = 'FETCH_RECIPE_SUCCESS';
export const FETCH_RECIPE_FAILURE = 'FETCH_RECIPE_FAILURE';

export const FETCH_RECIPES_REQUEST = 'FETCH_RECIPES_REQUEST';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';

export const SET_FAVORITE_REQUEST = 'SET_FAVORITE_REQUEST';
export const SET_FAVORITE_SUCCESS = 'SET_FAVORITE_SUCCESS';
export const SET_FAVORITE_FAILURE = 'SET_FAVORITE_FAILURE';

export const SET_UNFAVORITE_REQUEST = 'SET_UNFAVORITE_REQUEST';
export const SET_UNFAVORITE_SUCCESS = 'SET_UNFAVORITE_SUCCESS';
export const SET_UNFAVORITE_FAILURE = 'SET_UNFAVORITE_FAILURE';

const fetchRecipeRequest = () => ({ type: FETCH_RECIPE_REQUEST });
const fetchRecipeSuccess = recipe => ({
  type: FETCH_RECIPE_SUCCESS,
  recipe
});
const fetchRecipeFailure = err => ({
  type: FETCH_RECIPE_FAILURE,
  error: err
});

const fetchRecipesRequest = () => ({ type: FETCH_RECIPES_REQUEST });
const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  recipes
});
const fetchRecipesFailure = err => ({
  type: FETCH_RECIPES_FAILURE,
  error: err
});

export const fetchRecipe = (recipeId: number): Dispatch => {
  return dispatch => {
    dispatch(fetchRecipeRequest());
    return http
      .get(`/api/recipes/${recipeId}`)
      .then(
        response => dispatch(fetchRecipeSuccess(response.data.recipe)),
        err => dispatch(fetchRecipeFailure(err))
      );
  };
};

export const fetchRecipes = (): Dispatch => {
  return dispatch => {
    dispatch(fetchRecipesRequest());
    return http
      .get('/api/recipes')
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
const setFavoriteFailure = (recipeId, err) => ({
  recipeId,
  err,
  type: SET_FAVORITE_FAILURE
});

const setUnfavoriteRequest = recipeId => ({
  recipeId,
  type: SET_UNFAVORITE_REQUEST
});
const setUnfavoriteSuccess = recipeId => ({
  recipeId,
  type: SET_UNFAVORITE_SUCCESS
});
const setUnfavoriteFailure = (recipeId, err) => ({
  recipeId,
  err,
  type: SET_UNFAVORITE_FAILURE
});

export const setFavoriteStatus = (
  recipeId: number,
  favoriteStatus: boolean
): Dispatch => {
  return dispatch => {
    return Promise.resolve().then(() => {
      if (favoriteStatus) {
        dispatch(setFavoriteRequest(recipeId));
        return http
          .post('/api/favorites', {
            recipe_id: recipeId
          })
          .then(() => dispatch(setFavoriteSuccess(recipeId)))
          .catch(err => dispatch(setFavoriteFailure(recipeId, err)));
      } else {
        dispatch(setUnfavoriteRequest(recipeId));
        return http
          .delete(`/api/favorites/${recipeId}`)
          .then(() => dispatch(setUnfavoriteSuccess(recipeId)))
          .catch(err => dispatch(setUnfavoriteFailure(recipeId, err)));
      }
    });
  };
};
