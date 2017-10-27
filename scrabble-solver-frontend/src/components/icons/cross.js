import React from 'react';
import PropTypes from 'prop-types';
import { white } from 'utils/colors';

const Icon = ({ className, height = 20, stroke = white, strokeWidth = 4, width = 20 }) => {
  const sharedProps = { stroke, strokeWidth };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20">
      <g>
        <line {...sharedProps} x1="3" y1="3" x2="17" y2="17" />
        <line {...sharedProps} x1="3" y1="17" x2="17" y2="3" />
      </g>
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number
};

export default Icon;
