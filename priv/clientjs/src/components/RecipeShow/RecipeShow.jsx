// @flow
import React from 'react';

type Props = {
  match: {
    params: {
      id: string
    }
  }
};

const RecipeShow = ({ match }: Props) => {
  return (
    <div>
      Hello, World! id: {match.params.id}
    </div>
  );
};

export default RecipeShow;
