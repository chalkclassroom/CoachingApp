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
import ClassroomClimateIcon from "../../../assets/icons/ClassroomClimate.svg";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";
import { withStyles } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
import exNegativeFace from "../../../assets/icons/1-ex-negative-cqref.png";
import negativeFace from "../../../assets/icons/2-negative-cqref.png";
import flatFace from "../../../assets/icons/3-flat-cqref.png";
import pleasantFace from "../../../assets/icons/4-pleasant-cqref.png";
import vibrantFace from "../../../assets/icons/5-vibrant-cqref.png";
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
// import ListDetailTableClassroomClimateResults from "../../../components/ResultsComponents/ListDetailTableClassroomClimateResults.js";

import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable.js";

const styles = {
    root: {
        flexGrow: 1,
        height: '100vh',
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
    },
    detailsGraph: {
        height: "60vh",
        position: "relative",
        top:"-3vh"
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

const classroomClimateNotes = [
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
        view: ViewEnum.SUMMARY,
        sessionDates: []
    };

    componentDidMount() {
        console.log(this.props.location.state);
        this.handleDateFetching(this.props.location.state.teacher.id);
        console.log(this.props.location.state.teacher.id)
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

      handleDateFetching = (teacherId) => {
          console.log("handle date fetching called")
        let firebase = this.context;
        firebase.fetchClimateSessionDates(teacherId).then(dates=>this.setState({
          sessionDates: dates,
        }));

        firebase.fetchAvgToneRating("96ebxou8MO0OYuuNhglc");
        firebase.fetchBehaviourTypeCount("96ebxou8MO0OYuuNhglc");
        firebase.fetchBehaviourTrend(teacherId);
      };

    render() {
        const { classes } = this.props;

        const data = {
            labels: ['August 19, 2018', 'Sept 30, 2018', 'Oct 22, 2018'],
            datasets: [
                {
                    label: 'Negative',
                    data: [
                        10,
                        20,
                        30
                    ],
                    backgroundColor:[
                        '#FF0000','#FF0000','#FF0000'
                    ]
                },
                {
                    label: 'Positive',
                    data: [
                        20,
                        10,
                        30
                    ],
                    backgroundColor:[
                        '#008000','#008000','#008000'
                    ]
                }
            ],
        };

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            tooltips: {
                displayColors: true,
                multiKeyBackground: 'white'
            }
        };

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
                              <img src={ClassroomClimateIcon} style={{width:"15vw", height:"10vh", position:"center"}} />
                            </ListItem>
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
                                              {this.state.sessionDates.map(date=> {return <MenuItem id={date.id} value="">
                                                <em>{moment(date.start.value).format("MMM Do YY HH:mm A")}</em>
                                              </MenuItem>})}
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
                                        onClick={this.detailsClick}
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
                                        color={"primary"}
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
                        <Grid container item xs={8} justify="center" direction={"row"} alignItems={"center"}>
                          <Typography variant={"h4"} alignItems={"center"} justify={"center"}>
                            Classroom Climate Results
                          </Typography>
                            <Grid item xs={10}>
                                <div>
                                    {this.state.view ===
                                    ViewEnum.SUMMARY ? (
                                        <div className={classes.resultsContent}>
                                            <Grid
                                                container
                                                direction={"row"}
                                                justify={"space-between"}
                                            >
                                                <Grid item>
                                                    <img
                                                        alt="extreme negative face"
                                                        src={exNegativeFace}
                                                        width="70vw"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <img
                                                        alt="negative face"
                                                        src={negativeFace}
                                                        width="70vw"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <img
                                                        alt="flat face"
                                                        src={flatFace}
                                                        width="70vw"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <img
                                                        alt="pleasant face"
                                                        src={pleasantFace}
                                                        width="70vw"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <img
                                                        alt="vibrant face"
                                                        src={vibrantFace}
                                                        width="70vw"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <div style={{ height: 10 }}/>
                                            <LinearProgress
                                                variant="determinate"
                                                value={75}
                                                style={{ height: 10, width: "75vh"}}
                                            />
                                      <Grid>
                                      <div class="behavior">
                                          <div class='disapprovals' style={{display: 'inline-block', marginTop:"15%", marginRight:'17%'}}>
                                            <div style={{width: '23vw', height: '8vh', fontSize: '1.75em', color: '#e17055', textAlign:'center'}} >TOTAL BEHAVIOR DISAPPROVALS</div>
                                            <div style={{width: '23vw', height: '10vh', fontSize: '4em', color: '#e17055', textAlign:'center'}}>78</div>
                                            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor:'#d63031', color:"#ffffff", fontWeight:'bold'}}>14 NEGATIVE</div>
                                            <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: '#e17055', color:"#ffffff", fontWeight:'bold'}}>64 REDIRECTIONS</div>
                                          </div>
                                          <div class='approvals' style={{display: 'inline-block'}}>
                                            <div style={{width: '23vw', height: '8vh', fontSize: '1.75em', color: '#55efc4', display:'inline-block', textAlign:'center'}}>TOTAL BEHAVIOR APPROVALS</div>
                                              <div style={{width: '23vw', height: '10vh', fontSize: '4em', color: '#55efc4', textAlign:'center'}}>53</div>
                                              <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: '#55efc4', color:"#ffffff", fontWeight:'bold'}}>32 GENERAL</div>
                                              <div style={{width: '23vw', height: '6vh', fontSize: '1.25em', backgroundColor: "#00b894", color:"#ffffff", fontWeight:'bold'}}>21 SPECIFIC</div>
                                          </div>
                                        </div>
                                       </Grid>
                                        </div>
                                    ) : this.state.view ===
                                      ViewEnum.DETAILS ? (
                                        <div className={classes.detailsGraph}>
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
                                                radius={140}
                                                style={{
                                                    labels: {
                                                        fill: "white",
                                                        fontSize: 16
                                                    }
                                                }}


                                            />
                                            <Grid>
                                                 <div class="behavior" style={{marginRight:"10%", marginLeft:"5%", marginTop:"-12%"}}>
                                                   <div class='disapprovals' style={{display: 'inline-block', marginRight:"10%", marginLeft:'5%'}}>
                                                     <div style={{width: '20vw', height: '6vh', fontSize: '1.25em', color: "#d63031", textAlign:'center'}} >BEHAVIOR DISAPPROVALS</div>
                                                     <div style={{width: '20vw', height: '7vh', fontSize: '2em', color: "#d63031", textAlign:'center'}}>78 (60%)</div>
                                                     <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: "#d63031", color:"#ffffff", fontWeight:'bold'}}>14 NEGATIVE (11%)</div>
                                                     <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: "#e17055", color:"#ffffff", fontWeight:'bold'}}>64 REDIRECTIONS (49%)</div>
                                                   </div>
                                                   <div class='approvals' style={{display: 'inline-block'}}>
                                                     <div style={{width: '20vw', height: '6vh', fontSize: '1.25em', color:  '#55efc4', display:'inline-block', textAlign:'center'}}>BEHAVIOR APPROVALS</div>
                                                       <div style={{width: '20vw', height: '7vh', fontSize: '2em', color: '#55efc4', textAlign:'center'}}>53 (40%)</div>
                                                       <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: '#55efc4', color:"#ffffff", fontWeight:'bold'}}>32 GENERAL (24%)</div>
                                                       <div style={{width: '20vw', height: '4vh', fontSize: '1em', backgroundColor: '#00b894', color:"#ffffff", fontWeight:'bold'}}>21 SPECIFIC (16%)</div>
                                                   </div>
                                                 </div>
                                                 </Grid>
                                        </div>
                                    ) : this.state.view ===
                                      ViewEnum.TRENDS ? (
                                            <div className={classes.resultsContent}>
                                                <Bar
                                                data= {data}
                                                options= {options}
                                                />
                                            </div>
                                    ) : this.state.view ===
                                      ViewEnum.NOTES ? (
                                        <div className={classes.resultsContent}>
                                            <NotesListDetailTable
                                                data={classroomClimateNotes}
                                            />
                                        </div>
                                    ) : this.state.view ===
                                      ViewEnum.NEXT_STEPS ? (
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

ClassroomClimateResults.propTypes = {
    classes: PropTypes.object.isRequired
};

ClassroomClimateResults.contextType = FirebaseContext;

export default withStyles(styles)(ClassroomClimateResults);
