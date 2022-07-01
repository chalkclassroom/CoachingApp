import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid, Typography } from '@material-ui/core';
import TransitionTimeIconImage from "../assets/images/TransitionTimeIconImage.svg"
import ClassroomClimateIconImage from "../assets/images/ClassroomClimateIconImage.svg"
import MathIconImage from "../assets/images/MathIconImage.svg"
import EngagementIconImage from "../assets/images/EngagementIconImage.svg"
import InstructionIconImage from "../assets/images/InstructionIconImage.svg"
import ListeningIconImage from "../assets/images/ListeningIconImage.svg"
import SequentialIconImage from "../assets/images/SequentialIconImage.svg"
import LiteracyIconImage from '../assets/images/LiteracyIconImage.svg';
import AssocCoopIconImage from "../assets/images/AssocCoopIconImage.svg"
import TransitionTimeNotesImage from "../assets/images/TransitionTimeNotesImage.svg";
import ClassroomClimateNotesImage from "../assets/images/ClassroomClimateNotesImage.svg";
import MathInstructionNotesImage from "../assets/images/MathInstructionNotesImage.svg";
import EngagementNotesImage from "../assets/images/EngagementNotesImage.svg";
import InstructionNotesImage from "../assets/images/InstructionNotesImage.svg";
import ListeningNotesImage from "../assets/images/ListeningNotesImage.svg";
import SequentialNotesImage from "../assets/images/SequentialNotesImage.svg";
import LiteracyInstructionNotesImage from '../assets/images/LiteracyInstructionNotesImage.svg';
import AssocCoopNotesImage from "../assets/images/AssocCoopNotesImage.svg";
import TransitionTimeLookForsImage from "../assets/images/TransitionTimeLookForsImage.svg";
import ClassroomClimateLookForsImage from "../assets/images/ClassroomClimateLookForsImage.svg";
import MathInstructionLookForsImage from "../assets/images/MathInstructionLookForsImage.svg";
import EngagementLookForsImage from "../assets/images/EngagementLookForsImage.svg";
import InstructionLookForsImage from "../assets/images/InstructionLookForsImage.svg";
import ListeningLookForsImage from "../assets/images/ListeningLookForsImage.svg";
import SequentialLookForsImage from "../assets/images/SequentialLookForsImage.svg";
import LiteracyInstructionLookForsImage from '../assets/images/LiteracyInstructionLookForsImage.svg';
import AssocCoopLookForsImage from "../assets/images/AssocCoopLookForsImage.svg";
import TransitionTimeHelp from "../views/protected/TransitionViews/TransitionTimeHelp";
import ClassroomClimateHelp from "./ClassroomClimateComponent/ClassroomClimateHelp";
import MathInstructionHelp from './MathInstructionComponents/MathInstructionHelp';
import StudentEngagementHelp from './StudentEngagementComponents/StudentEngagementHelp';
import AssocCoopHelp from "../views/protected/AssociativeCooperativeViews/AssocCoopHelp";
import SequentialActivitiesHelp from './SequentialActivitiesComponents/SequentialActivitiesHelp';
import LevelOfInstructionHelp from "../views/protected/LevelOfInstructionViews/LevelOfInstructionHelp";
import ListeningToChildrenHelp from './ListeningComponents/ListeningToChildrenHelp';
import LiteracyInstructionHelp from './LiteracyComponents/LiteracyInstructionHelp';
import { TextField, MenuItem } from '@material-ui/core';
import NotesListDetailTable from './ResultsComponents/NotesListDetailTable';
import * as moment from 'moment';
import { MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { changeTeacher } from '../state/actions/teacher';
import { connect } from 'react-redux';
import * as Constants from '../constants/Constants';
import * as Types from '../constants/Types';
import {FirebaseContext} from "./Firebase";

const styles: object = {
  card: {
    border: "3px solid #d9d9d9",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "100%",
    boxShadow: "5px",
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
    marginBottom: "5%",
    alignItems: "center",
    justify: "space-evenly",
    display: "flex",
    flexDirection: 'column',
    flex: "1",
    flexWrap: 'nowrap'
  },
  icon: {
    width: "6em",
    height: "6em"
  },
  infoDisplayGrid: {
    height: "41vh",
    width:"90%",
    marginLeft:"5px",
    marginRight:"5px",
    marginTop:"5px",
    marginBottom:"5px",
    display: "flex",
    justifyItems: "center"
  },
  helpIcon: {
    width: "60px"
  },
  completeGrid: {
    marginTop: "5px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    alignContent: "flex-end",
    display: "flex"
  },
  gridTopMargin: {
    marginTop: "5px"
  },
  resultsButtons: {
    marginRight: '0.5em',
    marginLeft: '0.5em'
  },
  viewButtons: {
    minWidth: 150,
    fontFamily: "Arimo",
    width: '20vw'
  },
  viewButtonsSelected: {
    minWidth: 150,
    color: "#fff",
    fontFamily: "Arimo",
    width: '20vw'
  },
  button: {
    paddingTop: '0.7em'
  },
  grid: {
    direction: 'column'
  },
  // ipad portait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    grid: {
      direction: 'row'
    },
    card: {
      marginBottom: 0
    }
  }
};

interface Style {
  card: string,
  icon: string,
  infoDisplayGrid: string,
  helpIcon: string,
  completeGrid: string,
  gridTopMargin: string,
  resultsButtons: string,
  viewButtons: string,
  viewButtonsSelected: string,
  grid: string,
  button: string
}

interface Props {
  magic8: string,
  changeTeacher(teacher: string): void,
  classes: Style,
  view: string,
  viewClick(name: string): void,
  sessionId: string,
  conferencePlanId?: string,
  addNoteToPlan(conferencePlanId: string, note: string): void,
  changeSessionId(event: React.SyntheticEvent): void,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  notes: Array<{content: string, timestamp: string, id:string}>,
  handleOpenNotes(): void,
  handleCloseNotes(): void,
  notesModal: boolean,
  teacherSelected: Types.Teacher,
  teacherList: Array<Types.Teacher>,
  literacyType?: string
}

interface State {
  auth: boolean,
  icon: string,
  lookForsIcon: string,
  notesIcon: string,
  theme: Theme,
  help: boolean
}

/**
 * formatting and functionality for dashboard on results screens
 * @class ResultsDashboard
 */
class ResultsDashboard extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      auth: true,
      icon: '',
      lookForsIcon: '',
      notesIcon: '',
      theme: null,
      help: false
    }
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (this.props.magic8 === "Transition Time") {
      this.setState({
        icon: TransitionTimeIconImage,
        lookForsIcon: TransitionTimeLookForsImage,
        notesIcon: TransitionTimeNotesImage,
        theme: Constants.TransitionTheme
      });
    } else if (this.props.magic8 === "Classroom Climate") {
      this.setState({
        icon: ClassroomClimateIconImage,
        lookForsIcon: ClassroomClimateLookForsImage,
        notesIcon: ClassroomClimateNotesImage,
        theme: Constants.ClimateTheme
      })
    } else if (this.props.magic8 === "Math Instruction") {
      this.setState({
        icon: MathIconImage,
        lookForsIcon: MathInstructionLookForsImage,
        notesIcon: MathInstructionNotesImage,
        theme: Constants.MathTheme
      })
    } else if (this.props.magic8 === "Level of Engagement") {
      this.setState({
        icon: EngagementIconImage,
        lookForsIcon: EngagementLookForsImage,
        notesIcon: EngagementNotesImage,
        theme: Constants.EngagementTheme
      })
    } else if (this.props.magic8 === "Level of Instruction") {
      this.setState({
        icon: InstructionIconImage,
        lookForsIcon: InstructionLookForsImage,
        notesIcon: InstructionNotesImage,
        theme: Constants.InstructionTheme
      })
    } else if (this.props.magic8 === "Listening to Children") {
      this.setState({
        icon: ListeningIconImage,
        lookForsIcon: ListeningLookForsImage,
        notesIcon: ListeningNotesImage,
        theme: Constants.ListeningTheme
      })
    } else if (this.props.magic8 === "Sequential Activities") {
      this.setState({
        icon: SequentialIconImage,
        lookForsIcon: SequentialLookForsImage,
        notesIcon: SequentialNotesImage,
        theme: Constants.SequentialTheme
      })
    } else if (this.props.magic8 === "Literacy Instruction") {
      this.setState({
        icon: LiteracyIconImage,
        lookForsIcon: LiteracyInstructionLookForsImage,
        notesIcon: LiteracyInstructionNotesImage,
        theme: Constants.LiteracyTheme
      })
    } else {
      this.setState({
        icon: AssocCoopIconImage,
        lookForsIcon: AssocCoopLookForsImage,
        notesIcon: AssocCoopNotesImage,
        theme: Constants.ACTheme
      })
    }
  };

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  changeTeacher = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    this.props.changeTeacher(event.target.value);
  };

  handleCloseHelp = (): void => {
    this.setState({ help: false });
  };

  static propTypes = {
    magic8: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    viewClick: PropTypes.func.isRequired,
    changeSessionId: PropTypes.func.isRequired,
    sessionId: PropTypes.string.isRequired,
    sessionDates: PropTypes.array.isRequired,
    conferencePlanId: PropTypes.string,
    addNoteToPlan: PropTypes.func.isRequired,
    classes: PropTypes.exact({
      card: PropTypes.string,
      icon: PropTypes.string,
      infoDisplayGrid: PropTypes.string,
      helpIcon: PropTypes.string,
      completeGrid: PropTypes.string,
      gridTopMargin: PropTypes.string,
      resultsButtons: PropTypes.string,
      viewButtons: PropTypes.string,
      viewButtonsSelected: PropTypes.string,
      grid: PropTypes.string,
      button: PropTypes.string
    }).isRequired,
    notes: PropTypes.array.isRequired,
    changeTeacher: PropTypes.func.isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired,
    teacherList: PropTypes.array.isRequired,
    notesModal: PropTypes.bool.isRequired,
    handleOpenNotes: PropTypes.func.isRequired,
    handleCloseNotes: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return(
      <div style={{width: '100%'}}>
        {this.state.help ? (
          this.props.magic8 === "Transition Time" ? 
            <TransitionTimeHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "Classroom Climate" ?
            <ClassroomClimateHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "Math Instruction" ? 
            <MathInstructionHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "Level of Engagement" ?
            <StudentEngagementHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "AC" ?
            <AssocCoopHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "Sequential Activities" ?
            <SequentialActivitiesHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "Level of Instruction" ?
            <LevelOfInstructionHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "Listening to Children" ? 
            <ListeningToChildrenHelp open={this.state.help} close={this.handleCloseHelp} />
          : this.props.magic8 === "Literacy Instruction" ? 
            <LiteracyInstructionHelp open={this.state.help} close={this.handleCloseHelp} type={this.props.literacyType ? this.props.literacyType : ''} />
          : <div />
        ) : this.props.notesModal ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <NotesListDetailTable
            data={this.props.notes}
            magic8={this.props.magic8}
            open={this.props.notesModal}
            addNoteToPlan={this.props.addNoteToPlan}
            conferencePlanId={this.props.conferencePlanId}
            handleClose={this.props.handleCloseNotes}
            sessionId={this.props.sessionId}
            firebase={firebase}
          />)}
          </FirebaseContext.Consumer>
        ) : (<div />)}
        <Card className={classes.card}>
          <Grid
            container
            justify="space-evenly"
            alignItems="center"
            className={classes.grid}
          >
            <Grid item className={classes.resultsButtons}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.button}>
                  <img src={this.state.icon} alt="Magic 8 Icon" className={classes.icon}/>
                </Grid>
                <Grid item className={classes.button}>
                  <TextField
                    select
                    className={classes.viewButtons}
                    label="TEACHER"
                    value={this.props.teacherSelected}
                    onChange={this.changeTeacher}
                    InputLabelProps={{ shrink: true, style: {fontFamily: 'Arimo'} }}
                    InputProps={{style: {fontFamily: 'Arimo', fontStyle: 'normal', textAlign: 'center'}}}
                  >
                    {this.props.teacherList.map((teacher, index)=> 
                      {return <MenuItem key={index} id={teacher.id} value={teacher} style={{fontFamily: 'Arimo'}}>
                        <em>{teacher.firstName + " " + teacher.lastName}</em>
                      </MenuItem>})}
                  </TextField>
                </Grid>
                <Grid item className={classes.button} style={{paddingBottom: '0.5em'}}>
                  <TextField
                    select
                    className={classes.viewButtons}
                    label="DATE"
                    value={this.props.sessionId}
                    onChange={this.props.changeSessionId}
                    InputLabelProps={{ shrink: true, style: {fontFamily: 'Arimo'} }}
                    InputProps={{style: {fontFamily: 'Arimo', fontStyle: 'normal', textAlign: 'center'}}}
                  >
                    {this.props.sessionDates.map((date, index)=> 
                      {return <MenuItem key={index} id={date.id} value={date.id} style={{fontFamily: 'Arimo'}}>
                        <em>{moment(date.sessionStart.value).format("MMMM DD YYYY")}</em>
                      </MenuItem>})}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={this.state.theme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'data'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'data' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('data')}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          fontFamily: 'Arimo',
                          color: (
                            this.props.magic8 === 'Listening to Children' ||
                            this.props.magic8 === 'Sequential Activities'
                          ) ? "black" : "primary"
                        }}
                      >
                        Data
                      </Typography>
                    </Button>
                  </MuiThemeProvider>
                </Grid>
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={this.state.theme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'questions'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'questions' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('questions')}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          fontFamily: 'Arimo',
                          color: (
                            this.props.magic8 === 'Listening to Children' ||
                            this.props.magic8 === 'Sequential Activities'
                          ) ? "black" : "primary"
                        }}
                      >
                        Coaching Questions
                      </Typography>
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={this.state.theme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'conferencePlan'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'conferencePlan' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('conferencePlan')}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          fontFamily: 'Arimo',
                          color: (
                            this.props.magic8 === 'Listening to Children' ||
                            this.props.magic8 === 'Sequential Activities'
                          ) ? "black" : "primary"
                        }}
                      >
                        Conference Plan
                      </Typography>
                    </Button>
                  </MuiThemeProvider>
                </Grid>
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={this.state.theme}>
                    <Button
                      size="large"
                      color='primary'
                      variant={
                        this.props.view === 'actionPlan'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'actionPlan' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('actionPlan')}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          fontFamily: 'Arimo',
                          color: (
                            this.props.magic8 === 'Listening to Children' ||
                            this.props.magic8 === 'Sequential Activities'
                          ) ? "black" : "primary"
                        }}
                      >
                        Action Plan
                      </Typography>
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{marginTop: '2vh'}} className={classes.resultsButtons}>
              <Button onClick={(): void => this.setState({help: true})}>
                <img
                  src={this.state.lookForsIcon}
                  alt="Look-Fors"
                  className={classes.helpIcon}
                />
              </Button>
              <Button onClick={this.props.handleOpenNotes}>
                <img
                  src={this.state.notesIcon}
                  alt="Notes"
                  className={classes.helpIcon}
                />
              </Button>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherSelected: Types.Teacher,
  teacherList: Array<Types.Teacher>
} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
    teacherList: state.teacherListState.teachers
  };
};

export default withStyles(styles)(connect(mapStateToProps, { changeTeacher })(ResultsDashboard));