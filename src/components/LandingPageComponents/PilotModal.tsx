import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import PilotForm from './PilotForm';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "60%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
  photoIcon: {
    height:"15vh"
  },
  "@media (max-width: 700px)": {
    paper: {
      height: '80%',
      width: '75%'
    },
  },
};

interface Style {
  paper: string,
  photoIcon: string,
  '@media (max-width: 700px)': string
}

interface Props {
  classes: Style,
  handleClose(): void,
  firebase: {
    firebasePilotSignUp(userData: {
      email: string,
      program: string,
      firstName: string,
      lastName: string
    }): Promise<void>
  }
}

interface State {
  open: boolean,
  role: number
}

/**
 * formatting for modal containing pilot sign up form on landing page
 */
class PilotModal extends React.Component<Props, State> {
  state = {
    open: true,
    role: 0
  };

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    firebase: PropTypes.exact({
      firebasePilotSignUp: PropTypes.func
    }).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid container direction="row">
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton style={{ padding: 10 }}>
                  <Tooltip title={"Close"} placement={"right"}>
                    <CloseIcon
                      onClick={this.props.handleClose}
                    />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
            <PilotForm firebase={this.props.firebase} />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(PilotModal);
