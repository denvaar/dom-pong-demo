import React from 'react';
import PropTypes from 'prop-types';


const Scoreboard = ({ scorePlayer1, scorePlayer2 }) => (
  <div className="scoreboard">
    <div className="player-1-score">
      {scorePlayer1}
    </div>
    <div className="player-2-score">
      {scorePlayer2}
    </div>
  </div>
);

Scoreboard.propTypes = {
  scorePlayer1: PropTypes.number.isRequired,
  scorePlayer2: PropTypes.number.isRequired
};

export default Scoreboard;
