import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import TransitionTimeHelp from "./TransitionTimeHelp";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TransitionTimer from "./TransitionTimer";
import TransitionLog from "./TransitionLog";
import YesNoDialog from "../../../components/Shared/YesNoDialog";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";
import { connect } from "react-redux";
import { resetTransitionTime } from "../../../state/actions/transition-time";
import Recs from "./TransitionTimeRecs";
import TransitionTypeSel from "./TransitionTypeSel";
import TransitionTypeSel1 from "./TransitionTypeSel1";

const styles = {
    root: {
        flexGrow: 1,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column"
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};
class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: new Date().toLocaleString()
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        time: new Date().toLocaleString()
      });
    }
    render() {
      return (
        <p className="App-clock">
          Current time: {this.state.time}.
        </p>
      );
    }
  }

class TransitionTime extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        help: false,
        notes: false,
        recs: true,
    };

    handleRecsModal = open => {
        if (open) {
            this.setState({ recs: true });
        } else {
            this.setState({ recs: false });
        }
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleHelpModal = () => {
        this.setState({ help: true });
    };

    handleNotes = open => {
        if (open) {
            this.setState({ notes: true });
        } else {
            this.setState({ notes: false });
        }
    };

    handleClickAwayHelp = () => {
        this.setState({ help: false });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase} />}
                </FirebaseContext.Consumer>
                {this.state.help ? (
                    <ClickAwayListener onClickAway={this.handleClickAwayHelp}>
                        {" "}
                        <TransitionTimeHelp />
                    </ClickAwayListener>
                ) : this.state.notes ? (
                    <FirebaseContext.Consumer>
                        {firebase => (
                            <Notes
                                open={true}
                                onClose={this.handleNotes}
                                color="#094492"
                                text="Transition Time Notes"
                                firebase={firebase}
                            />
                        )}
                    </FirebaseContext.Consumer>
                ) : this.state.recs ? (
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
                )}
                <main style={{ flex: 1 }}>
                    <Grid container spacing={16}>
                        <Grid item xs={3}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                            >
                                <div style={{ margin: 20 }} />
                                <TransitionLog />
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                            >
                                <div style={{ margin: 20 }} />
                                <TransitionTypeSel/>
                            </Grid>
                            </Grid> 
                            <Grid item xs={2}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                            >
                                <div style={{ margin: 20 }} />
                                <TransitionTypeSel1/>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                            >
                                {/* <div style={{ margin: 10 }} />
                                <TransitionType /> */}
                                <FirebaseContext.Consumer>
                                    {firebase => (
                                        <TransitionTimer
                                            teacherId={this.props.location.state.teacher.id}
                                            firebase={firebase}
                                        />
                                    )}
                                </FirebaseContext.Consumer>
                            </Grid>
                        </Grid>
                    </Grid>
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
                        <Grid item xs={8} />
                        <Grid item xs={2}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"space-between"}
                                direction={"column"}
                            >
                            <Clock/> 
                                {/* Start Time:{" "}
                                {new Date().toLocaleString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true
                                })} */}
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
                                                this.props.resetTransitionTime();
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

TransitionTime.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(
    null,
    { resetTransitionTime }
)(withStyles(styles)(TransitionTime));
