import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TransitionTimer from "./TransitionTimer";
import TransitionLog from "./TransitionLog";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";
import { connect } from "react-redux";
import {
  clearSessionTime,
  clearTransitionTime,
  resetTransitionTime,
  toggleNewTransitionType
} from "../../../state/actions/transition-time";
import TransitionTypeSel from "./TransitionTypeSel";
import Dashboard from "../../../components/Dashboard";
import TeacherModal from '../HomeViews/TeacherModal';
import * as Constants from "../../../constants/Constants";
import * as Types from '../../../constants/Types';
import Firebase from '../../../components/Firebase'
import withObservationWrapper from "../../../components/HOComponents/withObservationWrapper";

const styles: object = {
  root: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflowY: 'auto',
    // overflowX: 'hidden'
    overflowX: 'auto'
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
  main: {
    height: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  },
  grid: {
    direction: 'row'
  },
  dashboardGrid: {
    width: '25%',
    height: '100%'
  },
  contentGrid: {
    width: '75%',
    height: '100%'
  },
  typeGrid: {
    width: '45%',
  },
  timerGrid: {
    width: '55%',
  },
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    grid: {
      direction: 'column'
    },
    dashboardGrid: {
      width: '100%',
      height: '25%'
    },
    contentGrid: {
      width: '100%',
      height: '75%'
    },
    typeGrid: {
      width: '50%'
    },
    timerGrid: {
      width: '50%'
    }
  }
};

interface Props {
  classes: {
    root: string,
    backButton: string,
    main: string,
    grid: string,
    dashboardGrid: string,
    contentGrid: string,
    typeGrid: string,
    timerGrid: string
  },
  forceComplete: boolean
  toggleNewTransitionType(transitionType: string | null): void,
  transitionType: string | null,
  teacherSelected: Types.Teacher
  preBack(): Promise<boolean>
  resetTransitionTime(): void
  clearSessionTime(): void
  clearTransitionTime(): void
};

interface State {
  notes: boolean,
  transitionType: string,
  open: boolean,
  transitionEnded: boolean,
  teacherModal: boolean
  isStopped: boolean
};

/**
 * transition time observation tool
 * @class TransitionTimePage
 */
class TransitionTimePage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      notes: false,
      transitionType: '',
      open: false,
      transitionEnded: true,
      teacherModal: false,
      isStopped: false
    };
  }

  /**
   * @param {string} type
   */
  handleTransitionType = (type: string): void => {
    if (this.state.transitionEnded) {
      this.props.toggleNewTransitionType(type);
    }
  };

  handleStartTransition = (): void => {
    this.setState({ transitionEnded: false })
  };

  handleEndTransition = (): void => {
    this.setState({ transitionEnded: true });
    this.props.toggleNewTransitionType(null);
  };

  /**
   * @param {boolean} open
   */
  handleNotes = (open: boolean): void => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  stopTimer = (): void => {
    this.setState({ isStopped: true });
  };

  startTimer = (): void => {
    this.setState({ isStopped: false });
  };

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (!this.props.teacherSelected) {
      this.setState({ teacherModal: true })
    }
  };
  componentWillUnmount() {
    this.props.resetTransitionTime()
      this.props.clearTransitionTime()
      this.props.clearSessionTime()
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleNewTransitionType: PropTypes.func.isRequired,
    preBack: PropTypes.func,
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

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      this.props.teacherSelected ? (
        <div className={classes.root}>
          {this.state.notes ? (
            <FirebaseContext.Consumer>
              {(firebase: Firebase): React.ReactElement => (
                <Notes
                  open={true}
                  onClose={this.handleNotes}
                  color={Constants.Colors.TT}
                  text={"Transition Time" + " Notes"}
                  firebase={firebase}
                />
              )}
            </FirebaseContext.Consumer>
          ) : (<div />)}
          <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => <AppBar confirmAction={this.props.preBack} firebase={firebase} />}
          </FirebaseContext.Consumer>
          <main className={classes.main}>
            <Grid container justify="center" alignItems="center" className={classes.grid} style={{height: '100%'}}>
              <Grid item className={classes.dashboardGrid}>
                <Grid
                  container
                  alignItems={"center"}
                  justify={"center"}
                  direction={"column"}
                  style={{height: '100%'}}
                >
                  <Grid item>
                    <Dashboard
                      type="TT"
                      infoDisplay={<TransitionLog />}
                      infoPlacement="center"
                      completeObservation={this.state.transitionEnded}
                      startTimer={this.startTimer}
                      stopTimer={this.stopTimer}
                      forceComplete={this.props.forceComplete}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.contentGrid}>
                <Grid container direction="row" alignItems="center" justify="space-evenly" style={{height: '100%'}}>
                  <Grid item className={classes.typeGrid}>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"center"}
                      direction={"column"}
                    >
                      <TransitionTypeSel
                        handleTransitionType={this.handleTransitionType}
                        handleNotes={this.handleNotes}
                        transitionType={this.props.transitionType}
                      />
                    </Grid>
                  </Grid>
                  <Grid item className={classes.timerGrid}>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"center"}
                      direction={"column"}
                    >
                      <FirebaseContext.Consumer>
                        {(firebase: Firebase): React.ReactNode => (
                          <TransitionTimer
                            firebase={firebase}
                            typeSelected={
                              this.props.transitionType !== null
                            }
                            handleStartTransition={this.handleStartTransition}
                            handleEndTransition={this.handleEndTransition}
                            isStopped={this.state.isStopped}
                          />
                        )}
                      </FirebaseContext.Consumer>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </main>
        </div>
      ) : (
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactElement => (
            <TeacherModal
              handleClose={this.handleCloseTeacherModal}
              firebase={firebase}
              type={"Observe"}
            />
          )}
        </FirebaseContext.Consumer>
      )
    );
  }
}
const wrapperOptions = {
 totalTime: 60*20,
  modalTime: 60* 5,
  confirmationPrompt: "You have not recorded Any Transitions recently. Would you like to complete this observation?"
}

const mapStateToProps = (state: Types.ReduxState): {
  transitionType: string | null,
  teacherSelected: Types.Teacher
} => {
  return {
    transitionType: state.transitionTypeState.transitionType,
    teacherSelected: state.teacherSelectedState.teacher
  };
};


export default connect(mapStateToProps, { resetTransitionTime, toggleNewTransitionType, clearTransitionTime, clearSessionTime })(
  withStyles(styles)(withObservationWrapper(wrapperOptions)(TransitionTimePage))
);
