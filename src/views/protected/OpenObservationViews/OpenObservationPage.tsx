import * as React from 'react'
import * as PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import Firebase from '../../../components/Firebase'
import * as Types from '../../../constants/Types'
import { OpenObservationNote, deserializeOpenObservationNotes, serializeOpenObservationNotes } from '../../../components/OpenObservationComponents/openObservationSchema'
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
  },
  noteRow: {
    borderBottom: '1px solid #e0e0e0',
    padding: '0.75rem 0'
  }
}

interface Style {
  root: string,
  content: string,
  card: string,
  section: string,
  noteRow: string
}

interface Props {
  classes: Style
}

const OPEN_OBSERVATION_DRAFT_KEY = 'chalkOpenObservationDraft'

interface State {
  loadingTeachers: boolean,
  teachers: Types.Teacher[],
  selectedTeacherId: string,
  notes: OpenObservationNote[],
  noteText: string,
  elapsedSeconds: number,
  observing: boolean,
  saving: boolean,
  error: string,
  coachSummary: string,
  snapshotVisible: boolean
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
      notes: [],
      noteText: '',
      elapsedSeconds: 0,
      observing: false,
      saving: false,
      error: '',
      coachSummary: '',
      snapshotVisible: false
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
      const notes = deserializeOpenObservationNotes(draft.notes)

      this.setState({
        selectedTeacherId: typeof draft.selectedTeacherId === 'string' ? draft.selectedTeacherId : '',
        notes,
        noteText: typeof draft.noteText === 'string' ? draft.noteText : '',
        elapsedSeconds: typeof draft.elapsedSeconds === 'number' ? draft.elapsedSeconds : 0,
        observing: Boolean(draft.observing),
        coachSummary: typeof draft.coachSummary === 'string' ? draft.coachSummary : '',
        snapshotVisible: Boolean(draft.snapshotVisible)
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
      notes: serializeOpenObservationNotes(notes),
      noteText,
      elapsedSeconds,
      observing,
      coachSummary,
      snapshotVisible
    } = this.state

    localStorage.setItem(OPEN_OBSERVATION_DRAFT_KEY, JSON.stringify({
      selectedTeacherId,
      notes,
      noteText,
      elapsedSeconds,
      observing,
      coachSummary,
      snapshotVisible
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
    return minutes + ':' + seconds
  }

  formatNoteTime = (time: Date): string => {
    if (Number.isNaN(time.getTime())) {
      return '--:--'
    }
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  updateTeacher = (selectedTeacherId: string): void => {
    this.setState({ selectedTeacherId }, this.persistDraft)
  }

  updateNoteText = (noteText: string): void => {
    this.setState({ noteText }, this.persistDraft)
  }

  updateCoachSummary = (coachSummary: string): void => {
    this.setState({ coachSummary }, this.persistDraft)
  }

  startObservation = (): void => {
    this.setState({ observing: true, snapshotVisible: false, error: '' }, () => {
      this.persistDraft()
      this.startTimer()
    })
  }

  addNote = (): void => {
    const text = this.state.noteText.trim()
    if (!text) return

    const now = new Date()
    const note: OpenObservationNote = {
      id: 'note-' + now.getTime(),
      wallClockAt: now,
      text,
      editedAt: now
    }

    this.setState(previousState => ({
      notes: [...previousState.notes, note],
      noteText: ''
    }), this.persistDraft)
  }

  updateNote = (id: string, text: string): void => {
    this.setState(previousState => ({
      notes: previousState.notes.map(note => note.id === id ? {
        ...note,
        text,
        editedAt: new Date()
      } : note)
    }), this.persistDraft)
  }

  endObservation = (): void => {
    this.stopTimer()
    this.setState({ observing: false, snapshotVisible: true }, this.persistDraft)
  }

  discardObservation = (): void => {
    this.stopTimer()
    this.clearDraft()
    this.setState({
      selectedTeacherId: '',
      notes: [],
      noteText: '',
      elapsedSeconds: 0,
      observing: false,
      saving: false,
      error: '',
      coachSummary: '',
      snapshotVisible: false
    })
  }

  loadTeachers = (): void => {
    const firebase = this.context as Firebase
    firebase.getOpenObservationTeacherList()
      .then((teachers: Types.Teacher[] = []) => {
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
            <div>
              <Typography>{teacher.firstName} {teacher.lastName}</Typography>
              <Typography variant="caption" color="textSecondary" display="block" className="open-obs-teacher-school">
                School: {teacher.school || '-'}
              </Typography>
              <Typography variant="caption" color="textSecondary" display="block" className="open-obs-teacher-classroom">
                Classroom: {teacher.classroom || '-'}
              </Typography>
            </div>
          </MenuItem>
        ))}
      </TextField>
    )
  }

  renderNotes(): React.ReactNode {
    const { classes } = this.props
    if (this.state.notes.length === 0) {
      return <Typography color="textSecondary">No notes yet.</Typography>
    }

    return this.state.notes.map(note => (
      <Grid container spacing={2} alignItems="center" key={note.id} className={classes.noteRow} data-testid="open-observation-note-row">
        <Grid item xs={12} sm={2}>
          <Typography color="textSecondary">{this.formatNoteTime(note.wallClockAt)}</Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            multiline
            value={note.text}
            onChange={(event): void => this.updateNote(note.id, event.target.value)}
            inputProps={{ 'data-testid': 'open-observation-note-text' }}
          />
        </Grid>
      </Grid>
    ))
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
            <Button
              color="primary"
              variant="contained"
              onClick={this.endObservation}
              style={{ marginLeft: '0.5rem' }}
              data-testid="open-observation-end"
            >
              End observation
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              label="Add a timestamped note"
              value={this.state.noteText}
              onChange={(event): void => this.updateNoteText(event.target.value)}
              inputProps={{ 'data-testid': 'open-observation-note-input' }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              disabled={!this.state.noteText.trim()}
              onClick={this.addNote}
              data-testid="open-observation-add-note"
            >
              Add note
            </Button>
          </Grid>
        </Grid>
        <div className={this.props.classes.section}>{this.renderNotes()}</div>
      </div>
    )
  }

  renderSnapshot(): React.ReactNode {
    if (!this.state.snapshotVisible) return null

    return (
      <div className={this.props.classes.section} data-testid="open-observation-snapshot">
        <Typography variant="h6">Observation snapshot</Typography>
        <Typography># of notes taken: <span data-testid="open-observation-note-count">{this.state.notes.length}</span></Typography>
        <Typography>Time elapsed: <span data-testid="open-observation-elapsed-summary">{this.formatElapsed()}</span></Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Coach summary (optional)"
          value={this.state.coachSummary}
          onChange={(event): void => this.updateCoachSummary(event.target.value)}
          inputProps={{ 'data-testid': 'open-observation-coach-summary' }}
          style={{ marginTop: '1rem' }}
        />
      </div>
    )
  }

  render(): React.ReactNode {
    const { classes } = this.props
    const firebase = this.context as Firebase
    const canStart = Boolean(this.state.selectedTeacherId && !this.state.observing)

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
                Choose a teacher, capture timestamped notes as classroom activity changes, then review the snapshot.
              </Typography>
              {this.state.error ? (
                <Typography color="error" className={classes.section}>{this.state.error}</Typography>
              ) : null}
              <div className={classes.section}>{this.renderTeacherPicker()}</div>
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
              {this.renderSnapshot()}
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
