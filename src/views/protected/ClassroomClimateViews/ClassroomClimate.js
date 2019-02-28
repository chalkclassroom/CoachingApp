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
import InstructionTransitionToggle from "../../../components/ClassroomClimateComponent/InstructionTransitionToggle";
import RatingModal from "../../../components/ClassroomClimateComponent/RatingModal";
import { Line } from "rc-progress";
import ms from "pretty-ms";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import BehaviorCounter from "../../../components/ClassroomClimateComponent/BehaviorCounter";
import CounterWithUndo from "../../../components/ClassroomClimateComponent/CounterWithUndo";
import { connect } from "react-redux";
import { appendClimateRating } from "../../../state/actions/classroom-climate";

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 130000;
const TEN_PERCENT = 0.1 * RATING_INTERVAL;

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

class ClassroomClimate extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        help: false,
        time: RATING_INTERVAL,
        ratingIsOpen: false,
        ratings: []
    };

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

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
                <div/>
              )}
              <Modal open={this.state.ratingIsOpen} onBackdropClick={null}>
                  <RatingModal
                    handleRatingConfirmation={this.handleRatingConfirmation}
                  />
              </Modal>
              <main style={{ flex: 1 }}>
                  <Grid container spacing={16}>
                      <Grid item xs={4}>
                          <Grid
                            container
                            direction={"column"}
                            justify={"center"}
                            alignItems={"center"}
                            spacing={16}
                          >
                              <Grid item>
                                  <FirebaseContext.Consumer>
                                      {firebase =>
                                        <CounterWithUndo
                                          firebase = {firebase}
                                        />
                                      }

                                  </FirebaseContext.Consumer>
                              </Grid>
                          </Grid>
                      </Grid>
                      <Grid item xs={8}>
                          <Grid container spacing={0}>
                              <Grid
                                item
                                xs
                                style={{ marginBottom: 50, marginTop: 50 }}
                              >
                                  <InstructionTransitionToggle
                                    teacherId={
                                        this.props.location.state.key.id
                                    }
                                  />
                                  <FirebaseContext.Consumer>
                                      {firebase =>
                                        <BehaviorCounter
                                          teacherId={
                                              this.props.location.state.key.id
                                          }
                                          firebase={firebase}
                                        />}
                                  </FirebaseContext.Consumer>

                                  <div
                                    style={{
                                        margin: 20,
                                        textAlign: "center"
                                    }}
                                  >
                                      Time until next Tone Rating:
                                      {ms(this.state.time)}
                                  </div>
                                  <Line
                                    percent={`${100 *
                                    (this.state.time /
                                      RATING_INTERVAL)}`}
                                    strokeWidth="1"
                                    strokeColor={
                                        this.state.time > TEN_PERCENT
                                          ? "#00ff00"
                                          : "#ff0000"
                                    }
                                  />
                              </Grid>
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
                      <Grid item xs={8}/>
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
                                          this.props.history.push({
                                              pathname: "/Home",
                                              state: this.props.location.state
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
  { appendClimateRating }
)(withStyles(styles)(ClassroomClimate));
