// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../../RecipeList/RecipeCard';
import { fetchRecipe } from '../../recipes/actions';

type Recipe = any;
type Props = {
  match: {
    params: {
      id: string
    }
  },
  recipe?: Recipe,
  onMount: Function
};

class RecipeShow extends Component<Props> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return this.props.recipe
      ? <RecipeCard recipe={this.props.recipe} showDetails />
      : <div>Loading</div>;
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.recipes.activeId
      ? state.recipes.byId[state.recipes.activeId]
      : null
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => dispatch(fetchRecipe(ownProps.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeShow);
