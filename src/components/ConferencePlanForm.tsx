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
import Card from "@material-ui/core/Card";
import Backdrop from "@material-ui/core/Backdrop";

const styles: object = {
  textField: {
    borderRadius: '0.5em',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  feedbackCard: {
    border: "3px solid #094492",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: '20vh',
    overflow: 'auto',
    paddingTop: '0.5em'
  },
  questionsCard: {
    border: "3px solid #e55529",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: '20vh',
    overflow: 'auto',
    paddingTop: '0.5em'
  },
  notesCard: {
    border: "3px solid #009365",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: '20vh',
    overflow: 'auto',
    paddingTop: '0.5em'
  }
}

interface Props {
  classes: Style,
  teacherFirstName: string,
  teacherLastName: string,
  magic8: string,
  firebase: {
    createConferencePlan(teacherId: string, sessionId: string, magic8: string): Promise<void>,
    getConferencePlan(sessionId: string):
      Promise<Array<{
        id: string,
        feedback: Array<string>,
        questions: Array<string>,
        addedQuestions: Array<string>,
        notes: Array<string>,
        date: string}>>,
    saveConferencePlan(conferencePlanId: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>): Promise<void>,
    getCoachFirstName(): Promise<string>,
    getCoachLastName(): Promise<string>
  },
  teacherId: string,
  sessionId: string,
  readOnly: boolean,
  handleEditConferencePlan(): void,
  handleClose?(): void,
  conferencePlanExists: boolean,
  editMode: boolean,
  chosenQuestions: Array<string>
}

interface State {
  feedback: Array<string>,
  questions: Array<string>,
  addedQuestions: Array<string>,
  notes: Array<string>,
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
  textField: string,
  feedbackCard: string,
  questionsCard: string,
  notesCard: string
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
      feedback: [''],
      questions: [''],
      addedQuestions: this.props.chosenQuestions ? this.props.chosenQuestions : [],
      notes: [''],
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

  handleAddFeedback = (): void => {
    this.setState({
      feedback: [...this.state.feedback, '']
    }, () => {console.log('handle add feedback ', this.state.feedback)})
  }

  handleAddQuestion = (): void => {
    this.setState({
      questions: [...this.state.questions, '']
    })
  }

  handleAddNote = (): void => {
    this.setState({
      notes: [...this.state.notes, '']
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
  handleChangeFeedback = (number: number) => (event): void => {
    const newArray = [...this.state.feedback];
    newArray[number] = event.target.value;
    this.setState({
      feedback: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeAddedQuestions = (number: number) => (event): void => {
    const newArray = [...this.state.addedQuestions];
    newArray[number] = event.target.value;
    this.setState({
      addedQuestions: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeQuestions = (number: number) => (event): void => {
    const newArray = [...this.state.questions];
    newArray[number] = event.target.value;
    this.setState({
      questions: newArray,
      saved: false
    });
  }

  /**
   * @param {number} number
   * @return {void}
   */
  handleChangeNotes = (number: number) => (event): void => {
    const newArray = [...this.state.notes];
    newArray[number] = event.target.value;
    this.setState({
      notes: newArray,
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
    .then((conferencePlanData: Array<{id: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>, date: string}>) => {
      if (conferencePlanData[0]) {
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id,
          feedback: conferencePlanData[0].feedback,
          questions: conferencePlanData[0].questions,
          addedQuestions: conferencePlanData[0].addedQuestions,
          notes: conferencePlanData[0].notes,
          date: conferencePlanData[0].date
        })
      } else {
        this.setState({
          conferencePlanExists: false,
          conferencePlanId: '',
          feedback: [''],
          questions: [''],
          addedQuestions: [],
          notes: [''],
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
    this.props.firebase.saveConferencePlan(this.state.conferencePlanId, this.state.feedback, this.state.questions, this.state.addedQuestions, this.state.notes).then(() => {
      console.log("conference plan saved");
    })
    .catch(() => {
      console.log("error with saving conference plan");
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
    if (this.props.editMode != prevProps.editMode) {
      this.getConferencePlan();
    }
    if (this.state.conferencePlanExists != prevState.conferencePlanExists) {
      this.getConferencePlan();
    }
    /* if (this.props.chosenQuestions != prevProps.chosenQuestions) {
      this.handleSave();
    } */
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
    handleEditConferencePlan: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
    conferencePlanExists: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
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
          ) : (
            <div>
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
                      <Button disabled={!this.props.handleEditConferencePlan} onClick={this.props.handleEditConferencePlan}>
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
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
                style={{width: '100%', height: '100%'}}
              >
                <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em', paddingTop: '0.5em'}}>
                  <Card className={classes.feedbackCard}>
                    {this.state.feedback.map((value, index) => {
                      return (
                        <TextField
                          key={index}
                          id={"feedback" + index.toString()}
                          name={"feedback" + index.toString()}
                          type="text"
                          label={index===0 ? "Strengths-Based Feedback" : null}
                          placeholder={"Type your feedback here!"}
                          value={value}
                          onChange={this.handleChangeFeedback(index)}
                          margin="none"
                          variant="standard"
                          fullWidth
                          multiline
                          InputProps={{
                            disableUnderline: true,
                            readOnly: this.props.readOnly,
                            style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                          }}
                          InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                          className={classes.textField}
                        />
                      )
                    })}
                    {!this.props.readOnly ? (
                      <Button onClick={this.handleAddFeedback}>
                        <AddCircleIcon style={{fill: '#094492'}} />
                      </Button>
                    ) : (<div />)}
                  </Card>
                </Grid>
                <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em', paddingTop: '0.5em'}}>
                  <Card className={classes.questionsCard}>
                    {this.state.addedQuestions[0] ? this.state.addedQuestions.map((value, index) => {
                      return (
                        <TextField
                          key={index}
                          id={"addedQuestions" + index.toString()}
                          name={"addedQuestions" + index.toString()}
                          type="text"
                          label={index===0 ? "Reflection Questions" : null}
                          placeholder={index===0 ? "Type your questions here, or add them from the Questions tab!": null}
                          value={value}
                          onChange={this.handleChangeAddedQuestions(index)}
                          margin="none"
                          variant="standard"
                          fullWidth
                          multiline
                          InputProps={{
                            disableUnderline: true,
                            readOnly: this.props.readOnly,
                            style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                          }}
                          InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                          className={classes.textField}
                        />
                      )
                    }) : (<div />)}
                    {this.state.questions.map((value, index) => {
                      return (
                        <TextField
                          key={index}
                          id={"questions" + index.toString()}
                          name={"questions" + index.toString()}
                          type="text"
                          label={!this.state.addedQuestions[0] && index===0 ? "Reflection Questions" : null}
                          placeholder={
                            !this.state.addedQuestions[0] && index===0
                              ? "Type your questions here, or add them from the Questions tab!"
                              : "Type your question here!"
                          }
                          value={value}
                          onChange={this.handleChangeQuestions(index)}
                          margin="none"
                          variant="standard"
                          fullWidth
                          multiline
                          InputProps={{
                            disableUnderline: true,
                            readOnly: this.props.readOnly,
                            style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                          }}
                          InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                          className={classes.textField}
                        />
                      )
                    })}
                    {!this.props.readOnly ? (
                      <Button onClick={this.handleAddQuestion}>
                        <AddCircleIcon style={{fill: '#e55529'}} />
                      </Button>
                    ) : (<div />)}
                  </Card>
                </Grid>
                <Grid item xs={12} style={{width: "100%", paddingBottom: '0.1em', paddingTop: '0.5em'}}>
                  <Card className={classes.notesCard}>
                    {this.state.notes.map((value, index) => {
                      return (
                        <TextField
                          key={index}
                          id={"notes" + index.toString()}
                          name={"notes" + index.toString()}
                          type="text"
                          label={index===0 ? "Notes" : null}
                          placeholder={"Type your note here!"}
                          value={value}
                          onChange={this.handleChangeNotes(index)}
                          margin="none"
                          variant="standard"
                          fullWidth
                          multiline
                          InputProps={{
                            disableUnderline: true,
                            readOnly: this.props.readOnly,
                            style: {fontFamily: "Arimo", width: '98%', marginLeft: '0.5em'}
                          }}
                          InputLabelProps={{style: {fontSize: 20, marginLeft: '0.5em', fontFamily: "Arimo"}}}
                          className={classes.textField}
                        />
                      )
                    })}
                    {!this.props.readOnly ? (
                      <Button onClick={this.handleAddNote}>
                        <AddCircleIcon style={{fill: '#009365'}} />
                      </Button>
                    ) : (<div />)}
                  </Card>
                </Grid>
              </Grid>
            </div>  
          ) : (
            <Button onClick={this.handleCreate}>
              Create Conference Plan
            </Button> 
          ) 
        }     
      </div>
    );
  }
}

export default withStyles(styles)(ConferencePlanForm);