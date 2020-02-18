import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditImage from '../assets/images/EditImage.svg';
import SaveImage from '../assets/images/SaveImage.svg';
import CloseImage from '../assets/images/CloseImage.svg';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
}

interface Props {
  classes: Style,
  teacherFirstName: string,
  teacherLastName: string,
  magic8: string,
  firebase: {
    createConferencePlan(teacherId: string, sessionId: string, magic8: string): Promise<void>,
    getConferencePlan(sessionId: string): Promise<Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: string}>>,
    getActionSteps(actionPlanId: string): Promise<Array<{step: string, materials: string, person: string, timeline: string}>>,
    saveActionPlan(actionPlanId: string, goal: string, benefit: string): Promise<void>,
    saveActionStep(actionPlanId: string, index: string, step: string, materials: string, person: string, timeline: string): Promise<void>,
    createActionStep(actionPlanId: string, index: string): Promise<void>,
    getCoachFirstName(): Promise<string>,
    getCoachLastName(): Promise<string>
  },
  teacherId: string,
  sessionId: string,
  readOnly: boolean,
  // handleEditActionPlan(): void,
  handleClose?(): void,
  conferencePlanExists: boolean,
  //editMode: boolean,
  chosenQuestions: Array<{panel: string, number: number, question: string}>
}

interface State {
  feedback: string,
  questions: Array<string>,
  notes: string,
  date: string,
  actionSteps: string,
  actionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}>,
  editMode: boolean,
  conferencePlanExists: boolean,
  conferencePlanId: string,
  coachFirstName: string,
  coachLastName: string,
  createMode: boolean,
  saved: boolean,
  saveModal: boolean
}

interface Style {
  textField: string
}


/**
 * Form for user to complete action plan
 * @class ConferencePlanForm
 */
class ConferencePlanForm extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      feedback: '',
      questions: [],
      notes: '',
      date: '',
      actionSteps: '',
      actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}],
      editMode: false,
      conferencePlanExists: this.props.conferencePlanExists,
      conferencePlanId: '',
      coachFirstName: '',
      coachLastName: '',
      createMode: false,
      saved: true,
      saveModal: false
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
   * responds to change in user-entered text
   * @param {string} name
   * @param {event} event
   * @return {void}
   */
  handleChange = (name: string) => (event): void => {
    this.setState({
      [name]: event.target.value,
      saved: false
    });
  };

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeActionStep = (number: number) => (event): void => {
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
  handleChangeMaterials = (number: number) => (event): void => {
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
  handleChangePerson = (number: number) => (event): void => {
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
  handleChangeTimeline = (number: number) => (event): void => {
    const newArray = [...this.state.actionStepsArray];
    newArray[number].timeline = event.target.value;
    this.setState({
      actionStepsArray: newArray,
      saved: false
    });
  }

  handleCreate = (): void => {
    this.props.firebase.createConferencePlan(this.props.teacherId, this.props.sessionId, this.props.magic8)
      .then(() => {
        this.setState({
          editMode: true,
          conferencePlanExists: true,
          createMode: true
        });
        this.getConferencePlan();
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  getConferencePlan = (): void => {
    this.props.firebase.getConferencePlan(this.props.sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: string}>) => {
      if (conferencePlanData[0]) {
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id,
          feedback: conferencePlanData[0].feedback,
          questions: conferencePlanData[0].questions,
          notes: conferencePlanData[0].notes,
          date: conferencePlanData[0].date
        })
      } else {
        this.setState({
          conferencePlanExists: false,
          conferencePlanId: '',
          feedback: '',
          questions: [],
          notes: '',
          date: ''
        })
      }
    })
  }

  /* getActionPlan = (): void => {
    this.props.firebase.getActionPlan(this.props.sessionId)
    .then((actionPlanData: Array<{id: string, goal: string, benefit: string, date: string}>) => {
      if (actionPlanData[0]) {
        this.setState({
          actionPlanExists: true,
          actionPlanId: actionPlanData[0].id,
          goal: actionPlanData[0].goal,
          benefit: actionPlanData[0].benefit,
          date: actionPlanData[0].date
        });
        const newActionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}> = [];
        this.props.firebase.getActionSteps(actionPlanData[0].id).then((actionStepsData: Array<{step: string, materials: string, person: string, timeline: string}>) => {
          actionStepsData.forEach((value, index) => {
            newActionStepsArray[index] = {step: value.step, materials: value.materials, person: value.person, timeline: value.timeline};
          })
        }).then(() => {
          this.setState({
            actionStepsArray: newActionStepsArray
          }, () => {console.log('action steps array: ', this.state.actionStepsArray)});
        })
        .catch(() => {
          console.log('error retrieving action steps');
        });
      } else {
        this.setState({
          actionPlanExists: false,
          actionPlanId: '',
          goal: '',
          benefit: '',
          actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}]
        }, () => {console.log('action plan exists? ', this.state.actionPlanExists)})
      }
     })
  } */

  /**
   * saves action plan by updating Cloud Firestore records
   * @return {void}
   */
  handleSave = (): void => {
    this.props.firebase.saveActionPlan(this.state.actionPlanId, this.state.goal, this.state.benefit).then(() => {
      console.log("action plan saved");
    })
    .catch(() => {
      console.log("error with saving action plan");
    })
    this.state.actionStepsArray.forEach((value, index) => {
      this.props.firebase.saveActionStep(this.state.actionPlanId, index.toString(), value.step, value.materials, value.person, value.timeline)
        .then(() => {
          console.log("action step ", index, " saved");
          this.setState({ saved: true })
        })
        .catch(() => {
          console.log("error in saving action step ", index);
        })
    })
  }

  /**
   * saves action plan, action steps, and closes the action plan modal
   * @return {void}
   */
  handleSaveAndClose = (): void => {
    this.setState({
      saveModal: false
    }, () => {
      this.handleSave();
      this.props.handleClose();
    })
  }

  handleClose = (): void => {
    if (this.state.saved) {
      this.props.handleClose();
    } else {
      this.setState({
        saveModal: true
      })
    }
  }

  handleCloseWithoutSave = (): void => {
    this.setState({
      saveModal: false
    }, () => {this.props.handleClose()})
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.getConferencePlan();
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
    if (this.props.sessionId !== prevProps.sessionId) {
      this.getConferencePlan();
      this.setState({
        createMode: false
      })
    }
    /* if (this.props.editMode != prevProps.editMode) {
      this.getConferencePlan();
    } */
    if (this.state.conferencePlanExists != prevState.conferencePlanExists) {
      this.getConferencePlan();
    }
  }

  static propTypes = {
    teacherFirstName: PropTypes.string.isRequired,
    teacherLastName: PropTypes.string.isRequired,
    firebase: PropTypes.exact({
      createConferencePlan: PropTypes.func,
      getConferencePlan: PropTypes.func,
      getActionSteps: PropTypes.func,
      saveActionPlan: PropTypes.func,
      saveActionStep: PropTypes.func,
      createActionStep: PropTypes.func,
      getCoachFirstName: PropTypes.func,
      getCoachLastName: PropTypes.func
    }).isRequired,
    teacherId: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    readOnly: PropTypes.bool.isRequired,
    // handleEditActionPlan: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    conferencePlanExists: PropTypes.bool.isRequired,
    // editMode: PropTypes.bool.isRequired,
    chosenQuestions: PropTypes.array.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        {this.props.conferencePlanExists || this.state.createMode ? 
          (this.state.saveModal && !this.state.saved) ? (
            <Dialog
              open={this.state.saveModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{fontFamily: 'Arimo'}}>
                Do you want to save the conference plan before closing?
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.handleCloseWithoutSave} color="primary" style={{fontFamily: 'Arimo'}}>
                  Close without saving
                </Button>
                <Button onClick={this.handleSaveAndClose} color="primary" style={{fontFamily: 'Arimo'}} autoFocus>
                  Save & Close
                </Button>
              </DialogActions>
            </Dialog>
          ) :
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{width: '100%'}}
          >
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{width: '100%'}}
              >
                <Grid item xs={9}>
                  <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                    CONFERENCE PLAN
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button disabled={!this.props.handleEditActionPlan} onClick={this.props.handleEditActionPlan}>
                    <img alt="Edit" src={EditImage} style={{width: '100%'}}/>
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={this.handleSave}>
                    <img alt="Save" src={SaveImage} style={{width: '100%'}}/>
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={this.handleClose}>
                    <img alt="Close" src={CloseImage} style={{width: '95%'}}/>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{width: '100%'}}>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{fontFamily: 'Arimo'}}
              >
                <Grid item xs={4}>
                  {this.props.teacherFirstName + " " + this.props.teacherLastName}
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="center">
                    {this.state.coachFirstName + " " + this.state.coachLastName}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container direction="row" justify="flex-end">
                    {/* date value is an object */}
                    {/* {this.state.date} */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em'}}>
              <TextField
                id="feedback"
                name="feedback"
                type="text"
                label="Strengths-Based Feedback"
                value={this.state.feedback}
                onChange={this.handleChange('feedback')}
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
                  style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                }}
                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                style={{border: '2px solid #094492'}}
              />
            </Grid>
            <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em'}}>
              {this.props.chosenQuestions.map((value, index) => {
                return (
                <Typography key={index}>
                  {value.question}
                </Typography>);
              })}
            </Grid>
            <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em'}}>
              <TextField
                id="notes"
                name="notes"
                type="text"
                label="Notes"
                value={this.state.notes}
                onChange={this.handleChange('notes')}
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
                InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                style={{border: '2px solid #e99c2e'}}
              />
            </Grid>
          </Grid>   
        : 
        <Button onClick={this.handleCreate}>
          Create Conference Plan
        </Button>  
      }     
      </div>
    );
  }
}

export default withStyles(styles)(ConferencePlanForm);