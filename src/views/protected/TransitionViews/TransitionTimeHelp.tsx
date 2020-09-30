import * as React from "react";
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import TransitionHelpCard from '../../../components/TransitionComponents/TransitionHelpCard';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
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
    width: "78%",
    backgroundColor: 'white',
    padding: '1em',
    borderRadius: 8
  }
};

interface Props {
  classes: Style,
  open: boolean,
  close(): void
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
 * @function TransitionTimeHelp
 * @param {Props} props
 * @return {ReactElement}
 */
function TransitionTimeHelp(props: Props): React.ReactElement {
  const { classes, open, close } = props;
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
        <Grid container direction="row">
            <Grid item xs={11} />
            <Grid item xs={1}>
              <IconButton style={{ padding: 10 }}>
                <Tooltip title={"Close"} placement={"right"}>
                  <CloseIcon
                    onClick={close}
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

TransitionTimeHelp.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default withStyles(styles)(TransitionTimeHelp);
