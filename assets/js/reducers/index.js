import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import commits from './commits';
import repositories from './repositories';
import userRepositories from './userRepositories';
import auth from './auth';
import notifications from './notifications';

const rootReducers = history => combineReducers({
  router: connectRouter(history),
  commits,
  repositories,
  userRepositories,
  auth,
  notifications,
});

export default rootReducers;
