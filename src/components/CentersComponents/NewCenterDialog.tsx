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
 * @function NewCenterDialog
 * @return {ReactElement}
 */
function NewCenterDialog(props: Props): React.ReactElement {
  let centerName = '';
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
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
        <Button onClick={props.handleClose} color="primary" style={{fontFamily: 'Arimo'}}>
          Cancel
        </Button>
        <Button
          onClick={() => props.handleSubmit(centerName)}
          color="primary"
          style={{fontFamily: 'Arimo'}}
        >
          Add Center
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NewCenterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default NewCenterDialog;