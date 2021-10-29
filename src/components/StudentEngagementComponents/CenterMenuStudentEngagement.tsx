import React, { SyntheticEvent } from 'react'
import { Theme } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
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
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import { connect, ConnectedProps } from 'react-redux'

import ActivitySettingButtons from './ActivitySettingButtons'
import SelectActivityModal from './SelectActivityModal'
import StudentRatingModal from './StudentRatingModal'
import { updateEngagementCount } from '../../state/actions/student-engagement'
import {
  addStudent,
  editStudent,
  removeStudent,
  resetStudents,
} from '../../state/actions/students'
import type { Student } from '../../state/reducers/students-state'
import type { RootState } from '../../state/store'

const styles: StyleRulesCallback<Theme, {}> = (theme) => ({
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
  studentCards: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(3, 1fr)',
    padding: theme.spacing(4, 2),
  },
  cardRow: {
    alignItems: 'center',
    display: 'grid',
    gridAutoColumns: '1fr auto auto auto',
    gridAutoFlow: 'column',
    gridColumnGap: theme.spacing(1),
  },
})

type Style = Record<keyof ReturnType<typeof styles>, string>

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
  observationStarted: boolean
  onStatusChange(enable: boolean): void
  teacherId: string
  time: number
}

interface State {
  currentStudent?: Student
  editedStudent?: Student
  entries: number
  entryType: number
  modal: boolean
  open: boolean
  selectedPoint: number
  setOpen: boolean
  status: Status
  studentTextFieldValue: string
}

enum Status {
  NAME_LIST = 0,
  OBSERVATION = 1,
}

/**
 * buttons for choosing the activity setting
 * @param {ActivitySettingButtonsProps} props
 * @return {ReactElement}
 */

const entryTypes: {
  [key: number]: string
} = {
  0: 'small',
  1: 'whole',
  2: 'transition',
  3: 'centers',
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

  state: Readonly<State> = {
    open: false,
    setOpen: false,
    studentTextFieldValue: '',
    status: Status.NAME_LIST,
    selectedPoint: -1,
    entryType: -1,
    entries: 0,
    modal: false,
  }

  studentNameInputFieldRef = React.createRef<HTMLInputElement>()

  resetAllStudents = (): void => {
    this.props.resetStudents()
  }

  removeStudent = (student: Student): void => {
    this.props.removeStudent(student)
  }

  handleClose = (): void => {
    this.setState({
      editedStudent: undefined,
      studentTextFieldValue: '',
      setOpen: false,
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
    this.setState({ status: Status.OBSERVATION })
    this.props.onStatusChange(true)
  }

  handleConfirmRating = (): void => {
    const {
      selectedPoint,
      currentStudent,
      entryType: entryTypeIndex,
    } = this.state

    if (selectedPoint !== -1 && currentStudent) {
      const entryType = entryTypes[entryTypeIndex] || 'none'

      const mEntry = {
        id: this.generateHashCodeOfStudent(),
        point: selectedPoint,
        entryType,
      }

      this.props.firebase.handlePushSEEachEntry(mEntry)
      this.props.handleTimerReset()
      this.handleSelectedValue(-1)

      this.props.editStudent({
        id: currentStudent.id,
        count: currentStudent.count + 1,
      })

      this.setState((previousState) => ({
        entries: previousState.entries + 1,
        modal: false,
      }))
    }
  }

  generateHashCodeOfStudent = (): number => {
    const { currentStudent } = this.state

    return currentStudent
      ? this.hashCode(currentStudent.name.concat(currentStudent.id))
      : 0
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
  hashCode = function (s: string): number {
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

  onStudentModalOpen = (student?: Student): void => {
    const { status } = this.state

    if (status === Status.NAME_LIST) {
      this.setState({
        setOpen: true,
        studentTextFieldValue: student?.name ?? '',
        editedStudent: student,
      })
    }

    if (status === Status.OBSERVATION && student) {
      this.setState(
        {
          currentStudent: student,
          modal: true,
        },
        () => {
          this.props.handleTimerStart()
        }
      )
    }
  }

  // eslint-disable-next-line require-jsdoc
  componentDidMount() {
    this.props.students.forEach(({id}) => {
      this.props.editStudent({
        id,
        count: 0,
      })
    })
  }

  /**
    * internal update callback function
    * @param {Props} _previousProps
    * @param {State} previousState
    * @return {undefined}
    */
  componentDidUpdate(_previousProps: Readonly<Props>, previousState: Readonly<State>): void {
    if (!previousState.setOpen && this.state.setOpen) {
      requestAnimationFrame(() => {
        this.studentNameInputFieldRef.current?.focus()
      })
    }
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props

    return (
      <Grid
        container
        alignItems="stretch"
        justify="center"
        direction="column"
      >
        <SelectActivityModal
          entryType={this.state.entryType}
          onActivitySettingChange={(activitySetting: number): void => {
            this.setState({ entryType: activitySetting })
          }}
          open={this.state.entryType === -1 && this.state.status === Status.OBSERVATION}
        />
        <StudentRatingModal
          confirmRatingDisabled={this.state.selectedPoint === -1}
          countdownTime={this.props.time}
          displayedStudentName={this.state.currentStudent?.name ?? null}
          fadeInActive={this.props.background}
          observeLabelPrefix={this.props.time !== 0 ? 'Please observe ' : 'Now rate '}
          onCloseClick={(): void => {
            this.setState({ modal: false })
            this.props.handleTimerReset()
          }}
          onConfirmRating={(): void => {
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
          onSelectRating={this.handleSelectedValue}
          open={this.state.modal && this.state.status === Status.OBSERVATION}
          selectedRating={this.state.selectedPoint} 
        />
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
            </DialogContentText>
            <TextField
              inputRef={this.studentNameInputFieldRef}
              id="name-filled"
              label="Student Name"
              variant="outlined"
              color="secondary"
              fullWidth
              value={this.state.studentTextFieldValue}
              onChange={this.handleStudentTextFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(): void => this.handleClose()} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={(): void => {
                const { editedStudent, studentTextFieldValue } = this.state
                const name = studentTextFieldValue.toString()

                if (editedStudent) {
                  this.props.editStudent({ id: editedStudent.id, name })
                } else {
                  this.props.addStudent({ name, count: 0 })
                }

                this.handleClose()
              }}
              color="secondary"
              autoFocus
            >
              {this.state.editedStudent ? 'Edit' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.status === Status.NAME_LIST ? (
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
                onClick={(): void => this.onStudentModalOpen()}
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
        <div className={classes.studentCards}>
          {this.props.students.map((student: Student) => (
            <Card
              key={student.id}
              elevation={4}
              onClick={(): void => {
                this.onStudentModalOpen(student)
              }}
            >
              <CardActionArea>
                <CardContent>
                  <div
                    className={classes.cardRow}
                  >
                    <div>
                      <Typography noWrap variant="subtitle2">
                        {student.name}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="subtitle2">
                        {student.count}
                      </Typography>
                    </div>
                    {!this.props.observationStarted && (
                      <div>
                        <Typography variant="subtitle2">
                          <IconButton
                            style={{ padding: '0' }}
                            onClick={(): void => {
                              this.onStudentModalOpen(student)
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Typography>
                      </div>
                    )}
                    {!this.props.observationStarted && (
                      <div>
                        <Typography variant="subtitle2">
                          <IconButton
                            style={{ padding: '0' }}
                            onClick={(event: SyntheticEvent): void => {
                              event.preventDefault()
                              event.stopPropagation()
                              this.removeStudent(student)
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Typography>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
          {this.state.status === Status.OBSERVATION && (
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
                onClick={(): void => this.onStudentModalOpen()}
              >
                <AddIcon />
              </Fab>
            </Grid>
          )}
        </div>
        {this.state.status === Status.NAME_LIST ? (
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
              disabled={this.props.students.length === 0}
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

const mapState = (state: RootState) => ({
  students: state.studentsState.students,
})
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
