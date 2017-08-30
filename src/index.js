import React from 'react';
import ReactDOM from 'react-dom';

import '../favicon.ico';
import '../static/css/styles.css';
import PongApplication from './components/pong-application.jsx';


ReactDOM.render(
  <PongApplication />,
  document.getElementById('react-root')
);
