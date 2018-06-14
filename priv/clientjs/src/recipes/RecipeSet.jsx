import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeSet = ({ recipes = [] }) =>
  <div>
    {recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
  </div>;

export default RecipeSet;
