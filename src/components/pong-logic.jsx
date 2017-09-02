import React, { Component } from 'react';

import {
  updateBallPosition,
  updateScore,
  detectCollisions
} from '../utils/pong-utils';


const withPongLogic = (WrappedComponent) => (
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        playerPaddle1: 0,
        playerPaddle2: 0,
        scorePlayer1: 0,
        scorePlayer2: 0,
        ballPosition: {
          x: 900/2,
          y: 700/2,
          vX: -1.5,
          vY: -0.3,
          speed: 3
        }
      };
    }

    componentDidMount() {
      this.gameLoop();
    }

    gameLoop() {
      setInterval(() => {
        const collisionAction = detectCollisions(
          this.state.ballPosition,
          this.state.playerPaddle1,
          this.state.playerPaddle2
        );

        const nextBallPosition = updateBallPosition(
          collisionAction.ballPosition.vX,
          collisionAction.ballPosition.vY,
          collisionAction.ballPosition
        );

        const nextScore = updateScore(collisionAction.type, this.state.scorePlayer1, this.state.scorePlayer2);

        this.setState({
          ballPosition: nextBallPosition,
          scorePlayer1: nextScore.player1,
          scorePlayer2: nextScore.player2
        });
      }, 1000.0 / 60.0);
    }

    handleMouseMove(yPosition) {
      this.setState({
        playerPaddle1: yPosition,
        playerPaddle2: yPosition
      });
    }

    render() {
      const {
        playerPaddle1,
        playerPaddle2,
        ballPosition,
        scorePlayer1,
        scorePlayer2
      } = this.state;

      return (
        <WrappedComponent
          handleMouseMove={(yPosition) => this.handleMouseMove(yPosition)}
          scorePlayer1={scorePlayer1}
          scorePlayer2={scorePlayer2}
          playerPaddle1={playerPaddle1}
          playerPaddle2={playerPaddle2}
          ballPosition={ballPosition} />
      );
    }
  }
);

export default withPongLogic;
