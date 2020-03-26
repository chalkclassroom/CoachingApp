import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import ChildTeacherBehaviorPieSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorPieSlider";
import ChildTeacherBehaviorDetailsSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorDetailsSlider";
import ChildTeacherBehaviorTrendsSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider";
import ACCoachingQuestions from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ACCoachingQuestions";
import * as Constants from '../../../constants';

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
  ac: number,
  noAc: number,
  noChildOpp: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number,
  sessionId: string,
  ac1: number,
  ac2: number,
  ac3: number,
  ac4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number,
  trendsDates: Array<Array<string>>,
  trendsNoChildOpp: Array<number>,
  trendsNoAC: Array<number>,
  trendsAC: Array<number>,
  trendsNoTeacherOpp: Array<number>,
  trendsNoSupport: Array<number>,
  trendsSupport: Array<number>,
  notes: Array<{id: string, content: string, timestamp: Date}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>
}

/**
 * associative cooperative results
 * @class AssociativeCooperativeInteractionsResultsPage
 */
class AssociativeCooperativeInteractionsResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      ac: 0,
      noAc: 0,
      noChildOpp: 0,
      support: 0,
      noSupport: 0,
      noTeacherOpp: 0,
      sessionId: '',
      ac1: 0,
      ac2: 0,
      ac3: 0,
      ac4: 0,
      teacher1: 0,
      teacher2: 0,
      teacher3: 0,
      teacher4: 0,
      trendsDates: [],
      trendsNoChildOpp: [],
      trendsNoAC: [],
      trendsAC: [],
      trendsNoTeacherOpp: [],
      trendsNoSupport: [],
      trendsSupport: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    firebase.fetchBehaviourTypeCount(this.state.sessionId);
    firebase.fetchAvgToneRating(this.state.sessionId);
    this.handleDateFetching(this.props.location.state.teacher.id);
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetching = (teacherId: string): void => {
    this.handleChildTrendsFetch(teacherId);
    this.handleTeacherTrendsFetch(teacherId);
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
    firebase.fetchSessionDates(teacherId, "ac").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>
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
    console.log('date fetching was called');
  };

  /**
   * @param {string} teacherId
   */
  handleChildTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const noOppArray: Array<number> = [];
    const noACArray: Array<number> = [];
    const ACArray: Array<number> = [];
    firebase.fetchChildACTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, noOpportunity: number, ac: number, noac: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        noOppArray.push(Math.floor((data.noOpportunity / (data.noOpportunity + data.noac + data.ac)) * 100));
        noACArray.push(Math.floor((data.noac / (data.noOpportunity + data.noac + data.ac)) * 100));
        ACArray.push(Math.floor((data.ac / (data.noOpportunity + data.noac + data.ac)) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsNoChildOpp: noOppArray,
        trendsNoAC: noACArray,
        trendsAC: ACArray
      });
    });
  };

  /**
   * @param {string} teacherId
   */
  handleTeacherTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const noSupportArray: Array<number> = [];
    const supportArray: Array<number> = [];
    const noOppArray: Array<number> = [];
    firebase.fetchTeacherACTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, noOpportunity: number, support: number, nosupport: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        noSupportArray.push(Math.floor((data.nosupport / (data.noOpportunity + data.nosupport + data.support)) * 100));
        supportArray.push(Math.floor((data.support / (data.noOpportunity + data.nosupport + data.support)) * 100));
        noOppArray.push(Math.floor((data.noOpportunity / (data.noOpportunity + data.nosupport + data.support)) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsNoSupport: noSupportArray,
        trendsSupport: supportArray,
        trendsNoTeacherOpp: noOppArray
      });
    });
  };

  /**
   * specifies formatting for child trends
   * @return {object}
   */
  handleTrendsChildFormatData = (): {
      labels: Array<Array<string>>,
      datasets: Array<{
        label: string,
        backgroundColor: string,
        borderColor: string,
        fill: boolean,
        lineTension: number,
        data: Array<number>
      }>
    } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "No Opportunity",
          backgroundColor: Constants.NotPresentColor,
          borderColor: Constants.NotPresentColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoChildOpp
        },
        {
          label: "No Assoc./Coop. Interaction",
          backgroundColor: '#ec2409',
          borderColor: '#ec2409',
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoAC
        },
        {
          label: "Associative and/or Cooperative",
          backgroundColor: Constants.Colors.AC,
          borderColor: Constants.Colors.AC,
          fill: false,
          lineTension: 0,
          data: this.state.trendsAC
        }
      ]
    };
  };

  /**
   * specifies formatting for teacher trends
   * @return {object}
   */
  handleTrendsTeacherFormatData = (): {
    labels: Array<Array<string>>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>
    }>,
  } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "Teacher Not at Center",
          backgroundColor: Constants.NotPresentColor,
          borderColor: Constants.NotPresentColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoTeacherOpp
        },
        {
          label: "No Support",
          backgroundColor: Constants.RedGraphColor,
          borderColor: Constants.RedGraphColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoSupport
        },
        {
          label: "Teacher Support",
          backgroundColor: Constants.AppBarColor,
          borderColor: Constants.AppBarColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsSupport
        },
      ]
    };
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

  /**
   * retrieves summary, details, and notes data using the session id
   */
  getData = () => {
    const firebase = this.context;
    this.handleNotesFetching(this.state.sessionId);
    firebase.getActionPlan(this.state.sessionId)
    .then((actionPlanData: Array<{id: string, goal: string, benefit: string, date: string}>) => {
      if (actionPlanData.length>0) {
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
    
    firebase.fetchChildACSummary(this.state.sessionId).then((summary: {noOpportunity: number, noac: number, ac: number}) => {
      this.setState({
        noChildOpp: summary.noOpportunity,
        noAc: summary.noac,
        ac: summary.ac,
      });
    });

    firebase.fetchTeacherACSummary(this.state.sessionId).then((summary: {noOpportunity: number, noSupport: number, support: number}) => {
      this.setState({
        noTeacherOpp: summary.noOpportunity,
        noSupport: summary.noSupport,
        support: summary.support,
      });
    });

    firebase.fetchACDetails(this.state.sessionId).then(summary => {
      this.setState({
        ac1: summary.ac1,
        ac2: summary.ac2,
        ac3: summary.ac3,
        ac4: summary.ac4,
        teacher1: summary.teacher1,
        teacher2: summary.teacher2,
        teacher3: summary.teacher3,
        teacher4: summary.teacher4
      })
    })
  }

  /**
   * @param {SyntheticEvent} event
   */
  changeSessionId = (event: React.SyntheticEvent): void => {
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.getData();
      }
    );
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
          magic8="AC"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="ac"
          summary={
            <ChildTeacherBehaviorPieSlider
              ac={this.state.ac}
              noAc={this.state.noAc}
              noChildOpp={this.state.noChildOpp}
              support={this.state.support}
              noSupport={this.state.noSupport}
              noTeacherOpp={this.state.noTeacherOpp}

            />
          }
          details={
            <ChildTeacherBehaviorDetailsSlider
              ac1={this.state.ac1}
              ac2={this.state.ac2}
              ac3={this.state.ac3}
              ac4={this.state.ac4}
              teacher1={this.state.teacher1}
              teacher2={this.state.teacher2}
              teacher3={this.state.teacher3}
              teacher4={this.state.teacher4}
            />
          }
          trendsGraph={
            <ChildTeacherBehaviorTrendsSlider
              childData={this.handleTrendsChildFormatData}
              teacherData={this.handleTrendsTeacherFormatData}
            />
          }
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          sessionDates={this.state.sessionDates}
          notes={this.state.notes}
          questions={
            <ACCoachingQuestions
              handleAddToPlan={this.handleAddToPlan}
              addedToPlan={this.state.addedToPlan}
              sessionId={this.state.sessionId}
              teacherId={this.props.location.state.teacher.id}
              magic8={"Associative and Cooperative"}
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


AssociativeCooperativeInteractionsResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(AssociativeCooperativeInteractionsResultsPage);