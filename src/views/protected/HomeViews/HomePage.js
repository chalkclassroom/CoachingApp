import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CalendarImage from "../../../assets/images/CalendarImage.svg";
import ObserveImage from "../../../assets/images/ObserveImage.svg";
import ResultsImage from "../../../assets/images/ResultsImage.svg";
import MessagesImage from "../../../assets/images/MessagesImage.svg";
import TeacherModal from "./TeacherModal.tsx";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  card: {
    maxHeight: "90%",
    flex: 1,
    maxWidth: "40%"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  image: {
    height: "15vh",
    width: "15vw"
  },
  buttonGrid: {
    padding: 40
  }
};

/**
 * home page
 * @class HomePage
 */
class HomePage extends React.Component {
  state = {
    teacherModal: false,
    type: "",
    coachName: ""
  };

  /**
   * @param {string} type
   */
  showTeacherModal = type => {
    this.setState({ teacherModal: true, type: type });
  };

  handleClose = () => {
    this.setState({
      teacherModal: false,
      type: ""
    });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const firebase = this.context;
    firebase.getCoachFirstName().then(name => {
      this.setState({ coachName: name });
    });
    firebase.handleFetchTrainingStatus();
    firebase.handleFetchQuestions("transition");
  }

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
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 40 }}
        >
          <Typography component={"h3"} variant={"h3"} align={"center"}>
            Welcome, {this.state.coachName}!
          </Typography>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-around"
            className={classes.buttonGrid}
          >
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <img src={CalendarImage} className={classes.image} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Schedules & Calendar
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card
              className={classes.card}
              onClick={() => this.showTeacherModal("Observe")}
            >
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <img src={ObserveImage} className={classes.image} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Observe
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-around"
            className={classes.buttonGrid}
          >
            <Card
              className={classes.card}
              onClick={() => this.showTeacherModal("Results")}
            >
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <img src={ResultsImage} className={classes.image} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Results
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <img src={MessagesImage} className={classes.image} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Messages
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {this.state.teacherModal ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <TeacherModal
                handleClose={this.handleClose}
                firebase={firebase}
                type={this.state.type}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

HomePage.contextType = FirebaseContext;
export default withStyles(styles)(HomePage);
