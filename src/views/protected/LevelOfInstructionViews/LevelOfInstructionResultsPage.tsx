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
import { Grid, Typography } from "@material-ui/core";
import PieSliceLOIBasicImage from "../../../assets/images/PieSliceLOIBasicImage.svg";
import PieSliceLOIInferentialImage from "../../../assets/images/PieSliceLOIInferentialImage.svg";
import FadeAwayModal from '../../../components/FadeAwayModal';
import { connect } from 'react-redux';
import TeacherModal from '../HomeViews/TeacherModal';
import * as Types from '../../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';

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
  history: H.History
}

interface Style {
  root: string,
  comparisonText: string
}

interface State {
  highLevelQuesInsCount: number, 
  followUpInsCount: number,
  lowLevelInsCount: number,
  specificSkillInsCount: number,
  sessionId: string,
  conferencePlanId: string,
  trendsDates: Array<string>,
  trendsInfer: Array<number>,
  trendsBasic: Array<number>,
  notes: Array<{id: string, content: string, timestamp: string}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  noteAdded: boolean,
  questionAdded: boolean,
  teacherModal: boolean
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
      highLevelQuesInsCount: 0,      
      followUpInsCount: 0,
      lowLevelInsCount: 0,
      specificSkillInsCount: 0,              
      sessionId: '',
      conferencePlanId: '',
      trendsDates: [],
      trendsInfer: [],                   
      trendsBasic: [],                    
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noteAdded: false,
      questionAdded: false,
      teacherModal: false
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
    const inferArray: Array<number> = []; 
    const basicArray: Array<number> = [];
    firebase.fetchInstructionTrend(teacherId).then((dataSet: Array<object>) => {                       
      console.log("dataset is: ", dataSet);
      dataSet.forEach((data: {dayOfEvent: {value: string}, inferential: number, basicSkills: number}) => { 
        dateArray.push(moment(data.dayOfEvent.value).format("MMM Do YYYY"));
        inferArray.push(data.inferential); 
        basicArray.push(data.basicSkills); 
      });
      this.setState({
        trendsDates: dateArray, 
        trendsInfer: inferArray, 
        trendsBasic: basicArray, 
      });
    });
  };

  /**
   * @param {string} sessionId
   */
  handleNotesFetching = (sessionId: string): void => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: {seconds: number, nanoseconds: number}}>) => {
      console.log(notesArr);
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
      console.log(formattedNotesArr);
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
      highLevelQuesInsCount: 0,      
      followUpInsCount: 0,
      lowLevelInsCount: 0,
      specificSkillInsCount: 0,              
      sessionId: '',
      conferencePlanId: '',
      trendsDates: [],
      trendsInfer: [],                   
      trendsBasic: [],                    
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    }, () => {
      firebase.fetchSessionDates(teacherId, "level").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>  
        this.setState({
          sessionDates: dates
        }, () => {
          if (this.state.sessionDates[0]) {
            this.setState({ sessionId: this.state.sessionDates[0].id },
              () => {
                this.getData();
              }
            );
          }
        })
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
      lineTension: number
    }>
  } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "Basic Skills Instruction",  
          data: this.state.trendsBasic, 
          backgroundColor: "#6d9eeb",
          borderColor: "#6d9eeb",
          fill: false,
          lineTension: 0,
        },
        {
          label: "Inferential Instruction", 
          data: this.state.trendsInfer,  
          backgroundColor: "#6aa84fff",
          borderColor: "#6aa84fff",
          fill: false,
          lineTension: 0,
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
    }).catch(() => {
      console.log('unable to retrieve conference plan')
    })
    firebase.fetchInstructionTypeCount(this.state.sessionId).then((json: Array<{instructionType: string, count: number}>) => {  
      json.forEach(instruction => {                                
        if (instruction.instructionType === "specificSkill") { 
          specificSkillCount = instruction.count;                       
        } else if (instruction.instructionType === "lowLevel") {    
          lowLevelCount = instruction.count;                                 
        } else if (instruction.instructionType === "highLevel") {            
          highLevelQuesCount = instruction.count;                                 
        } else if (instruction.instructionType === "followUp") {            
          followUpCount = instruction.count;                                 
        }
      });
      this.setState({
        followUpInsCount: followUpCount,                          
        highLevelQuesInsCount: highLevelQuesCount,
        lowLevelInsCount: lowLevelCount,
        specificSkillInsCount: specificSkillCount                                  
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
    console.log('handle add to plan session id is: ', sessionId);
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
    }).isRequired,
    history: ReactRouterPropTypes.history.isRequired
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
            history={this.props.history}
            summary={
              <div>
                <Grid container justify={"center"} direction={"column"}>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Compare how often the teacher provided: 
                  </Typography>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{width: '100%'}}>
                      <Grid container direction="row">
                        <Grid item xs={1}>
                          <Grid container direction="column" alignItems="flex-end" style={{height:'100%'}}>
                            <Grid item style={{height:"50%"}}>
                              <img alt="blue" src={PieSliceLOIBasicImage} height="95%"/>
                            </Grid>
                            <Grid item style={{height:"50%"}}>
                              <img alt="green" src={PieSliceLOIInferentialImage} height="95%"/>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={11}>
                          <Grid container direction="column" justify="center" style={{height:'100%'}}>
                            <Grid item style={{height:"50%"}}>
                              <Typography align="left" variant="subtitle1" className={classes.comparisonText}>
                                Basic skills instruction 
                              </Typography>
                            </Grid>
                            <Grid item style={{height:"50%"}}>
                              <Typography align="left" variant="subtitle1" className={classes.comparisonText} style={{lineHeight:'1em'}}>
                                Inferential instruction
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <LevelOfInstructionSummaryChart
                    basicSkillsResponses={this.state.specificSkillInsCount+this.state.lowLevelInsCount}
                    inferentialResponses={this.state.followUpInsCount+this.state.highLevelQuesInsCount}
                  />
                </Grid>
              </div>} 
            details={
              <div>
                <Grid container justify={"center"} direction={"column"}>
                  <Grid container justify={"center"} direction={"column"}>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      Was there a type of instruction the teacher used more often? 
                    </Typography>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      Was there a type of instruction they used less often?               
                    </Typography>
                  </Grid>
                  <InstructionTypeDetailsChart
                    highLevelQuesInsCount={this.state.highLevelQuesInsCount}               
                    followUpInsCount={this.state.followUpInsCount}            
                    lowLevelInsCount={this.state.lowLevelInsCount}             
                    specificSkillInsCount={this.state.specificSkillInsCount}                  
                  />
                </Grid>
              </div>
            }
            trendsGraph={
              <div>
                <Grid container justify={"center"} direction={"column"}>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Was there a type of instruction the teacher used more often? 
                  </Typography>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Was there a type of instruction they used less often?               
                  </Typography>
                </Grid>
                <LevelOfInstructionTrendsGraph data={this.trendsFormatData}/>
              </div>
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
                addedToPlan={this.state.addedToPlan}
                sessionId={this.state.sessionId}
                teacherId={this.props.teacherSelected.id}
              />
            }
            chosenQuestions={chosenQuestions}
            actionPlanExists={this.state.actionPlanExists}
            conferencePlanExists={this.state.conferencePlanExists}
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