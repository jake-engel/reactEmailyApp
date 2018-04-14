import 'materialize-css/dist/css/materialize.min.css'; // If from node_modules don't need ./ up front
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;

// First Arg: All the reducers in our application
// Second Arg: Initial State of application
// Third Arg: Used to apply middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
