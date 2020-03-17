import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import ListeningSummaryChart from "../../../components/ListeningComponents/ResultsComponents/ListeningSummaryChart";
import ListeningDetailsChart from "../../../components/ListeningComponents/ResultsComponents/ListeningDetailsChart";
import ListeningTrendsGraph from "../../../components/ListeningComponents/ResultsComponents/ListeningTrendsGraph";
import ListeningCoachingQuestions from "../../../components/ListeningComponents/ResultsComponents/ListeningCoachingQuestions";
import PieSliceListeningImage from '../../../assets/images/PieSliceListeningImage.svg';
import PieSliceChildNonImage from '../../../assets/images/PieSliceChildNonImage.svg';
import * as Constants from '../../../constants';

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
  location: { state: { teacher: { id: string, firstName: string, lastName: string }}},
}

interface Style {
  root: string,
  comparisonText: string
}

interface State {
  listening: number,
  notListening: number,
  sessionId: string,
  listening1: number,
  listening2: number,
  listening3: number,
  listening4: number,
  listening5: number,
  listening6: number,
  trendsDates: Array<Array<string>>,
  trendsListening: Array<number>,
  trendsNotListening: Array<number>,
  notes: Array<{id: string, content: string, timestamp: Date}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<string>
}

/**
 * listening to children results
 * @class ListeningToChildrenResultsPage
 */
class ListeningToChildrenResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      listening: 0,
      notListening: 0,
      sessionId: '',
      listening1: 0,
      listening2: 0,
      listening3: 0,
      listening4: 0,
      listening5: 0,
      listening6: 0,
      trendsDates: [],
      trendsListening: [],
      trendsNotListening: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    };
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetching = (teacherId: string): void => {
    this.handleTrendsFetch(teacherId);
  };

  /**
   * @param {string} sessionId
   */
  handleNotesFetching = (sessionId: string): void => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: Date}>) => {
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
    firebase.fetchSessionDates(teacherId, "listening").then((dates: Array<string>) =>
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

  /**
   * @param {string} teacherId
   */
  handleTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const listeningArray: Array<number> = [];
    const notListeningArray: Array<number> = [];
    firebase.fetchListeningTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, listening: number, notListening: number}>) => {
      console.log('handletrendsfetch returns: ', dataSet);
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        listeningArray.push(Math.floor((data.listening / (data.listening + data.notListening)) * 100));
        notListeningArray.push(Math.floor((data.notListening / (data.listening + data.notListening)) * 100));
      });
      this.setState({
        trendsDates: dateArray,
        trendsListening: listeningArray,
        trendsNotListening: notListeningArray
      }, () => console.log('listening trends: ', this.state.trendsListening, this.state.trendsNotListening));
    });
  };

  /**
   * specifies formatting for child trends
   * @return {object}
   */
  handleTrendsFormatData = (): {
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
          label: "Teacher Listening",
          backgroundColor: Constants.ListeningColor,
          borderColor: Constants.ListeningColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsListening
        },
        {
          label: "Other Tasks or Behaviors",
          backgroundColor: Constants.RedGraphColor,
          borderColor: Constants.RedGraphColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNotListening
        }
      ]
    };
  };

  /**
   * retrieves summary, details, and notes data using the session id
   */
  getData = (): void => {
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
    firebase.getConferencePlan(this.state.sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
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
    firebase.fetchListeningSummary(this.state.sessionId)
    .then((summary: {listening: number, notListening: number}) => {
      this.setState({
        listening: summary.listening,
        notListening: summary.notListening,
      });
    });
    firebase.fetchListeningDetails(this.state.sessionId)
    .then((summary: {
      listening1: number,
      listening2: number,
      listening3: number,
      listening4: number,
      listening5: number,
      listening6: number,
    }) => {
      this.setState({
        listening1: summary.listening1,
        listening2: summary.listening2,
        listening3: summary.listening3,
        listening4: summary.listening4,
        listening5: summary.listening5,
        listening6: summary.listening6,
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

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.handleDateFetching(this.props.location.state.teacher.id);
  }

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
          magic8="Listening to Children"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="listening"
          summary={
            <Grid container justify={"center"} direction={"column"}>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often the teacher was: 
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <Grid container direction="row">
                    <Grid item xs={1}>
                      <Grid container direction="column" alignItems="flex-end" style={{height:'100%'}}>
                        <Grid item style={{height:"50%"}}>
                          <img alt="green" src={PieSliceListeningImage} height="95%"/>
                        </Grid>
                        <Grid item style={{height:"50%"}}>
                          <img alt="red" src={PieSliceChildNonImage} height="95%"/>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <Grid container direction="column" justify="center" style={{height:'100%'}}>
                        <Grid item style={{height:"50%"}}>
                          <Typography align="left" variant="subtitle1" className={classes.comparisonText}>
                            Listening to children/encouraging child talk
                          </Typography>
                        </Grid>
                        <Grid item style={{height:"50%"}}>
                          <Typography align="left" variant="subtitle1" className={classes.comparisonText} style={{lineHeight:'1em'}}>
                            Doing other tasks or activities
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <ListeningSummaryChart
                  listening={this.state.listening}
                  notListening={this.state.notListening}
                />
              </Grid>
              <Grid item>
              <Typography variant="subtitle1" align="center" style={{paddingTop: '1.5em', fontFamily: 'Arimo'}}>
                Total Observations: {this.state.listening + this.state.notListening}
              </Typography>
              </Grid>
            </Grid>
          }
          details={
            <div>
              <Grid container justify={"center"} direction={"column"}>
                <Grid container justify={"center"} direction={"column"}>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    What behaviors did the teacher use during the observation?
                  </Typography>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Did the teacher do one type of behavior more often than the other behaviors?               
                  </Typography>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Did the teacher do one type of behavior less often than the other behaviors?               
                  </Typography>
                </Grid>
                <ListeningDetailsChart
                  listening1={this.state.listening1}
                  listening2={this.state.listening2}
                  listening3={this.state.listening3}
                  listening4={this.state.listening4}
                  listening5={this.state.listening5}
                  listening6={this.state.listening6}
                />
              </Grid>
            </div>
          }
          trendsGraph={
            <ListeningTrendsGraph
              data={this.handleTrendsFormatData}
            />
          }
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          sessionDates={this.state.sessionDates}
          notes={this.state.notes}
          questions={
            <ListeningCoachingQuestions
              handleAddToPlan={this.handleAddToPlan}
              addedToPlan={this.state.addedToPlan}
              sessionId={this.state.sessionId}
              teacherId={this.props.location.state.teacher.id}
              magic8={"Listening To Children"}
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


ListeningToChildrenResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(ListeningToChildrenResultsPage);