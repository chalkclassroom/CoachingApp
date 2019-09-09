import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";

const styles = {
  button: {
    fontSize:"15px",
    borderWidth:"2px"
  }
}

class YesNoDialog extends React.Component {
  /*
      REQUIRED PROPS:
      1. buttonText: text of button to initialize dialog.
      2. dialogTitle: The bold text that asks your user for confirmation of an action.
      3. onAccept: pass a callback function that will execute desired behavior upon accepting the dialog.
      SHOULD OPEN (BOOLEAN):
      If this is false, then the dialog won't open. For example, if there is no transition currently being measured,
      then cancelling the transition should result in a no-op.
      MISC:
      buttonVariant, buttonColor, buttonAriaLabel: use these to format the button to your liking.
    */

  state = {
    open: false
  };

  handleClickOpen = () => {
    if (this.props.shouldOpen) {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAccept = () => {
    if (this.props.onAcceptParams !== null) {
      this.props.onAccept(this.props.onAcceptParams);
    } else {
      this.props.onAccept();
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          style={this.props.buttonStyle}
          variant={this.props.buttonVariant}
          color={this.props.buttonColor}
          aria-label={this.props.buttonAriaLabel}
          style={{
            color:this.props.buttonColor, 
            backgroundColor:this.props.backgroundColor,
            borderColor:this.props.buttonColor,
            width: this.props.buttonWidth,
          }}
          className={classes.button}
        >
          {this.props.buttonText}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.props.dialogTitle}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={this.handleAccept}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(YesNoDialog);
