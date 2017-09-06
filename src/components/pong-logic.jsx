import React, { Component } from 'react';
import io from 'socket.io-client';

import {
  updateBallPosition,
  updateScore,
  detectCollisions
} from '../utils/pong-utils';
import { SINGLE_PLAYER, MULTI_PLAYER } from '../utils/constants';


const withPongLogic = (WrappedComponent) => (
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        gameStatus: SINGLE_PLAYER,
        playerIndex: undefined,
        leftPaddleY: 0,
        rightPaddleY: 0,
        leftScore: 0,
        rightScore: 0,
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
      this.socket = io('http://10.3.15.165:3001');

      this.socket.on('assign-player', ({ playerIndex }) => {
        if (playerIndex < 3) {
          console.log(`You are player ${playerIndex}`);
        } else {
          console.log('You are a spectator');
        }
        this.setState({ playerIndex });
      });

      this.socket.on('game-update', (gameData) => {
        this.setState(gameData);
      });

      this.socket.on('game-status', (statusCode) => {
        this.setState({ gameStatus: statusCode });
      });

      this.gameLoop();
    }

    gameLoop() {
      setInterval(() => {
        if (this.state.playerIndex < 3) {
          const collisionAction = detectCollisions(
            this.state.ballPosition,
            this.state.leftPaddleY,
            this.state.rightPaddleY
          );

          const nextBallPosition = updateBallPosition(
            collisionAction.ballPosition.vX,
            collisionAction.ballPosition.vY,
            collisionAction.ballPosition
          );

          const nextScore = updateScore(collisionAction.type, this.state.leftScore, this.state.rightScore);

          const updatedState = {
            ballPosition: nextBallPosition,
            leftScore: nextScore.player1,
            rightScore: nextScore.player2
          };

          this.socket.emit('game-update', updatedState);
          this.setState(updatedState);
        }
      }, 1000.0 / 60.0);
    }

    handleMouseMove(yPosition) {
      if (this.state.playerIndex < 3) {
        const updatedYPosition = this.state.playerIndex === 1 ? {leftPaddleY: yPosition} : {rightPaddleY: yPosition};
        this.socket.emit('game-update', updatedYPosition);
        this.setState(updatedYPosition);
      }
    }

    render() {
      const {
        leftPaddleY,
        rightPaddleY,
        ballPosition,
        leftScore,
        rightScore
      } = this.state;

      return (
        <WrappedComponent
          handleMouseMove={(yPosition) => this.handleMouseMove(yPosition)}
          leftScore={leftScore}
          rightScore={rightScore}
          leftPaddleY={leftPaddleY}
          rightPaddleY={rightPaddleY}
          ballPosition={ballPosition} />
      );
    }
  }
);

export default withPongLogic;
