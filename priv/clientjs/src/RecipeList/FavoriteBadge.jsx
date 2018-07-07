import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './FavoriteBadge.css';

const FavoriteBadge = ({ selected, onClick }) => {
  const onBadgeClick = () => onClick(!selected);

  return (
    <i
      className={`${selected ? 'fas' : 'far'} fa-star fa-2x`}
      onClick={onBadgeClick}
    />
  );
};

export default FavoriteBadge;
