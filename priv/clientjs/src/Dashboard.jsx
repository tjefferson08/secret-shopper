// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from './recipes/actions';
import RecipeList from './RecipeList/RecipeList';

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
        {this.props.error ? this.props.error : null}
        <RecipeList recipes={this.props.recipes} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
