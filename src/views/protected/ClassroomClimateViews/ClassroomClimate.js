import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
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

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:15 interval -
    Give coaches ~15 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 135000;
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
    constructor(props) {
        super(props);
    }

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
        console.log(this.props.location.state);
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

    handleRatingConfirmation = rating => {
        this.setState({ ratingIsOpen: false });

        let mRatings = [...this.state.ratings];
        mRatings.push(rating);
        this.setState({ ratings: mRatings });
        console.log(mRatings);

        let entry = {
            rating: rating,
            ratingInterval: RATING_INTERVAL
        };
        this.handleSpreadsheetInsert(entry);
    };

    handleHelpModal = () => {
        this.setState({ help: true });
    };

    handleClickAway = () => {
        this.setState({ help: false });
    };

    handleSpreadsheetInsert = entry => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "ClassroomClimateTone",
                del: "false",
                ToneRating: entry.rating,
                ToneTimer: entry.ratingInterval,
                TeacherID: this.props.location.state.key.id
            };
        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key])
        );
        fetch(url, {
            method: "POST",
            credentials: "include",
            mode: "no-cors",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => console.log("Success"))
            .catch(error => console.error("Error:", error));
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase} />}
                </FirebaseContext.Consumer>
                {this.state.help ? (
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        {" "}
                        <ClassroomClimateHelp />
                    </ClickAwayListener>
                ) : (
                    <div />
                )}
                <Modal open={this.state.ratingIsOpen} onBackdropClick={null}>
                    <RatingModal
                        handleRatingConfirmation={this.handleRatingConfirmation}
                    />
                </Modal>
                <main style={{ flex: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={1} />
                        <Grid
                            item
                            xs
                            style={{ marginBottom: 50, marginTop: 50 }}
                        >
                            <InstructionTransitionToggle
                                teacherId={this.props.location.state.key.id}
                            />
                            <div style={{ margin: 20, textAlign: "center" }}>
                                Time until next Tone Rating:
                                {ms(this.state.time)}
                            </div>
                            <Line
                                percent={`${100 *
                                    (this.state.time / RATING_INTERVAL)}`}
                                strokeWidth="1"
                                strokeColor={
                                    this.state.time > TEN_PERCENT
                                        ? "#00ff00"
                                        : "#ff0000"
                                }
                            />
                        </Grid>
                        <Grid item xs={1} />
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
                                />
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

export default withStyles(styles)(ClassroomClimate);
