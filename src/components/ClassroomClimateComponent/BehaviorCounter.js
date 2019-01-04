import React from "react";
import PropTypes from "prop-types";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ReplayIcon from "@material-ui/icons/Replay";
import spreadsheetData from "../../SPREADSHEET_SECRETS";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

const redirectionTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#f9a796"
        },
        secondary: {
            main: "#ffffff"
        }
    }
});

const nonSpecificApprovalTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffe79d"
        },
        secondary: {
            main: "#ffffff"
        }
    }
});

const disapprovalTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff6a6a"
        },
        secondary: {
            main: "#ffffff"
        }
    }
});

const specificApprovalTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#4bedbc"
        },
        secondary: {
            main: "#ffffff"
        }
    }
});

class BehaviorCounter extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        undoStack: []
    };

    handleIncrement = event => {
        switch (event.currentTarget.value) {
            case "1":
                this.handlePush("redirection");
                break;
            case "2":
                this.handlePush("nonspecificapproval");
                break;
            case "3":
                this.handlePush("disapproval");
                break;
            case "4":
                this.handlePush("specificapproval");
        }
    };

    handleUndo = () => {
        let mArray = [...this.state.undoStack];
        if (mArray.length > 0) {
            mArray.pop();
            this.setState({ undoStack: mArray });
            console.log(mArray);

            this.handleSpreadsheetDeleteRow();
        }
    };

    handlePush = entry => {
        let mArray = [...this.state.undoStack];
        let mEntry = {
            observation: entry,
            type: this.props.type === 0 ? "instruction" : "transition"
        };
        mArray.push(mEntry);
        this.setState({ undoStack: mArray });
        console.log(mArray);

        this.handleSpreadsheetInsert(mEntry);
    };

    handleSpreadsheetInsert = entry => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "ClassroomClimateBehavior",
                del: "false",
                BehaviorResponse: entry.observation,
                InstructionTransition: entry.type
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

    handleSpreadsheetDeleteRow = () => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "ClassroomClimateBehavior",
                del: "true"
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
        const { value } = this.state;

        return (
            <div
                className={classes.root}
                style={{
                    backgroundColor:
                        this.props.type === 0 ? "#76e9e9" : "#68b0ff"
                }}
            >
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Grid
                            container
                            direction={"row"}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <MuiThemeProvider theme={redirectionTheme}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    value="1"
                                    onClick={this.handleIncrement}
                                >
                                    Redirection
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid
                            container
                            direction={"row"}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <MuiThemeProvider theme={nonSpecificApprovalTheme}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    value="2"
                                    onClick={this.handleIncrement}
                                >
                                    Non-specific Approval
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ margin: 10 }} />
                <Grid
                    container
                    direction={"row"}
                    justify={"center"}
                    alignItems={"center"}
                >
                    <Chip
                        label={`Total Responses: ${
                            this.state.undoStack.length
                        }`}
                    />
                </Grid>
                <div style={{ margin: 10 }} />
                <Grid
                    container
                    direction={"row"}
                    justify={"center"}
                    alignItems={"center"}
                >
                    <Button
                        variant="contained"
                        color="default"
                        onClick={this.handleUndo}
                    >
                        Undo
                        <ReplayIcon />
                    </Button>
                </Grid>
                <div style={{ margin: 10 }} />
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Grid
                            container
                            direction={"row"}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <MuiThemeProvider theme={disapprovalTheme}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    value="3"
                                    onClick={this.handleIncrement}
                                >
                                    Disapproval
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid
                            container
                            direction={"row"}
                            justify={"center"}
                            alignItems={"center"}
                        >
                            <MuiThemeProvider theme={specificApprovalTheme}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    value="4"
                                    onClick={this.handleIncrement}
                                >
                                    Specific Approval
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BehaviorCounter);
