import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => {
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
    <div>
      <div>
        <h2>{name || 'Unknown name'}</h2>
      </div>
      <img className="thumbnail" src={image_url} />
      <Time label="Cook time" value={cook_time} />
      <Time label="Prep time" value={prep_time} />
      <Time label="Total time" value={total_time} />
      <IngredientsList ingredients={ingredients} />
      <InstructionsList instructions={instructions} />
    </div>
  );
};

const Time = ({ label, value }) => (
  <div>
    <strong>{label}</strong>
    <p>{value}</p>
  </div>
);

const IngredientsList = ({ ingredients }) => (
  <Fragment>
    <h3>Ingredients</h3>
    <ul>{ingredients.map(ing => <li key={ing.id}>{ing.name}</li>)}</ul>
  </Fragment>
);

const InstructionsList = ({ instructions }) => (
  <Fragment>
    <h3>Instructions</h3>
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
