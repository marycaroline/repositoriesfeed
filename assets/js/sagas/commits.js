import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_COMMITS_REQUEST,
  FETCH_COMMITS_SUCCESS,
  FETCH_COMMITS_FAILURE,
  FETCH_COMMITS_BY_REPOSITORY_REQUEST,
} from 'constants/commits';
import { fetchCommits, fetchCommitsByRepository } from 'services';
import { Urls, apiCall } from 'utils';

function* getAllCommits(params) {
  let { url } = params;
  console.log(Urls);
  if(!url) url = Urls.commits_list();
  try {
    const response = yield call(apiCall, url, 'GET', { url });
    yield put({ type: FETCH_COMMITS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_COMMITS_FAILURE, error });
  }
}

function* getCommitsByRepository(params) {
  let { id, url } = params;
  if(!url) url =  Urls.repositories_list();
  try {
    const response = yield call(apiCall, url, 'GET', {id, url});
    yield put({ type: FETCH_COMMITS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_COMMITS_FAILURE, error });
  }
}

export const commitsSaga = [
  takeLatest(FETCH_COMMITS_REQUEST, getAllCommits),
  takeLatest(FETCH_COMMITS_BY_REPOSITORY_REQUEST, getCommitsByRepository),
]
