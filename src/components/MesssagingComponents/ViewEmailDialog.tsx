import React from 'react';
import { Message } from './MessagingTypes'; 
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core';

interface ViewEmailDialogProps {
  open: boolean;
  handleClose: () => void;
  // the email to show the content of
  email: Message;
};

const ViewEmailDialog: React.FC<ViewEmailDialogProps> = (props: ViewEmailDialogProps) => {
  return (
    <Dialog
      open={props.open}
      scroll='paper'
      fullWidth={true}
      maxWidth='xl'
      onClose={props.handleClose}
    >
      <DialogTitle>
        {props.email.subject}
      </DialogTitle>
      <DialogContent>
      {/* dividers={true} */}
        <DialogContentText>
          {props.email.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='primary'>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );

}

export default ViewEmailDialog;

