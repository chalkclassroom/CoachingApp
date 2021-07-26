import * as React from 'react';
import * as PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import ms from 'pretty-ms';
import YesNoDialog from '../../../components/Shared/YesNoDialog';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { pushOntoTransitionStack, updateTransitionTime, updateSessionTime } from '../../../state/actions/transition-time';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import * as Constants from '../../../constants/Constants';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Types from '../../../constants/Types';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0988EC"
    },
    secondary: {
      main: "#E0E0E0"
    }
  }
});

interface Props {
  updateSessionTime(time: number): void,
  teacherSelected: Types.Teacher,
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleSession(mEntry: {
      observedBy: string,
      teacher: string,
      start?: Date,
      type: string
    }): Promise<void>
  },
  updateTransitionTime(time: number): void,
  handleStartTransition(): void,
  handleEndTransition(): void,
  pushOntoTransitionStack(entry: {
    start: string,
    end: string,
    duration: string,
    transitionType: string
  }): void,
  transitionType: string,
  typeSelected: boolean
}

interface State {
  percentage: number,
  isOn: boolean,
  time: number,
  start: Date | null,
  startMilliseconds: number,
  openDialog: boolean
}

/**
 * transition timer
 * @class TransitionTimer
 */
class TransitionTimer extends React.Component<Props, State> {
  timer: NodeJS.Timeout;
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      percentage: 0,
      isOn: false,
      time: 0,
      start: null,
      startMilliseconds: 0,
      openDialog: false
    };

    const sessionStart = Date.now();
    this.props.updateSessionTime(sessionStart);
    const mEntry = {
      start: new Date(sessionStart),
      teacher: this.props.teacherSelected.id,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: "transition"
    };

    this.props.firebase.handleSession(mEntry);
  }
 
  guide = (): void => {
    this.setState({ openDialog: true });
  };
  
  onStart = (): void => {
    this.setState(state => {
      if (state.isOn) {
        clearInterval(this.timer);
        this.props.updateTransitionTime(this.state.time);
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
        this.props.handleStartTransition();
        const startTime = Date.now();
        this.setState({ start: new Date(startTime), startMilliseconds: startTime });
        this.timer = setInterval(() => {
          this.setState({ time: Math.round(Date.now() - startTime) });
        }, 1000);
      }
      return { isOn: !state.isOn };
    });
  };
 
  onCancel = (): void => {
    clearInterval(this.timer);
    this.setState({
      isOn: false,
      time: 0,
      percentage: 0
    });
    this.props.handleEndTransition();
  };
 
  handleClose = (): void => {
    this.setState({ openDialog: false });
  };
 
  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount(): void {
    clearInterval(this.timer);
  }
 
  /**
   * @param {Object} entry
   */
  handleAppend = (entry: {
    start: string,
    end: string,
    duration: string,
    transitionType: string
  }): void => {
    this.props.pushOntoTransitionStack(entry);
    const firebase = this.context;
    firebase.handlePushTransition(entry);
  };

  static propTypes = {
    firebase: PropTypes.exact({
      handleSession: PropTypes.func,
      auth: PropTypes.exact({
        currentUser: PropTypes.exact({
          uid: PropTypes.string
        })
      })
    }).isRequired,
    transitionType: PropTypes.string,
    handleStartTransition: PropTypes.func.isRequired,
    handleEndTransition: PropTypes.func.isRequired,
    pushOntoTransitionStack: PropTypes.func.isRequired,
    updateTransitionTime: PropTypes.func.isRequired,
    updateSessionTime: PropTypes.func.isRequired,
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
  }
 
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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
              <MuiThemeProvider theme={theme}>
                <Button
                  color="secondary"
                  variant="contained"
                  aria-label="Start"
                  onClick={this.guide}
                  style={{ fontFamily: 'Arimo', boxShadow: 'none' }}
                >
                  Start New Transition
                </Button>
              </MuiThemeProvider>
            ) : (
              <MuiThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Start"
                  onClick={this.onStart}
                  style={{ fontFamily: 'Arimo' }}
                >
                  {this.state.isOn ? "End Transition" : "Start new Transition"}
                </Button>
              </MuiThemeProvider>
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
              literacy=''
              handleLiteracyActivitySetting={null}
            />
          </Grid>
          <Dialog
            open={this.state.openDialog}
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
 
const mapStateToProps = (state: Types.ReduxState): {
  transitionType: string,
  teacherSelected: Types.Teacher
} => {
  return {
    transitionType: state.transitionTypeState.transitionType,
    teacherSelected: state.teacherSelectedState.teacher
  };
};

TransitionTimer.contextType = FirebaseContext;

export default connect(mapStateToProps, { pushOntoTransitionStack, updateTransitionTime, updateSessionTime })(
  TransitionTimer
  );
