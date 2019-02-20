import { combineReducers } from "redux";
import commits from "./commits";
import repositories from "./repositories";

const rootReducers = combineReducers({
  commits,
  repositories,
})

export default rootReducers;
