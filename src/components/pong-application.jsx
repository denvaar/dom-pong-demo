import React from 'react';


const PongApplication = () => (
  <div className="game-area">
    <div className="scoreboard">
      <div className="player-1-score">
        0
      </div>
      <div className="player-2-score">
        0
      </div>
    </div>
    <div className="paddle"></div>
    <div className="paddle right-paddle"></div>
    <div className="ball"></div>
  </div>
);

export default PongApplication;
