import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import PropTypes from "prop-types";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ms from "pretty-ms";
import YesNoDialog from "../../../components/Shared/YesNoDialog";
import cyan from "@material-ui/core/colors/teal";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";

const COLOR_1 = "#F9A796";
const COLOR_2 = "#FFE79D";
const COLOR_3 = "#4DEDBC";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff0000"
        },
        secondary: cyan
    }
});

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

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
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
                    type: null
                };
                this.setState({ time: 0 });
                this.props.handleAppend(entry);
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

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

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
                            path: { stroke: "rgba(29, 233, 182, 1)" },
                            text: { fill: "#000", fontSize: "16px" },
                            background: {
                                fill: this.props.type
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
                            aria-label="Start"
                            onClick={this.onStart}
                        >
                            {this.state.isOn
                                ? "End Transition"
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

export default TransitionTimer;
