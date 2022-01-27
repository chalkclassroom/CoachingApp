import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

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
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  }
};

interface Props {
  classes: { paper: string },
  type: string
}

interface State {
  open: boolean
}

/**
 * Modal when user presses disabled 'complete observation' button
 * @class IncompleteObservation
 */
class IncompleteObservation extends React.Component<Props, State> {
  state = {
    open: true
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
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
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <Typography variant="h4" gutterBottom style={{fontFamily: 'Arimo'}}>
                Incomplete Observation
              </Typography>
              {this.props.type === 'TT' ? (
                <div>
                  <Typography variant="subtitle1" gutterBottom style={{fontFamily: 'Arimo'}}>
                    You have not finished observing the current transition.
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{fontFamily: 'Arimo'}}>
                    Please either <strong>END</strong> the current transition or{" "}
                    <strong>CANCEL</strong> it before completing your observation.
                  </Typography>
                </div>
              ) : (
                <div>
                  <Typography variant="subtitle1" gutterBottom style={{fontFamily: 'Arimo'}}>
                    You have not completed your observation yet.
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom style={{fontFamily: 'Arimo'}}>
                    Please <strong>Submit</strong> this observation or press the{" "}
                    <strong>Back</strong> button.
                  </Typography>
                </div>
              )}
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(IncompleteObservation);
