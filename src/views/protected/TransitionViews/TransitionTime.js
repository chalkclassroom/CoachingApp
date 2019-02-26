import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import TransitionTimeHelp from "./TransitionTimeHelp";
import TransitionType from "./TransitionType";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TransitionTimer from "./TransitionTimer";
import TransitionLog from "./TransitionLog";
import YesNoDialog from "../../../components/Shared/YesNoDialog";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";

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
    state = {
        auth: true,
        anchorEl: null,
        help: false,
        notes: false
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

    handleNotes = (open) => {
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
                ) : (
                    this.state.notes ?
                      <Notes open={true} onClose={this.handleNotes}/> :  <div />
                )}
                <main style={{ flex: 1 }}>
                    <Grid container spacing={16}>
                        <Grid item xs={4}>
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
                        <Grid item xs={8}>
                            <Grid
                                container
                                alignItems={"center"}
                                justify={"center"}
                                direction={"column"}
                            >
                                <div style={{ margin: 20 }} />
                                <TransitionType />
                                <TransitionTimer
                                    teacherId={this.props.location.state.key.id}
                                />
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
                        <Grid item xs={8} />
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
                                <YesNoDialog
                                    buttonText={"Complete Observation"}
                                    buttonVariant={"contained"}
                                    buttonColor={"secondary"}
                                    buttonStyle={{ margin: 10 }}
                                    dialogTitle={
                                        "Are you sure you want to complete this observation?"
                                    }
                                    shouldOpen={true}
                                    onAccept={() => console.log("hello")}
                                />
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

export default withStyles(styles)(TransitionTime);
