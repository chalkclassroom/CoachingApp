import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import SequentialHelpCard from './SequentialHelpCard';
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
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
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
 * @class SequentialActivitiesHelp
 */
class SequentialActivitiesHelp extends React.Component<Props, State> {
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
        <head>
          <link href="https://fonts.googleapis.com/css?family=Arimo&display=swap" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <Modal open={this.state.open}>
            <div style={getModalStyle()} className={classes.paper}>
              <Grid
                container
                alignItems="center"
                direction="column"
                justify="flex-start"
              >
                <Typography variant="h4" gutterBottom style={{fontFamily: "Arimo"}}>
                  Sequential Activities
                </Typography>
                <Typography variant="subtitle2" gutterBottom style={{fontFamily: "Arimo"}}>
                  Remember, sequential activities require children to follow
                  a <strong>logical order</strong> or <strong>sequence</strong>.
                </Typography>
                <SequentialHelpCard />
              </Grid>
            </div>
          </Modal>
        </body>
      </div>
    );
  }
}

export default withStyles(styles)(SequentialActivitiesHelp);