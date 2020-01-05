import React from "react";
import PropTypes from "prop-types";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ms from "pretty-ms";
import YesNoDialog from "../../../components/Shared/YesNoDialog.tsx";
import cyan from "@material-ui/core/colors/teal";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { pushOntoTransitionStack } from "../../../state/actions/transition-time";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0988EC"
    },
    secondary: cyan
  }
});

/**
 * transition timer
 * @class TransitionTimer
 */
class TransitionTimer extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    // this.onCancel = this.onCancel.bind(this);
    const mEntry = {
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
        const end = new Date();
        const entry = {
          start: this.state.start.toISOString(),
          end: end.toISOString(),
          duration: ms(this.state.time),
          transitionType: this.props.transitionType
        };
        this.setState({ time: 0 });
        this.handleAppend(entry);
        this.props.handleEndTransition();
      } else {
        const startTime = Date.now() - this.state.time;
        const mStart = new Date();
        this.setState({ start: mStart });
        this.timer = setInterval(() => {
          this.setState({ time: Math.round(Date.now() - startTime) });
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
    this.props.handleEndTransition();
  };

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /**
   * @param {Object} entry
   */
  handleAppend = entry => {
    this.props.pushOntoTransitionStack(entry);
    const firebase = this.context;
    firebase.handlePushTransition(entry);
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    setTimeout(() => {
      this.setState({ percentage: this.state.isOn ? 100 : 0 });
    }, 100);

    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ width: 400 }}>
          <CircularProgressbar
            fill="#19468D"
            background
            percentage={this.state.percentage}
            text={this.state.time === 0 ? "0:00" : ms(this.state.time)}
            initialAnimation={false}
            styles={{
              path: { stroke: "#19468D" },
              text: { fill: "#000", fontSize: "16px" },
              background: { fill: "#19468D" }
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
              disabled={!this.props.typeSelected}
              aria-label="Start"
              onClick={this.onStart}
            >
              {this.state.isOn ? "End Transition" : "Start new Transition"}
            </Button>
            <div style={{ margin: 2 }} />
            <YesNoDialog
              buttonVariant={"outlined"}
              buttonColor={"primary"}
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

TransitionTimer.propTypes = {
  teacherId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  transitionType: PropTypes.string,
  handleEndTransition: PropTypes.func.isRequired,
  pushOntoTransitionStack: PropTypes.func.isRequired,
  typeSelected: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    transitionType: state.transitionTypeState.transitionType
  };
};
TransitionTimer.contextType = FirebaseContext;
export default connect(mapStateToProps, { pushOntoTransitionStack })(
  TransitionTimer
);
