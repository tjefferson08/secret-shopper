import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecipes } from './recipes/actions';
import RecipeList from './RecipeList/RecipeList';

class Dashboard extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return <RecipeList recipes={this.props.recipes} />;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
