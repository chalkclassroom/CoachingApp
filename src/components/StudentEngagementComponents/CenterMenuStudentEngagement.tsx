import * as React from 'react'
import { Theme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import type { StyleRulesCallback } from '@material-ui/core/styles/withStyles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import Modal from '@material-ui/core/Modal'
import { connect, ConnectedProps } from 'react-redux'

import Countdown from '../Countdown'
import * as Constants from '../../constants/Constants'
import { updateEngagementCount } from '../../state/actions/student-engagement'
import {
  addStudent,
  editStudent,
  removeStudent,
  resetStudents,
} from '../../state/actions/students'
import type { RootState } from '../../state/store'

const styles: StyleRulesCallback<Theme, {}> = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
    background: '#ede7f6',
    backgroundColor: '#e99b2e',
  },
  resetButton: {
    margin: theme.spacing(1),
    marginTop: '2vh',
  },
  gridList: {
    width: 700,
    height: 360,
  },
  paper: {
    position: 'absolute',
    width: '67%',
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8,
  },
})

/**
 * specifies styling for modal
 * @return {CSSProperties}
 */
function getModalStyle(): React.CSSProperties {
  return {
    position: 'fixed',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  } as React.CSSProperties
}

type Style = Record<keyof ReturnType<typeof styles>, string>

interface Student {
  count: number
  id?: string
  name: string
}

interface Props extends PropsFromRedux {
  background: boolean
  classes: Style
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    }
    handleSession(entry: object): void
    handlePushSEEachEntry(mEntry: object): void
  }
  handleTimerReset(): void
  handleTimerStart(): void
  incrementVisitCount(): void
  onStatusChange(enable: boolean): void
  teacherId: string
  time: number
}

interface State {
  students: Array<Student>
  open: boolean
  setOpen: boolean
  editStudent: boolean
  editStudentId: string
  studentTextFieldValue: string
  status: Status
  currentStudent: number
  entryType: number
  entries: number
  selectedPoint: number
  modal: boolean
}

const NAME_LIST = 0
const OBSERVATION = 1

type Status = typeof NAME_LIST | typeof OBSERVATION

interface ActivitySettingButtonsProps {
  activitySetting: number
  changeActivitySetting(activitySetting: number): void
}

/**
 * buttons for choosing the activity setting
 * @param {ActivitySettingButtonsProps} props
 * @return {ReactElement}
 */
const ActivitySettingButtons = (
  props: ActivitySettingButtonsProps
): React.ReactElement => {
  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <MuiThemeProvider theme={Constants.EngagementTheme}>
        <Button
          variant="contained"
          color={
            props.activitySetting === 0 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(0)
          }}
        >
          Small Group
        </Button>
        <Button
          variant="contained"
          color={
            props.activitySetting === 1 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(1)
          }}
        >
          Whole Group
        </Button>
        <Button
          variant="contained"
          color={
            props.activitySetting === 3 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(3)
          }}
        >
          Centers
        </Button>
        <Button
          variant="contained"
          color={
            props.activitySetting === 2 || props.activitySetting === -1
              ? 'primary'
              : 'secondary'
          }
          onClick={(): void => {
            props.changeActivitySetting(2)
          }}
        >
          Transition
        </Button>
      </MuiThemeProvider>
    </Grid>
  )
}

/**
 * Student Engagement Name Collection Page
 * @class CenterMenuStudentEngagement
 */
class CenterMenuStudentEngagement extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props)
    const mEntry = {
      teacher: this.props.teacherId,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: 'engagement',
    }
    this.props.firebase.handleSession(mEntry)
  }

  state = {
    students: [] as Student[],
    open: false as boolean,
    setOpen: false as boolean,
    editStudent: false as boolean,
    editStudentId: '' as string,
    studentTextFieldValue: '' as string,
    status: NAME_LIST as Status,
    currentStudent: -1 as number,
    selectedPoint: -1 as number,
    entryType: -1 as number,
    entries: 0 as number,
    modal: false as boolean,
  }

  handleClickOpen = (editMode?: boolean, id?: string): void => {
    if (editMode && id) {
      const editStudentName = this.props.students.find(
        student => student.id === id
      )?.name

      if (editStudentName) {
        this.setState({
          studentTextFieldValue: editStudentName,
          editStudent: true,
          editStudentId: id,
        })
      }
    }

    this.setState({ setOpen: true })
  }

  resetAllStudents = (): void => {
    this.props.resetStudents()
  }

  removeStudent = (id: string): void => {
    this.props.removeStudent(id)
  }

  handleClose = (): void => {
    this.setState({
      studentTextFieldValue: '',
      editStudent: false,
      setOpen: false,
      editStudentId: '',
    })
  }

  handleStudentTextFieldChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    this.setState({
      studentTextFieldValue: event.target.value,
    })
  }

  switchToObservationPage = (): void => {
    this.setState({ status: OBSERVATION })
    this.props.onStatusChange(true)
  }

  handleConfirmRating = (): void => {
    if (this.state.selectedPoint !== -1) {
      let entryType: string
      switch (this.state.entryType) {
        case 0:
          entryType = 'small'
          break
        case 1:
          entryType = 'whole'
          break
        case 2:
          entryType = 'transition'
          break
        case 3:
          entryType = 'centers'
          break
        default:
          entryType = 'none'
      }
      const mEntry = {
        id: this.generateHashCodeOfStudent(),
        point: this.state.selectedPoint,
        entryType: entryType,
      }
      this.props.firebase.handlePushSEEachEntry(mEntry)
      const studentsStateCopy = [...this.state.students]
      const currentStudentIndex = this.state.currentStudent
      const currentCount = studentsStateCopy[currentStudentIndex].count
      const studentName = studentsStateCopy[currentStudentIndex].name
      studentsStateCopy[currentStudentIndex] = {
        name: studentName,
        count: currentCount + 1,
      }
      this.setState({ students: studentsStateCopy })
      this.props.handleTimerReset()
      this.handleSelectedValue(-1)
      this.setState({
        entries: this.state.entries + 1,
        modal: false,
      })
    }
  }

  generateHashCodeOfStudent = (): number => {
    return this.hashCode(
      this.state.students[this.state.currentStudent].name.concat(
        this.state.currentStudent.toString()
      )
    )
  }

  /**
   * Returns a hash code for a string.
   * (Compatible to Java's String.hashCode())
   *
   * The hash code for a string object is computed as
   *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
   * using number arithmetic, where s[i] is the i th character
   * of the given string, n is the length of the string,
   * and ^ indicates exponentiation.
   * (The hash value of the empty string is zero.)
   *
   * @param {string} s a string
   * @return {number} a hash code value for the given string.
   */
  hashCode = function(s: string): number {
    let h = 0
    const l = s.length
    let i = 0
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0
    return h
  }

  /**
   * @param {number} point
   */
  handleSelectedValue = (point: number): void => {
    this.setState({ selectedPoint: point })
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props

    const ratingOptions = [
      {
        value: 0,
        label: '0',
        text: 'Off Task',
      },
      {
        value: 1,
        label: '1',
        text: 'Mildly Engaged',
      },
      {
        value: 2,
        label: '2',
        text: 'Engaged',
      },
      {
        value: 3,
        label: '3',
        text: 'Highly Engaged',
      },
    ]
    return (
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
        style={{ height: '100%' }}
      >
        <Modal open={this.state.entryType === -1 && this.state.status === 1}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="center"
              style={{ width: '100%' }}
            >
              <Grid item>
                <Typography
                  align="center"
                  variant="h5"
                  style={{ fontFamily: 'Arimo', paddingBottom: '1em' }}
                >
                  Please select the current activity setting in the classroom:
                </Typography>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <ActivitySettingButtons
                  activitySetting={this.state.entryType}
                  changeActivitySetting={(activitySetting: number): void => {
                    this.setState({ entryType: activitySetting })
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  align="center"
                  variant="h6"
                  style={{
                    fontFamily: 'Arimo',
                    paddingBottom: '1em',
                    paddingTop: '1em',
                  }}
                >
                  You may change your selection later if the activity setting
                  changes during your observation.
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Modal>
        <Modal open={this.state.modal && this.state.status === 1}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              container
              alignItems="center"
              direction="column"
              justify={'center'}
              style={{ width: '100%' }}
            >
              {/* Fade component flashes an orange background as visual cue that timer has ended */}
              <Fade
                in={this.props.background}
                timeout={{ enter: 300, exit: 600 }}
                style={{ height: '100%' }}
              >
                <Grid
                  item
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: '#EDAF57', // lighter shade of SE color
                  }}
                />
              </Fade>
              <Grid item style={{ width: '100%' }}>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  style={{ width: '100%' }}
                >
                  <Grid item>
                    <IconButton
                      onClick={(): void => {
                        this.setState({ modal: false })
                        this.props.handleTimerReset()
                      }}
                      style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontFamily: 'Arimo' }}
                >
                  {this.props.time != 0 ? 'Please observe ' : 'Now rate '}this
                  student&apos;s level of engagement.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" style={{ fontFamily: 'Arimo' }}>
                  {this.state.students[this.state.currentStudent]
                    ? this.state.students[this.state.currentStudent].name
                    : null}
                </Typography>
              </Grid>
              <Grid item>
                <Countdown
                  type="SE"
                  timerTime={5000}
                  time={this.props.time}
                  horizontal={true}
                />
              </Grid>
              <Grid
                item
                style={{ marginTop: '3em', marginBottom: '3em', width: '100%' }}
              >
                <Grid
                  alignItems="stretch"
                  direction="row"
                  justify="space-around"
                  container
                  style={{ width: '100%' }}
                >
                  {ratingOptions.map((item, index) => {
                    return (
                      <MuiThemeProvider
                        key={index}
                        theme={Constants.EngagementTheme}
                      >
                        <Button
                          variant="contained"
                          disabled={this.props.time != 0 ? true : false}
                          color={
                            this.state.selectedPoint === item.value ||
                            this.state.selectedPoint === -1
                              ? 'primary'
                              : 'secondary'
                          }
                          style={{
                            width: '18vh',
                            height: '18vh',
                            maxWidth: 130,
                            maxHeight: 130,
                            fontFamily: 'Arimo',
                            fontSize: 14,
                            paddingTop: 0,
                            paddingBottom: 0,
                            margin: 0,
                          }}
                          onClick={(): void =>
                            this.handleSelectedValue(item.value)
                          }
                        >
                          <Grid
                            container
                            alignItems="stretch"
                            direction="column"
                            justify="flex-start"
                            style={{
                              width: '18vh',
                              height: '18vh',
                              maxWidth: 130,
                              maxHeight: 130,
                              paddingTop: '1em',
                            }}
                          >
                            <Grid item style={{ height: '50%' }}>
                              <Typography
                                variant="h4"
                                style={{
                                  fontFamily: 'Arimo',
                                  paddingTop: '0.6em',
                                }}
                              >
                                <b>{item.label}</b>
                              </Typography>
                            </Grid>
                            <Grid>
                              <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 'bold' }}
                              >
                                {item.text}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Button>
                      </MuiThemeProvider>
                    )
                  })}
                </Grid>
              </Grid>
              <Grid
                alignItems="center"
                direction="row"
                justify="center"
                container
              >
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    style={{ fontFamily: 'Arimo' }}
                    disabled={this.state.selectedPoint === -1}
                    onClick={(): void => {
                      this.handleConfirmRating()
                      this.props.incrementVisitCount()
                      this.props.handleTimerReset()
                      this.setState({ modal: false })
                      if (this.state.selectedPoint > 0) {
                        this.props.updateEngagementCount(true)
                      } else {
                        this.props.updateEngagementCount(false)
                      }
                    }}
                  >
                    CONFIRM RATING
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Modal>
        <Dialog
          open={this.state.setOpen}
          onClose={(): void => this.handleClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Enter Student Name'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You can add a description of the student for your reference.
              <form>
                <TextField
                  id="name-filled"
                  label="Student Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={this.state.studentTextFieldValue}
                  onChange={this.handleStudentTextFieldChange}
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(): void => this.handleClose()} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={(): void => {
                const nameString = this.state.studentTextFieldValue.toString()
                const newList = this.state.students.concat({
                  name:
                    nameString.charAt(0).toUpperCase() +
                    nameString.substring(1),
                  count: 0,
                  id: this.state.editStudentId,
                })

                this.setState({
                  students: newList,
                })

                this.handleClose()

                if (this.state.editStudent) {
                  this.props.editStudent(nameString, this.state.editStudentId)
                } else {
                  this.props.addStudent(nameString)
                }
              }}
              color="secondary"
              autoFocus
            >
              {this.state.editStudent ? 'Edit' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.status === 0 ? (
          <Grid
            container
            alignItems="center"
            direction="row"
            justify={'center'}
          >
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontFamily: 'Arimo' }}
              >
                Create Student List
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                gutterBottom
                style={{ fontFamily: 'Arimo' }}
              >
                Please enter the student names.
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Fab
                className={classes.button}
                aria-label="add"
                onClick={(): void => this.handleClickOpen()}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="column">
            <Grid item style={{ paddingBottom: '2em' }}>
              <ActivitySettingButtons
                activitySetting={this.state.entryType}
                changeActivitySetting={(activitySetting: number): void => {
                  this.setState({ entryType: activitySetting })
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                style={{ fontFamily: 'Arimo' }}
              >
                Select a student to observe:
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid
          container
          alignItems="center"
          direction="row"
          justify="center"
          style={{ paddingTop: '1em', paddingBottom: '1em' }}
        >
          <Grid item xs={12}>
            <Grid
              alignItems="center"
              direction="row"
              justify="center"
              container
            >
              <Grid item>
                <GridList cellHeight={60} className={classes.gridList} cols={3}>
                  {this.props.students.map((student: Student, i: number) => {
                    return (
                      <GridListTile key={i + 'grid'} cols={1}>
                        <Card
                          onClick={(): void => {
                            if (this.state.status === 1) {
                              this.setState(
                                {
                                  currentStudent: i,
                                  modal: true,
                                },
                                () => {
                                  this.props.handleTimerStart()
                                }
                              )
                            }
                          }}
                        >
                          <CardContent>
                            <Paper
                              className={classes.root}
                              elevation={1}
                              style={{ padding: 8 }}
                            >
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item xs={6}>
                                  <Typography noWrap variant="subtitle2">
                                    {student.name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                  <Typography variant="subtitle2">
                                    {student.count}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="subtitle2">
                                    <IconButton
                                      style={{ padding: '0' }}
                                      onClick={(): void => {
                                        if (student.id) {
                                          this.handleClickOpen(true, student.id)
                                        }
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  <Typography variant="subtitle2">
                                    <IconButton
                                      style={{ padding: '0' }}
                                      onClick={(): void => {
                                        if (student.id) {
                                          this.removeStudent(student.id)
                                        }
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Paper>
                          </CardContent>
                        </Card>
                      </GridListTile>
                    )
                  })}
                  {this.state.status === 1 ? (
                    <GridListTile cols={1}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Fab
                          size="small"
                          className={classes.button}
                          aria-label="add"
                          onClick={(): void => this.handleClickOpen()}
                        >
                          <AddIcon />
                        </Fab>
                      </Grid>
                    </GridListTile>
                  ) : null}
                </GridList>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.state.status === 0 ? (
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
          >
            <Button
              variant="contained"
              className={classes.button}
              onClick={(): void => this.switchToObservationPage()}
              disabled={this.state.students.length === 0}
            >
              Begin Observation
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.resetButton}
              onClick={this.resetAllStudents}
            >
              Reset all students
            </Button>
          </Grid>
        ) : null}
      </Grid>
    )
  }
}

const mapState = (state: RootState) => ({ students: state.studentsState.students })
const mapDispatch = {
  updateEngagementCount,
  addStudent,
  editStudent,
  removeStudent,
  resetStudents,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(withStyles(styles)(CenterMenuStudentEngagement))
