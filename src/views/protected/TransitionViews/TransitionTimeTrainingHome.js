import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/index";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import TransitionTimeIcon from "../../../assets/icons/TransitionTime.svg";
import { withStyles } from "@material-ui/core/styles/index";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import 'chartjs-plugin-datalabels';
import TrainingVideo
    from "../../../components/Shared/TrainingVideo";
import ChildTeacherBehaviorTrendsSlider
    from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider";
import TrainingQuestionnaire from "../../../components/Shared/TrainingQuestionnaire";



const styles = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column"
  },
  main: {
    flex: 1,
    height: "90%",
    marginTop: "10vh"
  },
  grow: {
    flexGrow: 1
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
    top: "3vh"
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

class TransitionTimeTrainingHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleAppend = this.handleAppend.bind(this);
  }

  state = {
    auth: true,
    anchorEl: null,
    help: false,
    type: null,
    hex: "#FFFFFF",
    entries: [],
    dbCounter: 0, // @Hack @Temporary !!!
    view: ViewEnum.CONCEPTS
  };

  handleAppend(entry) {
    let newEntries = this.state.entries;
    entry.type = this.state.type;
    newEntries.push(entry);
    this.setState({ entries: newEntries });

    this.handleSpreadsheetAppend(entry);

    this.handleDBinsert(entry);
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleHelpModal = () => {
    this.setState({ help: true });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  handleDBinsert = async entry => {
    // Once we integrate users, the user + some index will be the key for the DB.
    await ImmortalDB.set(
      JSON.stringify(this.state.dbCounter),
      JSON.stringify(entry)
    );

    this.setState({ dbCounter: this.state.dbCounter + 1 });
  };

  conceptsClick = () => {
    if (this.state.view !== ViewEnum.CONCEPTS) {
      this.setState({ view: ViewEnum.CONCEPTS });
    }
  };

  exampleClick = () => {
    if (this.state.view !== ViewEnum.EXAMPLE) {
      this.setState({ view: ViewEnum.EXAMPLE });
    }
  };

  demonstrationClick = () => {
    if (this.state.view !== ViewEnum.DEMONSTRATION) {
      this.setState({ view: ViewEnum.DEMONSTRATION });
    }
  };

  tryItClick = () => {
    if (this.state.view !== ViewEnum.TRYIT) {
      this.setState({ view: ViewEnum.TRYIT });
    }
  };

  knowledgeCheckClick = () => {
    if (this.state.view !== ViewEnum.KNOWLEDGECHECK) {
      this.setState({ view: ViewEnum.KNOWLEDGECHECK });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main>
          <Grid container spacing={0} justify="center" direction={"row"} alignItems={"center"}>
            <Grid container item xs={3}>
              <List className={classes.buttonsList}>
                <ListItem style={{display:'flex', justifyContent:'center'}}>
                  <img src={TransitionTimeIcon} width={'100vw'}/>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    fullWidth={true}
                    variant={
                      this.state.view === ViewEnum.CONCEPTS
                        ? "contained"
                        : "outlined"
                    }
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
                    variant={
                      this.state.view === ViewEnum.EXAMPLE
                        ? "contained"
                        : "outlined"
                    }
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
                    variant={
                      this.state.view === ViewEnum.DEMONSTRATION
                        ? "contained"
                        : "outlined"
                    }
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
                    variant={
                      this.state.view === ViewEnum.TRYIT
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.tryItClick}
                  >
                    TRY IT YOURSELF
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color= {"primary"}
                    fullWidth={true}
                    variant={
                      this.state.view === ViewEnum.KNOWLEDGECHECK
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.knowledgeCheckClick}
                  >
                    KNOWLEDGE CHECK
                  </Button>
                </ListItem>
              </List>
            </Grid>
            <Grid container item xs={8} justify="center" direction={"row"} alignItems={"center"}>
              {/* <Typography variant={"h5"} alignItems={"center"} justify={"center"}>
                Training: Transition Time Tool
              </Typography> */}
              <Grid item xs={12}>
                <div>
                  {this.state.view === ViewEnum.CONCEPTS ? (
                    <div className={classes.resultsContent}>
                      <TrainingVideo
                        videoUrl = {'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com'+
                        '/o/TT%20Concepts%205-31-19.mp4?alt=media&token=0f968fb5-047a-4fb9-90ec-7149b40a3e9c'}
                      />
                    </div>
                  ) : this.state.view === ViewEnum.EXAMPLE ? (
                    <div className={classes.resultsContent}>
                      <TrainingVideo/>
                    </div>
                  ) : this.state.view === ViewEnum.DEMONSTRATION ? (
                    <div className={classes.resultsContent}>
                      <ChildTeacherBehaviorTrendsSlider/>
                    </div>
                  ) : this.state.view === ViewEnum.TRYIT ? (
                    null
                  ) : this.state.view === ViewEnum.KNOWLEDGECHECK ? (
                    <div className={classes.resultsContent}>
                      <TrainingQuestionnaire section={1}/>
                    </div>
                  ) :  null}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

TransitionTimeTrainingHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimeTrainingHome);
