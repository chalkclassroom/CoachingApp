import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import TransitionTimeIconImage from "../assets/images/TransitionTimeIconImage.svg";
import ClassroomClimateIconImage from "../assets/images/ClassroomClimateIconImage.svg";
import MathIconImage from "../assets/images/MathIconImage.svg";
import EngagementIconImage from "../assets/images/EngagementIconImage.svg";
import InstructionIconImage from "../assets/images/InstructionIconImage.svg";
import ListeningIconImage from "../assets/images/ListeningIconImage.svg";
import SequentialIconImage from "../assets/images/SequentialIconImage.svg";
import AssocCoopIconImage from "../assets/images/AssocCoopIconImage.svg";
import TransitionNotesImage from "../assets/images/TransitionNotesImage.svg";
import ClassroomClimateNotesImage from "../assets/images/ClassroomClimateNotesImage.svg";
import MathNotesImage from "../assets/images/MathNotesImage.svg";
import EngagementNotesImage from "../assets/images/EngagementNotesImage.svg";
import InstructionNotesImage from "../assets/images/InstructionNotesImage.svg";
import ListeningNotesImage from "../assets/images/ListeningNotesImage.svg";
import SequentialNotesImage from "../assets/images/SequentialNotesImage.svg";
import AssocCoopNotesImage from "../assets/images/AssocCoopNotesImage.svg";
import TransitionTimeLookForsImage from "../assets/images/TransitionTimeLookForsImage.svg";
import ClassroomClimateLookForsImage from "../assets/images/ClassroomClimateLookForsImage.svg";
import MathLookForsImage from "../assets/images/MathLookForsImage.svg";
import EngagementLookForsImage from "../assets/images/EngagementLookForsImage.svg";
import InstructionLookForsImage from "../assets/images/InstructionLookForsImage.svg";
import ListeningLookForsImage from "../assets/images/ListeningLookForsImage.svg";
import SequentialLookForsImage from "../assets/images/SequentialLookForsImage.svg";
import AssocCoopLookForsImage from "../assets/images/AssocCoopLookForsImage.svg";
import Notes from "./Notes";
import FirebaseContext from "./Firebase/FirebaseContext";
import { ClickAwayListener } from "@material-ui/core/es";
import TransitionTimeHelp from "../views/protected/TransitionViews/TransitionTimeHelp";
import ClassroomClimateHelp from "./ClassroomClimateComponent/ClassroomClimateHelp";
import YesNoDialog from "./Shared/YesNoDialog.tsx";
import { resetTransitionTime } from "../state/actions/transition-time";
import { emptyClimateStack } from "../state/actions/classroom-climate";
import { deleteAllCenters } from "../state/actions/associative-cooperative";
import { connect } from "react-redux";
import IncompleteObservation from "./IncompleteObservation.tsx";

const styles = {
  card: {
    border: "3px solid #d9d9d9",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "100%",
    boxShadow: "5px",
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
    flexDirection: "column",
    alignItems: "center",
    justify: "space-evenly",
    display: "flex",
    flex: "1",
    flexWrap: "nowrap"
  },
  iconGrid: {
    marginTop: "10px",
    marginBottom: "5px"
  },
  icon: {
    width: "100px",
    height: "100px"
  },
  infoDisplayGrid: {
    height: "41vh",
    width: "90%",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    marginBottom: "5px",
    display: "flex",
    justifyItems: "center"
  },
  helpIcon: {
    width: "60px"
  },
  completeGrid: {
    marginTop: "5px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    alignContent: "flex-end",
    display: "flex"
  },
  completeButton: {
    color: "#d9d9d9",
    borderColor: "#d9d9d9",
    borderWidth: "2px",
    fontSize: "15px",
    alignSelf: "flex-end",
    marginTop: "auto"
  },
  gridTopMargin: {
    marginTop: "5px"
  }
};

/**
 * Dashboard for Observation Tools
 * @class Dashboard
 * @param {boolean} open
 */
class Dashboard extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      notes: false,
      help: false,
      auth: true,
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }),
      submitFunc: null,
      alignFormat: "center",
      incomplete: false,
      icon: null,
      lookForsIcon: null,
      notesIcon: null
    };
    // Assigning for scope
    this.resetTransitionTime = resetTransitionTime;
    this.emptyClimateStack = emptyClimateStack;
    this.deleteAllCenters = deleteAllCenters;
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount = () => {
    this.props.magic8 === "Transition Time"
      ? this.setState({
          icon: TransitionTimeIconImage,
          lookForsIcon: TransitionTimeLookForsImage,
          notesIcon: TransitionNotesImage
        })
      : this.props.magic8 === "Classroom Climate"
      ? this.setState({
          icon: ClassroomClimateIconImage,
          lookForsIcon: ClassroomClimateLookForsImage,
          notesIcon: ClassroomClimateNotesImage
        })
      : this.props.magic8 === "Math"
      ? this.setState({
          icon: MathIconImage,
          lookForsIcon: MathLookForsImage,
          notesIcon: MathNotesImage
        })
      : this.props.magic8 === "Level of Engagement"
      ? this.setState({
          icon: EngagementIconImage,
          lookForsIcon: EngagementLookForsImage,
          notesIcon: EngagementNotesImage
        })
      : this.props.magic8 === "Level of Instruction"
      ? this.setState({
          icon: InstructionIconImage,
          lookForsIcon: InstructionLookForsImage,
          notesIcon: InstructionNotesImage
        })
      : this.props.magic8 === "Listening to Children"
      ? this.setState({
          icon: ListeningIconImage,
          lookForsIcon: ListeningLookForsImage,
          notesIcon: ListeningNotesImage
        })
      : this.props.magic8 === "Sequential Activities"
      ? this.setState({
          icon: SequentialIconImage,
          lookForsIcon: SequentialLookForsImage,
          notesIcon: SequentialNotesImage
        })
      : this.setState({
          icon: AssocCoopIconImage,
          lookForsIcon: AssocCoopLookForsImage,
          notesIcon: AssocCoopNotesImage
        });
  };

  handleHelpModal = () => {
    this.setState({ help: true });
  };

  handleClickAwayHelp = () => {
    this.setState({ help: false });
  };

  handleNotes = open => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  handleIncomplete = () => {
    this.setState({ incomplete: true });
  };

  handleClickAwayIncomplete = () => {
    this.setState({ incomplete: false });
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    const magic8 = this.props.magic8;
    return (
      <div>
        {this.state.help ? (
          <ClickAwayListener onClickAway={this.handleClickAwayHelp}>
            {(() => {
              switch (magic8) {
                case "Transition Time":
                  return <TransitionTimeHelp />;
                case "Classroom Climate":
                  return <ClassroomClimateHelp />;
                default:
                  return <div />;
              }
            })()}
          </ClickAwayListener>
        ) : this.state.notes ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Notes
                open={true}
                onClose={this.handleNotes}
                color={this.props.color}
                text={magic8 + " Notes"}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        ) : this.state.incomplete ? (
          <ClickAwayListener onClickAway={this.handleClickAwayIncomplete}>
            <IncompleteObservation />
          </ClickAwayListener>
        ) : (
          <div />
        )}
        <Card className={classes.card}>
          <Grid
            container
            flexGrow={1}
            padding="50"
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.iconGrid}>
              <img
                src={this.state.icon}
                alt="Magic 8 Icon"
                className={classes.icon}
              />
            </Grid>
            <Grid
              item
              className={classes.infoDisplayGrid}
              style={{ alignItems: this.props.infoPlacement }}
            >
              {this.props.infoDisplay}
            </Grid>
            <Grid
              container
              className={classes.gridTopMargin}
              direction="row"
              spacing={16}
              alignItems="center"
              alignContent="center"
              justify="center"
            >
              <Button className="lookFor" onClick={this.handleHelpModal}>
                <img
                  src={this.state.lookForsIcon}
                  alt="Look-Fors"
                  className={classes.helpIcon}
                />
              </Button>
              <Button className="notes" onClick={this.handleNotes}>
                <img
                  src={this.state.notesIcon}
                  alt="Notes"
                  className={classes.helpIcon}
                />
              </Button>
            </Grid>
            <Grid item className={classes.gridTopMargin}>
              Start Time: {this.state.time}
            </Grid>
            {this.props.completeObservation ? (
              <Grid item className={classes.completeGrid}>
                <FirebaseContext.Consumer>
                  {firebase => (
                    <YesNoDialog
                      buttonText={<b>COMPLETE OBSERVATION</b>}
                      buttonVariant={"outlined"}
                      buttonColor={this.props.color}
                      buttonMargin={10}
                      dialogTitle={
                        "Are you sure you want to complete this observation?"
                      }
                      shouldOpen={true}
                      onAccept={() => {
                        magic8 === "Classroom Climate"
                          ? this.emptyClimateStack()
                          : magic8 === "Transition Time"
                          ? this.resetTransitionTime()
                          : this.deleteAllCenters();
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
            ) : (
              <Grid item className={classes.completeGrid}>
                <Button
                  variant="outlined"
                  onClick={this.handleIncomplete}
                  className={classes.completeButton}
                >
                  <b>COMPLETE OBSERVATION</b>
                </Button>
              </Grid>
            )}
          </Grid>
        </Card>
      </div>
    );
  }
}

Dashboard.propTypes = {
  magic8: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  infoDisplay: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  infoPlacement: PropTypes.string.isRequired,
  completeObservation: PropTypes.bool.isRequired
};

export default withRouter(connect()(withStyles(styles)(Dashboard)));
