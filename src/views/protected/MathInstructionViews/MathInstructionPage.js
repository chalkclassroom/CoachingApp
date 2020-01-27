import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import { connect } from "react-redux";
import CenterMenuMath from "../../../components/MathInstructionComponents/CenterMenuMath";
import { deleteAllCenters } from "../../../state/actions/math-instruction";

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

class MathInstructionPage extends React.Component {
  state = {
    auth: true,
    ratingIsOpen: false,
    ratings: [],
    climateType: false,
    completeEnabled: false,
    recs: true
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
        {/* this.state.recs ? (
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
        ) */}
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {firebase => (
              <CenterMenuMath
                teacherId={this.props.location.state.teacher.id}
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

MathInstructionPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, { deleteAllCenters })(
  withStyles(styles)(MathInstructionPage)
);