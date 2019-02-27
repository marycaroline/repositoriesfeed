import { combineReducers } from 'redux';
import commits from './commits';
import repositories from './repositories';
import userRepositories from './userRepositories';
import auth from './auth';
import notifications from './notifications';

const rootReducers = combineReducers({
  commits,
  repositories,
  userRepositories,
  auth,
  notifications,
});

export default rootReducers;
