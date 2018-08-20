import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = props => {
  const { recipes = [] } = props;
  return (
    <div className="recipe-list pure-g">
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <Link className="recipe-link" to={`/recipes/${recipe.id}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
