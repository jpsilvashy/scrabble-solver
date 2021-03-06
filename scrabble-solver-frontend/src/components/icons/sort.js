import React from 'react';
import PropTypes from 'prop-types';

const Sort = ({ className, height = 8, sortingDirection, width = 12 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    viewBox="0 0 12 8">
    {sortingDirection === 'ascending' && (
      <polygon fill="currentColor" points="0,8 6,0 12,8" />
    )}

    {sortingDirection === 'descending' && (
      <polygon fill="currentColor" points="0,0 6,8 12,0" />
    )}
  </svg>
);

Sort.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  sortingDirection: PropTypes.oneOf([ 'ascending', 'descending' ]).isRequired,
  width: PropTypes.number
};

export default Sort;
