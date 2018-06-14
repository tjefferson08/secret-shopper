import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes } from './recipes/actions';
import RecipeCard from './recipes/RecipeCard';
import RecipeSet from './recipes/RecipeSet';

class Dashboard extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return <RecipeSet recipes={this.props.recipes} />;
  }
}

Dashboard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  onMount: PropTypes.func
};

const mapStateToProps = state => ({ recipes: state.recipes.items });
const mapDispatchToProps = dispatch => ({
  onMount: () => {
    dispatch(fetchRecipes());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
