import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import { ImmortalDB } from "immortal-db";
import cyan from "@material-ui/core/colors/teal";
import {PieChart} from 'react-easy-chart';
import {VictoryPie} from 'victory-pie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import indigo from '@material-ui/core/colors/indigo'
import amber from '@material-ui/core/colors/amber'
import red from '@material-ui/core/colors/red'

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
    },
    viewButtons: {
        minWidth: 150,
        textAlign: "center"
    }
};

// dummy data for transition list detail table, when we read in from DB we can use custom id
let id = 0;
function createData(startTime, duration, notes, type) {
  id += 1;
  return { id, startTime, duration, notes, type };
}

const transitionData = [
  createData('08:32', '2m 3s', 'Breakfast to am meeting', 'INSIDE'),
  createData('08:44', '5m 10s', 'Line up for bathroom', 'OUTSIDE'),
  createData('09:01', '1m 7s', 'T finding book', 'WAIT'),
  createData('09:37', '1m 56s', 'Rotating rooms', 'WAIT'),
  createData('09:56', '3m 2s', 'Cleanup after centers', 'INSIDE'),
];
// end of list detail table data

class TransitionResults extends React.Component {
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
        onSummary: true,
        onList: false,
        onTrends: false,
        onNextSteps: false,
        iFrameSRC: "https://datastudio.google.com/embed/reporting/1EeK-fkzvcyOELN2mPMpeRoQcl7OU5Ex3/page/r36g"
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
        if (this.state.onSummary == false){
            this.setState({ onSummary: true });
            this.setState({ onList: false });
            this.setState({ onTrends: false });
            this.setState({ onNextSteps: false });
            this.setState({ iFrameSRC: "https://datastudio.google.com/embed/reporting/1EeK-fkzvcyOELN2mPMpeRoQcl7OU5Ex3/page/r36g"});
        }
    };

    listClick = () => {
        if (this.state.onList == false){
            this.setState({ onSummary: false });
            this.setState({ onList: true });
            this.setState({ onTrends: false });
            this.setState({ onNextSteps: false });
        }
    };

    trendsClick = () => {
        if (this.state.onTrends == false){
            this.setState({ onSummary: false });
            this.setState({ onList: false });
            this.setState({ onTrends: true });
            this.setState({ onNextSteps: false });
        }
    };

    nextStepsClick = () => {
        if (this.state.onNextSteps == false){
            this.setState({ onSummary: false });
            this.setState({ onList: false });
            this.setState({ onTrends: false });
            this.setState({ onNextSteps: true });
            this.setState({ iFrameSRC: ""});
        }
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
                <main style={{ flex: 1 }}>
                    <div className={classes.root} align="center">
                        <Grid container spacing={24} alignContent={"center"} alignItems={"center"}>
                            <Grid xs ={1}/>
                            <Grid xs={3} alignContent={"center"}>
                                <List>
                                <ListItem>
                                    <form>
                                        <FormControl variant="filled" className={classes.viewButtons}>
                                            <InputLabel htmlFor="filled-age-simple">Date</InputLabel>
                                            <Select
                                                input={<FilledInput name="age" id="filled-age-simple" />}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </form>
                                </ListItem>
                                <ListItem>
                                  <Button size= "large"
                                          color= {"primary"}
                                          variant = {this.state.onSummary ? "contained" : "outlined"}
                                          className={classes.viewButtons}
                                          onClick={this.summaryClick}>
                                  Summary
                                  </Button>
                                </ListItem>
                                <ListItem>
                                  <Button size= "large"
                                          color= {"primary"}
                                          variant = {this.state.onList ? "contained" : "outlined"}
                                          className={classes.viewButtons}
                                          onClick={this.listClick}>
                                  List Detail
                                  </Button>
                                </ListItem>
                                <ListItem>
                                  <Button size= "large"
                                          color= {"primary"}
                                          variant = {this.state.onTrends ? "contained" : "outlined"}
                                          className={classes.viewButtons}
                                          onClick={this.trendsClick}>
                                  Trends
                                  </Button>
                                </ListItem>
                                <ListItem>
                                  <Button size= "large"
                                          color= {"primary"}
                                          variant = {this.state.onNextSteps ? "contained" : "outlined"}
                                          className={classes.viewButtons}
                                          onClick={this.nextStepsClick}>
                                  Next Steps
                                  </Button>
                                </ListItem>
                              </List>
                            </Grid>
                            <Grid xs={8} alignContent={"center"}>
                                <div>
                                  {this.state.onSummary
                                      ? <VictoryPie
                                          data={[
                                              { x: "Transition\n27%", y: 150 },
                                              { x: "Non-transition\n73%", y: 400 }
                                          ]}
                                          colorScale={["#00cec9", "#0984e3"]}
                                          labelRadius ={50}
                                          style={{ labels: { fill: "white", fontSize: 16}}}
                                              />
                                      : null
                                  }
                              </div>
                                <div>
                                    {this.state.onList
                                        ?
                                      <Paper style={{width: '90%', overflowX: 'auto', margin: 'auto'}}>
                                        <Table className={classes.table}>
                                          <TableHead>
                                            <TableRow>
                                              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}}>Start Time</TableCell>
                                              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}} align="right">Duration</TableCell>
                                              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}} align="right">Notes</TableCell>
                                              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}} align="right">Type</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {transitionData.map(row => (
                                              <TableRow className={classes.row} key={row.id}>
                                                <TableCell component="th" scope="row">
                                                  {row.startTime}
                                                </TableCell>
                                                <TableCell align="right">{row.duration}</TableCell>
                                                <TableCell align="right">{row.notes}</TableCell>
                                                {row.type === 'INSIDE' ? <TableCell style={{backgroundColor:'#ffc107', color: 'black', fontSize: 14}}>{row.type}</TableCell>
                                                  : row.type === 'OUTSIDE' ? <TableCell style={{backgroundColor:'#f44336', color: 'black', fontSize: 14}}>{row.type}</TableCell>
                                                    : row.type === 'WAIT' ? <TableCell style={{backgroundColor:'#69f0ae', color: 'black', fontSize: 14}}>{row.type}</TableCell>
                                                      : null}
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </Paper>
                                        : null
                                    }
                                </div>
                                <div>
                                    {this.state.onTrends
                                        ? null // replace this null with trends graph
                                        : null
                                    }
                                </div>
                                <div>
                                    {this.state.onNextSteps
                                        ? null // replace this null with next steps content
                                        : null
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </div>
>>>>>>> 70e25d06... fixed spacing and added label pie chart
                </main>
            </div>
        );
    }
}

TransitionResults.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionResults);
