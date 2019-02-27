import { put } from 'redux-saga/effects';
import { SET_NOTIFICATION } from 'constants/notifications';

function* showNotification(message) {
  yield put({ type: SET_NOTIFICATION, message: { text: message, action: '' } });
}

export default showNotification;
