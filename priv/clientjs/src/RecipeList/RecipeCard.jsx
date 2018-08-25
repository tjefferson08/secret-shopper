import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FavoriteBadge from './FavoriteBadge';
import IngredientsList from './IngredientsList';
import InstructionsList from './InstructionsList';
import TimeBs from './Time.bs';
import { setFavoriteStatus } from '../recipes/actions';

const Time = TimeBs.jsComponent;

const RecipeCard = ({ recipe, setFavorite, showDetails }) => {
  const {
    cook_time,
    favorited,
    image_url,
    ingredients,
    instructions,
    name,
    prep_time,
    total_time
  } = recipe;

  const setRecipeFavoriteStatus = (...rest) => {
    setFavorite(recipe.id, ...rest);
  };

  return (
    <div className="pure-u-1 pure-u-md-1-3">
      <div className="recipe-card">
        <div className="header">
          <FavoriteBadge
            selected={favorited}
            onClick={setRecipeFavoriteStatus}
          />
          <h3 className="name">
            {name}
          </h3>
        </div>
        <img className="thumbnail" alt={name} src={image_url} />
        <Time label="Cook time" value={cook_time} />
        <Time label="Prep time" value={prep_time} />
        <Time label="Total time" value={total_time} />
        {showDetails &&
          <Fragment>
            <IngredientsList ingredients={ingredients} />
            <InstructionsList instructions={instructions} />
          </Fragment>}
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cook_time: PropTypes.string.isRequired,
    prep_time: PropTypes.string.isRequired,
    total_time: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    ).isRequired,
    instructions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  setFavorite: PropTypes.func.isRequired,
  showDetails: PropTypes.bool
};

RecipeCard.defaultProps = {
  recipe: {
    id: null,
    name: 'Unnamed Recipe',
    ingredients: [],
    instruction: []
  },
  showDetails: false
};

const mapDispatchToProps = dispatch => ({
  setFavorite: (recipeId, favoriteStatus) => {
    dispatch(setFavoriteStatus(recipeId, favoriteStatus));
  }
});

export default connect(null, mapDispatchToProps)(RecipeCard);
