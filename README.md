# DOM Pong Demo

A Demo of using React to make a pong game using DOM elements. Also Socket.io to add multiplayer capabilities. Traditionally, browser-based games use an HTML canvas element. Let's explore one way React could be used to make a classic pong game. We can also allow two people to play against each other using websockets with the socket.io library.

This is intended to be a follow-along demo, and so it's organized in several parts. Use `git checkout` to browse the demo from specific point.

- Part 1: Initial project setup [1-project-setup](https://github.com/denvaar/dom-pong-demo/tree/1-project-setup)  <-- YOU ARE HERE
- Part 2: Create React components [2-create-react-components](https://github.com/denvaar/dom-pong-demo/tree/2-create-react-components)
- Part 3: Add some logic [3-add-some-logic](https://github.com/denvaar/dom-pong-demo/tree/3-add-some-logic)
- Part 4: Socket.io setup [4-socketio-integration](https://github.com/denvaar/dom-pong-demo/tree/4-socketio-integration)

# Part 1: Initial Project Setup

### package.json
We're going to use Node Package Manager (npm) to manage all of our dependencies. We will also be using npm as a command-line utility tool while working on our application. To begin, generate a new package.json file:

```
npm init
```
Next, let's install our dependencies:
```
npm install --save react@next react-dom@next prop-types
```
And also the long list of development dependencies:
```
npm install --save-dev babel-core babel-loader babel \
babel-plugin-transform-object-rest-spread babel-preset-es2015 \
babel-preset-react css-loader file-loader \
react-hot-loader webpack webpack-dev-server
```
Now the dependencies should be installed under `node_modules` and
our `package.json` file should reflect these changes.

Let's continue setting up our `package.json` file by adding an npm script
to run our application in development mode. Change the scripts section to look like this:
```
"scripts": {
    "start": "webpack-dev-server --host 0.0.0.0 --port 3000 --progress --inline --hot"
  }
```

### index.html
React needs a root HTML element to be attached to. That's what `index.html`
is for. Our React application will be mounted at the div with id `react-root`.

### index.js
In the `src` directory there's a file called `index.js` which is where we use React-DOM to mount our top-level React component within the div from `index.html`.

### webpack.config.js
Webpack is a tool that basically puts all of your static assets (things like Javascript files, images, fonts, css, etc.) into a dependency graph. Webpack solves a lot of the common challenges involved in front-end web development. The `webpack.config.js` file is where we can configure all of that.

### What Problems Does Webpack Aim to Solve?

#### Code Maintainability

For developers, it is preferable to separate our code into many files because it's a lot more readable and easier to maintain. However, web browsers do better at handling as few files as possible because that means there are fewer requests that must be made to the server. Webpack allows developers to still organize their code as they please, but also optimizes the end-result for web browsers.

#### Code Optimization

Another thing webpack does well is minifying the code we write. A web browser can read code that has been minified more efficiently than code has comments, empty lines, and all of the other things that developers do when writing code.

#### File Transformations

Web browsers cannot interpret things like SASS files, the latest Javascript code, etc. Webpack also solves this problem by transforming things that a web browser cannot understand into something that it can.

#### Other Features

- When you save a file, updates can appear immediately in the browser.
- Lots of plugins
- Additional development tools

### Running the Application

Now that the basic setup is in place, we should be able to run our application by doing ```npm start```
