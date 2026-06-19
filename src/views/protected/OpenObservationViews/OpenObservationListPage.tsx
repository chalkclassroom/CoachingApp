import * as React from 'react'
import * as PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import Firebase, { OpenObservationListItem } from '../../../components/Firebase'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core'
import * as H from 'history'
import ReactRouterPropTypes from 'react-router-prop-types'

const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#fafafa'
  },
  content: {
    width: '90%',
    maxWidth: 1120,
    margin: '2rem auto'
  },
  card: {
    borderRadius: 8
  },
  section: {
    marginTop: '1rem'
  },
  filters: {
    marginTop: '1.5rem',
    marginBottom: '1rem'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  tableHead: {
    backgroundColor: '#d8ecff'
  },
  row: {
    cursor: 'pointer'
  }
}

interface Style {
  root: string,
  content: string,
  card: string,
  section: string,
  filters: string,
  tableWrapper: string,
  tableHead: string,
  row: string
}

interface Props {
  classes: Style,
  history: H.History
}

interface State {
  loading: boolean,
  observations: OpenObservationListItem[],
  error: string,
  role: string,
  teacherFilter: string,
  coachFilter: string,
  dateStart: string,
  dateEnd: string
}

class OpenObservationListPage extends React.Component<Props, State> {
  static contextType = FirebaseContext

  state: State = {
    loading: true,
    observations: [],
    error: '',
    role: '',
    teacherFilter: '',
    coachFilter: '',
    dateStart: '',
    dateEnd: ''
  }

  componentDidMount(): void {
    this.loadObservations()
  }

  loadObservations = (): void => {
    const firebase = this.context as Firebase
    Promise.all([
      firebase.getUserRole(),
      firebase.getOpenObservationList()
    ])
      .then(([role, observations]) => {
        this.setState({
          loading: false,
          role: role ? String(role) : '',
          observations,
          error: ''
        })
      })
      .catch(() => {
        this.setState({
          loading: false,
          observations: [],
          error: 'Unable to load open observations.'
        })
      })
  }

  isAdmin = (): boolean => this.state.role === 'admin'

  formatDate = (value: Date | null): string => {
    return value ? value.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : '--'
  }

  normalizeDate = (value: string, endOfDay: boolean): Date | null => {
    if (!value) return null
    const date = new Date(value + 'T00:00:00')
    if (Number.isNaN(date.getTime())) return null
    if (endOfDay) {
      date.setHours(23, 59, 59, 999)
    }
    return date
  }

  handleFilterChange = (field: keyof Pick<State, 'teacherFilter' | 'coachFilter' | 'dateStart' | 'dateEnd'>) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ [field]: event.target.value } as Pick<State, keyof State>)
    }

  filteredObservations = (): OpenObservationListItem[] => {
    const teacherFilter = this.state.teacherFilter.toLowerCase().trim()
    const coachFilter = this.state.coachFilter
    const start = this.normalizeDate(this.state.dateStart, false)
    const end = this.normalizeDate(this.state.dateEnd, true)

    return this.state.observations.filter(observation => {
      if (teacherFilter && !observation.teacherName.toLowerCase().includes(teacherFilter)) {
        return false
      }
      if (coachFilter && observation.coachId !== coachFilter) {
        return false
      }
      if (start && (!observation.date || observation.date < start)) {
        return false
      }
      if (end && (!observation.date || observation.date > end)) {
        return false
      }
      return true
    })
  }

  coachOptions = (): OpenObservationListItem[] => {
    const seen: {[key: string]: boolean} = {}
    return this.state.observations.filter(observation => {
      if (!observation.coachId || seen[observation.coachId]) {
        return false
      }
      seen[observation.coachId] = true
      return true
    })
  }

  openObservation = (id: string): void => {
    this.props.history.push('/OpenObservationResults/' + id)
  }

  renderFilters(): React.ReactNode {
    return (
      <Grid container spacing={2} className={this.props.classes.filters}>
        <Grid item xs={12} sm={this.isAdmin() ? 4 : 6}>
          <TextField
            fullWidth
            label="Teacher"
            value={this.state.teacherFilter}
            onChange={this.handleFilterChange('teacherFilter')}
            inputProps={{ 'data-testid': 'open-observation-list-filter-teacher' }}
          />
        </Grid>
        {this.isAdmin() ? (
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              select
              label="Coach"
              value={this.state.coachFilter}
              onChange={this.handleFilterChange('coachFilter')}
              inputProps={{ 'data-testid': 'open-observation-list-filter-coach' }}
            >
              <MenuItem value="">All coaches</MenuItem>
              {this.coachOptions().map(coach => (
                <MenuItem key={coach.coachId} value={coach.coachId}>{coach.coachName}</MenuItem>
              ))}
            </TextField>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={this.isAdmin() ? 4 : 6} data-testid="open-observation-list-filter-date">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="From"
                type="date"
                value={this.state.dateStart}
                onChange={this.handleFilterChange('dateStart')}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'data-testid': 'open-observation-list-filter-date-start' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="To"
                type="date"
                value={this.state.dateEnd}
                onChange={this.handleFilterChange('dateEnd')}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'data-testid': 'open-observation-list-filter-date-end' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderTable(rows: OpenObservationListItem[]): React.ReactNode {
    if (!rows.length) {
      return <Typography color="textSecondary" className={this.props.classes.section}>No open observations yet.</Typography>
    }

    return (
      <div className={this.props.classes.tableWrapper}>
        <Table>
          <TableHead className={this.props.classes.tableHead}>
            <TableRow>
              <TableCell>Teacher</TableCell>
              {this.isAdmin() ? <TableCell>Coach</TableCell> : null}
              <TableCell>Date</TableCell>
              <TableCell># Notes</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                hover
                key={row.id}
                className={this.props.classes.row}
                data-testid="open-observation-list-row"
                onClick={(): void => this.openObservation(row.id)}
              >
                <TableCell>{row.teacherName}</TableCell>
                {this.isAdmin() ? <TableCell>{row.coachName}</TableCell> : null}
                <TableCell>{this.formatDate(row.date)}</TableCell>
                <TableCell>{row.noteCount}</TableCell>
                <TableCell>{row.summary || '--'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  render(): React.ReactNode {
    const { classes } = this.props
    const firebase = this.context as Firebase
    const rows = this.filteredObservations()

    return (
      <div className={classes.root}>
        <AppBar firebase={firebase} />
        <div className={classes.content}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" style={{ fontFamily: 'Arimo' }}>Open Observations</Typography>
              {this.state.loading ? (
                <Grid container alignItems="center" spacing={1} className={classes.section}>
                  <Grid item><CircularProgress size={20} /></Grid>
                  <Grid item><Typography>Loading open observations...</Typography></Grid>
                </Grid>
              ) : null}
              {this.state.error ? <Typography color="error" className={classes.section}>{this.state.error}</Typography> : null}
              {!this.state.loading && !this.state.error ? (
                <React.Fragment>
                  {this.renderFilters()}
                  {this.renderTable(rows)}
                </React.Fragment>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}

OpenObservationListPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: ReactRouterPropTypes.history.isRequired
}

export default withStyles(styles)(OpenObservationListPage)
