import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import InstructionResponsesDetailsChart from "../../../components/LevelOfInstructionComponents/ResultsComponents/InstructionResponsesDetailsChart";
import LevelOfInstructionCoachingQuestions from "../../../components/LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionCoachingQuestions";
import LevelOfInstructionSummarySlider from "../../../components/LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionSummarySlider";
import LevelOfInstructionTrendsGraph from "../../../components/LevelOfInstructionComponents/ResultsComponents/LevelOfInstructionTrendsGraph";

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
  },
};

interface Props {
  classes: Style,
  location: { state: { teacher: { id: string, firstName: string, lastName: string }}},
}

interface Style {
  root: string
}

interface State {
  highLevelQuesInsCount: number, 
  followUpInsCount: number,
  lowLevelInsCount: number,
  specificSkillInsCount: number,
  // averageToneRating: number,
  sessionId: string,
  trendsDates: Array<string>,
  trendsInfer: Array<number>,
  trendsBasic: Array<number>,
  notes: Array<{id: string, content: string, timestamp: Date}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<string>
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
     // averageToneRating: 0,
      sessionId: '',
      trendsDates: [],
      trendsInfer: [],                   
      trendsBasic: [],                    
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const firebase = this.context;
    const teacherId = this.props.location.state.teacher.id;
    firebase.fetchInstructionTypeCount(this.state.sessionId); 
/*     firebase.fetchAvgToneRating(this.state.sessionId);    
 */    this.handleDateFetching(teacherId);
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
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: Date}>) => {
      console.log(notesArr);
      const formattedNotesArr: Array<{id: string, content: string, timestamp: Date}> = [];
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
  handleDateFetching = (teacherId: string) => {
    const firebase = this.context;
    firebase.fetchSessionDates(teacherId, "level").then((dates: Array<string>) =>  
      this.setState({
        sessionDates: dates
      }, () => {
        this.setState({ sessionId: this.state.sessionDates[0].id },
          () => {
            this.getData();
          }
        );
      })
    );
    console.log('date fetching was called');
  };

  trendsFormatData = () => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "Ask Low-Level Question / Teach Specific Skills",  
          data: this.state.trendsBasic, 
          backgroundColor: "#6d9eeb",
          borderColor: "#6d9eeb",
          fill: false,
          lineTension: 0,
        },
        {
          label: "Ask High-Level Question / Follow-up on Children’s Responses", 
          data: this.state.trendsInfer,  
          backgroundColor: "#6aa84fff",
          borderColor: "#6aa84fff",
          fill: false,
          lineTension: 0,
        }
      ]
    };
  };

  getData = () => {
    const firebase = this.context;
    let specificSkillCount = 0;
    let lowLevelCount = 0;
    let highLevelQuesCount = 0;
    let followUpCount = 0;
    this.handleNotesFetching(this.state.sessionId);
/*     firebase.fetchAvgToneRating(this.state.sessionId).then((json: Array<{average: number}>) =>
          json.forEach(toneRating => {
            this.setState({
              averageToneRating: toneRating.average
            });
          })
        ); */ 
        firebase.getActionPlan(this.state.sessionId).then((actionPlanData) => {
          if (actionPlanData.length>0) {
            console.log('actionplan data: ', actionPlanData>0)
            this.setState({
              actionPlanExists: true
            })
          } else {
            this.setState({
              actionPlanExists: false
            })
          }
        }).catch(() => {
          console.log('unable to retrieve action plan')
        })
        firebase.getConferencePlan(this.state.sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
          if (conferencePlanData[0]) {
            this.setState({
              conferencePlanExists: true
            })
          } else {
            this.setState({
              conferencePlanExists: false
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
   * @param {SyntheticEvent} event
   */
  changeSessionId = (event: React.SyntheticEvent) => {
    console.log("sessionId", event.target.value, "type is: ", typeof event);
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
        firebase.saveConferencePlanQuestion(sessionId, question);
        this.setState({
          conferencePlanExists: true
        })
      } else {
        firebase.createConferencePlan(teacherId, sessionId, magic8)
        .then(() => {
          firebase.saveConferencePlanQuestion(sessionId, question);
          this.setState({
            conferencePlanExists: true
          })
        })
      }
    })
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const chosenQuestions = this.state.addedToPlan.map((value) => {
      return(
        value.question
      )
    })
    return (
      <div className={classes.root}>
        <ResultsLayout
          teacherId={this.props.location.state.teacher.id}
          magic8="Level of Instruction"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="level"
          summary={
            <LevelOfInstructionSummarySlider
               basicSkillsResponses={this.state.specificSkillInsCount+this.state.lowLevelInsCount}
               inferentialResponses={this.state.followUpInsCount+this.state.highLevelQuesInsCount}
              // averageToneRating={this.state.averageToneRating}
            />
          }
          details={
            <InstructionResponsesDetailsChart
              highLevelQuesInsCount={this.state.highLevelQuesInsCount}               
              followUpInsCount={this.state.followUpInsCount}            
              lowLevelInsCount={this.state.lowLevelInsCount}             
              specificSkillInsCount={this.state.specificSkillInsCount}                  
            />
          }
          trendsGraph={<LevelOfInstructionTrendsGraph data={this.trendsFormatData}/>}
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          sessionDates={this.state.sessionDates}
          notes={this.state.notes}
          questions={
            <LevelOfInstructionCoachingQuestions
              handleAddToPlan={this.handleAddToPlan}
              addedToPlan={this.state.addedToPlan}
              sessionId={this.state.sessionId}
              teacherId={this.props.location.state.teacher.id}
              magic8={"Level of Instruction"}
            />
          }
          chosenQuestions={chosenQuestions}
          teacherFirstName={this.props.location.state.teacher.firstName}
          teacherLastName={this.props.location.state.teacher.lastName}
          actionPlanExists={this.state.actionPlanExists}
          conferencePlanExists={this.state.conferencePlanExists}
        />
      </div>
    );
  }
}


LevelOfInstructionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(LevelOfInstructionResultsPage);