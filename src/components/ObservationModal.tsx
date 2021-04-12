import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import * as Types from '../constants/Types';
  
const styles: object = {
  root: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
    position: "fixed",
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
  }
};

interface Style {
  root: string,
  paper: string,
}

interface Props {
  classes: Style,
  content?: React.ReactNode,
  handleBegin(): void,
  handleClose(): void,
  open: boolean,
  type: Types.Selected
}

interface State {
  open: boolean
}

/**
 * Modal displaying information about observation
 * @function ObservationModal
 * @param {Props} props
 * @return {ReactElement}
 */
function ObservationModal(props: Props): React.ReactElement {
  const { classes, handleBegin, handleClose, open, content, type } = props;
  return (
    <div>
      <Modal open={open}>
        <div
          style={{
            /* position: "fixed",
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`, */
            width: type === 'LiteracyInstruction' ? '80%' : '50%'
          }}
          className={classes.paper}
        >
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
          >
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Typography variant="h4" align="center" style={{fontFamily: 'Arimo'}}>
                {type === 'TransitionTime' ? 'Transition Time'
                  : type === 'ClassroomClimate' ? 'Classroom Climate'
                  : type === 'MathInstruction' ? 'Math Instruction'
                  : type === 'LevelOfInstruction' ? 'Level of Instruction'
                  : type === 'ListeningToChildren' ? 'Listening to Children'
                  : type === 'StudentEngagement' ? 'Student Engagement'
                  : type === 'SequentialActivities' ? 'Sequential Activities'
                  : type === 'LiteracyInstruction' ? 'Literacy Instruction'
                  : 'Associative and Cooperative'
                } Observation
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="flex-end"
              >
                <IconButton style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: 10 }}>
                  <Tooltip title={"Close"} placement={"right"}>
                    <CloseIcon onClick={handleClose} />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            className={classes.root}
          >
            <Grid item>
              {content}
            </Grid>
            {type !== 'LiteracyInstruction' ? (<Grid item style={{paddingTop: '2em'}}>
              <Button onClick={handleBegin} variant="contained" color="primary">
                BEGIN OBSERVATION
              </Button>
            </Grid>) : null}
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

ObservationModal.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.element,
  handleBegin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default withStyles(styles)(ObservationModal);