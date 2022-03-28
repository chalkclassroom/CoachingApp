import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField, Popover } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SaveImage from '../assets/images/SaveImage.svg';
import SaveGrayImage from '../assets/images/SaveGrayImage.svg';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as  moment from 'moment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FadeAwayModal from './FadeAwayModal';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import * as Constants from '../constants/Constants';
import * as Types from '../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';
import {generateConferencePlanXlsx} from "../services/xlsxGenerator";
import * as xlsx from "xlsx";

const BlankTheme = createTheme({
  palette: {
    primary: {
      main: '#a3a3a3'
    }
  }
});

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

interface Props {
  classes: Style,
  teacher: Types.Teacher,
  magic8?: string,
  firebase: {
    createConferencePlan(teacherId: string, sessionId: string, magic8: string, feedback?: Array<string>, questions?: Array<string>, addedQuestions?: Array<string>, notes?: Array<string>): Promise<void>,
    getConferencePlan(sessionId: string):
      Promise<Array<{
        id: string,
        feedback: Array<string>,
        questions: Array<string>,
        addedQuestions: Array<string>,
        notes: Array<string>,
        date: {seconds: number, nanoseconds: number}}>>,
    saveConferencePlan(conferencePlanId: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>): Promise<void>,
    completeAppointment(teacherId: string, type: string, tool: string): Promise<void>,
    getCoachFirstName(): Promise<string>,
    getCoachLastName(): Promise<string>
  },
  sessionId?: string,
  readOnly: boolean,
  conferencePlanExists: boolean,
  editMode: boolean,
  chosenQuestions: Array<string>,
  conferencePlanId?: string,
  history?: H.History,
  notesModal: boolean
}

interface State {
  feedback: Array<string>,
  questions: Array<string>,
  addedQuestions: Array<string>,
  notes: Array<string>,
  date: Date,
  editMode: boolean,
  conferencePlanExists: boolean,
  conferencePlanId: string,
  coachFirstName: string,
  coachLastName: string,
  createMode: boolean,
  saved: boolean,
  saveModal: boolean,
  anchorEl: HTMLElement,
  popover: string,
  dialog: boolean,
  savedAlert: boolean
}

interface Style {
  textField: string,
  backButton: string
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
      dialog: false,
      savedAlert: false
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

  /**
   * @return {void}
   */
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
   * @param {number} number
   * @return {void}
   */
  handleChangeFeedback = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
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
  handleChangeAddedQuestions = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
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
  handleChangeQuestions = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
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
  handleChangeNotes = (number: number) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newArray = [...this.state.notes];
    newArray[number] = event.target.value;
    this.setState({
      notes: newArray,
      saved: false
    });
  }

  handleExport = () => {
    let resources = {
    coachFirstName: this.state.coachFirstName,
    coachLastName: this.state.coachLastName,
    teacherFirstName: this.props.teacher.firstName,
    teacherLastName: this.props.teacher.lastName,
    date: this.state.date,
      questions: this.state.questions,
      notes: this.state.notes,
      feedback: this.state.feedback
    }
    let wb = generateConferencePlanXlsx(resources)
    xlsx.writeFile(wb, 'Conference_Plan.xlsx')
  }

  handleCreate = (): void => {
    this.props.firebase.createConferencePlan(this.props.teacher.id, this.props.sessionId, this.props.magic8)
      .then(() => {
        this.props.firebase.completeAppointment(this.props.teacher.id, 'Conference Plan', Constants.ToolAbbreviations[this.props.magic8 as Types.ToolAbbreviationsKey]);
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
    const feedbacks = this.state.feedback.filter(feedback => feedback !== '');
    const questions = this.state.questions.filter(question => question !== '');
    const addedQuestions = this.state.addedQuestions.filter(question => question !== '');;
    const notes = this.state.notes.filter(note => note !== '');
    if (!this.state.conferencePlanId) {
      this.props.firebase.createConferencePlan(this.props.teacher.id, this.props.sessionId, this.props.magic8, feedbacks, questions, addedQuestions, notes)
      .then(() => {
        this.props.firebase.completeAppointment(this.props.teacher.id, 'Conference Plan', Constants.ToolAbbreviations[this.props.magic8 as Types.ToolAbbreviationsKey]);
        this.setState({
          editMode: true,
          conferencePlanExists: true,
          createMode: true,
          saved: true,
          dialog: false
        }, () => {
          this.setState({ savedAlert: true }, () => {
            setTimeout(() => {
              this.setState({ savedAlert: false })
            }, 1500);
          });
          this.getConferencePlan();
        })
      }) 
      .catch(() => {
        console.log('error creating action plan')
      })
    } else {
      this.props.firebase.saveConferencePlan(this.state.conferencePlanId, feedbacks, questions, addedQuestions, notes).then(() => {
        this.props.firebase.completeAppointment(
          this.props.teacher.id,
          'Conference Plan',
          Constants.ToolAbbreviations[this.props.magic8 as Types.ToolAbbreviationsKey]
        );
        console.log("conference plan saved");
        this.setState({
          saved: true,
          dialog: false,
          feedback: feedbacks,
          questions,
          addedQuestions,
          notes,
        }, () => {
          this.setState({ savedAlert: true }, () => {
            setTimeout(() => {
              this.setState({ savedAlert: false })
            }, 1500);
          })
        })
      })
      .catch(() => {
        console.log("error with saving conference plan");
      })
    }
  }

  /**
   * @param {React.SyntheticEvent} e
   */
  onClickAway = (e: React.SyntheticEvent): void => {
    const cp = document.getElementById('cp');
    if (!this.state.saved && !cp.contains(e.target) && !this.state.popover) {
      this.setState({dialog: true})
    }
  }

  handleUndoChanges = (): void => {
    this.getConferencePlan();
    this.setState({
      dialog: false,
      saved: true
    })
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
    if (this.props.notesModal != prevProps.notesModal) {
      this.getConferencePlan();
    }
  }

  static propTypes = {
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
    firebase: PropTypes.exact({
      createConferencePlan: PropTypes.func,
      getConferencePlan: PropTypes.func,
      completeAppointment: PropTypes.func,
      getCoachFirstName: PropTypes.func,
      getCoachLastName: PropTypes.func
    }).isRequired,
    readOnly: PropTypes.bool.isRequired,
    conferencePlanExists: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    chosenQuestions: PropTypes.array.isRequired,
    notesModal: PropTypes.bool.isRequired,
    history: ReactRouterPropTypes.history
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
      <ClickAwayListener onClickAway={(e): void => this.onClickAway(e)}>
        <div style={{width: '100%'}} id='cp'>
          {
            <div>
              <FadeAwayModal open={this.state.savedAlert} text="Saved!" />
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                style={{width: '100%'}}
              >
                <Grid item style={{width: '100%'}}>
                  {this.props.history ? (
                    // view only page
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      style={{width: '100%', paddingTop: '0.5em', paddingBottom: '1em'}}
                    >
                      <Grid item xs={2} />
                      <Grid item xs={8}>
                        <Grid container direction="row" justify="center" alignItems="center" style={{width: '100%'}}>
                          <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                            CONFERENCE PLAN
                          </Typography>
                          <Button onClick={this.handleExport}>
                            Export
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={2} />
                    </Grid>
                  ) : (
                    // results view
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      style={{width: '100%'}}
                    >
                      <Grid item xs={11}>
                        <Typography variant="h4" style={{fontFamily: "Arimo"}}>
                          CONFERENCE PLAN
                        </Typography>
                        <Button onClick={this.handleExport}>
                          Export
                        </Button>
                      </Grid>
                      <Grid item xs={1}>
                        <Button onClick={this.handleSave}>
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
                <Dialog open={this.state.dialog}>
                  <DialogTitle>
                    You must save or undo your changes before navigating away from the page.
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleUndoChanges}>
                      Undo Changes
                    </Button>
                    <Button onClick={this.handleSave}>
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
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
                <Grid item style={{width: "100%", marginBottom: '0.8em', marginTop: '0.4em', border: '2px solid #094492', borderRadius: '0.5em', overflow: 'auto'}}>
                  <Grid container direction="column" style={{width: '100%', height: '22vh'}}>
                    <Grid item style={{width: '100%'}}>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Strengths-Based Feedback
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon
                                style={{ fill: "#094492", marginRight: '0.3em', marginTop: '0.3em' }}
                                onClick={(e: React.SyntheticEvent<Element, Event>): void => this.handlePopoverOpen(e, 'feedback-popover')}
                              />
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
                      <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                        {this.state.feedback.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"feedback" + index.toString()}
                                name={"feedback" + index.toString()}
                                type="text"
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
                            </li>
                          )
                        })}
                      </ul>
                      {!this.props.readOnly ? (
                        <Grid item>
                          <Grid container direction="row" justify="flex-start">
                            <Button onClick={this.handleAddFeedback}>
                              <AddCircleIcon style={{fill: '#094492'}} />
                            </Button>
                          </Grid>
                        </Grid>
                      ) : (<div />)}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{width: "100%", marginBottom: '0.8em', border: '2px solid #e55529', borderRadius: '0.5em', overflow: 'auto'}}>
                  <Grid container direction="column" style={{width: '100%', height: '22vh'}}>
                    <Grid item style={{width: '100%'}}>
                      <Grid container direction="row" justify="flex-start" alignItems="center" style={{width: '100%'}}>
                        <Grid item xs={11}>
                          <Typography style={{fontSize: '1em', fontFamily: 'Arimo', marginLeft: '0.5em', marginTop: '0.5em', fontWeight: 'bold'}}>
                            Reflection Questions
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Grid container justify="flex-end" direction="row" alignItems="center">
                            <Grid item>
                              <InfoIcon
                                style={{ fill: "#e55529", marginRight: '0.3em', marginTop: '0.3em' }}
                                onClick={(e: React.SyntheticEvent<Element, Event>): void => this.handlePopoverOpen(e, 'questions-popover')}
                              />
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
                                        Ask questions that will help teachers reflect <i>and</i>
                                        <br />
                                        plan concrete steps for improvement. 
                                      </Typography>
                                    </li>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Create questions related to the observation
                                        <br />
                                        data that will encourage teachers to reflect on their
                                        <br />
                                        current classroom practices.
                                      </Typography>
                                    </li>
                                    <Typography variant="h6" style={{fontFamily: 'Arimo', paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                                      <b>OR</b>
                                    </Typography>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Select questions from the {" "}
                                        <MuiThemeProvider
                                          theme={
                                            this.props.magic8 === 'Transition Time' ? Constants.TransitionTheme
                                            : this.props.magic8 === 'Classroom Climate' ? Constants.ClimateTheme
                                            : this.props.magic8 === 'Math Instruction' ? Constants.MathTheme
                                            : this.props.magic8 === 'Level of Engagement' ? Constants.EngagementTheme
                                            : this.props.magic8 === 'Level of Instruction' ? Constants.InstructionTheme
                                            : this.props.magic8 === 'Listening to Children' ? Constants.ListeningTheme
                                            : this.props.magic8 === 'Sequential Activities' ? Constants.SequentialTheme
                                            : this.props.magic8 === 'Literacy Instruction' ? Constants.LiteracyTheme
                                            : this.props.magic8 === 'AC' ? Constants.ACTheme
                                            : BlankTheme
                                          }
                                        >
                                          <Button color="primary" size="small" variant="outlined">
                                            Questions
                                          </Button>
                                        </MuiThemeProvider>
                                        {" "} tab.
                                      </Typography>
                                    </li>
                                  </ul>
                                </div>
                              </Popover>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                        {this.state.addedQuestions[0] ? this.state.addedQuestions.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"addedQuestions" + index.toString()}
                                name={"addedQuestions" + index.toString()}
                                type="text"
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
                            </li>
                          )
                        }) : (<div />)}
                        {this.state.questions.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"questions" + index.toString()}
                                name={"questions" + index.toString()}
                                type="text"
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
                            </li>
                          )
                        })}
                      </ul>
                      {!this.props.readOnly ? (
                        <Grid item>
                          <Grid container direction="row" justify="flex-start">
                            <Button onClick={this.handleAddQuestion}>
                              <AddCircleIcon style={{fill: '#e55529'}} />
                            </Button>
                          </Grid>
                        </Grid>
                      ) : (<div />)}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{width: "100%", border: '2px solid #009365', borderRadius: '0.5em', overflow: 'auto'}}>
                  <Grid container direction="column" style={{width: '100%', height: '22vh'}}>
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
                              <InfoIcon
                                style={{ fill: "#009365", marginRight: '0.3em', marginTop: '0.3em' }}
                                onClick={(e: React.SyntheticEvent<Element, Event>): void => this.handlePopoverOpen(e, 'notes-popover')}
                              />
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
                                        Add an observation note from the Notes tab.
                                      </Typography>
                                    </li>
                                    <Typography variant="h6" style={{fontFamily: 'Arimo', paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                                      <b>AND / OR</b>
                                    </Typography>
                                    <li>
                                      <Typography variant="h6" style={{fontFamily: 'Arimo'}}>
                                        Write a new note.
                                      </Typography>
                                    </li>
                                  </ul>
                                </div>
                              </Popover>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <ul style={{paddingLeft: '1.5em', marginTop: '0.5em', marginBottom: 0}}>
                        {this.state.notes.map((value, index) => {
                          return (
                            <li key={index}>
                              <TextField
                                id={"notes" + index.toString()}
                                name={"notes" + index.toString()}
                                type="text"
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
                            </li>
                          )
                        })}
                      </ul>
                      {!this.props.readOnly ? (
                        <Grid item>
                          <Grid container direction="row" justify="flex-start">
                            <Button onClick={this.handleAddNote}>
                              <AddCircleIcon style={{fill: '#009365'}} />
                            </Button>
                          </Grid>
                        </Grid>
                      ) : (<div />)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          }     
        </div>
      </ClickAwayListener>
    );
  }
}

export default withStyles(styles)(ConferencePlanForm);