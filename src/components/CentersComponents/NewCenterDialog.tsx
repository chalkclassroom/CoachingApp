import * as React from 'react';
import * as PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  open: boolean,
  handleClose(): void,
  handleSubmit(centerName: string): void
}

/**
 * New Center Dialog
 * @class NewCenterDialog
 * @return {ReactNode}
 */
class NewCenterDialog extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    let centerName = {value: ''};
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{fontFamily: 'Arimo'}}>
          Add a New Center
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontFamily: 'Arimo'}}>
            Please enter the name of the new center.
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={cn => (centerName = cn)}
            margin="dense"
            id="center-name"
            label="Center Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary" style={{fontFamily: 'Arimo'}}>
            Cancel
          </Button>
          <Button
            onClick={() => this.props.handleSubmit(centerName.value)}
            color="primary"
            style={{fontFamily: 'Arimo'}}
          >
            Add Center
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewCenterDialog;