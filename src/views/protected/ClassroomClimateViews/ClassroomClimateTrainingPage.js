import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/index";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ClassroomClimateIconImage from "../../../assets/images/ClassroomClimateIconImage.svg";
import { withStyles } from "@material-ui/core/styles/index";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
// import { ImmortalDB } from "immortal-db";
import "chartjs-plugin-datalabels";
import TrainingVideo from "../../../components/Shared/TrainingVideo.tsx";
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

/**
 * classroom climate training
 * @class ClassroomClimateTrainingPage
 */
class ClassroomClimateTrainingPage extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
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

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main>
          <Grid
            container
            spacing={0}
            justify="center"
            direction={"row"}
            alignItems={"center"}
          >
            <Grid item xs={3}>
              <List className={classes.buttonsList}>
                <ListItem style={{ display: "flex", justifyContent: "center" }}>
                  <img src={ClassroomClimateIconImage} width={"100vw"} />
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
                    color={"primary"}
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
            <Grid item xs={8}>
              <Grid
                container
                justify="center"
                direction={"row"}
                alignItems={"center"}
              >
                <Typography
                  variant={"h5"}
                  alignItems={"center"}
                  justify={"center"}
                >
                  Training: Classroom Climate Tool
                </Typography>
                <Grid item xs={12}>
                  <div>
                    {this.state.view === ViewEnum.CONCEPTS ? (
                      <div className={classes.resultsContent}>
                        <TrainingVideo
                          videoUrl={
                            "https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/CC%20Concepts%207-17-19.mp4?alt=media&token=2375a7d2-3c6e-4eec-a9c0-a29214db9cdf"
                          }
                        />
                      </div>
                    ) : this.state.view === ViewEnum.EXAMPLE ? (
                      <div className={classes.resultsContent}>
                        <Typography variant="h4">
                          COMING SOON...
                        </Typography>
                      </div>
                    ) : this.state.view === ViewEnum.DEMONSTRATION ? (
                      <div className={classes.resultsContent}>
                        <Typography variant="h4">
                          COMING SOON...
                        </Typography>
                      </div>
                    ) : this.state.view === ViewEnum.TRYIT ? (
                      <div className={classes.resultsContent}>
                        <Typography variant="h4">
                          COMING SOON...
                        </Typography>
                      </div>
                    ) : this.state
                        .view === ViewEnum.KNOWLEDGECHECK ? (
                      <div className={classes.resultsContent}>
                        <TrainingQuestionnaire section={'climate'} />
                      </div>
                    ) : null}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

ClassroomClimateTrainingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClassroomClimateTrainingPage);
