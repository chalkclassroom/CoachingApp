import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid, Typography } from '@material-ui/core';
import TransitionTimeIconImage from "../assets/images/TransitionTimeIconImage.svg"
import ClassroomClimateIconImage from "../assets/images/ClassroomClimateIconImage.svg"
import MathIconImage from "../assets/images/MathIconImage.svg"
import EngagementIconImage from "../assets/images/EngagementIconImage.svg"
import InstructionIconImage from "../assets/images/InstructionIconImage.svg"
import ListeningIconImage from "../assets/images/ListeningIconImage.svg"
import SequentialIconImage from "../assets/images/SequentialIconImage.svg"
import AssocCoopIconImage from "../assets/images/AssocCoopIconImage.svg"
import TransitionTimeNotesImage from "../assets/images/TransitionTimeNotesImage.svg";
import ClassroomClimateNotesImage from "../assets/images/ClassroomClimateNotesImage.svg";
import MathInstructionNotesImage from "../assets/images/MathInstructionNotesImage.svg";
import EngagementNotesImage from "../assets/images/EngagementNotesImage.svg";
import InstructionNotesImage from "../assets/images/InstructionNotesImage.svg";
import ListeningNotesImage from "../assets/images/ListeningNotesImage.svg";
import SequentialNotesImage from "../assets/images/SequentialNotesImage.svg";
import AssocCoopNotesImage from "../assets/images/AssocCoopNotesImage.svg";
import TransitionTimeLookForsImage from "../assets/images/TransitionTimeLookForsImage.svg";
import ClassroomClimateLookForsImage from "../assets/images/ClassroomClimateLookForsImage.svg";
import MathInstructionLookForsImage from "../assets/images/MathInstructionLookForsImage.svg";
import EngagementLookForsImage from "../assets/images/EngagementLookForsImage.svg";
import InstructionLookForsImage from "../assets/images/InstructionLookForsImage.svg";
import ListeningLookForsImage from "../assets/images/ListeningLookForsImage.svg";
import SequentialLookForsImage from "../assets/images/SequentialLookForsImage.svg";
import AssocCoopLookForsImage from "../assets/images/AssocCoopLookForsImage.svg";
import TransitionTimeHelp from "../views/protected/TransitionViews/TransitionTimeHelp";
import ClassroomClimateHelp from "./ClassroomClimateComponent/ClassroomClimateHelp";
import MathInstructionHelp from './MathInstructionComponents/MathInstructionHelp';
import StudentEngagementHelp from './StudentEngagementComponents/StudentEngagementHelp';
import AssocCoopHelp from "../views/protected/AssociativeCooperativeViews/AssocCoopHelp";
import SequentialActivitiesHelp from './SequentialActivitiesComponents/SequentialActivitiesHelp';
import LevelOfInstructionHelp from "../views/protected/LevelOfInstructionViews/LevelOfInstructionHelp.tsx";
import ListeningToChildrenHelp from './ListeningComponents/ListeningToChildrenHelp';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import NotesListDetailTable from './ResultsComponents/NotesListDetailTable';
import FirebaseContext from "./Firebase/FirebaseContext";
import moment from 'moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { changeTeacher } from '../state/actions/teacher';
import { connect } from 'react-redux';
import * as Constants from '../constants';

const TransitionTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.TT
    }
  },
  typography: {
    useNextVariants: true
  }
});
const ClimateTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.CC
    }
  },
  typography: {
    useNextVariants: true
  }
});
const MathTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.MI
    }
  },
  typography: {
    useNextVariants: true
  }
});
const EngagementTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.SE
    }
  },
  typography: {
    useNextVariants: true
  }
});
const InstructionTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.LI
    }
  },
  typography: {
    useNextVariants: true
  }
});
const ListeningTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.LC
    }
  },
  typography: {
    useNextVariants: true
  }
});
const SequentialTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.SA
    }
  },
  typography: {
    useNextVariants: true
  }
});
const ACTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.AC
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = {
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
    flexDirection: "column",
    alignItems: "center",
    justify: "space-evenly",
    display: "flex",
    flex: "1",
    flexWrap: "nowrap"
  },
  iconGrid: {
    marginTop:"10px",
    marginBottom:"5px"
  },
  icon: {
    width: "100px",
    height: "100px"
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
    marginTop: "2vh",
    marginRight: '0.5em',
    marginLeft: '0.5em'
  },
  viewButtons: {
    minWidth: 150,
    textAlign: "center",
    fontFamily: "Arimo",
    width: '20vw'
  },
  viewButtonsSelected: {
    minWidth: 150,
    textAlign: "center",
    color: "#fff",
    fontFamily: "Arimo",
    width: '20vw'
  },
};


/**
 * formatting and functionality for dashboard on results screens
 * @class ResultsDashboard
 */
class ResultsDashboard extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      icon: null,
      lookForsIcon: null,
      notesIcon: null,
      theme: null,
      help: false
    }
  }

  componentDidMount = () => {
    if (this.props.magic8 === "Transition Time") {
      this.setState({
        icon: TransitionTimeIconImage,
        lookForsIcon: TransitionTimeLookForsImage,
        notesIcon: TransitionTimeNotesImage,
        theme: TransitionTheme
      });
    } else if (this.props.magic8 === "Classroom Climate") {
      this.setState({
        icon: ClassroomClimateIconImage,
        lookForsIcon: ClassroomClimateLookForsImage,
        notesIcon: ClassroomClimateNotesImage,
        theme: ClimateTheme
      })
    } else if (this.props.magic8 === "Math Instruction") {
      this.setState({
        icon: MathIconImage,
        lookForsIcon: MathInstructionLookForsImage,
        notesIcon: MathInstructionNotesImage,
        theme: MathTheme
      })
    } else if (this.props.magic8 === "Level of Engagement") {
      this.setState({
        icon: EngagementIconImage,
        lookForsIcon: EngagementLookForsImage,
        notesIcon: EngagementNotesImage,
        theme: EngagementTheme
      })
    } else if (this.props.magic8 === "Level of Instruction") {
      this.setState({
        icon: InstructionIconImage,
        lookForsIcon: InstructionLookForsImage,
        notesIcon: InstructionNotesImage,
        theme: InstructionTheme
      })
    } else if (this.props.magic8 === "Listening to Children") {
      this.setState({
        icon: ListeningIconImage,
        lookForsIcon: ListeningLookForsImage,
        notesIcon: ListeningNotesImage,
        theme: ListeningTheme
      })
    } else if (this.props.magic8 === "Sequential Activities") {
      this.setState({
        icon: SequentialIconImage,
        lookForsIcon: SequentialLookForsImage,
        notesIcon: SequentialNotesImage,
        theme: SequentialTheme
      })
    } else {
      this.setState({
        icon: AssocCoopIconImage,
        lookForsIcon: AssocCoopLookForsImage,
        notesIcon: AssocCoopNotesImage,
        theme: ACTheme
      })
    }
  };

  /**
   * @param {event} event
   */
  changeTeacher = (event) => {
    this.props.changeTeacher(event.target.value);
  };

  handleCloseHelp = () => {
    this.setState({ help: false });
  };

  handleCloseNotes = () => {
    this.setState({ notes: false })
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render() {
    const { classes } = this.props;
    return(
      <div>
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
          : <div />
        ) : this.props.notesModal ? (
          <NotesListDetailTable
            data={this.props.notes}
            magic8={this.props.magic8}
            open={this.props.notesModal}
            teacherSelected={this.props.teacherSelected}
            sessionId={this.props.sessionId}
            addNoteToPlan={this.props.addNoteToPlan}
            conferencePlanId={this.props.conferencePlanId}
            handleClose={this.props.handleCloseNotes}
            style={{overflow:"hidden", minWidth: '100%'}}
          />
        ) : (<div />)}
        <Card className={classes.card}>
          <Grid
            container
            padding={12}
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{marginRight: 20, marginLeft: 20}}
          >
            <Grid item className={classes.iconGrid}>
              <img src={this.state.icon} alt="Magic 8 Icon" className={classes.icon}/>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <TextField
                select
                className={classes.viewButtons}
                label="TEACHER"
                value={this.props.teacherSelected}
                onChange={this.changeTeacher}
                InputLabelProps={{ shrink: true, style: {fontFamily: 'Arimo'} }}
                InputProps={{style: {fontFamily: 'Arimo', fontStyle: 'normal'}}}
              >
                {this.props.teacherList.map((teacher, index)=> 
                  {return <MenuItem key={index} id={teacher.id} value={teacher} style={{fontFamily: 'Arimo'}}>
                    <em>{teacher.firstName + " " + teacher.lastName}</em>
                  </MenuItem>})}
              </TextField>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <TextField
                select
                className={classes.viewButtons}
                label="DATE"
                value={this.props.sessionId}
                onChange={this.props.changeSessionId}
                InputLabelProps={{ shrink: true, style: {fontFamily: 'Arimo'} }}
                InputProps={{style: {fontFamily: 'Arimo', fontStyle: 'normal'}}}
              >
                {this.props.sessionDates.map((date, index)=> 
                  {return <MenuItem key={index} id={date.id} value={date.id} style={{fontFamily: 'Arimo'}}>
                    <em>{moment(date.sessionStart.value).format("MMMM DD YYYY")}</em>
                  </MenuItem>})}
              </TextField>
            </Grid>

            <Grid item className={classes.resultsButtons}>
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
                  onClick={() => this.props.viewClick('data')}
                >
                  Data
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.resultsButtons}>
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
                  onClick={() => this.props.viewClick('questions')}
                >
                  Questions
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.resultsButtons}>
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
                  onClick={() => this.props.viewClick('conferencePlan')}
                >
                  Conference Plan
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <MuiThemeProvider theme={this.state.theme}>
                <Button
                  size="large"
                  color="primary"
                  variant={
                    this.props.view === 'actionPlan'
                      ? "contained"
                      : "outlined"
                  }
                  className={this.props.view === 'actionPlan' ? classes.viewButtonsSelected : classes.viewButtons}
                  onClick={() => this.props.viewClick('actionPlan')}
                >
                  Action Plan
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item style={{marginTop: '2vh'}}>
              <Button onClick={() => this.setState({help: true})}>
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

ResultsDashboard.propTypes = {
  magic8: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  viewClick: PropTypes.func.isRequired,
  changeSessionId: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  sessionDates: PropTypes.array.isRequired,
  conferencePlanId: PropTypes.string,
  addNoteToPlan: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  notes: PropTypes.exact({
    id: PropTypes.string,
    sessionStart: PropTypes.exact({
      value: PropTypes.string
    })
  }).isRequired,
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
};

const mapStateToProps = state => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
    teacherList: state.teacherListState.teachers
  };
};

export default withStyles(styles)(connect(mapStateToProps, { changeTeacher })(ResultsDashboard));