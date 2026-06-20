import * as React from 'react'
import * as PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import Firebase from '../../../components/Firebase'
import { OpenObservationDoc, OpenObservationNote } from '../../../components/OpenObservationComponents/openObservationSchema'
import {
  analyzeOpenObservationNotes,
  OpenObservationAnalysis,
  OpenObservationEvidence,
  OpenObservationOtherTheme,
  OpenObservationPracticeAlignment
} from '../../../components/OpenObservationComponents/openObservationAnalysis'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
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
  analysisSummary: {
    marginTop: '0.5rem',
    marginBottom: '1rem'
  },
  analysisIntro: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    lineHeight: 1.5
  },
  analysisDisclaimer: {
    display: 'block',
    marginTop: '0.25rem',
    marginBottom: '0.5rem',
    lineHeight: 1.4
  },
  practiceBlock: {
    border: '1px solid #e0e0e0',
    borderLeftWidth: 6,
    borderRadius: 4,
    padding: '1rem',
    marginTop: '0.75rem',
    backgroundColor: '#ffffff'
  },
  practiceHeader: {
    marginBottom: '0.5rem'
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
    marginBottom: '0.75rem'
  },
  evidenceRow: {
    padding: '0.75rem 0',
    borderTop: '1px solid #eeeeee'
  },
  evidenceText: {
    lineHeight: 1.45
  },
  signalText: {
    marginTop: '0.35rem'
  },
  confidenceChip: {
    fontWeight: 600
  },
  otherThemeBlock: {
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    padding: '1rem',
    marginTop: '0.75rem',
    backgroundColor: '#ffffff'
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
  analysisSummary: string,
  analysisIntro: string,
  analysisDisclaimer: string,
  practiceBlock: string,
  practiceHeader: string,
  chipRow: string,
  evidenceRow: string,
  evidenceText: string,
  signalText: string,
  confidenceChip: string,
  otherThemeBlock: string,
  noteRow: string
}

interface Props {
  classes: Style,
  match: {
    params: {
      observationId?: string
    }
  }
}

interface State {
  loading: boolean,
  observation: (OpenObservationDoc & { id: string }) | null,
  error: string
}

class OpenObservationResultsPage extends React.Component<Props, State> {
  static contextType = FirebaseContext

  state: State = {
    loading: true,
    observation: null,
    error: ''
  }

  componentDidMount(): void {
    this.loadObservation()
  }

  loadObservation = (): void => {
    const firebase = this.context as Firebase
    const observationId = this.props.match.params.observationId
    if (!observationId) {
      this.setState({ loading: false, error: 'Missing Open Observation id.' })
      return
    }

    firebase.getOpenObservation(observationId)
      .then(observation => {
        this.setState({
          loading: false,
          observation,
          error: observation ? '' : 'Open Observation was not found.'
        })
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Unable to load Open Observation results.'
        })
      })
  }

  asDate = (value: any): Date | null => {
    if (!value) return null
    if (value instanceof Date) return value
    if (value.toDate) return value.toDate()
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }

  formatDate = (value: any): string => {
    const date = this.asDate(value)
    return date ? date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '--'
  }

  formatElapsed = (): string => {
    const observation = this.state.observation
    if (!observation) return '00:00'
    const start = this.asDate(observation.start)
    const end = this.asDate(observation.end)
    if (!start || !end) return '00:00'
    const elapsedSeconds = Math.max(0, Math.round((end.getTime() - start.getTime()) / 1000))
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0')
    return minutes + ':' + seconds
  }

  chipTextColor = (backgroundColor: string): string => {
    return backgroundColor === '#ffd300' ? '#222222' : '#ffffff'
  }

  confidenceColor = (confidence: string): string => {
    if (confidence === 'Strong') return '#1b5e20'
    if (confidence === 'Moderate') return '#795548'
    return '#616161'
  }

  renderSignals = (matchedTerms: string[]): React.ReactNode => {
    if (!matchedTerms.length) return null
    return (
      <Typography variant="caption" color="textSecondary" className={this.props.classes.signalText}>
        Signals: {matchedTerms.slice(0, 6).join(', ')}
      </Typography>
    )
  }

  renderEvidence = (evidence: OpenObservationEvidence[]): React.ReactNode => {
    return evidence.map(item => (
      <Grid container spacing={2} alignItems="flex-start" key={item.noteId + item.themes.join('-')} className={this.props.classes.evidenceRow}>
        <Grid item xs={12} sm={3}>
          <Typography color="textSecondary">{this.formatDate(item.wallClockAt)}</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography className={this.props.classes.evidenceText}>{item.text}</Typography>
          {this.renderSignals(item.matchedTerms)}
        </Grid>
      </Grid>
    ))
  }

  renderPracticeAlignment = (alignment: OpenObservationPracticeAlignment): React.ReactNode => {
    const color = alignment.color
    return (
      <div
        key={alignment.practiceCode}
        className={this.props.classes.practiceBlock}
        style={{ borderLeftColor: color }}
        data-testid="open-observation-magic9-practice"
      >
        <Grid container justify="space-between" alignItems="center" spacing={1} className={this.props.classes.practiceHeader}>
          <Grid item>
            <Typography variant="subtitle1">{alignment.practiceName}</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Chip
                  size="small"
                  label={alignment.confidence + ' confidence'}
                  className={this.props.classes.confidenceChip}
                  style={{ backgroundColor: this.confidenceColor(alignment.confidence), color: '#ffffff' }}
                  data-testid="open-observation-analysis-confidence"
                />
              </Grid>
              <Grid item>
                <Typography color="textSecondary">{alignment.evidence.length} note{alignment.evidence.length === 1 ? '' : 's'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {alignment.themes.length > 0 ? (
          <div className={this.props.classes.chipRow}>
            {alignment.themes.map(theme => (
              <Chip
                key={theme}
                size="small"
                label={theme}
                style={{ backgroundColor: color, color: this.chipTextColor(color) }}
              />
            ))}
          </div>
        ) : null}
        {this.renderEvidence(alignment.evidence)}
      </div>
    )
  }

  renderOtherTheme = (theme: OpenObservationOtherTheme): React.ReactNode => {
    return (
      <div key={theme.theme} className={this.props.classes.otherThemeBlock} data-testid="open-observation-other-theme">
        <Grid container justify="space-between" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="subtitle1">{theme.theme}</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Chip
                  size="small"
                  label={theme.confidence + ' confidence'}
                  className={this.props.classes.confidenceChip}
                  style={{ backgroundColor: this.confidenceColor(theme.confidence), color: '#ffffff' }}
                />
              </Grid>
              <Grid item>
                <Typography color="textSecondary">{theme.noteCount} note{theme.noteCount === 1 ? '' : 's'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.renderEvidence(theme.evidence)}
      </div>
    )
  }

  renderAnalysis = (analysis: OpenObservationAnalysis): React.ReactNode => {
    return (
      <div className={this.props.classes.section} data-testid="open-observation-magic9-alignment">
        <Typography variant="h6">Magic 9 Alignment</Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          className={this.props.classes.analysisDisclaimer}
          data-testid="open-observation-analysis-disclaimer"
        >
          These alignments are generated automatically by matching keywords in the notes against the Magic 9 practice areas. They are a starting point to review against the full notes, not an AI analysis or a formal score.
        </Typography>
        <Typography className={this.props.classes.analysisIntro}>
          {analysis.executiveSummary}
        </Typography>
        <Typography color="textSecondary" className={this.props.classes.analysisSummary}>
          {analysis.alignedNoteCount} of {analysis.noteCount} note{analysis.noteCount === 1 ? '' : 's'} include evidence linked to Magic 9 practice areas.
          {analysis.notesWithOtherThemesCount > 0 ? ' ' + analysis.notesWithOtherThemesCount + ' note' + (analysis.notesWithOtherThemesCount === 1 ? '' : 's') + ' also ' + (analysis.notesWithOtherThemesCount === 1 ? 'includes' : 'include') + ' non-Magic 9 context themes.' : ''}
        </Typography>
        {analysis.practiceAlignments.length > 0 ? (
          analysis.practiceAlignments.map(this.renderPracticeAlignment)
        ) : (
          <Typography color="textSecondary">No Magic 9 practice alignment was identified from these notes.</Typography>
        )}
        <Divider className={this.props.classes.section} />
        <div className={this.props.classes.section} data-testid="open-observation-other-themes">
          <Typography variant="h6">Other Themes</Typography>
          {analysis.otherThemes.length > 0 ? (
            analysis.otherThemes.map(this.renderOtherTheme)
          ) : (
            <Typography color="textSecondary" className={this.props.classes.analysisSummary}>
              No unaligned themes were identified.
            </Typography>
          )}
        </div>
      </div>
    )
  }

  renderNotes(notes: OpenObservationNote[]): React.ReactNode {
    if (!notes.length) {
      return <Typography color="textSecondary">No notes were recorded.</Typography>
    }

    return notes.map(note => (
      <Grid container spacing={2} alignItems="center" key={note.id} className={this.props.classes.noteRow}>
        <Grid item xs={12} sm={3}>
          <Typography color="textSecondary">{this.formatDate(note.wallClockAt)}</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography>{note.text}</Typography>
        </Grid>
      </Grid>
    ))
  }

  render(): React.ReactNode {
    const { classes } = this.props
    const firebase = this.context as Firebase
    const { loading, observation, error } = this.state
    const coachSummary = observation && observation.snapshot ? observation.snapshot.coachSummary : ''
    const analysis = observation ? analyzeOpenObservationNotes(observation.notes || []) : null

    return (
      <div className={classes.root}>
        <AppBar firebase={firebase} />
        <div className={classes.content}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" style={{ fontFamily: 'Arimo' }}>Open Observation Results</Typography>
              {loading ? (
                <Grid container alignItems="center" spacing={1} className={classes.section}>
                  <Grid item><CircularProgress size={20} /></Grid>
                  <Grid item><Typography>Loading results...</Typography></Grid>
                </Grid>
              ) : null}
              {error ? <Typography color="error" className={classes.section}>{error}</Typography> : null}
              {observation ? (
                <div className={classes.section}>
                  <Typography># of notes taken: {(observation.notes || []).length}</Typography>
                  <Typography>Time elapsed: {this.formatElapsed()}</Typography>
                  {coachSummary ? (
                    <Typography className={classes.section}>Coach summary: {coachSummary}</Typography>
                  ) : (
                    <Typography color="textSecondary" className={classes.section}>No coach summary recorded.</Typography>
                  )}
                  {analysis ? this.renderAnalysis(analysis) : null}
                  <div className={classes.section}>
                    <Typography variant="h6">Notes</Typography>
                    {this.renderNotes(observation.notes || [])}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

OpenObservationResultsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles)(OpenObservationResultsPage)
