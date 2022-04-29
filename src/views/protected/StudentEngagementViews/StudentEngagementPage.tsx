import * as React from 'react'
import * as PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Theme, withStyles } from '@material-ui/core/styles'
import AppBar from '../../../components/AppBar'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import CenterMenuStudentEngagement from '../../../components/StudentEngagementComponents/CenterMenuStudentEngagement'
import { connect } from 'react-redux'
import Dashboard from '../../../components/Dashboard'
import TotalVisitCount from '../../../components/TotalVisitCount'
import TeacherModal from '../HomeViews/TeacherModal'
import * as Types from '../../../constants/Types'
import Firebase from '../../../components/Firebase'
import { WithStyles } from '@material-ui/styles'
import { createStyles } from '@material-ui/core'
import withObservationWrapper from "../../../components/HOComponents/withObservationWrapper";
import {clearEngagementCount} from "../../../state/actions/student-engagement";

/*
    N.B. Time measured in milliseconds.

    Rationale for the 2:10 interval -
    Give coaches ~10 seconds to make and confirm their rating,
    catch up on behavior approval/disapproval count if they need to,
    and then allow for 2 full minutes in between ratings.
 */

const RATING_INTERVAL = 5000

const styles = () => createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  grow: {
    flexGrow: 0,
  },
  main: {
    height: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
  },
  dashboardGrid: {
    width: '25%',
    height: '100%',
  },
  contentGrid: {
    width: '75%',
    height: '100%',
  },
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  // ipad portrait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0,
    },
    dashboardGrid: {
      width: '100%',
      height: '25%',
    },
    contentGrid: {
      width: '100%',
      height: '75%',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  teacherSelected: Types.Teacher
  preBack(): Promise<boolean>
  clearEngagementCount(): void
  forceComplete: boolean
}

interface State {
  time: number
  completeEnabled: boolean
  teacherModal: boolean
  totalVisitCount: number
  background: boolean
}

/**
 * classroom climate observation tool
 * @class ClassroomClimatePage
 */
class StudentEngagementPage extends React.Component<Props, State> {
  timer: NodeJS.Timeout

  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props)
    this.timer = setTimeout(() => ({}), 100) // fix the uninitialized warning
    this.state = {
      time: RATING_INTERVAL,
      completeEnabled: false,
      teacherModal: false,
      totalVisitCount: 0,
      background: false,
    }
  }

  tick = (): void => {
    if (this.state.time <= 1000 && this.state.time > 0) {
      // if one second left, set background to true
      // activates background color (Fade component in CenterMenuStudentEngagement)
      this.setState({ background: true }, () => {
        setTimeout(() => {
          this.setState({ background: false })
        }, 500)
      })
    }
    if (this.state.time <= 0) {
      this.setState(
        {
          time: 0,
        },
        () => {
          this.stopTimer()
        }
      )
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState(
          {
            time: 0,
          },
          () => {
            this.stopTimer()
          }
        )
      } else {
        this.setState({ time: this.state.time - 1000 })
      }
    }
  }

  handleTimerReset = (): void => {
    this.setState({ time: RATING_INTERVAL })
    clearInterval(this.timer)
  }

  /**
   * @param {boolean} enable
   */
  handleCompleteButton = (enable: boolean): void => {
    this.setState({ completeEnabled: enable })
  }

  handleTimerStart = (): void => {
    this.timer = setInterval(this.tick, 1000)
  }

  stopTimer = (): void => {
    clearInterval(this.timer)
  }

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (!this.props.teacherSelected) {
      this.setState({ teacherModal: true })
    }
  }

  componentWillUnmount() {
    this.props.clearEngagementCount()
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render(): React.ReactElement<Props> {
    return this.props.teacherSelected ? (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => (
            <AppBar confirmAction={this.props.preBack} firebase={firebase} />
          )}
        </FirebaseContext.Consumer>
        <div className={this.props.classes.main}>
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            style={{ height: '100%' }}
          >
            <Grid
              container
              alignItems={'center'}
              justify={'space-around'}
              direction={'row'}
              style={{ height: '100%' }}
            >
              <Grid item className={this.props.classes.dashboardGrid}>
                <Grid
                  container
                  alignItems={'center'}
                  justify={'center'}
                  direction={'column'}
                  style={{ height: '100%' }}
                >
                  <Dashboard
                    type="SE"
                    infoDisplay={
                      <TotalVisitCount
                        count={this.state.totalVisitCount}
                        title="Total Observations:"
                      />
                    }
                    forceComplete={this.props.forceComplete}
                    infoPlacement="flex-start"
                    completeObservation={this.state.completeEnabled}
                    stopTimer={this.stopTimer}
                  />
                </Grid>
              </Grid>
              <Grid className={this.props.classes.contentGrid}>
                <FirebaseContext.Consumer>
                  {(firebase: Firebase): React.ReactNode => (
                    <CenterMenuStudentEngagement
                      teacherId={this.props.teacherSelected.id}
                      firebase={firebase}
                      onStatusChange={this.handleCompleteButton}
                      observationStarted={this.state.completeEnabled}
                      time={this.state.time}
                      handleTimerReset={this.handleTimerReset}
                      handleTimerStart={this.handleTimerStart}
                      incrementVisitCount={(): void => {
                        this.setState({
                          totalVisitCount: this.state.totalVisitCount + 1,
                        })
                      }}
                      background={this.state.background}
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
        {(firebase: Firebase): React.ReactElement => (
          <TeacherModal
            handleClose={this.handleCloseTeacherModal}
            firebase={firebase}
            type={'Observe'}
          />
        )}
      </FirebaseContext.Consumer>
    )
  }
}

const wrapperOptions = {

}

const mapStateToProps = (
  state: Types.ReduxState
): { teacherSelected: Types.Teacher } => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
  }
}

StudentEngagementPage.contextType = FirebaseContext

export default connect(
  mapStateToProps,
  {clearEngagementCount}
)(withStyles(styles)(withObservationWrapper(wrapperOptions)(StudentEngagementPage)))
