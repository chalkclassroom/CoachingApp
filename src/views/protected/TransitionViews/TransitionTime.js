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
import Dashboard from "../../../components/Dashboard";



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

class TransitionTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: true,
            anchorEl: null,
            help: false,
            notes: false,
            recs: true,
            transitionType: "none"
        };


        this.handleTransitionType = this.handleTransitionType.bind(this)
    }

    handleTransitionType = type => {
        this.setState({transitionType: type});
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
                    <Grid container spacing={16} alignItems="center">
                        <Grid item xs={3}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                                
                            >
                                <Dashboard 
                                    magic8="Transition Time"
                                    color="#094492"
                                    infoDisplay= {<TransitionLog />}
                                    infoPlacement = "center"
                                    completeObservation={true}
                                />
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
                                <TransitionTypeSel handleTransitionType = {this.handleTransitionType}/>
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
                                {/* <TransitionTypeSel1/> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                            >
                                <div style={{ margin: 10 }} />
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
