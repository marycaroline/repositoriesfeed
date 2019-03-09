import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { App } from 'containers';
import initialState from 'reducers/initial';
import configureStore, { history } from './store';


ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-app'),
);
