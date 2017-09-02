import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paddle from './paddle';
import Scoreboard from './scoreboard';
import Ball from './ball';
import withPongLogic from './pong-logic';


const PongApplication = ({
  playerPaddle1,
  playerPaddle2,
  scorePlayer1,
  scorePlayer2,
  ballPosition,
  handleMouseMove
}) => (
  <div
    className="game-area"
    onMouseMove={(e) => handleMouseMove(e.clientY)}>
    <Scoreboard
      scorePlayer1={scorePlayer1}
      scorePlayer2={scorePlayer2} />
    <Paddle yPosition={playerPaddle1} />
    <Paddle
      yPosition={playerPaddle1}
      isRightPaddle={true} />
    <Ball position={{x: ballPosition.x, y: ballPosition.y}} />
  </div>
);

PongApplication.propTypes = {
  playerPaddle1: PropTypes.number.isRequired,
  playerPaddle2: PropTypes.number.isRequired,
  scorePlayer1: PropTypes.number.isRequired,
  scorePlayer2: PropTypes.number.isRequired,
  ballPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  handleMouseMove: PropTypes.func.isRequired
};

export default PongApplication;
