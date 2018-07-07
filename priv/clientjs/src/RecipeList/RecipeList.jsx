import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = props => {
  const { recipes = [] } = props;
  return (
    <div className="recipe-list pure-g">
      {recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
    </div>
  );
};

export default RecipeList;
