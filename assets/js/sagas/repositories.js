import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_REPOSITORIES_REQUEST, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_FAILURE } from 'constants/index.js';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* repositoriesSaga() {
  yield takeLatest(FETCH_REPOSITORIES_REQUEST, getDogs);
}

// function that makes the api request and returns a Promise for response
function fetchRepositories() {
  return fetch("https://dog.ceo/api/breed/hound/images")
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
