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
    constructor(props) {
        super(props);
        let mEntry = {
            teacher: this.props.teacherId,
            observedBy: this.props.firebase.auth.currentUser.uid
        };
        this.props.firebase.handleSession(mEntry);
    }
//____________________________________________________________________________________________________________________//
    handlePushFire = entry => {
        let mEntry = {
            BehaviorResponse: entry,
            InstructionTransition: this.props.climateType
        };
        this.props.firebase.handlePushFireStore(mEntry);
    };
//____________________________________________________________________________________________________________________//
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
                                        this.handlePushFire("redirection")
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
                                        this.handlePushFire("nonspecificapproval")
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
                                        this.handlePushFire("disapproval")
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
                                        this.handlePushFire("specificapproval")
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
    teacherId: PropTypes.string.isRequired,
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
