import * as React from "react";
import * as PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";

const styles: object = {
  button: {
    fontSize: "15px",
    borderWidth: "2px"
  }
};

interface Props {
  classes: { button: string },
  shouldOpen: boolean,
  onAccept(param: number | void): void,
  buttonText: string | React.ReactElement,
  buttonVariant: string,
  buttonColor: string,
  backgroundColor: string,
  buttonWidth: string,
  buttonMargin: number,
  dialogTitle: string,
  onAcceptParams: number
}

interface State {
  open: boolean
}

/**
 * dialog for buttons with yes/no option
 * @class YesNoDialog
 */
class YesNoDialog extends React.Component<Props, State> {
  /*
      REQUIRED PROPS:
      1. buttonText: text of button to initialize dialog.
      2. dialogTitle: The bold text that asks your user for confirmation of an action.
      3. onAccept: pass a callback function that will execute desired behavior upon accepting the dialog.
      SHOULD OPEN (BOOLEAN):
      If this is false, then the dialog won't open. For example, if there is no transition currently being measured,
      then cancelling the transition should result in a no-op.
      MISC:
      buttonVariant, buttonColor: use these to format the button to your liking.
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

  static propTypes = {
    shouldOpen: PropTypes.bool,
    onAccept: PropTypes.func,
    classes: PropTypes.object,
    buttonText: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
    buttonVariant: PropTypes.string.isRequired,
    buttonColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    buttonWidth: PropTypes.string,
    buttonMargin: PropTypes.number,
    dialogTitle: PropTypes.string,
    onAcceptParams: PropTypes.number
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant={this.props.buttonVariant}
          color={this.props.buttonColor}
          style={{
            color: this.props.buttonColor,
            backgroundColor: this.props.backgroundColor,
            borderColor: this.props.buttonColor,
            width: this.props.buttonWidth,
            margin: this.props.buttonMargin
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
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.handleAccept} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(YesNoDialog);
