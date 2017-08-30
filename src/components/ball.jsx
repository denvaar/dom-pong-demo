import React from 'react';
import PropTypes from 'prop-types';


const Ball = ({ position }) => {
  const STYLES = {
    top: `${position.y}px`,
    left: `${position.x}px`
  };

  return (
    <div
      className="ball"
      style={STYLES} />
  );
};

Ball.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};

export default Ball;
