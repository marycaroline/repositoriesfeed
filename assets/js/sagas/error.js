import { takeLatest, put } from 'redux-saga/effects';
import { LOGOUT } from 'constants/auth';
import { ERROR } from 'constants/notifications';
import showNotification from './notifications';

function* unauthorizedHandler() {
  yield put({ type: LOGOUT });
}

function* globalErrorHandler(errorResponse) {
  const { status, statusText } = errorResponse.error.response;
  if (status === 401 || status === 403) {
    yield showNotification('Your access has expired, Please login again');
    yield unauthorizedHandler(errorResponse);
  } else {
    yield showNotification(statusText);
  }
}

export default function* errorHandlersSaga() {
  yield takeLatest(ERROR, globalErrorHandler);
}
