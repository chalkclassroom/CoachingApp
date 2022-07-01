import * as React from "react";
import * as PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";
import ActivitySettingModal from '../LiteracyComponents/ActivitySettingModal';

const styles: object = {
  button: {
    fontSize: "15px",
    borderWidth: "2px"
  }
};

interface Props {
  classes: { button: string },
  shouldOpen?: boolean,

  onAccept?(param: number | void): void,

  buttonText?: string | React.ReactElement,
  buttonVariant: ButtonVariant,
  buttonColor?: string,
  backgroundColor?: string,
  buttonWidth?: string,
  buttonMargin?: number,
  dialogTitle?: string,
  onAcceptParams?: number,
  literacy: string,

  handleLiteracyActivitySetting(activitySetting: string): Promise<void>

  forceComplete?: boolean
  showLiteracyActivity?: boolean
  disabled?: boolean

  disabledOnClick(): void
  disabledClass: string
}

interface State {
  open: boolean
}

type ButtonVariant = 'text' | 'outlined' | 'contained' | undefined;

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

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false
    }
  }
  /*
  * Handles Completions for the timeout dialog. For Literacy observations, if the user
  * confirms ending the observation, they will get to choose an activity setting.
  * If it fully times out, it will just display the results preview. All other observation types
  * just display the results preview.
  * */
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if(prevProps.forceComplete !== this.props.forceComplete) {
      if(this.props.literacy==='' || !this.props.showLiteracyActivity) {
          this.handleAccept()
      } else  {
        this.setState({open: true})
      }
    }
  }

  handleClickOpen = (): void => {
    if (this.props.shouldOpen) {
      this.setState({ open: true });
    }
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  handleAccept = (): void => {
    if (this.props.onAcceptParams !== null) {
      if (this.props.onAccept) {
        this.props.onAccept(this.props.onAcceptParams);
      }
    } else {
      if (this.props.onAccept) {
        this.props.onAccept();
      }
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
    buttonVariant: PropTypes.oneOf<ButtonVariant>(['text', 'outlined', 'contained', undefined]).isRequired,
    buttonColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    buttonWidth: PropTypes.string,
    buttonMargin: PropTypes.number,
    dialogTitle: PropTypes.string,
    onAcceptParams: PropTypes.number
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes, disabled } = this.props;
    return (
      <div>
        {this.props.literacy !=='' ?
          <ActivitySettingModal
          open={(this.props.literacy!=='') && this.state.open}
          handleClose={this.handleClose}
          handleAccept={this.handleAccept}
          handleLiteracyActivitySetting={this.props.handleLiteracyActivitySetting}
          checklistType={this.props.literacy}
        /> : null}
        <Button
          onClick={ disabled? this.props.disabledOnClick : this.handleClickOpen}
          variant={disabled? 'outlined' : this.props.buttonVariant}
          color={this.props.buttonColor}
          style={disabled? {} : {
            color: this.props.buttonColor,
            backgroundColor: this.props.backgroundColor,
            borderColor: this.props.buttonColor,
            width: this.props.buttonWidth,
            margin: this.props.buttonMargin,
            fontFamily: 'Arimo'
          }}
          className={disabled? this.props.disabledClass : classes.button}
        >
          {this.props.buttonText}
        </Button>
        <Dialog
          open={this.state.open && !this.props.literacy}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{fontFamily: 'Arimo'}}>
            {this.props.dialogTitle}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" style={{fontFamily: 'Arimo'}}>
              No
            </Button>
            <Button id="yes" onClick={this.handleAccept} color="primary" style={{fontFamily: 'Arimo'}} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(YesNoDialog);
