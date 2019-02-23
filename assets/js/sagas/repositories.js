import { takeLatest, call, put } from "redux-saga/effects";
import { 
  FETCH_REPOSITORIES_REQUEST, 
  FETCH_REPOSITORIES_SUCCESS, 
  FETCH_REPOSITORIES_FAILURE, 
  FOLLOW_REPOSITORY_REQUEST, 
  FOLLOW_REPOSITORY_SUCCESS, 
  FOLLOW_REPOSITORY_FAILURE} from 'constants/repositories'
import { FETCH_COMMITS_REQUEST } from 'constants/commits';
import { fetchRepositories, followRepository } from 'services';

export function* repositoriesSaga() {
  yield takeLatest(FETCH_REPOSITORIES_REQUEST, getRepositories);
  yield takeLatest(FOLLOW_REPOSITORY_REQUEST, monitorRepository);
}

function* getRepositories() {
  try {
    let response = yield call(fetchRepositories);
    yield put({ type: FETCH_REPOSITORIES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_REPOSITORIES_FAILURE, error });
  }
}

 function* monitorRepository(params) {
  try {
    let response = yield call(followRepository, params.params);
    yield put({ type: FOLLOW_REPOSITORY_SUCCESS, payload: response.data });
    yield put({ type: FETCH_COMMITS_REQUEST });
  } catch (error) {
    yield put({ type: FOLLOW_REPOSITORY_FAILURE, error });
  }
}
