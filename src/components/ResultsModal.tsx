import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
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
  root: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
};

interface Style {
  root: string,
  paper: string,
}

interface Props {
  classes: Style,
  content: React.ReactNode,
  handleBegin(): void,
  handleClose(): void,
  open: boolean,
  tool: string
}

/**
 * Modal to confirm view results
 * @class ResultsModal
 * @param {Props} props
 * @return {ReactElement}
 */
function ResultsModal(props: Props): React.ReactElement {
  const { classes, handleBegin, handleClose, tool, open } = props;
  let title = '';
  if (tool === "TransitionTime") {
    title = "Transition Time"
  } else if (tool === "ClassroomClimate") {
    title = "Classroom Climate"
  } else if (tool === "MathInstruction") {
    title = "Math Instruction"
  } else if (tool === "StudentEngagement") {
    title = "Student Engagement"
  } else if (tool === "LevelOfInstruction") {
    title = "Level of Instruction"
  } else if (tool === "ListeningToChildren") {
    title = "Listening to Children"
  } else if (tool === "SequentialActivities") {
    title = "Sequential Activities"
  } else if (tool === "AssociativeCooperativeInteractions") {
    title = "Associative and Cooperative Interactions"
  }
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid
            xs={12}
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
          >
            <IconButton style={{ padding: 10 }}>
              <Tooltip title={"Close"} placement={"right"}>
                <CloseIcon onClick={handleClose} />
              </Tooltip>
            </IconButton>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            className={classes.root}
          >
            <Grid item>
              <Typography variant="h4" align="center">
                {title} Results
              </Typography>
              <Typography variant="h6" align="center">
                View the results of your observations.
              </Typography>
            </Grid>
            <Grid item style={{paddingTop: '2em'}}>
              <Button onClick={handleBegin} variant="contained" color="primary">
                VIEW RESULTS
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(ResultsModal);