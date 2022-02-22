import * as React from 'react'
import * as PropTypes from 'prop-types'
import Button from '@material-ui/core/Button/Button'
import Card from '@material-ui/core/Card/Card'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Grid from '@material-ui/core/Grid'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Dashboard from '../Dashboard'
import Countdown from '../Countdown'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { updateListeningCount } from '../../state/actions/listening-to-children'
import * as Constants from '../../constants/Constants'
import * as Types from '../../constants/Types'
import Firebase from '../Firebase'

const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arimo',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    height: '100%',
  },
  grid: {
    direction: 'row',
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
  // ipad portait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0,
    },
    grid: {
      direction: 'column',
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
}

const RATING_INTERVAL = 60000

interface Props {
  classes: {
    root: string
    grow: string
    main: string
    grid: string
    dashboardGrid: string
    contentGrid: string
  }
  type: Types.DashboardType
  firebase: Firebase
}

interface State {
  checked: Array<number>
  time: number
  timeUpOpen: boolean
  final: boolean
  in: boolean
}

/**
 * Teacher Checklist
 * @class TeacherChecklist
 * @return {void}
 */
class TeacherChecklist extends React.Component<Props, State> {
  timer: NodeJS.Timeout
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props)

    const mEntry = {
      teacher: this.props.teacherSelected.id,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: 'listening',
    }
    this.props.firebase.handleSession(mEntry)

    this.state = {
      checked: [],
      time: RATING_INTERVAL,
      timeUpOpen: false,
      final: false,
      in: true,
      isStopped: false,
    }
  }

  /**
   * @return {void}
   */
  tick = (): void => {
    if (this.state.time <= 0) {
      clearInterval(this.timer)
      if (this.state.final) {
        if (this.state.checked.length > 0) {
          this.handleSubmit(this.state.checked)
        } else {
          this.handleSubmit([7])
        }
        this.setState({ final: false })
      } else {
        this.handleTimeUpNotification()
      }
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 })
      } else {
        this.setState({
          time: this.state.time - (this.state.isStopped ? 0 : 1000),
        })
      }
    }
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.timer = global.setInterval(this.tick, 1000)
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount(): void {
    clearInterval(this.timer)
  }

  handleTimeUpNotification = (): void => {
    this.setState({ timeUpOpen: true })
  }

  stopTimer = (): void => {
    this.setState({ isStopped: true })
    // clearInterval(this.timer);
  }

  startTimer = (): void => {
    this.setState({ isStopped: false })
  }

  handleFinish = (): void => {
    this.setState(
      {
        timeUpOpen: false,
        time: 10000,
        final: true,
      },
      () => {
        this.timer = global.setInterval(this.tick, 1000)
      }
    )
  }

  handleNext = (): void => {
    this.setState(
      {
        timeUpOpen: false,
        time: 60000,
      },
      () => {
        if (this.state.checked.length > 0) {
          this.handleSubmit(this.state.checked)
        } else {
          this.handleSubmit([7])
        }
      }
    )
  }

  /**
   * @param {Array<number>} checked
   */
  handleSubmit = (checked: Array<number>): void => {
    if (checked.indexOf(7) === 0) {
      this.props.updateListeningCount(false)
    } else {
      this.props.updateListeningCount(true)
    }
    // I believe this state update is split in two in order to achieve the zoom-in effect.
    this.setState({ in: false }, () => {
      this.setState(
        {
          checked: [],
          in: true,
          time: 60000,
        },
        () => {
          this.timer = global.setInterval(this.tick, 1000)
          this.props.firebase.handlePushListening({ checked })
        }
      )
    })
  }

  /**
   * @param {number} value
   * @return {void}
   */
  handleCheck = (value: number) => (): void => {
    const { checked } = this.state
    const newChecked: Array<number> = []
    newChecked.push(...checked)
    const currentIndex = checked.indexOf(value)
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    this.setState({ checked: newChecked })
  }

  static propTypes = {
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        currentUser: PropTypes.exact({
          uid: PropTypes.string,
        }),
      }),
      handleSession: PropTypes.func,
      handlePushListening: PropTypes.func,
    }).isRequired,
    classes: PropTypes.object.isRequired,
    type: PropTypes.oneOf<Types.DashboardType>([
      'AppBar',
      'TT',
      'CC',
      'MI',
      'SE',
      'IN',
      'LC',
      'SA',
      'LI',
      'AC',
      'RedGraph',
      'NotPresent',
    ]).isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string,
    }).isRequired,
    updateListeningCount: PropTypes.func.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div className={this.props.classes.root}>
        <Dialog
          open={this.state.timeUpOpen}
          aria-labelledby="simple-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          {this.state.checked.length > 0 ? (
            <div>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ fontFamily: 'Arimo', fontSize: '1.5em' }}
                >
                  Complete your selections or move to the next observation.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleFinish}
                  color="secondary"
                  variant="contained"
                  style={{ fontFamily: 'Arimo' }}
                >
                  MAKE FINAL SELECTIONS
                </Button>
                <Button
                  onClick={this.handleNext}
                  color="primary"
                  variant="contained"
                  style={{ fontFamily: 'Arimo' }}
                  autoFocus
                >
                  GO TO NEXT OBSERVATION
                </Button>
              </DialogActions>
            </div>
          ) : (
            <div>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ fontFamily: 'Arimo', fontSize: '1.5em' }}
                >
                  Complete your selections or move to the next observation.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleFinish}
                  color="secondary"
                  variant="contained"
                  style={{ fontFamily: 'Arimo' }}
                >
                  MAKE FINAL SELECTIONS
                </Button>
                <Button
                  onClick={this.handleNext}
                  color="primary"
                  variant="contained"
                  style={{ fontFamily: 'Arimo' }}
                  autoFocus
                >
                  NO BEHAVIORS OBSERVED
                </Button>
              </DialogActions>
            </div>
          )}
        </Dialog>
        <main className={this.props.classes.main}>
          <Grid
            container
            alignItems={'center'}
            justify={'flex-start'}
            style={{ height: '100%' }}
            className={this.props.classes.grid}
          >
            <Grid item className={this.props.classes.dashboardGrid}>
              <Grid
                container
                alignItems={'center'}
                justify={'center'}
                direction={'column'}
                style={{ height: '100%' }}
              >
                <Grid item>
                  <Dashboard
                    type={this.props.type}
                    infoDisplay={
                      <Countdown
                        type={this.props.type}
                        time={this.state.time}
                        timerTime={60000}
                      />
                    }
                    infoPlacement="center"
                    completeObservation={true}
                    startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={this.props.classes.contentGrid}>
              <Zoom in={this.state.in}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  direction="column"
                  style={{ height: '100%' }}
                >
                  <Typography
                    variant="h6"
                    align={'center'}
                    style={{ paddingBottom: '1em', fontFamily: 'Arimo' }}
                  >
                    Select all the teacher behaviors you see:
                  </Typography>
                  <Grid item>
                    <Grid
                      container
                      direction={'row'}
                      justify="center"
                      alignItems="center"
                      xs={12}
                    >
                      <Grid item xs={5}>
                        <Card style={{ height: '45vh' }}>
                          <List>
                            {Constants.Checklist.LC.TeacherBehaviors.slice(
                              0,
                              3
                            ).map((value, index) => {
                              return (
                                <ListItem
                                  key={index}
                                  onClick={this.handleCheck(index + 1)}
                                  style={{ height: '15vh' }}
                                >
                                  <ListItemIcon>
                                    <Checkbox
                                      checked={this.state.checked.includes(
                                        index + 1
                                      )}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    disableTypography
                                    style={{ fontFamily: 'Arimo' }}
                                  >
                                    {value}
                                  </ListItemText>
                                </ListItem>
                              )
                            })}
                          </List>
                        </Card>
                      </Grid>
                      <Grid item xs={5}>
                        <Card style={{ height: '45vh' }}>
                          <List>
                            {Constants.Checklist.LC.TeacherBehaviors.slice(
                              3,
                              6
                            ).map((value, index) => {
                              return (
                                <ListItem
                                  key={index}
                                  onClick={this.handleCheck(index + 4)}
                                  style={{ height: '15vh' }}
                                >
                                  <ListItemIcon>
                                    <Checkbox
                                      checked={this.state.checked.includes(
                                        index + 4
                                      )}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    disableTypography
                                    style={{ fontFamily: 'Arimo' }}
                                  >
                                    {value}
                                  </ListItemText>
                                </ListItem>
                              )
                            })}
                          </List>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Zoom>
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (
  state: Types.ReduxState
): { teacherSelected: Types.Teacher } => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
  }
}

export default connect(mapStateToProps, { updateListeningCount })(
  withStyles(styles)(TeacherChecklist)
)
