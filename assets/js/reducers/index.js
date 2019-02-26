import { combineReducers } from 'redux';
import commits from './commits';
import repositories from './repositories';
import userRepositories from './userRepositories';
import auth from './auth';

const rootReducers = combineReducers({
  commits,
  repositories,
  userRepositories,
  auth,
});

export default rootReducers;
