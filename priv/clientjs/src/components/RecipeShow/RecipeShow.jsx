import React from 'react';
import PropTypes from 'prop-types';

const RecipeShow = ({ match }) => {
  return (
    <div>
      Hello, World! id: {match.params.id}
    </div>
  );
};

RecipeShow.propTypes = {};

export default RecipeShow;
