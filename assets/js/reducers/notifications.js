import { SET_NOTIFICATION, DISMISS_NOTIFICATION } from 'constants/notifications';
import initial from './initial';

const notifications = (state = initial.notifications, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        messages: [...state.messages, action.message],
      };
    case DISMISS_NOTIFICATION:
      return {
        messages: state.messages.slice(1),
      };
    default:
      return state;
  }
};

export default notifications;
