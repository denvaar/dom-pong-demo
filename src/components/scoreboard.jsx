import React from 'react';
import PropTypes from 'prop-types';


const Scoreboard = ({ leftScore, rightScore }) => (
  <div className="scoreboard">
    <div className="player-1-score">
      {leftScore}
    </div>
    <div className="player-2-score">
      {rightScore}
    </div>
  </div>
);

Scoreboard.propTypes = {
  leftScore: PropTypes.number.isRequired,
  rightScore: PropTypes.number.isRequired
};

export default Scoreboard;
