import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import TransitionHelpCard from '../../../components/TransitionComponents/TransitionHelpCard.tsx';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

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
    padding: '1em',
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

/**
 * transition time look-fors
 * @class TransitionTimeHelp
 */
class TransitionTimeHelp extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={this.props.open}>
          <div style={getModalStyle()} className={classes.paper}>
          <Grid container direction="row">
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton style={{ padding: 10 }}>
                  <Tooltip title={"Close"} placement={"right"}>
                    <CloseIcon
                      onClick={this.props.close}
                    />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <Typography variant="h4" gutterBottom style={{fontFamily: 'Arimo'}}>
                Reducing Transitions
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{fontFamily: 'Arimo'}}>
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
