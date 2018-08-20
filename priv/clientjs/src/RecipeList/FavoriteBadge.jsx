import React from 'react';
import './FavoriteBadge.css';

const FavoriteBadge = ({ selected, onClick }) => {
  const onBadgeClick = () => onClick(!selected);

  return (
    <i
      className={`${selected ? 'fas' : 'far'} fa-star fa-2x`}
      data-testid="favorite-badge"
      onClick={onBadgeClick}
    />
  );
};

export default FavoriteBadge;
