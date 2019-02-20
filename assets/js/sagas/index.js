import {all, fork} from 'redux-saga/effects';
import { repositoriesSaga } from './repositories';

// combine all the module sagas
export default function* rootSaga() {
  yield all ([
    repositoriesSaga(),
  ]);
}
