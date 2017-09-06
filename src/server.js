const io = require('socket.io')();

import { SINGLE_PLAYER, MULTI_PLAYER } from './utils/constants';


io.on('connection', (socket) => {
  let clientCount = io.engine.clientsCount;

  console.log(`player connected (${clientCount} total)`);

  socket.emit('assign-player', { playerIndex: clientCount });

  if (clientCount === 2) {
    io.emit('game-status', MULTI_PLAYER);
  }

  socket.on('game-update', (gameData) => {
    socket.broadcast.emit('game-update', gameData);
  });

  socket.on('disconnect', () => {
    let clientCount = io.engine.clientsCount;

    console.log(`player disconnected (${clientCount} total)`);
    if (clientCount !== 2) {
      io.emit('game-status', SINGLE_PLAYER);
    }
  });
});

const port = 3001;
io.listen(port);
console.log(` 🌎  listening on port ${port}`);
