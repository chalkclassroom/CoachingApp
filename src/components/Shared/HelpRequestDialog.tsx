import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Firebase, { FirebaseContext } from '../Firebase';

interface Props {
  open: boolean,
  handleClose(): void,
}

interface State {
  message: string,
  sending: boolean,
  sent: boolean,
  error: string
}

class HelpRequestDialog extends React.Component<Props, State> {
  static contextType = FirebaseContext;
  context!: Firebase;

  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
      sending: false,
      sent: false,
      error: ''
    };
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
  }

  handleSubmit = async (): Promise<void> => {
    const { message } = this.state;
    if (!message.trim()) {
      this.setState({ error: 'Please enter a message.' });
      return;
    }

    this.setState({ sending: true, error: '' });

    try {
      await this.context.sendHelpRequest(message.trim());
      this.setState({ sending: false, sent: true });
    } catch (error) {
      console.error('Error sending help request:', error);
      this.setState({
        sending: false,
        error: 'There was a problem sending your request. Please try again.'
      });
    }
  }

  handleClose = (): void => {
    this.setState({
      message: '',
      sending: false,
      sent: false,
      error: ''
    });
    this.props.handleClose();
  }

  render(): React.ReactNode {
    const { open } = this.props;
    const { message, sending, sent, error } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="help-request-dialog-title"
        maxWidth="sm"
        fullWidth
        PaperProps={{ style: { border: '2px solid #459aeb', borderRadius: '8px' } }}
      >
        {sent ? (
          <>
            <DialogContent style={{ textAlign: 'center', padding: '2em' }}>
              <CheckCircleIcon style={{ fontSize: 48, color: '#009365', marginBottom: '0.5em' }} />
              <Typography variant="h6" style={{ fontFamily: 'Arimo', marginBottom: '0.5em' }}>
                Message Received!
              </Typography>
              <DialogContentText style={{ fontFamily: 'Arimo' }}>
                Thank you for reaching out. A member of our team will respond within 2 business days.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" style={{ fontFamily: 'Arimo' }}>
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle id="help-request-dialog-title" style={{ fontFamily: 'Arimo' }}>
              Help & Support
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ fontFamily: 'Arimo' }}>
                How can we help? Describe your question or issue below and our team will get back to you within 2 business days.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="help-message"
                label="Your message"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={message}
                onChange={(e): void => this.setState({ message: e.target.value, error: '' })}
                error={!!error}
                helperText={error}
                disabled={sending}
                inputProps={{ style: { fontFamily: 'Arimo' } }}
                InputLabelProps={{ style: { fontFamily: 'Arimo' } }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                color="primary"
                style={{ fontFamily: 'Arimo' }}
                disabled={sending}
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleSubmit}
                color="primary"
                style={{ fontFamily: 'Arimo' }}
                disabled={sending || !message.trim()}
              >
                {sending ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    );
  }
}

export default HelpRequestDialog;
