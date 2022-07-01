import React, { FunctionComponent } from 'react';
import {Button, Dialog, DialogContent, DialogContentText} from "@material-ui/core";

interface OwnProps {
  handleConfirm: () => void
  handleCancel: () => void
  dialogText: string
  cancelText: string
  confirmText: string
  showDialog: boolean
}

type Props = OwnProps;

const ConfirmationDialog: FunctionComponent<Props> = (props) => {
  const {showDialog, handleConfirm, handleCancel, dialogText, cancelText, confirmText} = props
  return (
    <Dialog open={showDialog}>
    <DialogContent>
      <DialogContentText>
        {dialogText}
      </DialogContentText>
      <Button onClick={handleCancel}>
        {cancelText}
      </Button>
      <Button onClick={handleConfirm}>
        {confirmText}
      </Button>
    </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
