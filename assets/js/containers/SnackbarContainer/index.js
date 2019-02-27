import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from 'react-md';
import { DISMISS_NOTIFICATION } from 'constants/notifications';

class SnackBarContainer extends PureComponent {
  render() {
    return (
      <div className="buttons__group">
        <Snackbar
          id="example-snackbar"
          toasts={this.props.messages}
          autohideTimeout={1500}
          onDismiss={this.props.dismissNotification}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  messages: state.notifications.messages,
});

const mapDispatchToProps = dispatch => ({
  dismissNotification: () => dispatch({ type: DISMISS_NOTIFICATION }),
});


export default connect(mapStateToProps, mapDispatchToProps)(SnackBarContainer);
