import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import InstructionTypeDetailsChart from "../../../components/LevelOfInstructionComponents/ResultsComponents/InstructionTypeDetailsChart";
import LevelOfInstructionCoachingQuestions from "../../../components/LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionCoachingQuestions";
import LevelOfInstructionSummaryChart from "../../../components/LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionSummaryChart";
import LevelOfInstructionTrendsGraph from "../../../components/LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionTrendsGraph";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import FadeAwayModal from '../../../components/FadeAwayModal';
import { connect } from 'react-redux';
import TeacherModal from '../HomeViews/TeacherModal';
import * as Types from '../../../constants/Types';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
  },
  comparisonText: {
    paddingLeft: '1em',
    lineHeight: '0.8em',
    fontFamily: 'Arimo'
  }
};

interface Props {
  classes: Style,
  teacherSelected: Types.Teacher,
  location: {
    state: {
      sessionId: string
    }
  },
}

interface Style {
  root: string,
  comparisonText: string
}

interface State {
  hlqCount: number, 
  hlqResponseCount: number,
  llqCount: number,
  llqResponseCount: number,
  sessionId: string,
  conferencePlanId: string,
  trendsDates: Array<string>,
  trendsHlq: Array<number>,
  trendsHlqResponse: Array<number>,
  trendsLlq: Array<number>,
  trendsLlqResponse: Array<number>,
  notes: Array<{id: string, content: string, timestamp: string}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  noteAdded: boolean,
  questionAdded: boolean,
  teacherModal: boolean,
  noDataYet: boolean
}

/**
 * Level Of Instruction Results
 * @class LevelOfInstructionResultsPage
 */
class LevelOfInstructionResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      hlqCount: 0,      
      hlqResponseCount: 0,
      llqCount: 0,
      llqResponseCount: 0,              
      sessionId: '',
      conferencePlanId: '',
      trendsDates: [],
      trendsHlq: [],
      trendsHlqResponse: [],
      trendsLlq: [],                   
      trendsLlqResponse: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noteAdded: false,
      questionAdded: false,
      teacherModal: false,
      noDataYet: false
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (this.props.teacherSelected) {
      const teacherId = this.props.teacherSelected.id;
      this.handleDateFetching(teacherId);
      this.handleTrendsFetching(teacherId);
    } else {
      this.setState({ teacherModal: true })
    }
  }

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  }

  /** 
   * lifecycle method invoked after component updates 
   * @param {Props} prevProps
   */
  componentDidUpdate(prevProps: Props): void {
    if (this.props.teacherSelected != prevProps.teacherSelected) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetching(this.props.teacherSelected.id);
    }
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetching = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<string> = [];
    const hlqArray: Array<number> = []; 
    const hlqResponseArray: Array<number> = [];
    const llqArray: Array<number> = [];
    const llqResponseArray: Array<number> = [];
    firebase.fetchInstructionTrend(teacherId).then((dataSet: Array<{dayOfEvent: {value: string}, hlq: number, hlqResponse: number, llq: number, llqResponse: number}>) => {                       
      dataSet.forEach((data: {dayOfEvent: {value: string}, hlq: number, hlqResponse: number, llq: number, llqResponse: number}) => { 
        dateArray.push(moment(data.dayOfEvent.value).format("MMM Do YYYY"));
        hlqArray.push(Math.round((data.hlq / (data.hlq + data.hlqResponse + data.llq + data.llqResponse)) * 100));
        hlqResponseArray.push(Math.round((data.hlqResponse / (data.hlq + data.hlqResponse + data.llq + data.llqResponse)) * 100));
        llqArray.push(Math.round((data.llq / (data.hlq + data.hlqResponse + data.llq + data.llqResponse)) * 100));
        llqResponseArray.push(Math.round((data.llqResponse / (data.hlq + data.hlqResponse + data.llq + data.llqResponse)) * 100));
      });
      this.setState({
        trendsDates: dateArray,
        trendsHlq: hlqArray,
        trendsHlqResponse: hlqResponseArray,
        trendsLlq: llqArray,
        trendsLlqResponse: llqResponseArray
      });
    });
  };

  /**
   * @param {string} sessionId
   */
  handleNotesFetching = (sessionId: string): void => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: {seconds: number, nanoseconds: number}}>) => {
      const formattedNotesArr: Array<{id: string, content: string, timestamp: string}> = [];
      notesArr.forEach(note => {
        const newTimestamp = new Date(
          note.timestamp.seconds * 1000
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        });
        formattedNotesArr.push({
          id: note.id,
          content: note.content,
          timestamp: newTimestamp
        });
      });
      this.setState({
        notes: formattedNotesArr
      });
    });
  };

  /**
   * @param {string} teacherId
   */
  handleDateFetching = (teacherId: string): void => {
    const firebase = this.context;
    this.setState({
      hlqCount: 0,      
      hlqResponseCount: 0,
      llqCount: 0,
      llqResponseCount: 0,              
      sessionId: '',
      conferencePlanId: '',
      trendsDates: [],
      trendsHlq: [],                   
      trendsHlqResponse: [],       
      trendsLlq: [],                   
      trendsLlqResponse: [],             
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noDataYet: false
    }, () => {
      firebase.fetchSessionDates(teacherId, "level").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>
        {if (dates[0]) {
          this.setState({
            sessionDates: dates,
            noDataYet: false
          }, () => {
            if (this.state.sessionDates[0]) {
              this.setState({ sessionId: (this.props.location.state !== undefined && this.props.location.state.sessionId !== undefined) ? this.props.location.state.sessionId : this.state.sessionDates[0].id },
                () => {
                  this.getData();
                }
              );
            }
          })
        } else {
          this.setState({
            noDataYet: true
          })
        }}
      );
    })
  };

  trendsFormatData = (): {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      data: Array<number>,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      borderDash?: Array<number>
    }>
  } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "High-Level Question",
          data: this.state.trendsHlq,
          backgroundColor: "#6aa84fff",
          borderColor: "#6aa84fff",
          fill: false,
          lineTension: 0,
        },
        {
          label: "Response to High-Level Question",
          data: this.state.trendsHlqResponse,
          backgroundColor: "#6aa84fff",
          borderColor: "#6aa84fff",
          fill: false,
          lineTension: 0,
          borderDash: [5, 5]
        },
        {
          label: "Low-Level Question",
          data: this.state.trendsLlq,
          backgroundColor: "#6d9eeb",
          borderColor: "#6d9eeb",
          fill: false,
          lineTension: 0,
        },
        {
          label: "Response to Low-Level Question",
          data: this.state.trendsLlqResponse,
          backgroundColor: "#6d9eeb",
          borderColor: "#6d9eeb",
          fill: false,
          lineTension: 0,
          borderDash: [5, 5]
        }
      ]
    };
  };

  getData = (): void => {
    const firebase = this.context;
    let specificSkillCount = 0;
    let lowLevelCount = 0;
    let highLevelQuesCount = 0;
    let followUpCount = 0;
    this.handleNotesFetching(this.state.sessionId);

    firebase.getConferencePlan(this.state.sessionId).then((
      conferencePlanData: Array<{
        id: string,
        feedback: string,
        questions: Array<string>,
        notes: string,
        date: Date
      }>
    ) => {
      if (conferencePlanData[0]) {
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id
        })
      } else {
        this.setState({
          conferencePlanExists: false,
          conferencePlanId: ''
        })
      }
    }).catch(() => {
      console.log('unable to retrieve conference plan')
    })
    firebase.fetchInstructionTypeCount(this.state.sessionId).then((json: Array<{instructionType: string, count: number}>) => {  
      json.forEach(instruction => {
        // if (type === old term || type === new term)                             
        if (instruction.instructionType === "specificSkill" || instruction.instructionType === "llqResponse") { 
          specificSkillCount = instruction.count;                       
        } else if (instruction.instructionType === "lowLevel" || instruction.instructionType === "llq") {    
          lowLevelCount = instruction.count;                                 
        } else if (instruction.instructionType === "highLevel" || instruction.instructionType === "hlq") {            
          highLevelQuesCount = instruction.count;                                 
        } else if (instruction.instructionType === "followUp" || instruction.instructionType === "hlqResponse") {            
          followUpCount = instruction.count;                                 
        }
      });
      this.setState({
        hlqResponseCount: followUpCount,                          
        hlqCount: highLevelQuesCount,
        llqCount: lowLevelCount,
        llqResponseCount: specificSkillCount                                  
      });
    });
  }

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  changeSessionId = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.getData();
      }
    );
  };

  /**
   * @param {string} conferencePlanId
   * @param {string} note
   */
  addNoteToPlan = (conferencePlanId: string, note: string): void => {
    const firebase = this.context;
    if (!conferencePlanId) {
      firebase.createConferencePlan(this.props.teacherSelected.id, this.state.sessionId, 'Level of Instruction')
        .then(() => {
          firebase.getConferencePlan(this.state.sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
            if (conferencePlanData[0]) {
              this.setState({
                conferencePlanExists: true,
                conferencePlanId: conferencePlanData[0].id
              })
            } else {
              this.setState({
                conferencePlanExists: false,
                conferencePlanId: ''
              })
            }
          }).then(() => {
            firebase.addNoteToConferencePlan(this.state.conferencePlanId, note)
            .then(() => {
              this.setState({ noteAdded: true }, () => {
                setTimeout(() => {
                  this.setState({ noteAdded: false })
                }, 1500);
              })
            })
          })
        })
    } else {
      firebase.addNoteToConferencePlan(conferencePlanId, note)
      .then(() => {
        this.setState({ noteAdded: true }, () => {
          setTimeout(() => {
            this.setState({ noteAdded: false })
          }, 1500);
        })
      })
    }
  }

  /**
   * checks if question has already been added and if not, adds it
   * @param {string} panelTitle
   * @param {number} index
   * @param {string} question
   * @param {string} sessionId
   * @param {string} teacherId
   * @param {string} magic8
   */
  handleAddToPlan = (panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void => {
    const firebase = this.context;
    const itemIndex = this.state.addedToPlan.findIndex(e => e.panel === panelTitle && e.number === index);
    if (itemIndex === -1) {
      this.setState({ addedToPlan: [...this.state.addedToPlan, {panel: panelTitle, number: index, question: question}] });
    } else {
      const newArray = [...this.state.addedToPlan];
      newArray.splice(itemIndex, 1);
      this.setState({ addedToPlan: newArray });
    }
    firebase.getConferencePlan(sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>, date: string}>) => {
      if (conferencePlanData[0]) {
        firebase.saveConferencePlanQuestion(sessionId, question)
        .then(() => {
          this.setState({ questionAdded: true }, () => {
            setTimeout(() => {
              this.setState({ questionAdded: false })
            }, 1500);
          })
        })
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id
        })
      } else {
        firebase.createConferencePlan(teacherId, sessionId, magic8)
        .then(() => {
          firebase.getConferencePlan(sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
            if (conferencePlanData[0]) {
              this.setState({
                conferencePlanExists: true,
                conferencePlanId: conferencePlanData[0].id
              })
            } else {
              this.setState({
                conferencePlanExists: false,
                conferencePlanId: ''
              })
            }
          })
          firebase.saveConferencePlanQuestion(sessionId, question)
          .then(() => {
            this.setState({ questionAdded: true }, () => {
              setTimeout(() => {
                this.setState({ questionAdded: false })
              }, 1500);
            })
          })
          this.setState({
            conferencePlanExists: true
          })
        })
      }
    })
  };

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      comparisonText: PropTypes.string
    }).isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const chosenQuestions = this.state.addedToPlan.map((value) => {
      return (
        value.question
      )
    })
    return (
      this.props.teacherSelected ? (
        <div className={classes.root}>
          <FadeAwayModal open={this.state.noteAdded} text="Note added to conference plan." />
          <FadeAwayModal open={this.state.questionAdded} text="Question added to conference plan." />
          <ResultsLayout
            teacher={this.props.teacherSelected}
            magic8="Level of Instruction"
            summary={
              <div>
                <Grid container justify={"center"} direction={"column"}>
                  <Grid item style={{paddingTop: '1em'}}>
                    <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                      Level of Instruction
                    </Typography>
                  </Grid>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Compare how often the teacher provided: 
                  </Typography>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{width: '100%'}}>
                      <List>
                      <ListItem style={{padding: 0}}>
                        <ListItemIcon style={{margin: 0}}>
                          <SignalWifi4BarIcon style={{fill: '#6d9eeb', transform: 'rotate(-45deg)'}} />
                        </ListItemIcon>
                        <ListItemText primary="Low-level instruction" />
                      </ListItem>
                      <ListItem style={{padding: 0}}>
                        <ListItemIcon style={{margin: 0}}>
                          <SignalWifi4BarIcon style={{fill: '#6aa84f', transform: 'rotate(-45deg)'}} />
                        </ListItemIcon>
                        <ListItemText primary="High-level instruction" />
                      </ListItem>
                    </List>
                    </Grid>
                  </Grid>
                  <LevelOfInstructionSummaryChart
                    lowLevel={this.state.llqResponseCount+this.state.llqCount}
                    highLevel={this.state.hlqResponseCount+this.state.hlqCount}
                  />
                </Grid>
              </div>} 
            details={
              <div>
                <Grid container justify={"center"} direction={"column"}>
                  <Grid item style={{paddingTop: '1em'}}>
                    <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                      Teacher and Child Behaviors
                    </Typography>
                  </Grid>
                  <Grid container justify={"center"} direction={"column"}>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      Was there a type of instruction the teacher used more often? 
                    </Typography>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      How often did children respond to different question types?              
                    </Typography>
                  </Grid>
                  <InstructionTypeDetailsChart
                    hlqCount={this.state.hlqCount}               
                    hlqResponseCount={this.state.hlqResponseCount}            
                    llqCount={this.state.llqCount}             
                    llqResponseCount={this.state.llqResponseCount}                  
                  />
                </Grid>
              </div>
            }
            trendsGraph={
              <Grid container direction="column" justify="center">
                <Grid item style={{paddingTop: '1em', paddingBottom: '0.5em'}}>
                  <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                    Teacher and Child Behaviors
                  </Typography>
                </Grid>
                <LevelOfInstructionTrendsGraph data={this.trendsFormatData}/>
              </Grid>
            }
            changeSessionId={this.changeSessionId}
            sessionId={this.state.sessionId}
            conferencePlanId={this.state.conferencePlanId}
            addNoteToPlan={this.addNoteToPlan}
            sessionDates={this.state.sessionDates}
            notes={this.state.notes}
            questions={
              <LevelOfInstructionCoachingQuestions
                handleAddToPlan={this.handleAddToPlan}
                sessionId={this.state.sessionId}
                teacherId={this.props.teacherSelected.id}
              />
            }
            chosenQuestions={chosenQuestions}
            actionPlanExists={this.state.actionPlanExists}
            conferencePlanExists={this.state.conferencePlanExists}
            noDataYet={this.state.noDataYet}
          />
        </div>
      ) : (
        <FirebaseContext.Consumer>
          {(firebase: {
            getTeacherList(): Promise<Types.Teacher[]>
          }): React.ReactElement => (
            <TeacherModal
              handleClose={this.handleCloseTeacherModal}
              firebase={firebase}
              type={"Results"}
            />
          )}
        </FirebaseContext.Consumer>
      )
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {
  teacherSelected: Types.Teacher
} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

LevelOfInstructionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps)(LevelOfInstructionResultsPage));