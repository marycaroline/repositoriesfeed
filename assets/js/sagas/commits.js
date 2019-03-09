import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_COMMITS_REQUEST,
  FETCH_COMMITS_SUCCESS,
  FETCH_COMMITS_FAILURE,
  FETCH_COMMITS_BY_REPOSITORY_REQUEST,
} from 'constants/commits';
import { fetchCommits, fetchCommitsByRepository } from 'services';
import { ERROR } from 'constants/notifications';

function* getAllCommits(params) {
  const { url } = params;
  try {
    const response = yield call(fetchCommits, url);
    yield put({ type: FETCH_COMMITS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_COMMITS_FAILURE, error });
    yield put({ type: ERROR, error });
  }
}

function* getCommitsByRepository(params) {
  const { id, url } = params;
  try {
    const response = yield call(fetchCommitsByRepository, id, url);
    yield put({ type: FETCH_COMMITS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_COMMITS_FAILURE, error });
    yield put({ type: ERROR, error });
  }
}

export default function* commitsSaga() {
  yield takeLatest(FETCH_COMMITS_REQUEST, getAllCommits);
  yield takeLatest(FETCH_COMMITS_BY_REPOSITORY_REQUEST, getCommitsByRepository);
}
