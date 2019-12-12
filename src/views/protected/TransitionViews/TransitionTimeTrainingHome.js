import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/index";
import TransitionTimeIcon from "../../../assets/icons/TransitionTime.svg";
import { withStyles } from "@material-ui/core/styles/index";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import 'chartjs-plugin-datalabels';
import TrainingVideo
    from "../../../components/Shared/TrainingVideo";
import ChildTeacherBehaviorTrendsSlider
    from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider";
import TrainingQuestionnaire from "../../../components/Shared/TrainingQuestionnaire";
import TrainingDashboard from '../../../components/Shared/TrainingDashboard';
import Table from '@material-ui/core/Table/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflowX: 'hidden',
    overflowY: 'scroll',
    margin: '0',
    padding: '0'
  },
  title: {
    width: '100%',
    margin: '0',
    padding: '0',
    textAlign: 'center'
  },
  main: {
    height: 'auto',
    flexGrow: 1,
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '25% 75%',
    margin: '2% 5% 2% 5%'
  },
  trainingContentCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '0% 4% 3% 4%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  },
  definitionTitle: {
    backgroundColor: "#094492",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    width: "50%"
  },
  definitionText: {
    backgroundColor: "#759fe5",
    width: "50%"
  },
  buttonTitle: {
    backgroundColor: "#094492", 
    color: "white",
    fontSize: 14,
    textAlign: "center", 
    width: "20%"
  },
  lineExamples: {
    backgroundColor: "#AED581",
    width:"20%"
  },
  travelingExamples: {
    backgroundColor: "#FFA726",
    width:"20%"
  },
  waitingExamples: {
    backgroundColor: "#FF7043",
    width:"20%"
  },
  routinesExamples: {
    backgroundColor: "#64B5F6",
    width:"20%"
  },
  behaviorExamples: {
    backgroundColor: "#FF5252",
    width:"20%"
  },

  // iPad Pro 12.9" Landscape
  '@media only screen and (max-width:1366px) and (min-height:800px) and (orientation:landscape)': {
    root: {
      fontSize: '1.5em'
    },
    main: {
      margin: '8% 2% 2% 2%'
    }
  },

  // iPad Pro 12.9" Portrait
  '@media only screen and (max-width:1024px) and (orientation:portrait)': {
    main: {
      height: '100%',
      margin: '2%',
      display: 'flex',
      flexDirection: 'column'
    },
    dashboardContainer: {
      boxShadow: '1px 1px 3px #8C8D91'
    },
    trainingContentCard: {
      flexGrow: 1,
      margin: '5% 0% 2% 0%',
      padding: '8% 2% 3% 2%',
      justifyContent: 'flex-start',
      borderTop: '2px solid #FFA726'
    }
  },

  // iPad-Mini Landscape
  '@media only screen and (max-width:1024px) and (orientation:landscape)': {
    main: {
      margin: '2%'
    }
  },

  // Minor Breakpoint - 900px height
  '@media only screen and (max-width:1024px) and (min-height:900px) and (orientation:portrait)': {
    root: {
      fontSize: '1.5em'
    }
  },

  // Minor Breakpoint - 920px width
  '@media only screen and (max-width:920px) and (orientation:landscape)': {
    main: {
      height: '100%',
      margin: '0% 2% 0% 2%',
      display: 'flex',
      flexDirection: 'column'
    },
    dashboardContainer: {
      boxShadow: '1px 1px 3px #8C8D91'
    },
    trainingContentCard: {
      flexGrow: 1,
      margin: '3% 0% 2% 0%',
      padding: '5% 2% 3% 2%',
      justifyContent: 'flex-start',
      borderTop: '2px solid #FFA726'
    }
  },

  // Mobile Landscape
  '@media only screen and (max-width:600px) and (orientation:landscape)': {
    root: {
      fontSize: '0.7em'
    }
  }
});

const ViewEnum = {
  CONCEPTS: 1,
  DEFINITIONS: 2,
  EXAMPLE: 3,
  DEMONSTRATION: 4,
  TRYIT: 5,
  KNOWLEDGECHECK: 6
};

class TransitionTimeTrainingHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ViewEnum.CONCEPTS
    };
  }

  conceptsClick = () => {
    if (this.state.view !== ViewEnum.CONCEPTS) {
      this.setState({view: ViewEnum.CONCEPTS})
    }
  }

  definitionsClick = () => {
    if (this.state.view !== ViewEnum.DEFINITIONS) {
      this.setState({view: ViewEnum.DEFINITIONS})
    }
  }

  exampleClick = () => {
    if (this.state.view !== ViewEnum.EXAMPLE) {
      this.setState({view: ViewEnum.EXAMPLE})
    }
  }

  demonstrationClick = () => {
    if (this.state.view !== ViewEnum.DEMONSTRATION) {
      this.setState({view: ViewEnum.DEMONSTRATION})
    }
  }

  tryItClick = () => {
    if (this.state.view !== ViewEnum.TRYIT) {
      this.setState({view: ViewEnum.TRYIT})
    }
  }

  knowledgeCheckClick = () => {
    if (this.state.view !== ViewEnum.KNOWLEDGECHECK) {
      this.setState({view: ViewEnum.KNOWLEDGECHECK})
    }
  }

  render() {
    const { classes } = this.props;
    const { view } = this.state;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <div className={classes.title}><h1>Training Tool</h1></div>
        <div className={classes.main}>
          <div className={classes.dashboardContainer}>
            <TrainingDashboard
              ViewEnum={ViewEnum}
              view={view}
              Icon={TransitionTimeIcon}
              conceptsClick={this.conceptsClick}
              definitionsClick={this.definitionsClick}
              exampleClick={this.exampleClick}
              demonstrationClick={this.demonstrationClick}
              tryItClick={this.tryItClick}
              knowledgeCheckClick={this.knowledgeCheckClick}
            />
          </div>
          <div className={classes.trainingContentCard}>
            {view === ViewEnum.CONCEPTS ? 
              <TrainingVideo
                videoUrl={'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/TT%20Concepts%205-31-19.mp4?alt=media&token=0f968fb5-047a-4fb9-90ec-7149b40a3e9c'} />
            : view === ViewEnum.DEFINITIONS ?
            <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
          >
            {/* <Typography variant="h4" gutterBottom>
              Reducing Transitions
            </Typography> */}
            <Typography variant="subtitle2" gutterBottom>
              Remember, a <strong>transition</strong> is a period of time in
              which <strong>most</strong> of the class is not involved in a
              learning activity.
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.definitionTitle}>
                    TRANSITIONS BEGIN WHEN:
                  </TableCell>
                  <TableCell className={classes.definitionTitle}>
                    TRANSITIONS END WHEN:
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.definitionText}>
                    <strong>
                      A majority (more than half) of the children
                      are in transition
                    </strong>
                  </TableCell>
                  <TableCell className={classes.definitionText}>
                    <strong>
                      A majority (more than half) of the children
                      have started the next activity
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="subtitle2" gutterBottom style={{padding:10}}>
              While you are recording a transition, choose the button representing 
              the <strong>primary</strong> reason for that transition. <strong>Change </strong>  
              the button if the primary reason changes during the same transition. 
              Choose the <strong>“Other”</strong> button if the reason for the transition is not represented 
              in the other buttons, and you will be prompted to explain the reason in the Notes.
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" className={classes.buttonTitle}>
                    Waiting in line/lining up
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.buttonTitle}>
                    Traveling outside the classroom
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.buttonTitle}>
                    Children waiting on teacher/materials
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.buttonTitle}>
                    Classroom Routines
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.buttonTitle}>
                    Behavior Management Disruption
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell padding="checkbox" className={classes.lineExamples}>
                    <strong>Lining up or waiting in line</strong>
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.travelingExamples}>
                    <strong>Walking from one part of the school to another</strong>
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.waitingExamples}>
                    <strong>Delays or interruptions because teacher or materials are not ready</strong>
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.routinesExamples}>
                    <strong>Participating in routine, non-learning activities</strong>
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.behaviorExamples}>
                    <strong>Delays or interruptions due to behavior management</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="checkbox" className={classes.lineExamples}>
                    Lining up to leave the classroom, playground, etc.
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.travelingExamples}>
                    Walking to the playground, library, music room, etc.
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.waitingExamples}>
                    Teacher stops an activity or delays the start of a new activity to gather or prepare materials 
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.routinesExamples}>
                    Cleaning up, hand-washing, getting out cots or meal trays, etc.
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.behaviorExamples}>
                    Teacher stops a learning activity to address behavior
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="checkbox" className={classes.lineExamples}>
                    Children are lined up but are waiting to go to the next place
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.travelingExamples}>
                    
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.waitingExamples}>
                    Teacher stops an activity or delays the start of a new activity to do something unrelated to activity
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.routinesExamples}>
                    Bathroom and/or water break in the classroom or hallway
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.behaviorExamples}>
                   
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding="checkbox" className={classes.lineExamples}>
                    Waiting in line for lunch
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.travelingExamples}>
                    
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.waitingExamples}>
                    
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.routinesExamples}>
                    Moving from one activity to another (e.g., whole group to centers)
                  </TableCell>
                  <TableCell padding="checkbox" className={classes.behaviorExamples}>
                    
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
            : view === ViewEnum.EXAMPLE ? 
              <div>EXAMPLE</div>
            : view === ViewEnum.DEMONSTRATION ? 
              <ChildTeacherBehaviorTrendsSlider/>
            : view === ViewEnum.TRYIT ? 
              <div>TRY IT</div>
            : view === ViewEnum.KNOWLEDGECHECK ? (
              <TrainingQuestionnaire section={'transition'}/>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

TransitionTimeTrainingHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimeTrainingHome);
