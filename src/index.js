import React from 'react';
import ReactDOM from 'react-dom';

import '../favicon.ico';
import '../static/css/styles.css';
import PongApplication from './components/pong-application.jsx';
import withPongLogic from './components/pong-logic';

const App = withPongLogic(PongApplication);

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
