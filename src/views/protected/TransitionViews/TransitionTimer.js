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
import FirebaseContext from "../../../components/Firebase/context";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0988EC"
        },
        secondary: cyan
    }
});

const COLOR_1 = "#F9A796";
const COLOR_2 = "#E99C2E";
const COLOR_3 = "#E55529";

let getHexFromType = type => {
    switch (type) {
        case "Wait Time":
            return COLOR_1;
        case "inside":
            return COLOR_2;
        case "outside":
            return COLOR_3;
        default:
            return "#FFFFFF";
    }
};

class TransitionTimer extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
        let mEntry = {
            teacher: this.props.teacherId,
            observedBy: this.props.firebase.auth.currentUser.uid,
            type: "transition"
        };
        this.props.firebase.handleSession(mEntry);
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
                    start: this.state.start.toISOString(),
                    end: end.toISOString(),
                    duration: ms(this.state.time),
                    transitionType: this.props.transitionType
                };
                console.log(entry.start);
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
        console.log(this.props.firebase);
        let firebase = this.context;
        firebase.handlePushTransition(entry);
    };

    render() {
        setTimeout(() => {
            this.setState({ percentage: this.state.isOn ? 100 : 0 });
        }, 100);

        return (
            <MuiThemeProvider theme={theme}>
                <div style={{ width: 400 }}>
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
                            color="primary"
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
TransitionTimer.contextType = FirebaseContext;
export default connect(
    mapStateToProps,
    { pushOntoTransitionStack }
)(TransitionTimer);
