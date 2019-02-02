import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ms from "pretty-ms";
import YesNoDialog from "../../../components/Shared/YesNoDialog";
import cyan from "@material-ui/core/colors/teal";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import { connect } from "react-redux";
import { pushOntoTransitionStack } from "../../../state/actions/transition-time";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff0000"
        },
        secondary: cyan
    }
});

const COLOR_1 = "#F9A796";
const COLOR_2 = "#FFE79D";
const COLOR_3 = "#4DEDBC";

let getHexFromType = type => {
    switch (type) {
        case "Wait Time":
            return COLOR_1;
        case "Inside Classroom":
            return COLOR_2;
        case "Outside Classroom":
            return COLOR_3;
        default:
            return "#FFFFFF";
    }
};

class TransitionTimer extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
    }

    state = {
        anchorEl: null,
        percentage: 0,
        isOn: false,
        time: 0,
        start: 0
    };

    onStart = () => {
        this.setState(state => {
            if (state.isOn) {
                clearInterval(this.timer);
                let end = new Date();
                let entry = {
                    start: this.state.start.toLocaleString(),
                    end: end.toLocaleString(),
                    duration: ms(this.state.time),
                    transitionType: this.props.transitionType
                };
                this.setState({ time: 0 });
                this.handleAppend(entry);
            } else {
                const startTime = Date.now() - this.state.time;
                let mStart = new Date();
                this.setState({ start: mStart });
                this.timer = setInterval(() => {
                    this.setState({ time: Date.now() - startTime });
                }, 1000);
            }
            return { isOn: !state.isOn };
        });
    };

    onCancel = () => {
        clearInterval(this.timer);
        this.setState({
            isOn: false,
            time: 0,
            percentage: 0
        });
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleAppend = entry => {
        this.props.pushOntoTransitionStack(entry);
        this.handleSpreadsheetAppend(entry);
    };

    handleSpreadsheetAppend = entry => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "TransitionTime",
                del: "false",
                TrnStart: entry.start,
                TrnEnd: entry.end,
                TrnDur: entry.duration,
                TrnType: entry.transitionType,
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
        setTimeout(() => {
            this.setState({ percentage: this.state.isOn ? 100 : 0 });
        }, 100);

        return (
            <MuiThemeProvider theme={theme}>
                <div style={{ width: 400, marginTop: 20 }}>
                    <CircularProgressbar
                        background
                        percentage={this.state.percentage}
                        text={
                            this.state.time === 0 ? "0:00" : ms(this.state.time)
                        }
                        initialAnimation={false}
                        styles={{
                            path: {
                                stroke: getHexFromType(
                                    this.props.transitionType
                                )
                            },
                            text: { fill: "#000", fontSize: "16px" },
                            background: {
                                fill: getHexFromType(this.props.transitionType)
                            }
                        }}
                    />
                    <Grid
                        container
                        alignItems={"center"}
                        justify={"space-around"}
                        direction={"column"}
                    >
                        <div style={{ margin: 2 }} />
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={this.props.transitionType === null}
                            aria-label="Start"
                            onClick={this.onStart}
                        >
                            {this.state.isOn
                                ? "End Transition"
                                : this.props.transitionType === null
                                ? "Please choose a transition type"
                                : "Start New Transition"}
                        </Button>
                        <div style={{ margin: 2 }} />
                        <YesNoDialog
                            buttonVariant={"outlined"}
                            buttonColor={"primary"}
                            buttonAriaLabel={"Cancel"}
                            buttonText={"Cancel Transition"}
                            dialogTitle={
                                "Are you sure you want to cancel the current active transition?"
                            }
                            onAccept={this.onCancel}
                            shouldOpen={this.state.isOn}
                        />
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        transitionType: state.transitionTypeState.transitionType
    };
};

export default connect(
    mapStateToProps,
    { pushOntoTransitionStack }
)(TransitionTimer);
