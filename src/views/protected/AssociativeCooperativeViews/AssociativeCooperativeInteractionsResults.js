import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Select from "@material-ui/core/Select";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";
import AssocCoopIcon from "../../../assets/icons/AssocCoopInteractions.svg";
import { withStyles } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable";
import 'chartjs-plugin-datalabels';
import ChildTeacherBehaviorSlider
    from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorPieSlider";
import ChildTeacherBehaviorDetailsSlider
    from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorDetailsSlider";
import ChildTeacherBehaviorTrendsSlider
    from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider";



const styles = {
    root: {
        flexGrow: 1,
        height: "100vh",
        flexDirection: "column"
    },
    main: {
        flex: 1,
        height: "90%",
        marginTop: "10vh"
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    viewButtons: {
        minWidth: 150,
        textAlign: "center"
    },
    buttonsList: {
        position: "relative",
        top: "3vh"
    },
    title: {
        position: "relative",
        left: "33%",
        top: "10%"
    },
    secondTitle: {
        position: "relative",
        left: "40%",
        top: "10%"
    },
    chart: {
        position: "relative",
        left: "7%",
        top: "5%"
    },
    generateReport: {
        position: "relative",
        right: "10%",
        top: "76%",
        left: "10%"
    },
    resultsContent: {
        height: "60vh",
        position: "relative",
        top: "8vh"
    }
};

const ViewEnum = {
    SUMMARY: 1,
    DETAILS: 2,
    TRENDS: 3,
    NOTES: 4,
    NEXT_STEPS: 5
};

// dummy data for transition list detail table, when we read in from DB we can use custom id
let id = 0;

function createTransitionData(startTime, duration, notes, type) {
    id += 1;
    return { id, startTime, duration, notes, type };
}

function createNotesData(time, notes) {
    id += 1;
    return { id, time, notes };
}

const transitionData = [
    createTransitionData("08:32", "2m 3s", "Breakfast to am meeting", "INSIDE"),
    createTransitionData("08:44", "5m 10s", "Line up for bathroom", "OUTSIDE"),
    createTransitionData("09:01", "1m 7s", "T finding book", "WAIT"),
    createTransitionData("09:37", "1m 56s", "Rotating rooms", "WAIT"),
    createTransitionData("09:56", "3m 2s", "Cleanup after centers", "INSIDE")
];

const transitionNotes = [
    createNotesData("08:32", "Kiss your brain"),
    createNotesData("08:44", "Great super friend"),
    createNotesData("09:01", "Lots of good jobs"),
    createNotesData("09:37", "BD frown"),
    createNotesData("09:56", "Close down center conflict")
];

class AssociativeCooperativeInteractionsResults extends React.Component {
    constructor(props) {
        super(props);
        this.handleAppend = this.handleAppend.bind(this);
    }

    state = {
        auth: true,
        anchorEl: null,
        help: false,
        type: null,
        hex: "#FFFFFF",
        entries: [],
        dbCounter: 0, // @Hack @Temporary !!!
        view: ViewEnum.SUMMARY
    };

    componentDidMount() {
        console.log(this.props.location.state);
    }

    handleAppend(entry) {
        let newEntries = this.state.entries;
        entry.type = this.state.type;
        newEntries.push(entry);
        this.setState({ entries: newEntries });

        this.handleSpreadsheetAppend(entry);

        this.handleDBinsert(entry);
    }

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

    handleClickAway = () => {
        this.setState({ help: false });
    };

    handleDBinsert = async entry => {
        // Once we integrate users, the user + some index will be the key for the DB.
        await ImmortalDB.set(
            JSON.stringify(this.state.dbCounter),
            JSON.stringify(entry)
        );

        this.setState({ dbCounter: this.state.dbCounter + 1 });
    };

    handleSpreadsheetAppend = entry => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "TransitionTime",
                del: "false",
                TrnStart: entry.start,
                TrnEnd: entry.end,
                TrnDur: entry.duration,
                TrnType: entry.type,
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

    summaryClick = () => {
        if (this.state.view !== ViewEnum.SUMMARY) {
            this.setState({ view: ViewEnum.SUMMARY });
        }
    };

    listClick = () => {
        if (this.state.view !== ViewEnum.DETAILS) {
            this.setState({ view: ViewEnum.DETAILS });
        }
    };

    trendsClick = () => {
        if (this.state.view !== ViewEnum.TRENDS) {
            this.setState({ view: ViewEnum.TRENDS });
        }
    };

    notesClick = () => {
        if (this.state.view !== ViewEnum.NOTES) {
            this.setState({ view: ViewEnum.NOTES });
        }
    };

    nextStepsClick = () => {
        if (this.state.view !== ViewEnum.NEXT_STEPS) {
            this.setState({ view: ViewEnum.NEXT_STEPS });
        }
    };

    render() {
        const { classes } = this.props;


        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase} />}
                </FirebaseContext.Consumer>
                <main>
                    <Grid container spacing={0} justify="center" direction={"row"} alignItems={"center"}>
                        <Grid container item xs={3}>
                            <List className={classes.buttonsList}>
                                <ListItem>
                                    <img src={AssocCoopIcon} style={{width:"15vw", height:"10vh", position:"center"}} />
                                </ListItem>
                                <ListItem>
                                    <form>
                                        <FormControl
                                            variant="filled"
                                            className={classes.viewButtons}
                                        >
                                            <InputLabel htmlFor="filled-age-simple">Date</InputLabel>
                                            <Select
                                                input={
                                                    <FilledInput name="age" id="filled-age-simple" />
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Mon, Oct 22, 2018</MenuItem>
                                                <MenuItem value={20}>Tue, Nov 6, 2018</MenuItem>
                                                <MenuItem value={30}>Thurs, Nov 29, 2018</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </form>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        size="large"
                                        color={"primary"}
                                        variant={
                                            this.state.view === ViewEnum.SUMMARY
                                                ? "contained"
                                                : "outlined"
                                        }
                                        className={classes.viewButtons}
                                        onClick={this.summaryClick}
                                    >
                                        Summary
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        size="large"
                                        color={"primary"}
                                        variant={
                                            this.state.view === ViewEnum.DETAILS
                                                ? "contained"
                                                : "outlined"
                                        }
                                        className={classes.viewButtons}
                                        onClick={this.listClick}
                                    >
                                        Details
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        size="large"
                                        color={"primary"}
                                        variant={
                                            this.state.view === ViewEnum.TRENDS
                                                ? "contained"
                                                : "outlined"
                                        }
                                        className={classes.viewButtons}
                                        onClick={this.trendsClick}
                                    >
                                        Trends
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        size="large"
                                        color={"primary"}
                                        variant={
                                            this.state.view === ViewEnum.NOTES
                                                ? "contained"
                                                : "outlined"
                                        }
                                        className={classes.viewButtons}
                                        onClick={this.notesClick}
                                    >
                                        Notes
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        size="large"
                                        color= {"primary"}
                                        variant={
                                            this.state.view === ViewEnum.NEXT_STEPS
                                                ? "contained"
                                                : "outlined"
                                        }
                                        className={classes.viewButtons}
                                        onClick={this.nextStepsClick}
                                    >
                                        Next Steps
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <IconButton className={classes.generateReport}>
                                        <GenerateReportSVG
                                            style={{
                                                height: "10vh",
                                                width: "10vh"
                                            }}
                                        />
                                    </IconButton>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid container item xs={8} justify="center" direction={"row"} alignItems={"center"}>
                            <Typography variant={"h5"} alignItems={"center"} justify={"center"}>
                                Associative & Cooperative Interactions Results
                            </Typography>
                            <Grid item xs={12} alignItems={"center"} justify={"center"}>
                                <Typography variant={"h7"} style={{ marginLeft: "20vw" }}>
                                    Total Observation Time: {"30.2 minutes"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    {this.state.view === ViewEnum.SUMMARY ? (
                                        <div className={classes.resultsContent}>
                                            <ChildTeacherBehaviorSlider/>
                                        </div>
                                    ) : this.state.view === ViewEnum.DETAILS ? (
                                        <div className={classes.resultsContent}>
                                            <ChildTeacherBehaviorDetailsSlider/>
                                        </div>
                                    ) : this.state.view === ViewEnum.TRENDS ? (
                                        <div className={classes.resultsContent}>
                                            <ChildTeacherBehaviorTrendsSlider/>
                                        </div>
                                    ) : this.state.view === ViewEnum.NOTES ? (
                                        <div className={classes.resultsContent}
                                        >
                                            <NotesListDetailTable data={transitionNotes} />
                                        </div>
                                    ) : this.state.view === ViewEnum.NEXT_STEPS ? (
                                        <div className={classes.resultsContent} /> // replace this null with next steps content
                                    ) : null}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

AssociativeCooperativeInteractionsResults.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssociativeCooperativeInteractionsResults);
