import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

interface AlertDialogProps {
  // required by the Dialog component
  open: boolean;
  
  // what should be in the dialog
  text: string;
  
  // if this dialog should have "Yes" or "No" buttons vs an "Ok" button
  // allows it to be more versatile. Without it would have two components which
  // are exactly the same except a prop. It is optional so by default the component
  // shows "Ok"
  binaryChoice?: boolean;
  
  // called when the user clicks "Yes" or "Ok" 
  handleYes: () => void;

  // called when the user clicks on "No". Optional as not all dialogs will have "No"
  handleNo?: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = (props: AlertDialogProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleYes}
    >
      <DialogContent>
        <DialogContentText style={{color: "black", padding: "1em"}}>
          {props.text}	
        </DialogContentText>
      </DialogContent>
      {
        props.binaryChoice ?
          <DialogActions>
            <Button onClick={props.handleYes} color="primary">
              Yes
            </Button>
            <Button onClick={props.handleNo} color="primary">
              No
            </Button>
          </DialogActions>
        :
          <DialogActions>
            <Button onClick={props.handleYes} color="primary">
              OK
            </Button>
          </DialogActions>
      }
    </Dialog>
  );
};

export default AlertDialog;
