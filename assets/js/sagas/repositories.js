import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_REPOSITORIES_REQUEST, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_FAILURE } from 'constants/repositories';
import { fetchRepositories } from 'services';

export function* repositoriesSaga() {
  yield takeLatest(FETCH_REPOSITORIES_REQUEST, getRepositories);
}

function* getRepositories() {
  try {
    let response = yield call(fetchRepositories);
    yield put({ type: FETCH_REPOSITORIES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_REPOSITORIES_FAILURE, error });
  }
}
