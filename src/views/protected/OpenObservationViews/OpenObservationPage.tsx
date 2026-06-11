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

interface State {
  loadingTeachers: boolean,
  teachers: Types.Teacher[],
  selectedTeacherId: string,
  selectedTypeCode: string,
  error: string
}

class OpenObservationPage extends React.Component<Props, State> {
  static contextType = FirebaseContext

  constructor(props: Props) {
    super(props)
    this.state = {
      loadingTeachers: true,
      teachers: [],
      selectedTeacherId: '',
      selectedTypeCode: '',
      error: ''
    }
  }

  componentDidMount(): void {
    this.loadTeachers()
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
          teachers: teachers.filter((teacher): teacher is Types.Teacher => Boolean(teacher) && Boolean(teacher.id) && !teacher.archived),
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
        onChange={(event): void => this.setState({ selectedTeacherId: event.target.value })}
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
        onChange={(event): void => this.setState({ selectedTypeCode: event.target.value })}
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
                  data-testid="open-observation-start"
                >
                  Start open observation
                </Button>
              </div>
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
