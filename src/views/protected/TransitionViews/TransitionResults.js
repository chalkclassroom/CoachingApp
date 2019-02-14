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

import { withStyles } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
import HSBar from "react-horizontal-stacked-bar-chart";
import ListDetailTableTransitionResults from "../../../components/ResultsComponents/ListDetailTableTransitionResults.js";

const styles = {
    root: {
        flexGrow: 1,
        display: "flex",
        height: "100%",
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
        left: "40%",
        top: "13%"
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
        top: "76%"
    }
};

const ViewEnum = {
    SUMMARY: 1,
    LIST: 2,
    TRENDS: 3,
    NOTES: 4,
    NEXT_STEPS: 5
};

// dummy data for transition list detail table, when we read in from DB we can use custom id
let id = 0;
function createData(startTime, duration, notes, type) {
    id += 1;
    return { id, startTime, duration, notes, type };
}

const transitionData = [
    createData("08:32", "2m 3s", "Breakfast to am meeting", "INSIDE"),
    createData("08:44", "5m 10s", "Line up for bathroom", "OUTSIDE"),
    createData("09:01", "1m 7s", "T finding book", "WAIT"),
    createData("09:37", "1m 56s", "Rotating rooms", "WAIT"),
    createData("09:56", "3m 2s", "Cleanup after centers", "INSIDE")
];
// end of list detail table data

class TransitionResults extends React.Component {
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
        if (this.state.view !== ViewEnum.LIST) {
            this.setState({ view: ViewEnum.LIST });
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
                <main className={classes.main}>
                    <Grid
                        container
                        spacing={32}
                        justify="center"
                        direction={"row"}
                    >
                        <Grid item xs={3}>
                            <List className={classes.buttonsList}>
                                <ListItem>
                                    <form>
                                        <FormControl
                                            variant="filled"
                                            className={classes.viewButtons}
                                        >
                                            <InputLabel htmlFor="filled-age-simple">
                                                Date
                                            </InputLabel>
                                            <Select
                                                input={
                                                    <FilledInput
                                                        name="age"
                                                        id="filled-age-simple"
                                                    />
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>
                                                    Mon, Oct 22, 2018
                                                </MenuItem>
                                                <MenuItem value={20}>
                                                    Tue, Nov 6, 2018
                                                </MenuItem>
                                                <MenuItem value={30}>
                                                    Thurs, Nov 29, 2018
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </form>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        size="large"
                                        color={"secondary"}
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
                                            this.state.view === ViewEnum.LIST
                                                ? "contained"
                                                : "outlined"
                                        }
                                        className={classes.viewButtons}
                                        onClick={this.listClick}
                                    >
                                        List Detail
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        size="large"
                                        color={"secondary"}
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
                                        color={"inherit"}
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
                                        color={"inherit"}
                                        variant={
                                            this.state.view ===
                                            ViewEnum.NEXT_STEPS
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
                                    <IconButton
                                        className={classes.generateReport}
                                    >
                                        <GenerateReportSVG
                                            style={{
                                                height: "88px",
                                                width: "88px"
                                            }}
                                        />
                                    </IconButton>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid container item xs={9}>
                            <Grid container direction={"row"}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant={"h5"}
                                        className={classes.title}
                                    >
                                        Transition Time Results
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant={"h7"}
                                        className={classes.secondTitle}
                                    >
                                        Total Transition Time:{" "}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        {this.state.view ===
                                        ViewEnum.SUMMARY ? (
                                            <div style={{ height: "80vh" }}>
                                                <VictoryPie
                                                    data={[
                                                        {
                                                            x:
                                                                "Transition\n27%",
                                                            y: 150
                                                        },
                                                        {
                                                            x:
                                                                "Non-transition\n73%",
                                                            y: 400
                                                        }
                                                    ]}
                                                    colorScale={[
                                                        "#00cec9",
                                                        "#0984e3"
                                                    ]}
                                                    labelRadius={50}
                                                    radius={170}
                                                    style={{
                                                        labels: {
                                                            fill: "white",
                                                            fontSize: 16
                                                        }
                                                    }}
                                                />
                                                <HSBar
                                                    height={50}
                                                    showText
                                                    id="new_id"
                                                    fontColor="#ffffff"
                                                    data={[
                                                        {
                                                            name: "Inside",
                                                            value: 10,
                                                            description:
                                                                "10 min",
                                                            color: "#E99C2E"
                                                        },
                                                        {
                                                            name: "Outside",
                                                            value: 12,
                                                            description:
                                                                "12 min",
                                                            color: "#0988EC"
                                                        },
                                                        {
                                                            name: "Waiting",
                                                            value: 8,
                                                            description:
                                                                "8 min",
                                                            color: "#4FD9B3"
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        ) : this.state.view ===
                                          ViewEnum.LIST ? (
                                            <div
                                                style={{
                                                    height: "60vh",
                                                    position: "relative",
                                                    top: "8vh",
                                                    left: "7%"
                                                }}
                                            >
                                                <ListDetailTableTransitionResults
                                                    data={transitionData}
                                                />
                                            </div>
                                        ) : this.state.view ===
                                          ViewEnum.TRENDS ? (
                                            <div style={{ height: "60vh" }} /> // replace this null with trends graph
                                        ) : this.state.view ===
                                          ViewEnum.NOTES ? (
                                            <div style={{ height: "60vh" }} /> // replace this null with trends graph
                                        ) : this.state.view ===
                                          ViewEnum.NEXT_STEPS ? (
                                            <div style={{ height: "60vh" }} /> // replace this null with next steps content
                                        ) : null}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

TransitionResults.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionResults);
