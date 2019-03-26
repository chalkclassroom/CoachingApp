import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import YesNoDialog from "../../../components/Shared/YesNoDialog";
import AppBar from "../../../components/AppBar";
import ClassroomClimateHelp from "../../../components/ClassroomClimateComponent/ClassroomClimateHelp";
import RatingModal from "../../../components/ClassroomClimateComponent/RatingModal";
import { Line } from "rc-progress";
import ms from "pretty-ms";
import FirebaseContext from "../../../components/Firebase/context";
import BehaviorCounter from "../../../components/ClassroomClimateComponent/BehaviorCounter";
import { connect } from "react-redux";
import { appendClimateRating, emptyClimateStack } from "../../../state/actions/classroom-climate";
import Notes from "../../../components/Notes";
import Typography from "@material-ui/core/Typography";

import InstructionTransitionToggle from "../../../components/ClassroomClimateComponent/InstructionTransitionToggle";
/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 130000;
const TEN_PERCENT = 0.1 * RATING_INTERVAL;

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



class ClassroomClimate extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    help: false,
    time: RATING_INTERVAL,
    ratingIsOpen: false,
    ratings: [],
    climateType: false
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
  handleHelpModal = () => {
    this.setState({ help: true });
  };
  handleClickAway = () => {
    this.setState({ help: false });
  };
  handleNotes = (open) => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };
  handleRatingConfirmation = rating => {
    this.setState({ ratingIsOpen: false });

    this.props.appendClimateRating(rating);

    let entry = {
      BehaviorResponse: rating,
      Type: "Rating",
      ratingInterval: RATING_INTERVAL
    };
    let firebase = this.context;
    firebase.handlePushFireStore(entry);
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        {this.state.help ? (
          <ClickAwayListener onClickAway={this.handleClickAway}>
            {" "}
            <ClassroomClimateHelp/>
          </ClickAwayListener>
        ) : (
          this.state.notes ? (
            <FirebaseContext.Consumer>
              {firebase => <Notes open={true} onClose={this.handleNotes} color="#0988EC" text="Classroom Climate Notes" firebase={firebase}/>}
            </FirebaseContext.Consumer>
            ) :
            <div/>
        )}
        <Modal open={this.state.ratingIsOpen} onBackdropClick={null}>
          <RatingModal
            handleRatingConfirmation={this.handleRatingConfirmation}
          />
        </Modal>
        <main style={{ flex: 1 }}>
          <Grid container xs={12}
                alignItems={"center"}
                justify={"center"}
                direction={"column"}>

            <Typography variant={"h4"} alignItems={"center"} justify={"center"}>
              Classroom Climate
            </Typography>
            <Grid container xs={12}
                  alignItems={"center"}
                  justify={"center"}
                  direction={"row"}>
              <Grid item xs={2}/>
              <Grid container xs={8} alignItems={"center"}
                    justify={"center"}
                    direction={"row"}>
                <FirebaseContext.Consumer>
                  {firebase =>
                    <BehaviorCounter
                      teacherId={
                        this.props.location.state.teacher.id
                      }
                      firebase={firebase}
                    />}
                </FirebaseContext.Consumer>
              </Grid>
              <Grid item xs={2}>
                <Line
                  style={{ transform: "rotate(270deg)" }}
                  percent={`${100 *
                  (this.state.time /
                    RATING_INTERVAL)}`}
                  strokeWidth="4"
                  strokeColor={
                    this.state.time > TEN_PERCENT
                      ? "#009365"
                      : "#E55529"
                  }
                />
                <div
                  style={{
                    paddingTop: 150,
                    textAlign: "center"
                  }}
                >
                  {ms(this.state.time)}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <div/>
        </main>
        <footer>
          <Grid
            container
            alignItems={"center"}
            justify={"space-between"}
            direction={"row"}
          >
            <Grid item xs={2}>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleHelpModal}
                color="inherit"
              >
                <InfoIcon
                  color={"secondary"}
                  fontSize={"large"}
                />
              </IconButton>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleNotes}
                color="inherit"
              >
                <EditIcon
                  color={"secondary"}
                  fontSize={"large"}
                />
              </IconButton>
            </Grid>
            <Grid container xs={8}
                  alignItems={"center"}
                  justify={"center"}
                  direction={"row"}>
              <InstructionTransitionToggle/>
            </Grid>
            <Grid item xs={2}>
              <Grid
                container
                alignItems={"center"}
                justify={"space-between"}
                direction={"column"}
              >
                Start Time:{" "}
                {new Date().toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true
                })}
                <br/>
                <FirebaseContext.Consumer>
                  {firebase =>
                    <YesNoDialog
                      buttonText={"Complete Observation"}
                      buttonVariant={"contained"}
                      buttonColor={"secondary"}
                      buttonStyle={{ margin: 10 }}
                      dialogTitle={
                        "Are you sure you want to complete this observation?"
                      }
                      shouldOpen={true}
                      onAccept={() => {
                        this.props.emptyClimateStack();
                        this.props.history.push({
                          pathname: "/Home",
                          state: this.props.history.state
                        });
                        firebase.endSession();
                      }}
                    />
                  }
                </FirebaseContext.Consumer>
              </Grid>
            </Grid>
          </Grid>
        </footer>
      </div>
    );
  }
}

ClassroomClimate.propTypes = {
  classes: PropTypes.object.isRequired
};

ClassroomClimate.contextType = FirebaseContext;

export default connect(
  null,
  { appendClimateRating, emptyClimateStack }
)(withStyles(styles)(ClassroomClimate));
