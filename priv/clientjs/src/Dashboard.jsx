// @flow

import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from './recipes/actions';
import RecipeCardBs from './RecipeList/RecipeCard.bs';
import './RecipeList/RecipeList.css';

const RecipeCard = RecipeCardBs.jsComponent;

type Props = {
  error?: string,
  recipes: any[],
  onMount: Function
};

class Dashboard extends Component<Props> {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return (
      <Fragment>
        {this.props.error ? (
          this.props.error
        ) : (
          <div className="recipe-list pure-g">
            {this.props.recipes.map(recipe => (
              <div key={recipe.id}>
                <Link className="recipe-link" to={`/recipes/${recipe.id}`}>
                  <RecipeCard recipe={recipe} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.recipes.error,
  recipes: state.recipes.allIds.map(id => state.recipes.byId[id])
});

const mapDispatchToProps = dispatch => ({
  onMount: () => {
    dispatch(fetchRecipes());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
