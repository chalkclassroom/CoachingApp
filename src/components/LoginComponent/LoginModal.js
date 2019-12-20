import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import LoginForm from "./LoginForm";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/es/IconButton";
import Tooltip from "@material-ui/core/es/Tooltip";

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle() {
  return {
    position: "fixed",
    top: `35%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  },
  "@media (max-width: 700px)": {
    paper: {
      position: 'fixed',
      height: '60%',
      width: '75%'
    },
  },
});

/**
 * login modal
 * @class LoginModal
 */
class LoginModal extends React.Component {
  state = {
    open: true,
    value: 0
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
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

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginModal);
