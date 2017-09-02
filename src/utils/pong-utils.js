import {
  PONG_RIGHT,
  PONG_LEFT,
  OUT_OF_BOUNDS_RIGHT,
  OUT_OF_BOUNDS_LEFT,
  NO_COLLISION
} from './constants';


const intersectRect = (a, b) => (
  !(b.left > a.right ||
    b.right < a.left ||
    b.top > a.bottom ||
    b.bottom < a.top)
);

const calcBounceAngle = (paddle, ballPosition) => {
  const relIntersectY = (paddle + (150 / 3)) - ballPosition.y;
  const normRelIntersectY = (relIntersectY / (150 / 3));
  const bounceAngle = normRelIntersectY * 50;

  return ballPosition.speed * -Math.sin(bounceAngle);
};


export const updateBallPosition = (deltaX, deltaY, ballPosition) => (
  {
    ...ballPosition,
    x: ballPosition.x + (deltaX * ballPosition.speed),
    y: ballPosition.y + (deltaY * ballPosition.speed)
  }
);

export const updateScore = (actionEvent, scorePlayer1, scorePlayer2) => {
  switch (actionEvent) {
    case OUT_OF_BOUNDS_RIGHT: return { player1: scorePlayer1 + 1, player2: scorePlayer2 };
    case OUT_OF_BOUNDS_LEFT: return { player1: scorePlayer1, player2: scorePlayer2 + 1 };
    default: return { player1: scorePlayer1, player2: scorePlayer2 };
  };
};

export const detectCollisions = (ballPosition, paddlePlayer1, paddlePlayer2) => {
  const ballPositionRect = {
    left: ballPosition.x + ballPosition.vX,
    right: (ballPosition.x + 20) + ballPosition.vX,
    top: ballPosition.y + ballPosition.vY,
    bottom: (ballPosition.y + 20) + ballPosition.vY
  };

  const pongLeft = intersectRect(
    {
      left: 0,
      right: 15,
      top: paddlePlayer1 - 75,
      bottom: paddlePlayer1 + 75
    },
    ballPositionRect
  );

  const pongRight = intersectRect(
    {
      left: 900 - 15,
      right: 900,
      top: paddlePlayer2 - 75,
      bottom: paddlePlayer2 + 75
    },
    ballPositionRect
  );

  if (pongLeft || pongRight) {
    const paddle = pongLeft ? paddlePlayer1 : paddlePlayer2;

    return {
      type: pongLeft ? PONG_LEFT : PONG_RIGHT,
      ballPosition: {
        ...ballPosition,
        speed: ballPosition.speed + 0.3,
        vX: ballPosition.vX * -1,
        vY: calcBounceAngle(paddle, ballPosition),
      }
    };
  }

  const outLeft = ballPosition.x < 0;
  const outRight = ballPosition.x > 900;

  if (outLeft || outRight) {
    return {
      type: outLeft ? OUT_OF_BOUNDS_LEFT : OUT_OF_BOUNDS_RIGHT,
      ballPosition: {
        ...ballPosition,
        x: 900/2,
        y: 700/2,
        speed: 3,
        vX: -1,
        vY: 0
      }
    };
  }

  const bounceTop = ballPosition.y < 0;
  const bounceBottom = ballPosition.y > (700 - 20);

  if (bounceTop || bounceBottom) {
    return {
      type: NO_COLLISION,
      ballPosition: {
        ...ballPosition,
        vY: ballPosition.vY * -1
      }
    };
  }

  return {
    type: NO_COLLISION,
    ballPosition: { ...ballPosition }
  };
};
