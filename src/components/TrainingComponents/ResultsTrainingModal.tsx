import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TrainingVideo from '../TrainingComponents/TrainingVideo';
import * as Types from '../../constants/Types';

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
  }
};

interface Style {
  root: string,
  paper: string,
}

interface Props {
  classes: Style,
  content?: React.ReactNode,
  type: Types.Selected,
  handleClose(): void,
  open: boolean
}

interface State {
  open: boolean
}

/**
 * Modal displaying information about observation
 * @function ResultsTrainingModal
 * @param {Props} props
 * @return {ReactElement}
 */
function ResultsTrainingModal(props: Props): React.ReactElement {
  const { classes, type, handleClose, open } = props;
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid
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
              {type === 'LiteracyInstruction' ? (
                <div>Video coming soon!</div>
              ) : (<TrainingVideo
                videoUrl={
                  type === 'AssociativeCooperativeInteractions' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20AC%20(CC).mp4?alt=media&token=3c96f321-af7c-4b33-9fd2-d25c565048c0'
                  : type === 'ClassroomClimate' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20CC%20(CC).mp4?alt=media&token=dbd9de54-431f-44d6-a4c5-7830908f5c03'
                  : type === 'LevelOfInstruction' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20IN%20(CC).mp4?alt=media&token=fdf8d009-f6eb-4a37-9513-b7a7c3f52d44'
                  : type === 'ListeningToChildren' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20LC%20(CC).mp4?alt=media&token=4e63df68-979c-4446-85d4-65f46de36033'
                  : type === 'MathInstruction' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20MI%20(CC).mp4?alt=media&token=57b49c15-92f4-45da-9ebd-0ea8bbae5275'
                  : type === 'SequentialActivities' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Demo%20SA%20(CC).mp4?alt=media&token=2248e424-1869-42e7-a3e7-7f5fa55ec918'
                  : type === 'StudentEngagement' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20SE%20(CC).mp4?alt=media&token=5cf9028d-d08d-47eb-b5ff-f1f49d07d2af'
                  : type === 'TransitionTime' ? 'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Results%20TT%20(CC).mp4?alt=media&token=c41c2fed-e99c-4d8b-8062-59416bb6ac5b'
                  : ''
                }
              />)}
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

ResultsTrainingModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default withStyles(styles)(ResultsTrainingModal);