import React from 'react';
import PropTypes from 'prop-types';


const Paddle = ({ yPosition, isRightPaddle }) => {
  const STYLES = {
    top: `${yPosition - (150/2)}px`,
    left: isRightPaddle ? `${900 - 15}px` : 0
  };

  const classNames = isRightPaddle ? "paddle paddle-right" : "paddle";

  return (
    <div
      className={classNames}
      style={STYLES} />
  );
}

Paddle.propTypes = {
  yPosition: PropTypes.number.isRequired,
  isRightPaddle: PropTypes.bool
};

export default Paddle;
