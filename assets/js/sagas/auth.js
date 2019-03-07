import { takeLatest, call } from 'redux-saga/effects';
import { LOGOUT } from 'constants/auth';
import { Urls, apiCall } from 'utils';

export function* logout() {
  yield call(apiCall, Urls.logout());
}

export const authSaga  = [
  takeLatest(LOGOUT, logout)
]
