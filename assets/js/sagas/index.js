import { all } from 'redux-saga/effects';
import { repositoriesSaga } from './repositories';
import { commitsSaga } from './commits';
import { authSaga } from './auth';

// combine all the module sagas
export default function* rootSaga() {
  yield all([
    ...repositoriesSaga,
    ...commitsSaga,
    ...authSaga,
  ]);
}
