import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditImage from '../assets/images/EditImage.svg';
import SaveImage from '../assets/images/SaveImage.svg';
import CloseImage from '../assets/images/CloseImage.svg';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import moment from 'moment';

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
  teacher: Teacher,
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
        date: {seconds: number, nanoseconds: number}}>>,
    saveConferencePlan(conferencePlanId: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>): Promise<void>,
    getCoachFirstName(): Promise<string>,
    getCoachLastName(): Promise<string>
  },
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
  date: Date,
  actionSteps: string,
  actionStepsArray: Array<{step: string, materials: string, person: string, timeline: string}>,
  editMode: boolean,
  conferencePlanExists: boolean,
  conferencePlanId: string,
  coachFirstName: string,
  coachLastName: string,
  createMode: boolean,
  saved: boolean,
  saveModal: boolean,
  anchorEl: HTMLElement,
  popover: string
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
      date: new Date(),
      actionSteps: '',
      actionStepsArray: [{step: '', materials: '', person: '', timeline: ''}],
      editMode: false,
      conferencePlanExists: this.props.conferencePlanExists,
      conferencePlanId: '',
      coachFirstName: '',
      coachLastName: '',
      createMode: false,
      saved: true,
      saveModal: false,
      anchorEl: null,
      popover: '',
    }
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
    this.props.firebase.createConferencePlan(this.props.teacher.id, this.props.sessionId, this.props.magic8)
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
    .then((conferencePlanData: Array<{id: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>, date: {seconds: number, nanoseconds: number}}>) => {
      if (conferencePlanData[0]) {
        const newDate = new Date(0);
        newDate.setUTCSeconds(conferencePlanData[0].date.seconds);
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id,
          feedback: conferencePlanData[0].feedback,
          questions: conferencePlanData[0].questions,
          addedQuestions: conferencePlanData[0].addedQuestions,
          notes: conferencePlanData[0].notes,
          date: newDate
        })
      } else {
        this.setState({
          conferencePlanExists: false,
          conferencePlanId: '',
          feedback: [''],
          questions: [''],
          addedQuestions: [],
          notes: [''],
          date: new Date()
        })
      }
    })
  }

  /**
   * saves action plan by updating Cloud Firestore records
   * @return {void}
   */
  handleSave = (): void => {
    this.props.firebase.saveConferencePlan(this.state.conferencePlanId, this.state.feedback, this.state.questions, this.state.addedQuestions, this.state.notes).then(() => {
      console.log("conference plan saved");
      this.setState({
        saved: true
      })
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
    const feedbackOpen = Boolean(this.state.popover === 'feedback-popover');
    const questionsOpen = Boolean(this.state.popover === 'questions-popover');
    const notesOpen = Boolean(this.state.popover === 'notes-popover');
    const feedbackId = feedbackOpen ? 'feedback-popover' : undefined;
    const questionsId = questionsOpen ? 'questions-popover' : undefined;
    const notesId = notesOpen ? 'notes-popover' : undefined;
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
              </Grid>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
                style={{width: '100%'}}
              >
                <Grid item xs={12} style={{width: "100%", marginBottom: '0.8em', marginTop: '0.4em', border: '2px solid #094492', borderRadius: '0.5em', overflow: 'auto'}}>
                <Grid container direction="column" style={{width: '100%', height: '21vh'}}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Strengths-Based Feedback
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon style={{ fill: "#094492", marginRight: '0.3em', marginTop: '0.3em' }} onClick={(e): void => this.handlePopoverOpen(e, 'feedback-popover')}/>
                              <Popover
                                id={feedbackId}
                                open={feedbackOpen}
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
                                    Strengths-Based Feedback
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Note specific examples from the classroom observation
                                        <br />
                                        that validate the teacher&apos;s knowledge and skills.
                                        <br />
                                        This helps the teacher reflect on how her practices
                                        <br />
                                        influence student learning.
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        It&apos;s important to note that strengths-based feedback
                                        <br />
                                        does not highlight a practice that the teacher has
                                        <br />
                                        already mastered; rather, it draws attention to 
                                        <br />
                                        one strategy the teacher does well in an area for
                                        <br />
                                        overall growth.   
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
                  {/* <Card className={classes.feedbackCard}> */}
                    {this.state.feedback.map((value, index) => {
                      return (
                        <TextField
                          key={index}
                          id={"feedback" + index.toString()}
                          name={"feedback" + index.toString()}
                          type="text"
                          // label={index===0 ? "Strengths-Based Feedback" : null}
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
                  {/* </Card> */}
                </Grid>
                </Grid>
                <Grid item xs={12} style={{width: "100%", marginBottom: '0.8em', border: '2px solid #e55529', borderRadius: '0.5em', overflow: 'auto'}}>
                <Grid container direction="column" style={{width: '100%', height: '21vh'}}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Reflection Questions
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon style={{ fill: "#e55529", marginRight: '0.3em', marginTop: '0.3em' }} onClick={(e): void => this.handlePopoverOpen(e, 'questions-popover')}/>
                              <Popover
                                id={questionsId}
                                open={questionsOpen}
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
                                    Reflection Questions
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Select or create questions related to the observation
                                        <br />
                                        data that will encourage teachers to reflect on their
                                        <br />
                                        current classroom practices.
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Ask questions that will help teachers reflect <i>and</i>
                                        <br />
                                        plan concrete steps for improvement. 
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
                    {this.state.addedQuestions[0] ? this.state.addedQuestions.map((value, index) => {
                      return (
                        <TextField
                          key={index}
                          id={"addedQuestions" + index.toString()}
                          name={"addedQuestions" + index.toString()}
                          type="text"
                          // label={index===0 ? "Reflection Questions" : null}
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
                          // label={!this.state.addedQuestions[0] && index===0 ? "Reflection Questions" : null}
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
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{width: "100%", border: '2px solid #009365', borderRadius: '0.5em', overflow: 'auto'}}>
                <Grid container direction="column" style={{width: '100%', height: '21vh'}}>
                    <Grid item>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Notes
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon style={{ fill: "#009365", marginRight: '0.3em', marginTop: '0.3em' }} onClick={(e): void => this.handlePopoverOpen(e, 'notes-popover')}/>
                              <Popover
                                id={notesId}
                                open={notesOpen}
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
                                    Notes
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Add an observation from the notes tab or write a 
                                        <br />
                                        new note.
                                      </Typography>
                                    </li>
                                    {/* <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Write a new note.
                                      </Typography>
                                    </li> */}
                                  </ul>
                                </div>
                              </Popover>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {this.state.notes.map((value, index) => {
                      return (
                        <TextField
                          key={index}
                          id={"notes" + index.toString()}
                          name={"notes" + index.toString()}
                          type="text"
                          // label={index===0 ? "Notes" : null}
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
                  </Grid>
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