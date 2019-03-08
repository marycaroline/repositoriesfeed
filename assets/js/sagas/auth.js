import { takeLatest, call } from 'redux-saga/effects';
import { LOGOUT } from 'constants/auth';
import postLogout from 'services/auth';
import Cookies from 'js-cookie';

function* logout() {
  try {
    yield call(postLogout);
    Cookies.remove('rfeedtoken');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(LOGOUT, logout);
}
