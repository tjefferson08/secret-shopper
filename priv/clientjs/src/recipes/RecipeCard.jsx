import React from 'react';

const RecipeCard = ({ recipe }) =>
  <div>
    <div>{`ID: ${recipe.id}`}</div>
    <div>
      {recipe.name}
    </div>
  </div>;

export default RecipeCard;
