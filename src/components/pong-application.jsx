import React, { Component } from 'react';

import Paddle from './paddle';
import Scoreboard from './scoreboard';
import Ball from './ball';


class PongApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mousePosition: 0
    };
  }

  render() {
    const { mousePosition } = this.state;

    return (
      <div
        className="game-area"
        onMouseMove={(e) => this.setState({ mousePosition: e.clientY })}>
        <Scoreboard
          scorePlayer1={0}
          scorePlayer2={0} />
        <Paddle yPosition={mousePosition} />
        <Paddle
          yPosition={mousePosition}
          isRightPaddle={true} />
        <Ball position={{x: 100, y: 100}} />
      </div>
    );
  }
}
export default PongApplication;
