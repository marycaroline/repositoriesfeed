import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Snackbar } from 'react-md';


export class SnackBarContainer extends PureComponent {
    static propTypes = {
        mobile: PropTypes.bool,
    };

    state = { toasts: [], autohide: true };

    addToast = (text, action, autohide = true) => {
        this.setState((state) => {
            const toasts = state.toasts.slice();
            toasts.push({ text, action });
            return { toasts, autohide };
        });
    };

    dismissToast = () => {
        const [, ...toasts] = this.state.toasts;
        this.setState({ toasts });
    };

    toastHello = () => {
        this.addToast('Hello, World!');
    };

    toastRetry = () => {
        this.addToast('Something happened...', 'Retry', false);
    };

    chainToasts = () => {
        this.addToast('Sent', 'Undo');
        this.addToast('Connection timed out. Showing limited messages.', {
            children: 'Retry',
            onClick: () => {
                alert('You tried again for some reason...'); // eslint-disable-line no-alert
            },
        });
    };

    render() {
        const { toasts, autohide } = this.state;

        return (
            <div className="buttons__group">
                <Snackbar
                    id="example-snackbar"
                    toasts={toasts}
                    autohide={autohide}
                    onDismiss={this.dismissToast}
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toast: () => dispatch({ type: ERROR, payload })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarContainer);