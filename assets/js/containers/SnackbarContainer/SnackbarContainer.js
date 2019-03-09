import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from 'react-md';
import { DISMISS_NOTIFICATION } from 'constants/notifications';

const SnackBarContainer = ({ messages, dismissNotification }) => (
  <Snackbar
    id="snackbar"
    toasts={messages}
    autohideTimeout={1500}
    onDismiss={dismissNotification}
  />
);

SnackBarContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.string,
  })).isRequired,
  dismissNotification: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  messages: state.notifications.messages,
});

const mapDispatchToProps = dispatch => ({
  dismissNotification: () => dispatch({ type: DISMISS_NOTIFICATION }),
});


export default connect(mapStateToProps, mapDispatchToProps)(SnackBarContainer);
