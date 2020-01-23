import React from "react";
import PropTypes from "prop-types";
import {Button} from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AppBar from "../../../components/AppBar";
import RatingModal from "../../../components/ClassroomClimateComponent/RatingModal";
import FirebaseContext from "../../../components/Firebase/context";
import BehaviorCounter from "../../../components/ClassroomClimateComponent/BehaviorCounter";
import { connect } from "react-redux";
import { appendClimateRating, emptyClimateStack } from "../../../state/actions/classroom-climate";
//import Recs from "./ClassroomClimateRecs";
import Dashboard from "../../../components/Dashboard";
import Countdown from "../../../components/Countdown";
import EmptyToneRating from "../../../components/ClassroomClimateComponent/EmptyToneRating";
import StudentList from "./StudentList";


const RATING_INTERVAL = 5000;

const styles = ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  }
});

class StudentEngagement extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    auth: true,
    time: RATING_INTERVAL,
    ratingIsOpen: false,
    ratingStart: false,
    ratings: [],
    recs: true,
    incompleteRating: false,
    studentNames: []
  }
    this.beginObservation = this.beginObservation.bind(this);
  };

  tick = () => {
    if (!this.state.ratingStart) {
      // wait to start ratings
    }
    else if (this.state.time <= 0) {
      this.handleRatingModal();
      this.setState({ time: RATING_INTERVAL });
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - 1000 });
      }
    }
  };

  handleRecsModal = open => {
    if (open) {
      this.setState({ recs: true });
    } else {
      this.setState({ recs: false });
    }
  };

  handleRatingModal = () => {
    this.setState({ ratingIsOpen: true });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  handleRatingConfirmation = rating => {
    this.setState({ ratingIsOpen: false });

    this.props.appendClimateRating(rating);

    let entry = {
      BehaviorResponse: rating,
      Type: "Rat",
      ratingInterval: RATING_INTERVAL
    };
    let firebase = this.context;
    firebase.handlePushClimate(entry);
  };

  handleIncomplete = () => {
    this.setState({ incompleteRating: true });
  }

  handleClickAwayIncomplete = () => {
    this.setState({ incompleteRating: false });
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  beginObservation = (studentNames) => {
    this.setState({ ratingStart: true });
    this.setState({ studentNames: studentNames});
    console.log(studentNames)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        {/* {this.state.recs ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Recs
                open={true}
                onClose={this.handleRecsModal}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )} */}
        <Modal open={this.state.ratingIsOpen} onBackdropClick={null}>
          <RatingModal
            handleRatingConfirmation={this.handleRatingConfirmation}
            handleIncomplete={this.handleIncomplete}
          />
        </Modal>
        <Modal open={this.state.incompleteRating}>
          <ClickAwayListener onClickAway={this.handleClickAwayIncomplete}>
            <EmptyToneRating />
          </ClickAwayListener>
        </Modal>
        <main style={{ flex: 1 }}>
          <Grid
            container
            alignItems={"center"}
            justify={"center"}
            direction={"column"}
            style={{ margin: 10}}
          >
            <Grid 
              container
              alignItems={"center"}
              justify={"center"}
              direction={"row"}
            >
              <Grid item xs={3}>
                <Grid
                  container
                  alignItems={"center"}
                  justify={"center"}
                  direction={"column"}
                >
                  <Dashboard 
                    magic8="Level of Engagement"
                    color="#0988ec"
                    infoDisplay= {
                      this.state.ratingStart?
                      <Countdown color="#0988ec" timerTime={RATING_INTERVAL}/> : <div></div>
                    }
                    infoPlacement="center"
                    completeObservation={true}
                  />
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Grid
                  container
                  alignItems={"center"}
                  justify={"center"}
                  direction={"column"}
                >
                {!this.state.ratingStart &&
                <StudentList
                  beginObservation = {this.beginObservation}
                />
                }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

StudentEngagement.propTypes = {
  classes: PropTypes.object.isRequired
};

StudentEngagement.contextType = FirebaseContext;

export default connect(
  null,
  { appendClimateRating, emptyClimateStack }
)(withStyles(styles)(StudentEngagement));
