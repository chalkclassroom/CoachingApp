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
import { Line } from "rc-progress";
import ms from "pretty-ms";
import FirebaseContext from "../../../components/Firebase/context";
import BehaviorCounter from "../../../components/ClassroomClimateComponent/BehaviorCounter";
import { connect } from "react-redux";
import Notes from "../../../components/Notes";
import Typography from "@material-ui/core/Typography";
import CenterRatingPopUp from "../../../components/AssociativeCooperativeComponents/CenterRatingPopUp";
import InstructionTransitionToggle from "../../../components/ClassroomClimateComponent/InstructionTransitionToggle";
import ClassroomClimateHelp from "../../../components/ClassroomClimateComponent/ClassroomClimateHelp";
import CenterMenu from "../../../components/AssociativeCooperativeComponents/CenterMenu";

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

class AssociativeCooperativeInteractions extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    help: false,
    ratingIsOpen: false,
    ratings: [],
    climateType: false
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
  handleNotes = open => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };
  handleRatingConfirmation = rating => {
    this.setState({ ratingIsOpen: false });

    /* from RatingModal for ClassroomClimate

        this.props.appendClimateRating(rating);

        let entry = {
            BehaviorResponse: rating,
            Type: "Rating",
            ratingInterval: RATING_INTERVAL
        };
        let firebase = this.context;
        firebase.handlePushFireStore(entry);
        */
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        {this.state.help ? (
          <ClickAwayListener onClickAway={this.handleClickAway}>
            {" "}
            <ClassroomClimateHelp />
          </ClickAwayListener>
        ) : this.state.notes ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Notes
                open={true}
                onClose={this.handleNotes}
                color="#0988EC"
                text="Classroom Climate Notes"
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
        <Modal open={this.state.ratingIsOpen} onBackdropClick={null}>
          <CenterRatingPopUp />
        </Modal>
        <main style={{ flex: 1 }}>
          <Grid
            container
            alignItems={"center"}
            justify={"center"}
            direction={"column"}
          >
            <CenterMenu />
          </Grid>
          <div />
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
                <InfoIcon color={"secondary"} fontSize={"large"} />
              </IconButton>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleNotes}
                color="inherit"
              >
                <EditIcon color={"secondary"} fontSize={"large"} />
              </IconButton>
            </Grid>
            <Grid container xs={8} />
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
                <br />
                <FirebaseContext.Consumer>
                  {firebase => (
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
                  )}
                </FirebaseContext.Consumer>
              </Grid>
            </Grid>
          </Grid>
        </footer>
      </div>
    );
  }
}

AssociativeCooperativeInteractions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssociativeCooperativeInteractions);
