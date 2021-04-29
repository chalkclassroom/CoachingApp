import * as React from 'react';
import { useState } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip, Collapse, Card, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
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
  
const styles: object = {
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
};

interface Style {
  root: string,
  paper: string,
}

interface Props {
  classes: Style,
  handleBegin(checklistType: number): void,
  handleClose(): void,
  open: boolean,
  tool: string
}

/**
 * Modal to confirm view results
 * @function ResultsModal
 * @param {Props} props
 * @return {ReactElement}
 */
function ResultsModal(props: Props): React.ReactElement {
  const { classes, handleBegin, handleClose, open } = props;
  const [type, setType] = useState(0);
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
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Typography variant="h4" align="center" style={{fontFamily: 'Arimo'}}>
                    Literacy Instruction Results
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
                <Collapse in={type===0 || type === 1} style={{width: '100%'}}>
                  <Grid item style={{paddingBottom: '1em'}}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                      <Grid item xs={3}>
                        <Card
                          onClick={(): void => {type === 1 ? setType(0) : setType(1)}}
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
                          print concepts.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Collapse>
                <Collapse in={type===1}>
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
                <Collapse in={type===0 || type === 2} style={{width: '100%'}}>
                  <Grid item style={{paddingBottom: '1em'}}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                      <Grid item xs={3}>
                        <Card
                          onClick={(): void => {type === 2 ? setType(0) : setType(2)}}
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
                <Collapse in={type===0 || type === 3} style={{width: '100%'}}>
                  <Grid item>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                      <Grid item xs={3}>
                        <Card
                          onClick={(): void => {type === 3 ? setType(0) : setType(3)}}
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
              </Grid>
            </Grid>
            <Grid item style={{paddingTop: '2em'}}>
              <Button disabled={type===0} onClick={(): void => {handleBegin(type)}} variant="contained" color="primary">
                VIEW RESULTS
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

ResultsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleBegin: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  tool: PropTypes.string.isRequired
}

export default withStyles(styles)(ResultsModal);