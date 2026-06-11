import * as React from 'react'
import * as PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import Firebase from '../../../components/Firebase'
import * as Types from '../../../constants/Types'
import {
  OPEN_OBSERVATION_TYPE_OPTIONS,
  OpenObservationTypeOption
} from '../../../components/OpenObservationComponents/openObservationTypes'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core'

const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#fafafa'
  },
  content: {
    width: '90%',
    maxWidth: 960,
    margin: '2rem auto'
  },
  card: {
    borderRadius: 8
  },
  section: {
    marginTop: '1rem'
  }
}

interface Style {
  root: string,
  content: string,
  card: string,
  section: string
}

interface Props {
  classes: Style
}

const OPEN_OBSERVATION_DRAFT_KEY = 'chalkOpenObservationDraft'

interface State {
  loadingTeachers: boolean,
  teachers: Types.Teacher[],
  selectedTeacherId: string,
  selectedTypeCode: string,
  notes: string,
  elapsedSeconds: number,
  observing: boolean,
  error: string
}

class OpenObservationPage extends React.Component<Props, State> {
  static contextType = FirebaseContext
  timerId: number | null = null

  constructor(props: Props) {
    super(props)
    this.state = {
      loadingTeachers: true,
      teachers: [],
      selectedTeacherId: '',
      selectedTypeCode: '',
      notes: '',
      elapsedSeconds: 0,
      observing: false,
      error: ''
    }
  }

  componentDidMount(): void {
    this.restoreDraft()
    this.loadTeachers()
  }

  componentWillUnmount(): void {
    this.stopTimer()
  }

  restoreDraft = (): void => {
    try {
      const rawDraft = localStorage.getItem(OPEN_OBSERVATION_DRAFT_KEY)
      if (!rawDraft) return
      const draft = JSON.parse(rawDraft)
      this.setState({
        selectedTeacherId: typeof draft.selectedTeacherId === 'string' ? draft.selectedTeacherId : '',
        selectedTypeCode: typeof draft.selectedTypeCode === 'string' ? draft.selectedTypeCode : '',
        notes: typeof draft.notes === 'string' ? draft.notes : '',
        elapsedSeconds: typeof draft.elapsedSeconds === 'number' ? draft.elapsedSeconds : 0,
        observing: Boolean(draft.observing)
      }, () => {
        if (this.state.observing) {
          this.startTimer()
        }
      })
    } catch (error) {
      this.clearDraft()
    }
  }

  persistDraft = (): void => {
    const {
      selectedTeacherId,
      selectedTypeCode,
      notes,
      elapsedSeconds,
      observing
    } = this.state

    localStorage.setItem(OPEN_OBSERVATION_DRAFT_KEY, JSON.stringify({
      selectedTeacherId,
      selectedTypeCode,
      notes,
      elapsedSeconds,
      observing
    }))
  }

  clearDraft = (): void => {
    localStorage.removeItem(OPEN_OBSERVATION_DRAFT_KEY)
  }

  startTimer = (): void => {
    if (this.timerId !== null) return
    this.timerId = window.setInterval(() => {
      this.setState(previousState => ({
        elapsedSeconds: previousState.elapsedSeconds + 1
      }), this.persistDraft)
    }, 1000)
  }

  stopTimer = (): void => {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId)
      this.timerId = null
    }
  }

  formatElapsed = (): string => {
    const minutes = Math.floor(this.state.elapsedSeconds / 60).toString().padStart(2, '0')
    const seconds = (this.state.elapsedSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  updateTeacher = (selectedTeacherId: string): void => {
    this.setState({ selectedTeacherId }, this.persistDraft)
  }

  updateType = (selectedTypeCode: string): void => {
    this.setState({ selectedTypeCode }, this.persistDraft)
  }

  updateNotes = (notes: string): void => {
    this.setState({ notes }, this.persistDraft)
  }

  startObservation = (): void => {
    this.setState({ observing: true }, () => {
      this.persistDraft()
      this.startTimer()
    })
  }

  discardObservation = (): void => {
    this.stopTimer()
    this.clearDraft()
    this.setState({
      selectedTeacherId: '',
      selectedTypeCode: '',
      notes: '',
      elapsedSeconds: 0,
      observing: false
    })
  }

  loadTeachers = (): void => {
    const firebase = this.context as Firebase
    firebase.getTeacherList()
      .then(async (teacherEntries: any = []) => {
        const entries = Array.isArray(teacherEntries) ? teacherEntries : []
        const teachers = await Promise.all(entries.map((entry: Promise<Types.Teacher> | Types.Teacher) =>
          Promise.resolve(entry).catch(() => null)
        ))
        this.setState({
          loadingTeachers: false,
          teachers: teachers.filter((teacher): teacher is Types.Teacher => Boolean(teacher) && Boolean(teacher.id) && !(teacher as any).archived),
          error: ''
        })
      })
      .catch(() => {
        this.setState({
          loadingTeachers: false,
          error: 'Unable to load teachers for Open Observation.'
        })
      })
  }

  renderTeacherPicker(): React.ReactNode {
    const { loadingTeachers, teachers, selectedTeacherId } = this.state
    if (loadingTeachers) {
      return (
        <Grid container alignItems="center" spacing={1}>
          <Grid item><CircularProgress size={20} /></Grid>
          <Grid item><Typography>Loading teachers...</Typography></Grid>
        </Grid>
      )
    }

    if (teachers.length === 0) {
      return <Typography color="textSecondary">No active teachers are available for Open Observation.</Typography>
    }

    return (
      <TextField
        select
        fullWidth
        id="open-observation-teacher"
        label="Teacher"
        value={selectedTeacherId}
        onChange={(event): void => this.updateTeacher(event.target.value)}
        inputProps={{ 'data-testid': 'open-observation-teacher' }}
      >
        {teachers.map(teacher => (
          <MenuItem key={teacher.id} value={teacher.id}>
            {teacher.firstName} {teacher.lastName}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  renderTypePicker(): React.ReactNode {
    return (
      <TextField
        select
        fullWidth
        id="open-observation-type"
        label="Provisional observation type"
        value={this.state.selectedTypeCode}
        onChange={(event): void => this.updateType(event.target.value)}
        inputProps={{ 'data-testid': 'open-observation-type' }}
      >
        {OPEN_OBSERVATION_TYPE_OPTIONS.map((option: OpenObservationTypeOption) => (
          <MenuItem key={option.code} value={option.code}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )
  }

  renderObservationWorkspace(): React.ReactNode {
    return (
      <div className={this.props.classes.section}>
        <Grid container alignItems="center" justify="space-between" style={{ marginBottom: '1rem' }}>
          <Grid item>
            <Typography variant="h6">Elapsed time: <span data-testid="open-observation-timer">{this.formatElapsed()}</span></Typography>
          </Grid>
          <Grid item>
            <Button onClick={this.discardObservation} data-testid="open-observation-discard">
              Discard
            </Button>
          </Grid>
        </Grid>
        <TextField
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          label="Free-form notes"
          value={this.state.notes}
          onChange={(event): void => this.updateNotes(event.target.value)}
          inputProps={{ 'data-testid': 'open-observation-notes' }}
        />
      </div>
    )
  }

  render(): React.ReactNode {
    const { classes } = this.props
    const firebase = this.context as Firebase
    const canStart = Boolean(this.state.selectedTeacherId && this.state.selectedTypeCode)

    return (
      <div className={classes.root}>
        <AppBar firebase={firebase} />
        <div className={classes.content}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" style={{ fontFamily: 'Arimo' }}>
                Open Observation
              </Typography>
              <Typography color="textSecondary" style={{ marginTop: '0.5rem' }}>
                Choose a teacher and provisional focus area before taking free-form notes.
              </Typography>
              {this.state.error ? (
                <Typography color="error" className={classes.section}>{this.state.error}</Typography>
              ) : null}
              <div className={classes.section}>{this.renderTeacherPicker()}</div>
              <div className={classes.section}>{this.renderTypePicker()}</div>
              <div className={classes.section}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!canStart}
                  onClick={this.startObservation}
                  data-testid="open-observation-start"
                >
                  Start open observation
                </Button>
              </div>
              {this.state.observing ? this.renderObservationWorkspace() : null}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

OpenObservationPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OpenObservationPage)
