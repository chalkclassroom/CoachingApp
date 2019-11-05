import React, {Component} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/index";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import FilledInput from "@material-ui/core/FilledInput/index";
import InputLabel from "@material-ui/core/InputLabel/index";
import FormControl from "@material-ui/core/FormControl/index";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Select from "@material-ui/core/Select/index";
import {ReactComponent as GenerateReportSVG} from "../../../assets/icons/generateReport.svg";
import TransitionTimeIcon from "../../../assets/icons/TransitionTime.svg";
import {withStyles} from "@material-ui/core/styles/index";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import 'chartjs-plugin-datalabels';
import TrainingVideo
    from "../../../components/Shared/TrainingVideo";
import ChildTeacherBehaviorTrendsSlider
    from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable";
import 'chartjs-plugin-datalabels';
import TrainingQuestionnaire from "../../../components/Shared/TrainingQuestionnaire";

const styles = {
  root: {
    flexGrow: 1,
    height: '100vh',
    flexDirection: 'column',
    border: '1px solid #000000',
    overflow: 'hidden',
    marginBottom: '0',
    paddingBottom: '0'
  },
  main: {
    flex: 1,
    height: '90%',
    marginTop: '0',
    border: '1px solid #2BFF00'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  viewButtons: {
    minWidth: 150,
    textAlign: "center"
  },
  buttonsList: {
    position: "relative",
    top: "3vh",
    border: '1px solid #00FFEB'
  },
  title: {
    position: "relative",
    left: "33%",
    top: "10%"
  },
  secondTitle: {
    position: "relative",
    left: "40%",
    top: "10%"
  },
  chart: {
    position: "relative",
    left: "7%",
    top: "5%"
  },
  generateReport: {
    position: "relative",
    right: "10%",
    top: "76%",
    left: "10%"
  },
  resultsContent: {
    height: "60vh",
    position: "relative",
    top: "8vh"
  }
};

const ViewEnum = {
  CONCEPTS: 1,
  EXAMPLE: 2,
  DEMONSTRATION: 3,
  TRYIT: 4,
  KNOWLEDGECHECK: 5
};

// dummy data for transition list detail table, when we read in from DB we can use custom id
let id = 0;

function createTransitionData(startTime, duration, notes) {
  id += 1;
  return {id, startTime, duration, notes};
}

function createNotesData(time, notes) {
  id += 1;
  return {id, time, notes};
}

const transitionData = [
  createTransitionData("08:32", "2m 3s", "Breakfast to am meeting"),
  createTransitionData("08:44", "5m 10s", "Line up for bathroom"),
  createTransitionData("09:01", "1m 7s", "T finding book"),
  createTransitionData("09:37", "1m 56s", "Rotating rooms"),
  createTransitionData("09:56", "3m 2s", "Cleanup after centers")
];

const transitionNotes = [
  createNotesData("08:32", "Kiss your brain"),
  createNotesData("08:44", "Great super friend"),
  createNotesData("09:01", "Lots of good jobs"),
  createNotesData("09:37", "BD frown"),
  createNotesData("09:56", "Close down center conflict")
];

class TransitionTimeTrainingHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ViewEnum.CONCEPTS
    };
  }

  conceptsClick = () => {
    if (this.state.view !== ViewEnum.CONCEPTS) {
      this.setState({view: ViewEnum.CONCEPTS});
    }
  };

  exampleClick = () => {
    if (this.state.view !== ViewEnum.EXAMPLE) {
      this.setState({view: ViewEnum.EXAMPLE});
    }
  };

  demonstrationClick = () => {
    if (this.state.view !== ViewEnum.DEMONSTRATION) {
      this.setState({view: ViewEnum.DEMONSTRATION});
    }
  };

  tryItClick = () => {
    if (this.state.view !== ViewEnum.TRYIT) {
      this.setState({view: ViewEnum.TRYIT});
    }
  };

  knowledgeCheckClick = () => {
    if (this.state.view !== ViewEnum.KNOWLEDGECHECK) {
      this.setState({view: ViewEnum.KNOWLEDGECHECK});
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <div className={classes.main}>
          <Grid container spacing={0} justify="center" direction={"row"} alignItems={"center"}>
            <Grid container item xs={3}>
              <List className={classes.buttonsList}>
                <ListItem style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={TransitionTimeIcon} width={'100px'} alt=""/>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    fullWidth={true}
                    variant={this.state.view === ViewEnum.CONCEPTS ? "contained" : "outlined"}
                    className={classes.viewButtons}
                    onClick={this.conceptsClick}
                  >
                    CONCEPTS
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    fullWidth={true}
                    variant={this.state.view === ViewEnum.EXAMPLE ? "contained" : "outlined"}
                    className={classes.viewButtons}
                    onClick={this.exampleClick}
                  >
                    EXAMPLE
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    fullWidth={true}
                    variant={this.state.view === ViewEnum.DEMONSTRATION ? "contained" : "outlined"}
                    className={classes.viewButtons}
                    onClick={this.demonstrationClick}
                  >
                    DEMONSTRATION
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    fullWidth={true}
                    variant={this.state.view === ViewEnum.TRYIT ? "contained" : "outlined"}
                    className={classes.viewButtons}
                    onClick={this.tryItClick}
                  >
                    TRY IT YOURSELF
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    fullWidth={true}
                    variant={this.state.view === ViewEnum.KNOWLEDGECHECK ? "contained" : "outlined"}
                    className={classes.viewButtons}
                    onClick={this.knowledgeCheckClick}
                  >
                    KNOWLEDGE CHECK
                  </Button>
                </ListItem>
              </List>
            </Grid>
            <Grid container item xs={8} justify="center" direction={"row"} alignItems={"center"}
                  style={{border: '1px solid #F400FF'}}>
              <Typography variant={"h5"} alignItems={"center"} justify={"center"}>
                Training: Transition Time Tool
              </Typography>
              <Grid item xs={12}>
                <div>
                  {this.state.view === ViewEnum.CONCEPTS ? (
                    <div className={classes.resultsContent}>
                      <TrainingVideo
                        videoUrl={'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/TT%20Concepts%205-31-19.mp4?alt=media&token=0f968fb5-047a-4fb9-90ec-7149b40a3e9c'}/>
                    </div>
                  ) : this.state.view === ViewEnum.EXAMPLE ? (
                    <div className={classes.resultsContent}>
                      EXAMPLE
                    </div>
                  ) : this.state.view === ViewEnum.DEMONSTRATION ? (
                    <div className={classes.resultsContent}>
                      <ChildTeacherBehaviorTrendsSlider/>
                    </div>
                  ) : this.state.view === ViewEnum.TRYIT ?
                    <div className={classes.resultsContent}>
                      TRY IT
                    </div>
                    : this.state.view === ViewEnum.KNOWLEDGECHECK ? (
                      <div className={classes.resultsContent}>
                        <TrainingQuestionnaire section={'transition'}/>
                      </div> // replace this null with next steps content
                    ) : null}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

TransitionTimeTrainingHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimeTrainingHome);
