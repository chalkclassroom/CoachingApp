import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle() {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  }
});

/**
 * Modal when user presses disabled 'complete observation' button
 * @class IncompleteObservation
 */
class IncompleteObservation extends React.Component {
  state = {
    open: true
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
              direction="column"
              justify="flex-start"
            >
              <Typography variant="h4" gutterBottom>
                Incomplete Observation
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                You have not completed your observation yet.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Please <strong>Submit</strong> this observation or press the{" "}
                <strong>Back</strong> button.
              </Typography>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

IncompleteObservation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IncompleteObservation);
