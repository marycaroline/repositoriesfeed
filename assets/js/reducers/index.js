import { combineReducers } from "redux";
import commits from "./commits";
import repositories from "./repositories";
import auth from './auth';

const rootReducers = combineReducers({
  commits,
  repositories,
  auth
})

export default rootReducers;
