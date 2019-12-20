import React from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AppBar from "../../../components/AppBar";
import RatingModal from "../../../components/ClassroomClimateComponent/RatingModal";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import BehaviorCounter from "../../../components/ClassroomClimateComponent/BehaviorCounter";
import { connect } from "react-redux";
import {
  appendClimateRating,
  emptyClimateStack
} from "../../../state/actions/classroom-climate";
import Dashboard from "../../../components/Dashboard";
import Countdown from "../../../components/Countdown.tsx";
import EmptyToneRating from "../../../components/ClassroomClimateComponent/EmptyToneRating";

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 130000;

const styles = {
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
};

/**
 * classroom climate observation tool
 * @class ClassroomClimatePage
 */
class ClassroomClimatePage extends React.Component {
  state = {
    auth: true,
    time: RATING_INTERVAL,
    ratingIsOpen: false,
    ratings: [],
    recs: true,
    incompleteRating: false
  };

  tick = () => {
    if (this.state.time <= 0) {
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

  handleRatingModal = () => {
    this.setState({ ratingIsOpen: true });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  /**
   * @param {number} rating
   */
  handleRatingConfirmation = rating => {
    this.setState({ ratingIsOpen: false });

    this.props.appendClimateRating(rating);

    const entry = {
      BehaviorResponse: rating,
      Type: "Rat",
      ratingInterval: RATING_INTERVAL
    };
    const firebase = this.context;
    firebase.handlePushClimate(entry);
  };

  handleIncomplete = () => {
    this.setState({ incompleteRating: true });
  };

  handleClickAwayIncomplete = () => {
    this.setState({ incompleteRating: false });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
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
            style={{ margin: 10 }}
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
                    magic8="Classroom Climate"
                    color="#0988ec"
                    infoDisplay={
                      <Countdown color="#0988ec" timerTime={RATING_INTERVAL} />
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
                  <FirebaseContext.Consumer>
                    {firebase => (
                      <BehaviorCounter
                        teacherId={this.props.location.state.teacher.id}
                        firebase={firebase}
                      />
                    )}
                  </FirebaseContext.Consumer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

ClassroomClimatePage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  appendClimateRating: PropTypes.func.isRequired
};

ClassroomClimatePage.contextType = FirebaseContext;

export default connect(null, { appendClimateRating, emptyClimateStack })(
  withStyles(styles)(ClassroomClimatePage)
);
