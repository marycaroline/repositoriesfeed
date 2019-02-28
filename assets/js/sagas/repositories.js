import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_REPOSITORIES_REQUEST,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_FAILURE,
  FOLLOW_REPOSITORY_REQUEST,
  FOLLOW_REPOSITORY_SUCCESS,
  FOLLOW_REPOSITORY_FAILURE,
  FETCH_USER_REPOSITORIES_REQUEST,
  FETCH_USER_REPOSITORIES_SUCCESS,
  FETCH_USER_REPOSITORIES_FAILURE,
} from 'constants/repositories';
import { fetchRepositories, followRepository, fetchUserRepositories } from 'services';
import { push } from 'connected-react-router';
import showNotification from './notifications';


function* getRepositories() {
  try {
    const response = yield call(fetchRepositories);
    yield put({ type: FETCH_REPOSITORIES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_REPOSITORIES_FAILURE, error });
  }
}

function* getUserRepositories() {
  try {
    const response = yield call(fetchUserRepositories);
    yield put({ type: FETCH_USER_REPOSITORIES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_USER_REPOSITORIES_FAILURE, error });
  }
}

function* handleErrorMonitor(error) {
  if (error.error.data) {
    yield showNotification(error.error.data.message);
  } else yield showNotification('Ocorreu um erro inesperado');
}


function* monitorRepository(params) {
  try {
    const response = yield call(followRepository, params.full_name);
    yield put({ type: FOLLOW_REPOSITORY_SUCCESS, payload: response.data });
    yield put(push(`${response.data.id}`));
    yield showNotification('You are now monitoring this repository');
    yield put({ type: FETCH_USER_REPOSITORIES_REQUEST });
  } catch (error) {
    yield put({ type: FOLLOW_REPOSITORY_FAILURE, error: error.response });
  }
}

export function* repositoriesSaga() {
  yield takeLatest(FETCH_REPOSITORIES_REQUEST, getRepositories);
  yield takeLatest(FOLLOW_REPOSITORY_REQUEST, monitorRepository);
  yield takeLatest(FETCH_USER_REPOSITORIES_REQUEST, getUserRepositories);
  yield takeLatest(FOLLOW_REPOSITORY_FAILURE, handleErrorMonitor);
}
