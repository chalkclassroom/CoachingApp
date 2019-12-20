import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CountdownImage from "../../../assets/images/CountdownImage.png";
import SchoolImage from "../../../assets/images/SchoolImage.png";
import TimeImage from "../../../assets/images/TimeImage.png";

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
  },
  button: {
    margin: theme.spacing.unit
    // background: '#ede7f6',
    // color: '#512da8',
  },
  input: {
    display: "none"
  }
});

const textTheme = createMuiTheme({
  palette: {
    primary: { main: "#00acc1" },
    secondary: { main: "#ff9800" }
  },
  typography: { useNextVariants: true }
});

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: "#512da8" }
  }
});

/**
 * observation recommendations for transition time
 * @class TransitionTimeRecs
 */
class TransitionTimeRecs extends React.Component {
  state = {
    open: true
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
            <MuiThemeProvider theme={textTheme}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="center"
                  >
                    <Typography align="center" variant="h5" gutterBottom>
                      <strong>
                        Recommendations for Observing
                        <br />
                        Transition Time:
                      </strong>
                      <br />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                  >
                    <img
                      alt="Activity Setting"
                      src={SchoolImage}
                      height={"100"}
                      width={"100"}
                    />
                    <Typography
                      align="center"
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      <strong>ACTIVITY SETTING:</strong>
                      <br />
                      Inside/Outside the Classroom
                      <br />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                  >
                    <img
                      alt="Cycle Length"
                      src={CountdownImage}
                      height={"100"}
                      width={"100"}
                    />
                    <Typography
                      align="center"
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      <strong>CYCLE LENGTH:</strong>
                      <br />2 - 3 minutes per center
                      <br />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                  >
                    <img
                      alt="Visit Duration"
                      src={TimeImage}
                      height={"100"}
                      width={"100"}
                    />
                    <Typography
                      align="center"
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      <strong>VISIT DURATION:</strong>
                      <br />
                      30 - 45 minutes
                      <br />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="center"
                  >
                    <MuiThemeProvider theme={buttonTheme}>
                      <Button
                        align="center"
                        color="primary"
                        variant="outlined"
                        className={classes.button}
                        onClick={this.handleClose}
                      >
                        <strong>START OBSERVATION</strong>
                      </Button>
                    </MuiThemeProvider>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="center"
                  >
                    <Typography
                      align="center"
                      color="secondary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      Learn more about CQ-REF recommendations
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </div>
        </Modal>
      </div>
    );
  }
}

TransitionTimeRecs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimeRecs);
