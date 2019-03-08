import { takeLatest, put } from 'redux-saga/effects';
import { LOGOUT } from 'constants/auth';
import { ERROR } from 'constants/notifications';
import showNotification from './notifications';

function* unauthorizedHandler() {
  yield put({ type: LOGOUT });
}

function* globalErrorHandler(errorResponse) {
  const { status } = errorResponse.error.response;
  if (status === 401 || 403) {
    yield showNotification('Your access has expired, Please login again');
    yield unauthorizedHandler(errorResponse);
  } else {
    yield showNotification(errorResponse);
  }
}

export default function* errorHandlersSaga() {
  yield takeLatest(ERROR, globalErrorHandler);
}
