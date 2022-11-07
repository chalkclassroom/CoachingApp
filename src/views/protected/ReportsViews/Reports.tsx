import * as React from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FirebaseContext from '../../../components/Firebase/FirebaseContext'
import { coachLoaded, Role } from '../../../state/actions/coach'
import { connect } from 'react-redux'
import * as Types from '../../../constants/Types'
import ReactRouterPropTypes from 'react-router-prop-types'
import * as H from 'history'

import Sidebar from './Sidebar'

const styles: object = {
  card: {
    minHeight: '90%',
    flex: 1,
    marginTop: '1em',
    marginBottom: '1em',
    marginLeft: '2em',
    marginRight: '2em',
  },
}

interface Style {
  card: string
}

interface Props {
  classes: Style
  coachName: string
  getCoach(name: string): void
  history: H.History
}

interface State {
  teacherModal: boolean
  type: string
  coachName: string
}

/**
 * reports
 * @class Reports
 */
class Reports extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props)
  }

  /** lifecycle method invoked after component mounts */
  //   componentDidMount(): void {
  //     const firebase = this.context;
  //     if (!this.props.coachName) {
  //       firebase.getCoachFirstName().then((name: string): void => {
  //         this.props.getCoach(name);
  //       })
  //     }
  // firebase.handleFetchTrainingStatus();
  // firebase.handleFetchQuestions("transition");
  //   }

  static propTypes = {
    classes: PropTypes.exact({
      card: PropTypes.string,
    }).isRequired,
    coachName: PropTypes.string.isRequired,
    getCoach: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    history: ReactRouterPropTypes.history,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes, coachName } = this.props
    return (
      <>
        <div>
          <Grid container>
            <Grid container justifyContent="space-evenly">
              <Grid item xs={5}>
                <Card className={classes.card}>
                  <CardContent style={{ padding: '1em 0 1em 0' }}>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justifyContent="flex-end"
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          component="h2"
                          style={{ fontFamily: 'Arimo' }}
                        >
                          Teacher Profile
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          onClick={() =>
                            this.props.history.push('/TeacherProfile')
                          }
                          variant="contained"
                          color="primary"
                        >
                          Go
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ margin: '0' }}>
                          <hr style={{ width: '70vw' }} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          style={{ margin: '0 .4em 0 .4em' }}
                        >
                          The Teacher Profile shows average teacher practice
                          over time.
                          <br />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card className={classes.card}>
                  <CardContent style={{ padding: '1em 0 1em 0' }}>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justifyContent="flex-end"
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          component="h2"
                          style={{ fontFamily: 'Arimo' }}
                        >
                          Site Profile
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          onClick={() =>
                            this.props.history.push('/SiteProfile')
                          }
                          variant="contained"
                          color="primary"
                        >
                          Go
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ margin: '0' }}>
                          <hr style={{ width: '70vw' }} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          style={{ margin: '0 .4em 0 .4em' }}
                        >
                          The Site Profile shows average practice of all
                          teachers at one site within a selected timeframe.
                          <br />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-evenly">
              <Grid item xs={5}>
                <Card className={classes.card}>
                  <CardContent style={{ padding: '1em 0 1em 0' }}>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justifyContent="flex-end"
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          component="h2"
                          style={{ fontFamily: 'Arimo' }}
                        >
                          Coach Profile
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          onClick={() =>
                            this.props.history.push('/CoachProfile')
                          }
                          variant="contained"
                          color="primary"
                        >
                          Go
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ margin: '0' }}>
                          <hr style={{ width: '70vw' }} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          style={{ margin: '0 .4em 0 .4em' }}
                        >
                          The Coach Profile enables administrators to generate
                          an Excel file with coach activities completed via the
                          CHALK website.
                          <br />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={5}>
                <Card className={classes.card}>
                  <CardContent style={{ padding: '1em 0 1em 0' }}>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justifyContent="flex-end"
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          component="h2"
                          style={{ fontFamily: 'Arimo' }}
                        >
                          Program Profile
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          onClick={() =>
                            this.props.history.push('/ProgramProfile')
                          }
                          variant="contained"
                          color="primary"
                        >
                          Go
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ margin: '0' }}>
                          <hr style={{ width: '70vw' }} />
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          style={{ margin: '0 .4em 0 .4em' }}
                        >
                          The Program Profile shows average practice of all
                          sites from one program within a selected timeframe.
                          <br />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }
}

const mapStateToProps = (
  state: Types.ReduxState
): { coachName: string; userRole: Role } => {
  return {
    coachName: state.coachState.coachName,
    userRole: state.coachState.role,
  }
}

Reports.contextType = FirebaseContext
export default withStyles(styles)(
  connect(mapStateToProps, { getCoach: coachLoaded })(Reports)
)
