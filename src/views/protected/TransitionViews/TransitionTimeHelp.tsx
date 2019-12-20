import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import TransitionHelpCard from '../../../components/TransitionComponents/TransitionHelpCard';
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
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "67%",
    //backgroundColor: theme.palette.background.paper,
    //boxShadow: theme.shadows[5],
    //padding: theme.spacing.unit * 4,
    borderRadius: 8
  }
};

interface Props {
  classes: Style
}

interface Style {
  paper: string,
  definitionTitle: string,
  definitionText: string,
  buttonTitle: string,
  lineExamples: string,
  travelingExamples: string,
  waitingExamples: string,
  routinesExamples: string,
  behaviorExamples: string,
}

interface State {
  open: boolean
}

/**
 * transition time look-fors
 * @class TransitionTimeHelp
 */
class TransitionTimeHelp extends React.Component<Props, State> {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

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
                Reducing Transitions
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Remember, a <strong>transition</strong> is a period of time in
                which <strong>most</strong> of the class is not involved in a
                learning activity.
              </Typography>
              <TransitionHelpCard />
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(TransitionTimeHelp);
