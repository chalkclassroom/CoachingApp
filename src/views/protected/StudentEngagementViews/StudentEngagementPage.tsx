import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import CenterMenuStudentEngagement from "../../../components/StudentEngagementComponents/CenterMenuStudentEngagement";
import { connect } from "react-redux";
import Dashboard from "../../../components/Dashboard";
import Countdown from "../../../components/Countdown";
import TeacherModal from '../HomeViews/TeacherModal';
import * as Types from '../../../constants/Types';

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 5000;


const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 0
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
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  // ipad portrait
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
  }
};

interface Props {
  classes: {
    root: string,
    grow: string,
    main: string,
    grid: string,
    dashboardGrid: string,
    contentGrid: string
  },
  teacherSelected: Types.Teacher
}

interface State {
  time: number,
  completeEnabled: boolean,
  teacherModal: boolean
}

/**
 * classroom climate observation tool
 * @class ClassroomClimatePage
 */
class StudentEngagementPage extends React.Component<Props, State> {
  timer: NodeJS.Timeout;

  state = {
    time: RATING_INTERVAL,
    recs: true,
    completeEnabled: false,
    teacherModal: false
  };

  tick = (): void => {
    if (this.state.time <= 0) {
      this.setState({ time: 0 });
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - 1000 });
      }
    }
  };

  handleTimerReset = (): void => {
    this.setState({ time: RATING_INTERVAL });
    clearInterval(this.timer);
  }

  /**
   * @param {boolean} enable
   */
  handleCompleteButton = (enable: boolean): void => {
    this.setState({ completeEnabled: enable });
  };

  handleTimerStart = (): void => {
    this.timer = setInterval(this.tick, 1000);
  }

  stopTimer = (): void => {
    clearInterval(this.timer);
  }

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (!this.props.teacherSelected) {
      this.setState({ teacherModal: true })
    }
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
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
   * @return {ReactElement}
   */
  render(): React.ReactElement {
    return (
      this.props.teacherSelected ? (
        <div className={this.props.classes.root}>
          <FirebaseContext.Consumer>
            {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
          </FirebaseContext.Consumer>
          <div className={this.props.classes.main}>
            <Grid
              container
              alignItems={"center"}
              justify={"center"}
              className={this.props.classes.grid}
              style={{height: '100%'}}
            >
              <Grid
                container
                alignItems={"center"}
                justify={"space-around"}
                direction={"row"}
                style={{height: '100%'}}
              >
                <Grid item className={this.props.classes.dashboardGrid}>
                  <Grid
                    container
                    alignItems={"center"}
                    justify={"center"}
                    direction={"column"}
                    style={{height: '100%'}}
                  >
                    <Dashboard
                      type="SE"
                      infoDisplay={
                          this.state.completeEnabled
                          // &&
                          // <Countdown type="SE" timerTime={RATING_INTERVAL} time={this.state.time} />
                      }
                      infoPlacement="center"
                      completeObservation={this.state.completeEnabled}
                      stopTimer={this.stopTimer}
                    />
                  </Grid>
                </Grid>
                <Grid className={this.props.classes.contentGrid}>
                  <FirebaseContext.Consumer>
                    {(firebase: {
                      auth: {
                        currentUser: {
                          uid: string
                        }
                      },
                      handleSession(entry: object): void,
                      handlePushSEEachEntry(mEntry: object): void
                    }): React.ReactNode => (
                      <CenterMenuStudentEngagement
                        teacherId={this.props.teacherSelected.id}
                        firebase={firebase}
                        onStatusChange={this.handleCompleteButton}
                        time={this.state.time}
                        handleTimerReset = {this.handleTimerReset}
                        handleTimerStart = {this.handleTimerStart}
                      />
                    )}
                  </FirebaseContext.Consumer>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <FirebaseContext.Consumer>
          {(firebase: {
            getTeacherList(): Promise<Types.Teacher[]>
          }): React.ReactElement => (
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

const mapStateToProps = (state: Types.ReduxState): {teacherSelected: Types.Teacher} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

StudentEngagementPage.contextType = FirebaseContext;

export default connect(mapStateToProps, {})(
    withStyles(styles)(StudentEngagementPage)
);
