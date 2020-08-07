import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import LoginForm from "./LoginForm";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import * as Types from '../../constants/Types';

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: "fixed",
    top: `35%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles = {
  paper: {
    position: "absolute",
    width: "40%",
    backgroundColor: 'white',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.2)',
    padding: '2em',
    borderRadius: 8
  },
  "@media (max-width: 700px)": {
    paper: {
      position: 'fixed',
      height: '60%',
      width: '75%'
    },
  },
};

type Position = 'absolute' | 'fixed' | 'static';

interface Props {
  classes: {
    paper: string
  },
  handleClose(): void,
  firebase: {
    firebaseEmailSignIn(credentials: {email: string, password: string}): Promise<Types.UserCredential>
  }
}

interface State {
  open: boolean,
  value: number
}

/**
 * login modal
 * @class LoginModal
 */
class LoginModal extends React.Component <Props, State> {
  state = {
    open: true,
    value: 0
  };

  handleOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.exact({
      paper: PropTypes.string
    }).isRequired,
    handleClose: PropTypes.func.isRequired,
    firebase: PropTypes.exact({
      firebaseEmailSignIn: PropTypes.func
    }).isRequired
  }

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
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="space-between"
            >
              <Typography component={"h6"} variant={"h6"}>
                Login
              </Typography>
              <IconButton style={{ padding: 10 }}>
                <Tooltip title={"Close"} placement={"right"}>
                  <CloseIcon onClick={this.props.handleClose} />
                </Tooltip>
              </IconButton>
            </Grid>
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <LoginForm firebase={this.props.firebase} />
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(LoginModal);
