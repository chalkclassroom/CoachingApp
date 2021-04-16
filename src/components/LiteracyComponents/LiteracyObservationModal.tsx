import * as React from 'react';
import { useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip, Card, Collapse, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from '../../constants/Constants';
  
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
            <Grid item xs={1} />
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
                    <Collapse in={literacyType===0 || literacyType === 1}>
                      <Grid item style={{paddingBottom: '1em'}}>
                        <Grid container direction="row" justify="space-around" alignItems="center">
                          <Grid item xs={3}>
                            <Card
                              onClick={(): void => {literacyType === 1 ? setLiteracyType(0) : setLiteracyType(1)}}
                              elevation={4}
                              style={{
                                color: Constants.Colors.LI,
                                height: '10em',
                                borderColor: Constants.Colors.LI,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                                <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                                  Foundational Skills
                                </Typography>
                              </Grid>
                            </Card>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo', paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                              Observe lessons and activities designed to foster children’s phonological
                              awareness and develop their knowledge of the alphabetic principle and
                              print concepts through realistic reading and writing experiences.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Collapse>
                    <Collapse in={literacyType===1}>
                      <Grid item>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={5}>
                            <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                              <ul>
                                <li>
                                  Observe the teacher delivering instruction or interacting with children.
                                </li>
                                <li>
                                  Select the types of foundational skills instruction that occur.
                                </li>
                              </ul>
                            </Typography>
                            <Grid container direction="row" justify="center" alignItems="center">
                              <Button onClick={(): void => {handleBegin('FoundationalTeacher')}} variant="contained" color="primary">
                                BEGIN TEACHER OBSERVATION
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid item xs={2} style={{height: '100%'}}>
                            <Grid container direction="row" justify="center" alignItems="center">
                              <Divider orientation="vertical" flexItem style={{height: '5em'}} />
                            </Grid>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                              <ul>
                                <li>
                                  Observe children participating in lessons or activities.
                                </li>
                                <li>
                                  Select the types of foundational skills and knowledge that children are using.
                                </li>
                              </ul>
                            </Typography>
                            <Grid container direction="row" justify="center" alignItems="center">
                              <Button onClick={(): void => {handleBegin('FoundationalChild')}} variant="contained" color="primary">
                                BEGIN CHILD OBSERVATION
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Collapse>
                    <Collapse in={literacyType===0 || literacyType === 2}>
                      <Grid item style={{paddingBottom: '1em'}}>
                        <Grid container direction="row" justify="space-around" alignItems="center">
                          <Grid item xs={3}>
                            <Card
                              onClick={(): void => {literacyType === 2 ? setLiteracyType(0) : setLiteracyType(2)}}
                              elevation={4}
                              style={{
                                color: Constants.Colors.LI,
                                height: '10em',
                                borderColor: Constants.Colors.LI,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                                <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                                  Language and Comprehension
                                </Typography>
                              </Grid>
                            </Card>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                              Observe activities designed to nurture children’s language and content
                              development, listening comprehension, and critical responses to culturally
                              diverse texts.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Collapse>
                    <Collapse in={literacyType===0 || literacyType === 3}>
                      <Grid item>
                        <Grid container direction="row" justify="space-around" alignItems="center">
                          <Grid item xs={3}>
                            <Card
                              onClick={(): void => {literacyType === 3 ? setLiteracyType(0) : setLiteracyType(3)}}
                              elevation={4}
                              style={{
                                color: Constants.Colors.LI,
                                height: '10em',
                                borderColor: Constants.Colors.LI,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
                                <Typography variant="h5" align="center" style={{fontFamily: 'Arimo', fontWeight: 'bold', padding: '0.5em'}}>
                                  Writing
                                </Typography>
                              </Grid>
                            </Card>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography variant="h6" style={{fontFamily: 'Arimo', padding: '0.5em'}}>
                              Observe activities designed to engage children in writing that conveys meaning.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Collapse>
                    <Collapse in={literacyType===3}>
                      <Grid item>
                        <Grid container direction='row' justify='center' alignItems='center'>
                          <Grid item xs={5}>
                            <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                              <ul>
                                <li>
                                  Observe the teacher delivering instruction or interacting with children.
                                </li>
                                <li>
                                  Select the types of writing instruction that occur.
                                </li>
                              </ul>
                            </Typography>
                            <Grid container direction="row" justify="center" alignItems="center">
                              <Button onClick={(): void => {handleBegin('WritingTeacher')}} variant="contained" color="primary">
                                BEGIN TEACHER OBSERVATION
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid item xs={2} style={{height: '100%'}}>
                            <Grid container direction="row" justify="center" alignItems="center">
                              <Divider orientation="vertical" flexItem style={{height: '5em'}} />
                            </Grid>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography variant="h6" align="left" style={{fontFamily: 'Arimo'}}>
                              <ul>
                                <li>
                                  Observe children writing independently or with teachers/peers.
                                </li>
                                <li>
                                  Select the types of child writing behaviors that occur.
                                </li>
                              </ul>
                            </Typography>
                            <Grid container direction="row" justify="center" alignItems="center">
                              <Button onClick={(): void => {handleBegin('WritingChild')}} variant="contained" color="primary">
                                BEGIN CHILD OBSERVATION
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Collapse>
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