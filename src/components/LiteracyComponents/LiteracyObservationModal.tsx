import * as React from 'react';
import { useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Tooltip, Fade } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import LiteracyTypeCard from './LiteracyTypeCard';
import LiteracyObservationOptions from './LiteracyObservationOptions';
  
const useStyles = makeStyles({
  root: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  }
});

interface Props {
  handleBegin(checklistType?: string): void,
  handleClose(): void,
  open: boolean
}

interface State {
  open: boolean
}

enum LiteracyTypes {
  NONE = 0,
  FOUNDATIONAL = 1,
  WRITING = 2,
  READING = 3,
  LANGUAGE = 4
}

/**
 * Modal displaying information about observation
 * @function LiteracyObservationModal
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyObservationModal(props: Props): React.ReactElement {
  const { handleBegin, handleClose, open } = props;
  const classes = useStyles();
  const [literacyType, setLiteracyType] = useState(0);
  return (
    <div>
      <Modal open={open}>
        <div className={classes.paper}>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="flex-end"
          >
            <Grid item xs={1}>
              <Fade in={literacyType!==LiteracyTypes.NONE}>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="flex-end"
                >
                  <IconButton style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: 10 }}>
                    <Tooltip title={"Back"} placement={"right"}>
                      <ChevronLeftIcon onClick={(): void => setLiteracyType(LiteracyTypes.NONE)} />
                    </Tooltip>
                  </IconButton>
                </Grid>
              </Fade>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h4" align="center" style={{fontFamily: 'Arimo'}}>
                Literacy Instruction Observation
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
              <Grid container direction="column" justify="center" alignItems="center" style={{paddingTop: '1em'}}>
                <Grid item>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <LiteracyTypeCard
                      type={LiteracyTypes.FOUNDATIONAL}
                      literacyType={literacyType}
                      setLiteracyType={setLiteracyType}
                      title="Foundational Skills"
                      descriptionText="Observe lessons and activities designed to foster children’s phonological
                      awareness and develop their knowledge of the alphabetic principle and
                      print concepts."
                    />
                    <LiteracyObservationOptions
                      handleBegin={handleBegin}
                      checklistType="Foundational"
                      type={LiteracyTypes.FOUNDATIONAL}
                      literacyType={literacyType}
                      teacherInstruction1="Observe the teacher delivering instruction or interacting with children."
                      teacherInstruction2="Select the types of foundational skills instruction that occur."
                      childInstruction1="Observe children participating in lessons or activities."
                      childInstruction2="Select the types of foundational skills and knowledge that children are using."
                    />
                    <LiteracyTypeCard
                      type={LiteracyTypes.WRITING}
                      literacyType={literacyType}
                      setLiteracyType={setLiteracyType}
                      title="Writing"
                      descriptionText="Observe lessons and activities designed to engage children in emergent writing."
                    />
                    <LiteracyObservationOptions
                      handleBegin={handleBegin}
                      checklistType="Writing"
                      type={LiteracyTypes.WRITING}
                      literacyType={literacyType}
                      teacherInstruction1="Observe the teacher delivering instruction or interacting with children."
                      teacherInstruction2="Select the types of foundational skills instruction that occur."
                      childInstruction1="Observe children writing independently or with teachers/peers."
                      childInstruction2="Select the types of child writing behaviors that occur."
                    />
                    <LiteracyTypeCard
                      type={LiteracyTypes.READING}
                      literacyType={literacyType}
                      setLiteracyType={setLiteracyType}
                      title="Book Reading"
                      descriptionText={<div>
                        Observe interactive book readings that support children&apos;s vocabulary
                        and content knowledge, text comprehension, and speaking/listening skills.
                        <i>To observe shared book readings focusing on print concepts,
                        select the Foundational Skills tool.</i>
                      </div>}
                    />
                    <LiteracyTypeCard
                      type={LiteracyTypes.LANGUAGE}
                      literacyType={literacyType}
                      setLiteracyType={setLiteracyType}
                      title="Language Environment"
                      descriptionText="Observe responsive and content-rich teacher-child interactions
                      that promote children's language development."
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

LiteracyObservationModal.propTypes = {
  handleBegin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default LiteracyObservationModal;