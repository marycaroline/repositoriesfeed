import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from 'utils';
import configureStore from './store';
import initialState from './reducers/initial';
import App from './containers/App';

const store = configureStore(initialState);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('react-app'));
