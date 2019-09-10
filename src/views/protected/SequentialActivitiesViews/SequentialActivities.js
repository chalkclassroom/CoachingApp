import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/context";
import { connect } from "react-redux";
import Notes from "../../../components/Notes";
import ClassroomClimateHelp from "../../../components/ClassroomClimateComponent/ClassroomClimateHelp";
import CenterMenu from "../../../components/SequentialActivitiesComponents/CenterMenuSequentialActivities";
import { deleteAllCenters } from "../../../state/actions/sequential-activities";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 0
  }
};

class SequentialActivities extends React.Component {
  state = {
    auth: true,
    //anchorEl: null,
    help: false,
    ratingIsOpen: false,
    ratings: [],
    climateType: false,
    completeEnabled: false
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
  };

  handleCompleteButton = enable => {
    this.setState({ completeEnabled: enable });
  };

  render() {

    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {firebase => (
            <AppBar
              firebase={firebase}
              classes={{ root: this.props.classes.grow }}
            />
          )}
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
                text="Sequential Activities Notes"
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {firebase => (
              <CenterMenu
                firebase={firebase}
                onStatusChange={this.handleCompleteButton}
              />
            )}
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

SequentialActivities.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteAllCenters }
)(withStyles(styles)(SequentialActivities));
