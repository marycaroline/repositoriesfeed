import { put, takeLatest, call } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import { push } from 'connected-react-router';
import { postLogout } from 'services';
import { LOGOUT } from 'constants/auth';
import showNotification from './notifications';

export function* logout() {
  try{
    const response = yield call(postLogout);
    Cookies.remove('rfeedtoken');
    yield put(push('/rfeed/login'));
  } catch (error) {
    yield showNotification(error.response);
  }
}

export function* authSaga() {
  yield takeLatest(LOGOUT, logout);
}
