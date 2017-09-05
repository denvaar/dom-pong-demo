const io = require('socket.io')();

import { PLAYING, WAITING } from './utils/constants';


io.on('connection', (socket) => {
  let clientCount = io.engine.clientsCount;

  console.log(`player connected (${clientCount} total)`);

  if (clientCount === 2) {
    io.emit('game-status', PLAYING);
  }

  socket.on('disconnect', () => {
    let clientCount = io.engine.clientsCount;

    console.log(`player disconnected (${clientCount} total)`);
    if (clientCount !== 2) {
      io.emit('game-status', WAITING);
    }
  });
});

const port = 3001;
io.listen(port);
console.log(` 🌎  listening on port ${port}`);
