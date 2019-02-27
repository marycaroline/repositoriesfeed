import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from './store';
import App from './containers/App';
import initialState from 'reducers/initial';


ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-app'));
