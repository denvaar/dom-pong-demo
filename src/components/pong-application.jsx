import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paddle from './paddle';
import Scoreboard from './scoreboard';
import Ball from './ball';
import withPongLogic from './pong-logic';


const PongApplication = ({
  leftPaddleY,
  rightPaddleY,
  leftScore,
  rightScore,
  ballPosition,
  handleMouseMove
}) => (
  <div
    className="game-area"
    onMouseMove={(e) => handleMouseMove(e.clientY)}>
    <Scoreboard
      leftScore={leftScore}
      rightScore={rightScore} />
    <Paddle yPosition={leftPaddleY} />
    <Paddle
      yPosition={rightPaddleY}
      isRightPaddle={true} />
    <Ball position={{x: ballPosition.x, y: ballPosition.y}} />
  </div>
);

PongApplication.propTypes = {
  leftPaddleY: PropTypes.number.isRequired,
  rightPaddleY: PropTypes.number.isRequired,
  leftScore: PropTypes.number.isRequired,
  rightScore: PropTypes.number.isRequired,
  ballPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  handleMouseMove: PropTypes.func.isRequired
};

export default PongApplication;
