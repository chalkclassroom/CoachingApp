import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import ms from 'pretty-ms';
import YesNoDialog from '../../../components/Shared/YesNoDialog.tsx';
import cyan from '@material-ui/core/colors/teal';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { pushOntoTransitionStack } from '../../../state/actions/transition-time';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import * as Constants from '../../../constants';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
 
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

    this.state = {
      percentage: 0,
      isOn: false,
      time: 0,
      start: 0,
      startMilliseconds: 0,
      opendialog: false
    };

    const mEntry = {
      teacher: this.props.teacherSelected.id,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: "transition"
    };

    this.props.firebase.handleSession(mEntry);
  }
 
  guide = () => {
    this.setState({ opendialog: true });
  };
  
  onStart = () => {
    this.setState(state => {
      if (state.isOn) {
        clearInterval(this.timer);
        const end = this.state.startMilliseconds + this.state.time;
        const startDate = new Date(this.state.startMilliseconds);
        const endDate = new Date(end);
        const entry = {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          duration: ms(this.state.time),
          transitionType: this.props.transitionType
        };
        this.setState({ time: 0 });
        this.handleAppend(entry);
        this.props.handleEndTransition();
      } else {
        const startTime = Date.now();
        this.setState({ start: new Date(startTime), startMilliseconds: startTime });
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
 
  handleClose = () => {
    this.setState({ opendialog: false });
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
        <div style={{ width: 400, fontFamily: 'Arimo' }}>
          <CircularProgressbar
            fill={Constants.Colors.TT}
            background
            percentage={this.state.percentage}
            text={this.state.time === 0 ? "0:00" : ms(this.state.time)}
            initialAnimation={false}
            styles={{
              path: { stroke: Constants.Colors.TT },
              text: { fill: "white", fontSize: "16px" },
              background: { fill: Constants.Colors.TT }
            }}
          />
          <Grid
            container
            alignItems={"center"}
            justify={"space-around"}
            direction={"column"}
          >            
            <div style={{ margin: 2 }} />
            {!this.props.typeSelected ? (
              <Button
                color="#E0E0E0" // graycolor
                variant="raised"
                opacity="0.3"
                disableElevation
                aria-label="Start"
                onClick={this.guide}
                style={{ fontFamily: 'Arimo', boxShadow: 'none' }}
              >
                Start New Transition
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                aria-label="Start"
                onClick={this.onStart}
                style={{ fontFamily: 'Arimo' }}
              >
                {this.state.isOn ? "End Transition" : "Start new Transition"}
              </Button>
            ) }
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
          <Dialog
            open={this.state.opendialog}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'Arimo' }}>
              Please select a transition type before you start a new transition.
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" style={{ fontFamily: 'Arimo' }}>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
 
TransitionTimer.propTypes = {
  firebase: PropTypes.object.isRequired,
  transitionType: PropTypes.string,
  handleEndTransition: PropTypes.func.isRequired,
  pushOntoTransitionStack: PropTypes.func.isRequired,
  typeSelected: PropTypes.bool.isRequired,
  teacherSelected: PropTypes.exact({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    notes: PropTypes.string,
    id: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.string,
    school: PropTypes.string
  }).isRequired
};
 
const mapStateToProps = state => {
  return {
    transitionType: state.transitionTypeState.transitionType,
    teacherSelected: state.teacherSelectedState.teacher
  };
};
TransitionTimer.contextType = FirebaseContext;
export default connect(mapStateToProps, { pushOntoTransitionStack })(
  TransitionTimer
  );
