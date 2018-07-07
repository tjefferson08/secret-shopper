import React, { Fragment } from 'react';

const IngredientsList = ({ ingredients }) => (
  <Fragment>
    <h4>Ingredients</h4>
    <ul>{ingredients.map(ing => <li key={ing.id}>{ing.name}</li>)}</ul>
  </Fragment>
);

export default IngredientsList;
