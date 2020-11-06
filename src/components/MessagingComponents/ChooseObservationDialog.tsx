import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

interface ChooseObservationDialogProps {
  open: boolean,
  firebase: {
    getCoachFirstName(): Promise<string>
  },
  handleClose: (value: string) => void
}

const ChooseObservationDialog: React.FC<ChooseObservationDialogProps> = (props: ChooseObservationDialogProps) => {
  const observations: string[] = [];
  props.firebase.getCoachFirstName().then((obs: string) => observations.push(obs));	
  return (
    <div>
     <Dialog
        open={props.open}
        onClose={props.handleClose}
      >
       <DialogTitle>
        Choose Observation to auto-fill the email
       </DialogTitle>
       <List>
        {observations.map(obs => (
          <ListItem button onClick={(): void => props.handleClose(obs)} key={obs}>
            <ListItemText primary={obs} />
          </ListItem>
        ))}
       </List>
      </Dialog>
    </div>
  );
};

export default ChooseObservationDialog;
