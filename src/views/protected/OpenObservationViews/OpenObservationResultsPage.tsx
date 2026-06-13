import * as React from 'react'
import * as PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import Firebase from '../../../components/Firebase'
import { OpenObservationDoc, OpenObservationNote } from '../../../components/OpenObservationComponents/openObservationSchema'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CircularProgress,
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
                  <Typography># of notes taken: {observation.notes.length}</Typography>
                  <Typography>Time elapsed: {this.formatElapsed()}</Typography>
                  {coachSummary ? (
                    <Typography className={classes.section}>Coach summary: {coachSummary}</Typography>
                  ) : (
                    <Typography color="textSecondary" className={classes.section}>No coach summary recorded.</Typography>
                  )}
                  <div className={classes.section}>
                    <Typography variant="h6">Notes</Typography>
                    {this.renderNotes(observation.notes)}
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
