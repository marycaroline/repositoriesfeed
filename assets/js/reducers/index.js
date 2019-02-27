import { combineReducers } from 'redux';
import commits from './commits';
import repositories from './repositories';
import userRepositories from './userRepositories';
import auth from './auth';
import notifications from './notifications';
import { connectRouter } from 'connected-react-router'

const rootReducers = (history) => combineReducers({
  router: connectRouter(history),
  commits,
  repositories,
  userRepositories,
  auth,
  notifications,
});

export default rootReducers;
