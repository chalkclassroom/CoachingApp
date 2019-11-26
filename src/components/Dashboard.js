import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid } from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import TransitionTimeIcon from "../assets/icons/TransitionTimeIconImage.svg"
import ClassroomClimateIcon from "../assets/icons/ClassroomClimateIconImage.svg"
import MathIcon from "../assets/icons/MathIconImage.svg"
import EngagementIcon from "../assets/icons/EngagementIconImage.svg"
import InstructionIcon from "../assets/icons/InstructionIconImage.svg"
import ListeningIcon from "../assets/icons/ListeningIconImage.svg"
import SequentialIcon from "../assets/icons/SequentialIconImage.svg"
import AssocCoopIcon from "../assets/icons/AssocCoopIconImage.svg"
import TransitionNotes from "../assets/icons/TransitionNotesImage.svg"
import ClassroomClimateNotes from "../assets/icons/ClassroomClimateNotesImage.svg"
import MathNotes from "../assets/icons/MathNotesImage.svg"
import EngagementNotes from "../assets/icons/EngagementNotesImage.svg"
import InstructionNotes from "../assets/icons/InstructionNotesImage.svg"
import ListeningNotes from "../assets/icons/ListeningNotesImage.svg"
import SequentialNotes from "../assets/icons/SequentialNotesImage.svg"
import AssocCoopNotes from "../assets/icons/AssocCoopNotesImage.svg"
import TransitionTimeLookFors from "../assets/icons/TransitionTimeLookForsImage.svg"
import ClassroomClimateLookFors from "../assets/icons/ClassroomClimateLookForsImage.svg"
import MathLookFors from "../assets/icons/MathLookForsImage.svg"
import EngagementLookFors from "../assets/icons/EngagementLookForsImage.svg"
import InstructionLookFors from "../assets/icons/InstructionLookForsImage.svg"
import ListeningLookFors from "../assets/icons/ListeningLookForsImage.svg"
import SequentialLookFors from "../assets/icons/SequentialLookForsImage.svg"
import AssocCoopLookFors from "../assets/icons/AssocCoopLookForsImage.svg"
import Notes from "./Notes";
import FirebaseContext from "./Firebase/FirebaseContext";
import { ClickAwayListener } from '@material-ui/core/es';
import TransitionTimeHelp from "../views/protected/TransitionViews/TransitionTimeHelp";
import ClassroomClimateHelp from "./ClassroomClimateComponent/ClassroomClimateHelp";
import YesNoDialog from "./Shared/YesNoDialog";
import { resetTransitionTime } from "../state/actions/transition-time";
import { emptyClimateStack } from "../state/actions/classroom-climate";
import { deleteAllCenters } from "../state/actions/associative-cooperative";
import { connect } from "react-redux";
import IncompleteObservation from "./IncompleteObservation.js";

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
    marginTop:"10px",
    marginBottom:"5px"
  },
  icon: {
    width: "100px",
    height: "100px"
  },
  infoDisplayGrid: {
    height: "41vh",
    width:"90%",
    marginLeft:"5px",
    marginRight:"5px",
    marginTop:"5px",
    marginBottom:"5px",
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

class Dashboard extends React.Component {
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
    }
  }

  componentDidMount = () => {
    this.props.magic8 === "Transition Time" ? this.setState({
      icon: TransitionTimeIcon,
      lookForsIcon: TransitionTimeLookFors,
      notesIcon: TransitionNotes})
    : this.props.magic8 === "Classroom Climate" ? this.setState({
      icon: ClassroomClimateIcon,
      lookForsIcon: ClassroomClimateLookFors,
      notesIcon: ClassroomClimateNotes})
    : this.props.magic8 === "Math" ? this.setState({
      icon: MathIcon,
      lookForsIcon: MathLookFors,
      notesIcon: MathNotes})
    : this.props.magic8 === "Level of Engagement" ? this.setState({
      icon: EngagementIcon,
      lookForsIcon: EngagementLookFors,
      notesIcon: EngagementNotes})
    : this.props.magic8 === "Level of Instruction" ? this.setState({
      icon: InstructionIcon,
      lookForsIcon: InstructionLookFors,
      notesIcon: InstructionNotes})
    : this.props.magic8 === "Listening to Children" ? this.setState({
      icon: ListeningIcon,
      lookForsIcon: ListeningLookFors,
      notesIcon: ListeningNotes})
    : this.props.magic8 === "Sequential Activities" ? this.setState({
      icon: SequentialIcon,
      lookForsIcon: SequentialLookFors,
      notesIcon: SequentialNotes})
    : this.setState({
      icon: AssocCoopIcon,
      lookForsIcon: AssocCoopLookFors,
      notesIcon: AssocCoopNotes})
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
  }

  render(){
    const { classes } = this.props;
    const magic8 = this.props.magic8;
    return(
      <div>
        {this.state.help ? (
          <ClickAwayListener onClickAway={this.handleClickAwayHelp}>
            {(() => {switch (magic8) {
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
              <img src={this.state.icon} alt="Magic 8 Icon" className={classes.icon}/>
            </Grid>
            <Grid item className={classes.infoDisplayGrid} style={{alignItems: this.props.infoPlacement}}>
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
                <img src={this.state.lookForsIcon} alt="Look-Fors" className={classes.helpIcon}/>
              </Button>
              <Button className="notes" onClick={this.handleNotes}>
                <img src={this.state.notesIcon} alt="Notes" className={classes.helpIcon}/>
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
                      buttonStyle={{ margin: 10 }}
                      dialogTitle={"Are you sure you want to complete this observation?"}
                      shouldOpen={true}
                      onAccept={() => {
                        magic8 === "Classroom Climate" ? this.props.emptyClimateStack()
                        : magic8 === "Transition Time" ? this.props.resetTransitionTime()
                        : magic8 === "Sequential Activities" ? this.props.deleteAllCenters()
                        : this.props.deleteAllCenters();
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
                <Button variant="outlined" onClick={this.handleIncomplete} className={classes.completeButton}>
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
};

export default withRouter(connect()(withStyles(styles)(Dashboard)));