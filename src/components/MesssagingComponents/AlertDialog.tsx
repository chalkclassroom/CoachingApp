import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const AlertDialog: React.FC<{open: boolean, text: string, handleClose: () => void}> = (props) => {
  return (
    <div>
     <Dialog
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogContent>
		<DialogContentText style={{color: "black", padding: "1em"}}>
		  {props.text}	
	  </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
      		  OK
          </Button>
	</DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
