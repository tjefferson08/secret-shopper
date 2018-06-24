import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = props => {
  const { recipes = [] } = props;
  return (
    <div>
      {recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
    </div>
  );
};

export default RecipeList;
