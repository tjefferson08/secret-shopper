// @flow

import {
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  SET_FAVORITE_REQUEST,
  SET_FAVORITE_SUCCESS,
  SET_FAVORITE_FAILURE,
  SET_UNFAVORITE_REQUEST,
  SET_UNFAVORITE_SUCCESS,
  SET_UNFAVORITE_FAILURE
} from './actions';

type Action = any;
type State = any;

const getInitialState = (): State => ({
  error: null,
  byId: {},
  activeId: null,
  allIds: []
});

const recipes = (state: State = getInitialState(), action: Action) => {
  switch (action.type) {
    case FETCH_RECIPE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.recipe.id]: action.recipe
        },
        activeId: action.recipe.id,
        isFetching: false
      };
    case FETCH_RECIPE_FAILURE:
      return {
        ...state,
        activeId: null,
        isFetching: false
      };
    case FETCH_RECIPES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_RECIPES_SUCCESS:
      const byId = action.recipes.reduce((acc, recipe) => {
        acc[recipe.id] = recipe;
        return acc;
      }, {});
      const allIds = action.recipes.map(rec => rec.id);

      return {
        ...state,
        isFetching: false,
        byId,
        allIds
      };
    case FETCH_RECIPES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    /* Optimistically set favorited to true on request (assuming
     * server side will be OK) */
    case SET_FAVORITE_REQUEST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.recipeId]: {
            ...state.byId[action.recipeId],
            favorited: true
          }
        }
      };

    /* I think this one is a no-op since we already updated favorite
     * status in the request phase */
    case SET_FAVORITE_SUCCESS:
      return state;

    /* if something goes wrong, we need to undo our optimistic setting
     * of favorite status to true */
    case SET_FAVORITE_FAILURE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.recipeId]: {
            ...state.byId[action.recipeId],
            favorited: false
          }
        }
      };

    // same logic but negated for un-favoriting
    case SET_UNFAVORITE_REQUEST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.recipeId]: {
            ...state.byId[action.recipeId],
            favorited: false
          }
        }
      };
    case SET_UNFAVORITE_SUCCESS:
      return state;
    case SET_UNFAVORITE_FAILURE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.recipeId]: {
            ...state.byId[action.recipeId],
            favorited: true
          }
        }
      };
    default:
      return state;
  }
};

export default recipes;
