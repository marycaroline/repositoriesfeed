import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducers from 'reducers';
import rootSaga from 'sagas';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(rootReducers(history), preloadedState, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  return store;
}
