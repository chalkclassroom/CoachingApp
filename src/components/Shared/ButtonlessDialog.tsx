import React, { FunctionComponent } from 'react';
import {Dialog, DialogContent, DialogContentText} from "@material-ui/core";

interface OwnProps {
  display: boolean
  onClose: () => void
  confirmationText: string
}

type Props = OwnProps;

const ButtonlessDialog: FunctionComponent<Props> = (props) => {
const {display, onClose, confirmationText} = props

  return (
    <Dialog open={display} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          {confirmationText}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonlessDialog;
