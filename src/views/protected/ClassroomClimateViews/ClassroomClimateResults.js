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
import LinearProgress from "@material-ui/core/LinearProgress";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";

import { withStyles } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
/*
import { ReactComponent as EmotionFace1 } from "../../../assets/icons/emotionFace1.png";
import { ReactComponent as EmotionFace2 } from "../../../assets/icons/emotionFace2.png";
import { ReactComponent as EmotionFace3 } from "../../../assets/icons/emotionFace3.png";
import { ReactComponent as EmotionFace4 } from "../../../assets/icons/emotionFace4.png";
import { ReactComponent as EmotionFace5 } from "../../../assets/icons/emotionFace5.png";
*/
import ListDetailTableClassroomClimateResults from "../../../components/ResultsComponents/ListDetailTableClassroomClimateResults.js";

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
    DETAILS: 2,
    TRENDS: 3,
    NOTES: 4,
    NEXT_STEPS: 5
};

// dummy data for classroom climate list detail table, when we read in from DB we can use custom id
// let id = 0;
function createData(time, notes) {
    // id += 1;
    return { time, notes };
}

const classroomClimateData = [
    createData("08:32", "Kiss your brain"),
    createData("08:44", "Great super friend"),
    createData("09:01", "Lots of good jobs"),
    createData("09:37", "BD frown"),
    createData("09:56", "Close down center conflict")
];
// end of list detail table data

class ClassroomClimateResults extends React.Component {
    constructor(props) {
        super(props);
        this.handleAppend = this.handleAppend.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
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

    handleTypeChange(newType) {
        this.setState({ type: newType });
        this.changeHex(newType);
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
                sheet: "ClassroomClimateTime",
                del: "false",
                TrnDur: entry.time
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

    detailsClick = () => {
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
                                            this.state.view === ViewEnum.DETAILS
                                                ? "contained"
                                                : "outlined"
                                        }
                                        className={classes.viewButtons}
                                        onClick={this.detailsClick}
                                    >
                                        Details
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
                                        Classroom Climate Results
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        {this.state.view ===
                                        ViewEnum.SUMMARY ? (
                                            <div
                                                style={{
                                                    height: "60vh",
                                                    position: "relative",
                                                    top: "8vh",
                                                    left: "25%"
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    direction={"row"}
                                                    justify={"space-evenly"}
                                                >
                                                    <Grid item>
                                                        <img
                                                            alt={"face1"}
                                                            src="../../../assets/icons/emotionFace1.png"
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <img
                                                            alt={"face2"}
                                                            src="./../../../assets/icons/emotionFace2.png"
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <img
                                                            alt={"face3"}
                                                            src="../../../assets/icons/emotionFace3.png"
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <img
                                                            alt={"face4"}
                                                            src="../../../assets/icons/emotionFace4.png"
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <img
                                                            alt={"face5"}
                                                            src="../../../assets/icons/emotionFace5.png"
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={75}
                                                />
                                            </div>
                                        ) : this.state.view ===
                                          ViewEnum.DETAILS ? (
                                            <div style={{ height: "60vh" }}>
                                                <VictoryPie
                                                    data={[
                                                        {
                                                            x: "General\n24%",
                                                            y: 48
                                                        },
                                                        {
                                                            x: "Specific\n16%",
                                                            y: 32
                                                        },
                                                        {
                                                            x: "Negative\n11%",
                                                            y: 22
                                                        },
                                                        {
                                                            x: "Redirect\n49%",
                                                            y: 98
                                                        }
                                                    ]}
                                                    colorScale={[
                                                        "#55efc4",
                                                        "#00b894",
                                                        "#d63031",
                                                        "#e17055"
                                                    ]}
                                                    labelRadius={60}
                                                    radius={170}
                                                    style={{
                                                        labels: {
                                                            fill: "white",
                                                            fontSize: 16
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : this.state.view ===
                                          ViewEnum.TRENDS ? (
                                            <div style={{ height: "60vh" }} /> // replace this null with trends graph
                                        ) : this.state.view ===
                                          ViewEnum.NOTES ? (
                                            <div style={{ height: "60vh" }}>
                                                <ListDetailTableClassroomClimateResults
                                                    data={classroomClimateData}
                                                />
                                            </div> // replace this null with notes
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

ClassroomClimateResults.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClassroomClimateResults);
