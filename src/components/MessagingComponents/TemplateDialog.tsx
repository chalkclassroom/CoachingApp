import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface TemplateDialogProps {
  open: boolean,
  handleYes(): void,
  handleNo(): void
}

const TemplateDialog: React.FC<TemplateDialogProps> = (props: TemplateDialogProps) => {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Change Message Template?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change the template of this message?
            You will lose what you have already written.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(): void => props.handleYes()} color="primary">
            Yes
          </Button>
          <Button onClick={(): void => props.handleNo()} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TemplateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleYes: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired
}

export default TemplateDialog;