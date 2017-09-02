# DOM Pong Demo

A Demo of using React to make a pong game using DOM elements. Also Socket.io to add multiplayer capabilities. Traditionally, browser-based games use an HTML canvas element. Let's explore one way React could be used to make a classic pong game. We can also allow two people to play against each other using websockets with the socket.io library.

This is intended to be a follow-along demo, and so it's organized in several parts. Use `git checkout <branch>` to browse the demo from specific point.

- Part 1: Initial project setup [1-project-setup](https://github.com/denvaar/dom-pong-demo/tree/1-project-setup)
- Part 2: Create React components [2-create-react-components](https://github.com/denvaar/dom-pong-demo/tree/2-create-react-components)
- Part 3: Add some logic [3-add-some-logic](https://github.com/denvaar/dom-pong-demo/tree/3-add-some-logic)  <-- YOU ARE HERE
- Part 4: Socket.io setup [4-socketio-integration](https://github.com/denvaar/dom-pong-demo/tree/4-socketio-integration)

# Part 3: Add Some Logic

At this point we have a working pong application, but it's just single player. Player 1 controls both paddles. We will be adding multiplayer support in the next part using Socket.io. Before we get to that, here's an overview of some of the changes we've made to our application.

### Pong Logic

I've added a couple new files to the `util` directory which handles how our pong application should behave. [pong-utils.js](https://github.com/denvaar/dom-pong-demo/blob/3-add-some-logic/src/utils/pong-utils.js) has a few functions that are used to figure out the speed and direction of the ball, etc. Since this is not what I want the focus of this demo to be, I will only mention that I've tried to separate out this logic into separate functions that could operate independently of our React components. Much of this code could be moved right into our `PongApplication` component, but that would likely cause the component to be too complex. When components are too complex, they are difficult to understand and to test.

### Don't Use Inheritance

React strongly favors composition over inheritance. The [official docs](https://facebook.github.io/react/docs/composition-vs-inheritance.html#so-what-about-inheritance), they almost flat-out state not to use inheritance when architecting a React application:

>At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies.

I figure if a company as large as Facebook does not use inheritance in their React applications, I probably don't need to either, so I like to follow this guideline 💁.

### Higher-Order Components (HOC's)

Higher-order components are a pattern that comes from React's ability to compose components. An HOC is basically a function that takes a component and returns a new one.

Take a look at this line from [index.js](https://github.com/denvaar/dom-pong-demo/blob/3-add-some-logic/src/index.js#L9) for example:

```javascript
const App = withPongLogic(PongApplication);
```

All of the logic for the game is maintained inside the `withPongLogic` HOC. This lets us keep `PongApplication` simple (in fact, it has now been refactored into a stateless functional component.) The goal that I had in mind when writing separating the game logic into its own component/set of functions was to make `PongApplication` indifferent to how the game actually works and to simply render the UI. By doing that, I was able to move its state into props instead.

We can describe all of the data that the pong application UI needs to function using propTypes:

```javascript
PongApplication.propTypes = {
  playerPaddle1: PropTypes.number.isRequired,
  playerPaddle2: PropTypes.number.isRequired,
  scorePlayer1: PropTypes.number.isRequired,
  scorePlayer2: PropTypes.number.isRequired,
  ballPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  handleMouseMove: PropTypes.func.isRequired
};
```
