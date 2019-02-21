import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_REPOSITORIES_REQUEST, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_FAILURE } from 'constants/repositories';
import { fetchRepositories } from 'services/repositories';

export function* repositoriesSaga() {
  yield takeLatest(FETCH_REPOSITORIES_REQUEST, getRepositories);
}

function* getRepositories() {
  try {
    let response = yield call(fetchRepositories);
    if (response.status >= 200 && response.status < 300) {
      const res = yield response.json();
      yield put({ type: FETCH_REPOSITORIES_SUCCESS, payload: res.message });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: FETCH_REPOSITORIES_FAILURE, error });
  }
}
