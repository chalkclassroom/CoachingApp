import * as React from 'react'
import * as PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import Firebase from '../../../components/Firebase'
import * as Types from '../../../constants/Types'
import * as H from 'history'
import { OpenObservationNote, deserializeOpenObservationNotes, serializeOpenObservationNotes } from '../../../components/OpenObservationComponents/openObservationSchema'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'

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
  classes: Style,
  history: H.History
}

const OPEN_OBSERVATION_DRAFT_KEY = 'chalkOpenObservationDraft'

interface State {
  loadingTeachers: boolean,
  teachers: Types.Teacher[],
  selectedTeacherId: string,
  notes: OpenObservationNote[],
  noteText: string,
  elapsedSeconds: number,
  observationStart: Date | null,
  observing: boolean,
  saving: boolean,
  error: string,
  coachSummary: string,
  snapshotVisible: boolean,
  editingNoteId: string | null
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
      observationStart: null,
      observing: false,
      saving: false,
      error: '',
      coachSummary: '',
      snapshotVisible: false,
      editingNoteId: null
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
      const observationStart = typeof draft.observationStart === 'string' ? new Date(draft.observationStart) : null

      this.setState({
        selectedTeacherId: typeof draft.selectedTeacherId === 'string' ? draft.selectedTeacherId : '',
        notes: deserializeOpenObservationNotes(draft.notes),
        noteText: typeof draft.noteText === 'string' ? draft.noteText : '',
        elapsedSeconds: typeof draft.elapsedSeconds === 'number' ? draft.elapsedSeconds : 0,
        observationStart: observationStart && !Number.isNaN(observationStart.getTime()) ? observationStart : null,
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
      notes,
      noteText,
      elapsedSeconds,
      observationStart,
      observing,
      coachSummary,
      snapshotVisible
    } = this.state

    localStorage.setItem(OPEN_OBSERVATION_DRAFT_KEY, JSON.stringify({
      selectedTeacherId,
      notes: serializeOpenObservationNotes(notes),
      noteText,
      elapsedSeconds,
      observationStart: observationStart ? observationStart.toISOString() : null,
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
    this.setState({ observationStart: new Date(), observing: true, snapshotVisible: false, error: '' }, () => {
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

  completeObservation = async (): Promise<void> => {
    const { selectedTeacherId, notes, coachSummary, observationStart, elapsedSeconds } = this.state
    if (!selectedTeacherId) {
      this.setState({ error: 'Choose a teacher before saving this Open Observation.' })
      return
    }
    if (notes.length === 0) {
      this.setState({ error: 'Add at least one note before saving this Open Observation.' })
      return
    }

    const firebase = this.context as Firebase
    const end = new Date()
    const start = observationStart || new Date(end.getTime() - elapsedSeconds * 1000)
    this.setState({ saving: true, error: '' })

    try {
      const observationId = await firebase.createOpenObservation({
        teacherId: selectedTeacherId,
        start,
        end,
        notes,
        coachSummary
      })
      this.clearDraft()
      this.props.history.push('/OpenObservationResults/' + observationId)
    } catch (error) {
      this.setState({
        saving: false,
        error: 'Unable to save this Open Observation. Please try again.'
      })
    }
  }

  discardObservation = (): void => {
    this.stopTimer()
    this.clearDraft()
    this.setState({
      selectedTeacherId: '',
      notes: [],
      noteText: '',
      elapsedSeconds: 0,
      observationStart: null,
      observing: false,
      saving: false,
      error: '',
      coachSummary: '',
      snapshotVisible: false,
      editingNoteId: null
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
      return <Typography color="textSecondary">No teachers are assigned to you yet — ask an admin to assign teachers.</Typography>
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

    return this.state.notes.map(note => {
      const editing = this.state.editingNoteId === note.id

      return (
        <Grid container spacing={2} alignItems="center" key={note.id} className={classes.noteRow} data-testid="open-observation-note-row">
          <Grid item xs={12} sm={2}>
            <Typography color="textSecondary">{this.formatNoteTime(note.wallClockAt)}</Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            {editing ? (
              <Grid container spacing={1} alignItems="center">
                <Grid item xs>
                  <TextField
                    fullWidth
                    multiline
                    autoFocus
                    value={note.text}
                    onChange={(event): void => this.updateNote(note.id, event.target.value)}
                    inputProps={{ 'data-testid': 'open-observation-note-text' }}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="Done editing note"
                    onClick={(): void => this.setState({ editingNoteId: null })}
                  >
                    <CheckIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={1} alignItems="center">
                <Grid item xs>
                  <Typography>{note.text}</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="Edit note"
                    data-testid="open-observation-note-edit"
                    onClick={(): void => this.setState({ editingNoteId: note.id })}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )
    })
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
        <div className={this.props.classes.section}>{this.renderNotes()}</div>
        <Grid container spacing={1} alignItems="flex-end" style={{ marginTop: '1rem' }}>
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
              aria-label="Add note"
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
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
          helperText="Use this space to record any overall reminders or impressions about the classroom that you want to consider as you review the results and plan for a coaching conversation."
          inputProps={{ 'data-testid': 'open-observation-coach-summary' }}
          style={{ marginTop: '1rem' }}
        />
        <Button
          color="primary"
          variant="contained"
          disabled={this.state.saving || this.state.notes.length === 0}
          onClick={this.completeObservation}
          data-testid="open-observation-save"
          style={{ marginTop: '1rem' }}
        >
          {this.state.saving ? 'Saving...' : 'Save observation'}
        </Button>
      </div>
    )
  }

  render(): React.ReactNode {
    const { classes } = this.props
    const firebase = this.context as Firebase
    const canStart = Boolean(this.state.selectedTeacherId && !this.state.observing && !this.state.snapshotVisible)

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
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withStyles(styles)(OpenObservationPage)
