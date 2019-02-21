import {all, fork} from 'redux-saga/effects';
import { repositoriesSaga } from './repositories';
import { authSaga } from './auth';

// combine all the module sagas
export default function* rootSaga() {
  yield all ([
    authSaga(),
    repositoriesSaga(),
  ]);
}
