import {
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

/* TODO: normalize data so we don't have to hunt for the right recipe
 * like this */
const mapAndSetFavoriteStatus = ({
  recipes,
  targetRecipeId,
  favoriteStatus
}) => {
  return recipes.map(recipe => {
    if (recipe.id !== targetRecipeId) {
      return recipe;
    } else {
      return {
        ...recipe,
        favorited: favoriteStatus
      };
    }
  });
};

const recipes = (state = { items: [] }, action) => {
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.recipes
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
        items: mapAndSetFavoriteStatus({
          recipes: state.items,
          targetRecipeId: action.recipeId,
          favoriteStatus: true
        })
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
        items: mapAndSetFavoriteStatus({
          recipes: state.items,
          targetRecipeId: action.recipeId,
          favoriteStatus: false
        })
      };

    // same logic but negated for un-favoriting
    case SET_UNFAVORITE_REQUEST:
      return {
        ...state,
        items: mapAndSetFavoriteStatus({
          recipes: state.items,
          targetRecipeId: action.recipeId,
          favoriteStatus: false
        })
      };
    case SET_UNFAVORITE_SUCCESS:
      return state;
    case SET_UNFAVORITE_FAILURE:
      return {
        ...state,
        items: mapAndSetFavoriteStatus({
          recipes: state.items,
          targetRecipeId: action.recipeId,
          favoriteStatus: true
        })
      };
    default:
      return state;
  }
};

export default recipes;
