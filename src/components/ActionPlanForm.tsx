import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InfoIcon from '@material-ui/icons/Info';
// import EditImage from '../assets/images/EditImage.svg';
import SaveImage from '../assets/images/SaveImage.svg';
import SaveGrayImage from '../assets/images/SaveGrayImage.svg';
// import CloseImage from '../assets/images/CloseImage.svg';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FadeAwayModal from './FadeAwayModal';
import CHALKLogoGIF from '../assets/images/CHALKLogoGIF.gif';
import * as moment from 'moment';

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
};

interface Props {
  classes: Style,
  actionPlanId?: string,
  teacher: Teacher,
  magic8?: string,
  firebase: {
    createActionPlan(teacherId: string, magic8: string): Promise<void>,
    getAPInfo(actionPlanId: string): Promise<{
      sessionId: string,
      goal: string,
      goalTimeline: string,
      benefit: string,
      dateModified: {seconds: number, nanoseconds: number},
      dateCreated: {seconds: number, nanoseconds: number},
      coach: string,
      teacher: string,
      tool: string
    }>,
    getTeacherActionPlans(practice: string, teacherId: string): Promise<Array<{
      id: string,
      date: {seconds: number, nanoseconds: number},
      newDate: Date
    }>>,
    getActionSteps(actionPlanId: string): Promise<Array<{
      step: string,
      materials: string,
      person: string,
      timeline: string
    }>>,
    saveActionPlan(
      actionPlanId: string,
      goal: string,
      goalTimeline: string,
      benefit: string
    ): Promise<void>,
    saveActionStep(
      actionPlanId: string,
      index: string,
      step: string,
      materials: string,
      person: string,
      timeline: string
    ): Promise<void>,
    createActionStep(actionPlanId: string, index: string): Promise<void>,
    getCoachFirstName(): Promise<string>,
    getCoachLastName(): Promise<string>
  },
  sessionId?: string,
  readOnly: boolean,
  // handleEditActionPlan?(): void,
  // handleClose?(): void,
  actionPlanExists: boolean,
  editMode?: boolean,
  history?: {
    replace(
      param: {
        pathname: string
      }
    ): void
  }
}

interface State {
  goal: string,
  goalTimeline: string,
  benefit: string,
  date: Date,
  actionSteps: string,
  actionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}>,
  editMode: boolean,
  actionPlanExists: boolean,
  actionPlanId: string,
  coachFirstName: string,
  coachLastName: string,
  createMode: boolean,
  saved: boolean,
  saveModal: boolean,
  anchorEl: HTMLElement,
  popover: string,
  createDialog: boolean,
  dialog: boolean,
  savedAlert: boolean
}

interface Style {
  textField: string,
  backButton: string
}


/**
 * Form for user to complete action plan
 * @class ActionPlanForm
 */
class ActionPlanForm extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      goal: '',
      goalTimeline: '',
      benefit: '',
      date: new Date(),
      actionSteps: '',
      actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}],
      editMode: false,
      actionPlanExists: this.props.actionPlanExists,
      actionPlanId: '',
      coachFirstName: '',
      coachLastName: '',
      createMode: false,
      saved: true,
      saveModal: false,
      anchorEl: null,
      popover: '',
      createDialog: false,
      dialog: false,
      savedAlert: false
    }
  }

  handleAddActionStep = (): void => {
    this.setState({
      actionStepsArray: [...this.state.actionStepsArray, {step: '', materials: '', person: '', timeline: ''}]
    }, () => {
      this.props.firebase.createActionStep(this.state.actionPlanId, (this.state.actionStepsArray.length-1).toString());
    })
  }

  /**
   * @param {SyntheticEvent} event
   * @param {string} popover
   */
  handlePopoverOpen = (event: React.SyntheticEvent, popover: string): void => {
    this.setState({
      anchorEl: event.currentTarget,
      popover: popover
    })
  }

  handlePopoverClose = (): void => {
    this.setState({
      anchorEl: null,
      popover: ''
    })
  }

  /**
   * responds to change in user-entered text
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      [name]: event.target.value,
      saved: false
    });
  };

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeActionStep = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].step = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeMaterials = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].materials = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangePerson = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].person = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeTimeline = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].timeline = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  /**
   * opens dialog for creating new action plan
   */
  handleCreate = (): void => {
    this.setState({
      createDialog: true
    })
  }

  /**
   * closes dialog for creating new action plan
   */
  handleCloseCreate = (): void => {
    this.setState({
      createDialog: false
    })
  }

  createNewActionPlan = (): void => {
    this.props.firebase.createActionPlan(this.props.teacher.id, this.props.magic8)
      .then(() => {
        this.setState({
          editMode: true,
          actionPlanExists: true,
          createMode: true,
          createDialog: false
        });
        this.getAllActionPlans();
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  getActionPlan = (actionPlanId: string): void => {
    this.props.firebase.getAPInfo(actionPlanId)
    .then((actionPlanData: {
      sessionId: string,
      goal: string,
      goalTimeline: string,
      benefit: string,
      dateModified: {seconds: number, nanoseconds: number},
      dateCreated: {seconds: number, nanoseconds: number},
      coach: string,
      teacher: string,
      tool: string
    }) => {
      const newDate = this.changeDateType(actionPlanData.dateModified);
      this.setState({
        actionPlanExists: true,
        goal: actionPlanData.goal,
        goalTimeline: actionPlanData.goalTimeline,
        benefit: actionPlanData.benefit,
        date: newDate
      });
      const newActionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}> = [];
      this.props.firebase.getActionSteps(actionPlanId).then((actionStepsData: Array<{step: string, materials: string, person: string, timeline: string}>) => {
        actionStepsData.forEach((value, index) => {
          newActionStepsArray[index] = {step: value.step, materials: value.materials, person: value.person, timeline: value.timeline};
        })
      }).then(() => {
        this.setState({
          actionStepsArray: newActionStepsArray
        });
      })
      .catch(() => {
        console.log('error retrieving action steps');
      });
    })
    .catch((error) => console.log('getActionPlan', error))
  }

  changeDateType = (date: {seconds: number, nanoseconds: number}): Date => {
    const newDate = new Date(0);
    newDate.setUTCSeconds(date.seconds);
    return newDate
  }

  getAllActionPlans = (): void => {
    this.props.firebase.getTeacherActionPlans(this.props.magic8, this.props.teacher.id)
    .then((actionPlanData: Array<{id: string, date: {seconds: number, nanoseconds: number}, newDate: Date}>) => {
      const newArr: Array<{id: string, seconds: number, newDate: Date}> = [];
      actionPlanData.map((value) => {
        const newDate = this.changeDateType(value.date);
        newArr.push({
          id: value.id,
          seconds: value.date.seconds,
          newDate: newDate
        });
        return {newArr}
      })
      return newArr
    }).then((newArr) => {
      newArr.sort(((a, b) => b.seconds - a.seconds));
      return newArr;
    }).then((newArr) => {
      if (newArr[0]) {
        this.setState({actionPlanId: newArr[0].id});
        this.getActionPlan(newArr[0].id);
      } else {
        this.setState({actionPlanId: null});
        this.createNewActionPlan();
      }
    })
  }

  /**
   * saves action plan by updating Cloud Firestore records
   * @param {boolean} close
   * @return {void}
   */
  handleSave = (close: boolean): void => {
    this.props.firebase.saveActionPlan(
      this.state.actionPlanId,
      this.state.goal,
      this.state.goalTimeline,
      this.state.benefit
    ).then(() => {
      this.getActionPlan(this.state.actionPlanId);
    })
    .catch(() => {
      console.log("error with saving action plan");
    })
    this.state.actionStepsArray.forEach((value, index) => {
      this.props.firebase.saveActionStep(this.state.actionPlanId, index.toString(), value.step, value.materials, value.person, value.timeline)
        .then(() => {
          this.setState({
            saved: true,
            dialog: false
          }, () => {
            this.setState({ savedAlert: true }, () => {
              setTimeout(() => {
                this.setState({ savedAlert: false })
              }, 1500);
            });
          });
          this.getActionPlan(this.state.actionPlanId);
        })
        /* .then(() => {
          if (close) {
            this.props.handleClose();
            this.setState({saveModal: false});
          }
        }) */
        .catch(() => {
          console.log("error in saving action step ", index);
        })
    })
  }

  /* handleClose = (): void => {
    if (this.state.saved) {
      this.props.handleClose();
    } else {
      this.setState({
        saveModal: true
      });
    }
  } */

  /* handleCloseWithoutSave = (): void => {
    this.setState({
      saveModal: false
    }, () => {this.props.handleClose()})
  } */

  /**
   * @param {React.SyntheticEvent} e
   */
  onClickAway = (e: React.SyntheticEvent): void => {
    const ap = document.getElementById('ap');
    if (!this.state.saved && !ap.contains(e.target) && !this.state.popover) {
      this.setState({ dialog: true })
    }
  }

  handleUndoChanges = (): void => {
    this.getActionPlan(this.state.actionPlanId);
    this.setState({
      dialog: false,
      saved: true
    })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.props.actionPlanId ? (
      this.getActionPlan(this.props.actionPlanId)
    ) : (
      this.getAllActionPlans()
    );
    this.props.firebase.getCoachFirstName().then((name: string) => {
      this.setState({ coachFirstName: name })
    })
    this.props.firebase.getCoachLastName().then((name: string) => {
      this.setState({ coachLastName: name })
    })
  }

  /** 
   * lifecycle method invoked after component updates 
   * @param {Props} prevProps
   * @param {State} prevState
   */
  componentDidUpdate(prevProps: Props, prevState: State): void {
    if ((this.props.editMode != prevProps.editMode)) {
      this.getActionPlan(this.state.actionPlanId);
    }
    if (this.state.actionPlanExists != prevState.actionPlanExists) {
      this.getActionPlan(this.state.actionPlanId);
    }
  }

  static propTypes = {
    firebase: PropTypes.exact({
      createActionPlan: PropTypes.func,
      getActionPlan: PropTypes.func,
      getActionSteps: PropTypes.func,
      saveActionPlan: PropTypes.func,
      saveActionStep: PropTypes.func,
      createActionStep: PropTypes.func,
      getCoachFirstName: PropTypes.func,
      getCoachLastName: PropTypes.func
    }).isRequired,
    teacher: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired,
    readOnly: PropTypes.bool.isRequired,
    // handleEditActionPlan: PropTypes.func,
    // handleClose: PropTypes.func,
    actionPlanExists: PropTypes.bool.isRequired,
    editMode: PropTypes.bool,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const goalOpen = Boolean(this.state.popover === 'goal-popover');
    const goalTimelineOpen = Boolean(this.state.popover === 'goal-timeline-popover');
    const benefitOpen = Boolean(this.state.popover === 'benefit-popover');
    const actionStepOpen = Boolean(this.state.popover === 'action-step-popover');
    const materialsOpen = Boolean(this.state.popover === 'materials-popover');
    const personOpen = Boolean(this.state.popover === 'person-popover');
    const timelineOpen = Boolean(this.state.popover === 'timeline-popover');
    const goalId = goalOpen ? 'goal-popover' : undefined;
    const goalTimelineId = goalTimelineOpen ? 'goal-timeline-popover' : undefined;
    const benefitId = benefitOpen ? 'benefit-popover' : undefined;
    const actionStepId = actionStepOpen ? 'action-step-popover' : undefined;
    const materialsId = materialsOpen ? 'materials-popover' : undefined;
    const personId = personOpen ? 'person-popover' : undefined;
    const timelineId = timelineOpen ? 'timeline-popover' : undefined;
    return (
      <ClickAwayListener onClickAway={(e): void => this.onClickAway(e)}>
        <FadeAwayModal open={this.state.savedAlert} text="Saved!" />
        <div style={{width: '100%'}} id='ap'>
          {this.state.createDialog ? (
            <Dialog
              open={this.state.createDialog}
            >
              <DialogTitle style={{fontFamily: 'Arimo'}}>
                Create new Action Plan
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Would you like to create a new Action Plan?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseCreate}>
                  No
                </Button>
                <Button onClick={this.createNewActionPlan}>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          ) : (null)}
          { this.state.actionPlanExists ?
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              style={{width: '100%'}}
            >
              <Grid item style={{width: '100%'}}>
                {this.props.history ? ( // if viewing on Action Plan Page
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{width: '100%', paddingTop: '0.5em', paddingBottom: '1em'}}
                  >
                    <Grid item xs={2}>
                      <Grid container alignItems="center" justify="flex-start">
                        <Grid item>
                          <Button
                            variant="contained"
                            size="medium"
                            className={classes.backButton}
                            onClick={(): void => {
                              this.props.history.replace({
                                pathname: "/ActionPlans"
                              })
                            }}
                          >
                            <ChevronLeftRoundedIcon />
                            <b>Back</b>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={8}>
                      <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%'}}>
                        <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                          ACTION PLAN
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{width: '100%'}}
                  >
                    <Grid item xs={11}>
                      <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid item>
                          <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                            ACTION PLAN
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button onClick={this.handleCreate}>
                            <AddCircleIcon
                              fontSize='large'
                              style={{ fill: "#459aeb"}}
                            />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={(): void => this.handleSave(false)}>
                        {this.state.saved ? (
                            <img alt="Save" src={SaveGrayImage} style={{width: '100%'}}/>
                          ) : (
                            <img alt="Save" src={SaveImage} style={{width: '100%'}}/>
                          )}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item style={{width: '100%'}}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  style={{fontFamily: 'Arimo'}}
                >
                  <Grid item xs={4}>
                    {this.props.teacher.firstName + " " + this.props.teacher.lastName}
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justify="center">
                      {this.state.coachFirstName + " " + this.state.coachLastName}
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container direction="row" justify="flex-end">
                      {moment(this.state.date).format('MM/DD/YYYY')}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Dialog open={this.state.dialog}>
                <DialogTitle>
                  You must save or undo your changes before navigating away from the page.
                </DialogTitle>
                <DialogActions>
                  <Button onClick={this.handleUndoChanges}>
                    Undo Changes
                  </Button>
                  <Button onClick={(): void => {this.handleSave(false)}}>
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <Grid item xs={12} style={{width: "100%", paddingTop: '0.4em', paddingBottom: '0.8em'}}>
                <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
                  <Grid item style={{width: '81%', border: '2px solid #094492', borderRadius: '0.5em', height: '100%'}}>
                    <Grid container direction="column" style={{width: '100%'}}>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                          <Grid item xs={11}>
                            <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.3em', marginTop: '0.3em', fontWeight: 'bold'}}>
                              Teacher Goal
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Grid container justify="flex-end" direction="row" alignItems="center">
                              <Grid item>
                                <InfoIcon
                                  style={{
                                    fill: "#094492",
                                    marginRight: '0.3em',
                                    marginTop: '0.3em'
                                  }}
                                  onClick={
                                    (e): void => this.handlePopoverOpen(e, 'goal-popover')
                                  }
                                />
                                <Popover
                                  id={goalId}
                                  open={goalOpen}
                                  anchorEl={this.state.anchorEl}
                                  onClose={this.handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                  }}
                                  elevation={16}
                                >
                                  <div style={{padding: '2em'}}>
                                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                                      Writing a High-Quality Goal
                                    </Typography>
                                    <ul>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Clearly define what you want to achieve.
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Check that your goal can be measured by 
                                          <br />
                                          the CHALK observation tool (e.g. Reduce
                                          <br />
                                          center time clean-up transition to 7 
                                          <br />
                                          minutes).
                                        </Typography>
                                      </li>
                                    </ul>
                                  </div>
                                </Popover>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="goal"
                          name="goal"
                          type="text"
                          value={this.state.goal}
                          onChange={this.handleChange('goal')}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          multiline
                          rowsMax={3}
                          rows={3}
                          className={classes.textField}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: this.props.readOnly,
                            style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                          }}
                          style={{marginTop: 0, paddingTop: '0em', paddingBottom: '0.5em', marginBottom: 0}}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{width: '18%', border: '2px solid #4fd9b3', borderRadius: '0.5em', height: '100%'}}>
                    <Grid container direction="column" style={{width: '100%'}}>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                          <Grid item xs={11}>
                            <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.3em', marginTop: '0.3em', fontWeight: 'bold'}}>
                              Achieve by:
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Grid container justify="flex-end" direction="row" alignItems="center">
                              <Grid item>
                                <InfoIcon
                                  onClick={
                                    (e): void => this.handlePopoverOpen(e, 'goal-timeline-popover')
                                  }
                                  style={{
                                    fill: "#4fd9b3",
                                    marginRight: '0.3em',
                                    marginTop: '0.3em'
                                  }}
                                />
                                <Popover
                                  id={goalTimelineId}
                                  open={goalTimelineOpen}
                                  anchorEl={this.state.anchorEl}
                                  onClose={this.handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                  }}
                                  elevation={16}
                                >
                                  <div style={{padding: '2em'}}>
                                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                                      Achieve by:
                                    </Typography>
                                    <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                      Indicate a date by which you will achieve
                                      <br />
                                      your goal.
                                    </Typography>
                                  </div>
                                </Popover>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="goalTimeline"
                          name="goalTimeline"
                          type="text"
                          value={this.state.goalTimeline}
                          onChange={this.handleChange('goalTimeline')}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          multiline
                          rowsMax={3}
                          rows={3}
                          className={classes.textField}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: this.props.readOnly,
                            style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                          }}
                          style={{marginTop: 0, paddingTop: '0em', paddingBottom: '0.5em', marginBottom: 0}}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{width: "100%", paddingBottom: '0.8em'}}>
                <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
                  <Grid item xs={12} style={{border: '2px solid #e99c2e', borderRadius: '0.5em', height: '100%'}}>
                    <Grid container direction="column" style={{width: '100%'}}>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                          <Grid item xs={11}>
                            <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                              Benefit for Students
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Grid container justify="flex-end" direction="row" alignItems="center">
                              <Grid item>
                                <InfoIcon style={{ fill: "#e99c2e", marginRight: '0.3em', marginTop: '0.3em' }} onClick={(e): void => this.handlePopoverOpen(e, 'benefit-popover')} />
                                <Popover
                                  id={benefitId}
                                  open={benefitOpen}
                                  anchorEl={this.state.anchorEl}
                                  onClose={this.handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                  }}
                                  elevation={16}
                                >
                                  <div style={{padding: '2em'}}>
                                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                                      Benefit for Students
                                    </Typography>
                                    <ul>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          How will achieving this goal improve children&apos;s
                                          <br />
                                          learning?
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          How will achieving this goal enhance the classroom
                                          <br />
                                          environment and children&apos;s experience?
                                        </Typography>
                                      </li>
                                    </ul>
                                  </div>
                                </Popover>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <TextField
                          id="benefit"
                          name="benefit"
                          type="text"
                          value={this.state.benefit}
                          onChange={this.handleChange('benefit')}
                          margin="normal"
                          variant="standard"
                          fullWidth
                          multiline
                          rowsMax={2}
                          rows={2}
                          className={classes.textField}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: this.props.readOnly,
                            style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                          }}
                          style={{marginTop: 0, paddingTop: '0em', paddingBottom: '0.5em', marginBottom: 0}}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{width: '100%', height: '38vh'}}>
                <Grid container direction="row" justify="space-between" style={{height: '100%'}}>
                  <Grid item style={{width: '42%', border: '2px solid #0988ec', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                    <Grid container direction="column" style={{width: '100%'}}>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                          <Grid item xs={11}>
                            <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                              Action Steps
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Grid container justify="flex-end" direction="row" alignItems="center">
                              <Grid item>
                                <InfoIcon style={{ fill: "#0988ec", marginRight: '0.3em', marginTop: '0.3em' }} onClick={(e): void => this.handlePopoverOpen(e, 'action-step-popover')}/>
                                <Popover
                                  id={actionStepId}
                                  open={actionStepOpen}
                                  anchorEl={this.state.anchorEl}
                                  onClose={this.handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                  }}
                                  elevation={16}
                                >
                                  <div style={{padding: '2em'}}>
                                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                                      Generating Action Steps
                                    </Typography>
                                    <ul>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Break down the goal into two or more actions.
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Consider what knowledge or skills will lead to
                                          <br />
                                          achieving the goal.                                  
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Create at least one action step that describes
                                          <br />
                                          how the coach will support the teacher.
                                          <br />
                                          Example: modeling
                                        </Typography>
                                      </li>
                                    </ul>
                                  </div>
                                </Popover>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                        {this.state.actionStepsArray.map((value, index) => {
                          return(
                            <li key={index}>
                              <TextField
                                id={"actionSteps" + index.toString()}
                                name={"actionSteps" + index.toString()}
                                type="text"
                                value={value.step}
                                onChange={this.handleChangeActionStep(index)}
                                margin="normal"
                                variant="standard"
                                fullWidth
                                multiline
                                rowsMax={4}
                                rows={4}
                                className={classes.textField}
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: this.props.readOnly,
                                  style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                                }}
                                style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0 }}
                              />
                            </li>
                          );
                        })}
                      </ul>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center">
                          <Grid item xs={1}>
                            <Button disabled={this.props.readOnly} onClick={this.handleAddActionStep} style={{marginLeft: '0.3em', paddingBottom: '0.5em'}}>
                              <AddCircleIcon style={{ fill: this.props.readOnly? "#a9a9a9" : "#0988ec", marginRight: '0.3em', marginTop: '0.3em' }} />
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{width: '23%', border: '2px solid #009365', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                    <Grid container direction="column" style={{width: '100%'}}>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                          <Grid item xs={11}>
                            <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                              Materials
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Grid container justify="flex-end" direction="row" alignItems="center">
                              <Grid item>
                                <InfoIcon
                                  style={{
                                    fill: "#009365",
                                    marginRight: '0.3em',
                                    marginTop: '0.3em'
                                  }}
                                  onClick={
                                    (e): void => this.handlePopoverOpen(e, 'materials-popover')
                                  }
                                />
                                <Popover
                                  id={materialsId}
                                  open={materialsOpen}
                                  anchorEl={this.state.anchorEl}
                                  onClose={this.handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                  }}
                                  elevation={16}
                                >
                                  <div style={{padding: '2em'}}>
                                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                                      Materials
                                    </Typography>
                                    <ul>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          List materials or resources needed to support
                                          <br />
                                          each action step.
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Example: laminated cards for small-group game,
                                          <br />
                                          list of high-level questions for read-aloud                                 
                                        </Typography>
                                      </li>
                                    </ul>
                                  </div>
                                </Popover>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                          {this.state.actionStepsArray.map((value, index) => {
                            return(
                              <li key={index}>
                                <TextField
                                  id={"materials" + index.toString()}
                                  name={"materials" + index.toString()}
                                  type="text"
                                  value={value.materials}
                                  onChange={this.handleChangeMaterials(index)}
                                  margin="normal"
                                  variant="standard"
                                  fullWidth
                                  multiline
                                  rowsMax={4}
                                  rows={4}
                                  className={classes.textField}
                                  InputProps={{
                                    disableUnderline: true,
                                    readOnly: this.props.readOnly,
                                    style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                                  }}
                                  style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0}}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{width: '16%', border: '2px solid #ffd300', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                    <Grid container direction="column" style={{width: '100%'}}>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                          <Grid item xs={11}>
                            <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                              Person
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Grid container justify="flex-end" direction="row" alignItems="center">
                              <Grid item>
                                <InfoIcon
                                  style={{
                                    fill: "#ffd300",
                                    marginRight: '0.3em',
                                    marginTop: '0.3em'
                                  }} 
                                  onClick={
                                    (e): void => this.handlePopoverOpen(e, 'person-popover')
                                  }
                                />
                                <Popover
                                  id={personId}
                                  open={personOpen}
                                  anchorEl={this.state.anchorEl}
                                  onClose={this.handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                  }}
                                  elevation={16}
                                >
                                  <div style={{padding: '2em'}}>
                                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                                      Person
                                    </Typography>
                                    <ul>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          List the person responsible for completing
                                          <br />
                                          each action step.
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Both the coach and teacher are responsible
                                          <br />
                                          for action steps.                                
                                        </Typography>
                                      </li>
                                    </ul>
                                  </div>
                                </Popover>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                          {this.state.actionStepsArray.map((value, index) => {
                            return(
                              <li key={index}>
                                <TextField
                                  id={"person" + index.toString()}
                                  name={"person" + index.toString()}
                                  type="text"
                                  value={value.person}
                                  onChange={this.handleChangePerson(index)}
                                  margin="normal"
                                  variant="standard"
                                  fullWidth
                                  multiline
                                  rowsMax={4}
                                  rows={4}
                                  className={classes.textField}
                                  InputProps={{
                                    disableUnderline: true,
                                    readOnly: this.props.readOnly,
                                    style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                                  }}
                                  style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0}}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{width: '16%', border: '2px solid #6f39c4', borderRadius: '0.5em', height: '100%', overflow: 'auto'}}>
                    <Grid container direction="column" style={{width: '100%'}}>
                      <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                          <Grid item xs={11}>
                            <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                              Timeline
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Grid container justify="flex-end" direction="row" alignItems="center">
                              <Grid item>
                                <InfoIcon
                                  style={{
                                    fill: "#6f39c4",
                                    marginRight: '0.3em',
                                    marginTop: '0.3em'
                                  }}
                                  onClick={
                                    (e): void => this.handlePopoverOpen(e, 'timeline-popover')
                                  }
                                />
                                <Popover
                                  id={timelineId}
                                  open={timelineOpen}
                                  anchorEl={this.state.anchorEl}
                                  onClose={this.handlePopoverClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                  }}
                                  elevation={16}
                                >
                                  <div style={{padding: '2em'}}>
                                    <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                                      Timeline
                                    </Typography>
                                    <ul>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Assign a timeframe for each action step that 
                                          <br />
                                          supports the coach and teacher in achieving
                                          <br />
                                          the goal.
                                        </Typography>
                                      </li>
                                      <li>
                                        <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                          Example Timeline:
                                          <br />
                                          Action Step 1: 3/6/2020
                                          <br />
                                          Action Step 2: 3/12/2020
                                        </Typography>
                                      </li>
                                    </ul>
                                  </div>
                                </Popover>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                          {this.state.actionStepsArray.map((value, index) => {
                            return(
                              <li key={index}>
                                <TextField
                                  id={"timeline" + index.toString()}
                                  name={"timeline" + index.toString()}
                                  type="date"
                                  value={value.timeline}
                                  onChange={this.handleChangeTimeline(index)}
                                  margin="normal"
                                  variant="standard"
                                  fullWidth
                                  multiline
                                  rowsMax={4}
                                  rows={4}
                                  className={classes.textField}
                                  InputProps={{
                                    disableUnderline: true,
                                    readOnly: this.props.readOnly,
                                    style: {fontFamily: "Arimo", width: '90%', marginLeft: '0.5em', marginRight: '0.5em'}
                                  }}
                                  style={{marginTop: 0, paddingBottom: '0.5em', marginBottom: 0}}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>   
          : 
          <div>
            <img src={CHALKLogoGIF} alt="Loading" width="100%" />
          </div>
        }     
        </div>
      </ClickAwayListener>
    );
  }
}

export default withStyles(styles)(ActionPlanForm);