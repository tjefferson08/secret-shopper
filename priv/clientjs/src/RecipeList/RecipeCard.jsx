import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe, showDetails }) => {
  const {
    cook_time,
    image_url,
    ingredients,
    instructions,
    name,
    prep_time,
    total_time
  } = recipe;
  return (
    <div className="pure-u-1 pure-u-md-1-3">
      <div className="recipe-card">
        <div className="header">
          <i className="far fa-star fa-2x" />
          <h3 className="name">{name}</h3>
        </div>
        <img className="thumbnail" src={image_url} />
        <Time label="Cook time" value={cook_time} />
        <Time label="Prep time" value={prep_time} />
        <Time label="Total time" value={total_time} />
        {showDetails && (
          <Fragment>
            <IngredientsList ingredients={ingredients} />
            <InstructionsList instructions={instructions} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

const Time = ({ label, value }) => (
  <div className="time-container">
    <strong className="time-label">{label}:</strong>
    <p className="time-value">{value}</p>
  </div>
);

const IngredientsList = ({ ingredients }) => (
  <Fragment>
    <h4>Ingredients</h4>
    <ul>{ingredients.map(ing => <li key={ing.id}>{ing.name}</li>)}</ul>
  </Fragment>
);

const InstructionsList = ({ instructions }) => (
  <Fragment>
    <h4>Instructions</h4>
    <ol>{instructions.map(inst => <li key={inst.id}>{inst.text}</li>)}</ol>
  </Fragment>
);

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
  }).isRequired
};

RecipeCard.defaultProps = {
  recipe: {
    id: null,
    name: 'Unnamed Recipe',
    ingredients: [],
    instruction: []
  }
};

export default RecipeCard;
