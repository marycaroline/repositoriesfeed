import { all } from 'redux-saga/effects';
import { repositoriesSaga } from './repositories';
import { authSaga } from './auth';
import { commitsSaga } from './commits';

// combine all the module sagas
export default function* rootSaga() {
  yield all([
    authSaga(),
    repositoriesSaga(),
    commitsSaga(),
  ]);
}
