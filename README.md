# DOM Pong Demo

A Demo of using React to make a pong game using DOM elements. Also Socket.io to add multiplayer capabilities. Traditionally, browser-based games use an HTML canvas element. Let's explore one way React could be used to make a classic pong game. We can also allow two people to play against each other using websockets with the socket.io library.

This is intended to be a follow-along demo, and so it's organized in several parts. Use `git checkout` to browse the demo from specific point.

- Part 1: Initial project setup [1-project-setup](https://github.com/denvaar/dom-pong-demo/tree/1-project-setup)
- Part 2: Create React components [2-create-react-components](https://github.com/denvaar/dom-pong-demo/tree/2-create-react-components)  <-- YOU ARE HERE
- Part 3: Add some logic [3-add-some-logic](https://github.com/denvaar/dom-pong-demo/tree/3-add-some-logic)
- Part 4: Socket.io setup [4-socketio-integration](https://github.com/denvaar/dom-pong-demo/tree/4-socketio-integration)

# Part 2: Create React components

At this point we have a basic pong user interface. It doesn't do much yet, other than look like a standard pong game. The paddles move with the cursor, but the ball stays still. In this branch, I will explain how I chose to split up the application into separate, reusable pieces - AKA [components](https://facebook.github.io/react/docs/components-and-props.html).

### Components

Components are used to render JSX. Components can either be a function, or a class.

### State & Props

State and props are similar in that they are plain JS objects and that modifying them will trigger an update, but there are some key differences:

#### props
- Passed into the component (or set by default)
- Read-only

#### state
- Fully controlled by component
- Should be private to component
- Increases complexity of component

Often times the state of a component will become the props of its children.

### Stateless Functional Components

The simplest way to define a component is using a Javascript function which accepts some props and returns some JSX. These are also known as "dumb" components, or "presentational" components because all they are capabile of doing is rendering a UI. Personally, I like try and use these types of components until I need state or lifecycle methods because they are easy to work with.

The [scoreboard](https://github.com/denvaar/dom-pong-demo/blob/2-create-react-components/src/components/scoreboard.jsx) component is one example of a stateless functional component from our pong game.

### Class Components

Components that are defined as classes have some additional features -- such as local state. Class components are often referred to as "smart" components, or "container" components because they are not only responsible for rendering a UI, but also managing some state. These types of components also have access to React's [lifecycle methods](https://facebook.github.io/react/docs/react-component.html).

