import * as React from 'react';

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'


interface Props {
  removeStudent(object): void,
  student: object,
  closeModal(): void,
  isOpen: boolean,
}

// eslint-disable-next-line require-jsdoc
function RemoveStudent (props: Props) {
  const { removeStudent, student, closeModal, isOpen } = props;

  return (
           <Dialog
          open={isOpen}
          onClose={(): void => closeModal()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialdwadwaog-title">
            Remove student
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialdwadwadwog-description">
              Are you sure you want to remove {student.name} from the list?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(): void => {
                closeModal()
              }}
              color="secondary"
            >
              No, keep student
            </Button>
            <Button
              onClick={(): void => { 
                removeStudent(student)
                closeModal()}
              }
              color="secondary"
              autoFocus
            >
              Yes, remove student
            </Button>
          </DialogActions>
        </Dialog>
  );
}

export default RemoveStudent;
