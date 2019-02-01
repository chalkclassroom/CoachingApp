import React from "react";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import spreadsheetData from "../../SPREADSHEET_SECRETS";
import { connect } from "react-redux";
import { pushOntoClimateStack } from "../../state/actions/classroom-climate";

const REDIRECTION = "#f9a796";
const NONSPECIFIC = "#ffe79d";
const DISAPPROVAL = "#ff6a6a";
const APPROVAL = "#4bedbc";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

const counterTheme = primary =>
    createMuiTheme({
        palette: {
            primary: {
                main: primary
            },
            secondary: {
                main: "#ffffff"
            }
        }
    });

class BehaviorCounter extends React.Component {
    handlePush = entry => {
        let mEntry = {
            observation: entry,
            climateType: this.props.climateType
        };
        this.props.pushOntoClimateStack(mEntry);
        this.handleSpreadsheetInsert(mEntry);
    };

    handleSpreadsheetInsert = entry => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "ClassroomClimateBehavior",
                del: "false",
                BehaviorResponse: entry.observation,
                InstructionTransition: entry.climateType,
                TeacherID: this.props.teacherId
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
        return (
            <div
                className={this.props.classes.root}
                style={{
                    backgroundColor:
                        this.props.climateType === "instruction"
                            ? "#76e9e9"
                            : "#68b0ff",
                    borderRadius: "25px"
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
                            <MuiThemeProvider theme={counterTheme(REDIRECTION)}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    style={{ minWidth: 250 }}
                                    onClick={() =>
                                        this.handlePush("redirection")
                                    }
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
                            <MuiThemeProvider theme={counterTheme(NONSPECIFIC)}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    style={{ minWidth: 250 }}
                                    onClick={() =>
                                        this.handlePush("nonspecificapproval")
                                    }
                                >
                                    Non-specific Approval
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
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
                            <MuiThemeProvider theme={counterTheme(DISAPPROVAL)}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    style={{ minWidth: 250 }}
                                    onClick={() =>
                                        this.handlePush("disapproval")
                                    }
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
                            <MuiThemeProvider theme={counterTheme(APPROVAL)}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    style={{ minWidth: 250 }}
                                    onClick={() =>
                                        this.handlePush("specificapproval")
                                    }
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

BehaviorCounter.propTypes = {
    climateType: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        climateType: state.climateTypeState.climateType
    };
};

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { pushOntoClimateStack }
    )(BehaviorCounter)
);
