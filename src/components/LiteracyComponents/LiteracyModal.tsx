import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles/index";
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip, Collapse, Card, Divider, Fade } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LiteracyTypeCard from './LiteracyTypeCard';
import LiteracyObservationOptions from './LiteracyObservationOptions';
import * as Constants from '../../constants/Constants';

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
  
const useStyles = makeStyles({
  root: {
    backgroundColor: '#ffffff'
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  },
});

interface Props {
  handleBegin(checklistType: string): void,
  handleClose(): void,
  open: boolean,
  tool: string,
  type: string,
  foundational: boolean,
  writing: boolean,
  reading: boolean,
  language: boolean
}

/**
 * Modal to confirm view results
 * @function LiteracyModal
 * @param {Props} props
 * @return {ReactElement}
 */
function LiteracyModal(props: Props): React.ReactElement {
  const { handleBegin, handleClose, open, type, foundational, writing, reading, language } = props;
  const [literacyType, setLiteracyType] = useState(Constants.LiteracyTypes.NONE);
  const classes = useStyles();
  return (
    <div>
      <Modal open={open}>
        <div style={getModalStyle()} className={classes.paper}>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            className={classes.root}
          >
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="flex-end"
                style={{width: '100%'}}
              >
                <Grid item xs={1}>
                  <Fade in={literacyType!==Constants.LiteracyTypes.NONE}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      justify="flex-end"
                    >
                      <IconButton style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', padding: 10 }}>
                        <Tooltip title={"Back"} placement={"right"}>
                          <ChevronLeftIcon onClick={(): void => setLiteracyType(Constants.LiteracyTypes.NONE)} />
                        </Tooltip>
                      </IconButton>
                    </Grid>
                  </Fade>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h4" align="center" style={{fontFamily: 'Arimo'}}>
                    Literacy Instruction {type === 'Observe' ? 'Observation' : type === 'Results' ? 'Results' : 'Training'}
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
            </Grid>
            <Grid item style={{paddingTop: '1em'}}>
              <Grid container direction="column" justify="center" alignItems="center">
                <LiteracyTypeCard
                  type={Constants.LiteracyTypes.FOUNDATIONAL}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Foundational Skills"
                  descriptionText="Observe lessons and activities designed to foster children’s phonological
                  awareness and develop their knowledge of the alphabetic principle and
                  print concepts."
                  activity={type}
                  unlocked={foundational}
                />
                <LiteracyTypeCard
                  type={Constants.LiteracyTypes.WRITING}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Writing"
                  descriptionText="Observe lessons and activities designed to engage children in emergent writing."
                  activity={type}
                  unlocked={writing}
                />
                <LiteracyTypeCard
                  type={Constants.LiteracyTypes.READING}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Book Reading"
                  descriptionText={<div>
                    Observe interactive book readings that support children&apos;s vocabulary
                    and content knowledge, text comprehension, and speaking/listening skills.
                    <i>To observe shared book readings focusing on print concepts,
                    select the Foundational Skills tool.</i>
                  </div>}
                  activity={type}
                  unlocked={reading}
                />
                <LiteracyTypeCard
                  type={Constants.LiteracyTypes.LANGUAGE}
                  literacyType={literacyType}
                  setLiteracyType={setLiteracyType}
                  title="Language Environment"
                  descriptionText="Observe responsive and content-rich teacher-child interactions
                  that promote children's language development."
                  activity={type}
                  unlocked={language}
                />
                {type === 'Observe' ? (
                  <div>
                    <LiteracyObservationOptions
                      handleBegin={handleBegin}
                      type={Constants.LiteracyTypes.FOUNDATIONAL}
                      literacyType={literacyType}
                      teacherInstruction1="Observe the teacher delivering instruction or interacting with children."
                      teacherInstruction2="Select the types of foundational skills instruction that occur."
                      childInstruction1="Observe children participating in lessons or activities."
                      childInstruction2="Select the types of foundational skills and knowledge that children are using."
                    />
                    <LiteracyObservationOptions
                      handleBegin={handleBegin}
                      type={Constants.LiteracyTypes.WRITING}
                      literacyType={literacyType}
                      teacherInstruction1="Observe the teacher delivering instruction or interacting with children."
                      teacherInstruction2="Select the types of foundational skills instruction that occur."
                      childInstruction1="Observe children writing independently or with teachers/peers."
                      childInstruction2="Select the types of child writing behaviors that occur."
                    />
                    <LiteracyObservationOptions
                      handleBegin={handleBegin}
                      type={Constants.LiteracyTypes.LANGUAGE}
                      literacyType={literacyType}
                      teacherInstruction1="Observe the teacher delivering instruction or interacting with children."
                      teacherInstruction2={
                        <div>
                          Select the types of behaviors that show teachers:
                          <ul>
                            <li>
                              Talking with children about vocabulary or social-emotional topics
                            </li>
                            <li>
                              Encouraging children to talk
                            </li>
                            <li>
                              Responding to children
                            </li>
                          </ul>
                        </div>
                      }
                    />
                  </div>
                ) : ( <div /> )}
              </Grid>
            </Grid>
            {type === 'Observe' ? (
              null
            ) : (
              <Grid item style={{paddingTop: '2em'}}>
                <Button disabled={literacyType===Constants.LiteracyTypes.NONE} onClick={(): void => {handleBegin(literacyType)}} variant="contained" color="primary">
                  {type === 'Results' ? 'VIEW RESULTS' : 'BEGIN TRAINING'}
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

LiteracyModal.propTypes = {
  handleBegin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  tool: PropTypes.string.isRequired,
  foundational: PropTypes.bool.isRequired,
  writing: PropTypes.bool.isRequired,
  reading: PropTypes.bool.isRequired,
  language: PropTypes.bool.isRequired
}

export default LiteracyModal;