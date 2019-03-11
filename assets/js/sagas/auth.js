import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGOUT } from 'constants/auth';
import postLogout from 'services/auth';
import Cookies from 'js-cookie';

function* logout() {
  yield call(postLogout);
  Cookies.remove('rfeedtoken');
  yield put(push('/rfeed/login'));
}

export default function* authSaga() {
  yield takeLatest(LOGOUT, logout);
}
