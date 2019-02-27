import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from 'reducers';
import rootSaga from 'sagas';
import { history } from 'utils';
import { routerMiddleware } from 'react-router-redux';

const routerMiddlewares = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddlewares];

export default function configureStore(initialState) {
  const store = createStore(rootReducers, initialState, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  return store;
}
