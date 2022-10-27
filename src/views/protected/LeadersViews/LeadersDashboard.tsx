import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TrainingIcon from "@material-ui/icons/School";
import ObserveIcon from "@material-ui/icons/Visibility";
import PeopleIcon from "@material-ui/icons/People";
import ResultsIcon from "@material-ui/icons/PieChart";
import ActionPlansIcon from "@material-ui/icons/CastForEducation";
import ConferencePlansIcon from "@material-ui/icons/ListAlt";
import Assignment from '@material-ui/icons/Assignment';
import TeacherModal from "../HomeViews/TeacherModal";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif';
import { coachLoaded, Role } from '../../../state/actions/coach'
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as H from 'history';
import Firebase from '../../../components/Firebase'

import UsersIcon from '../../../assets/icons/UsersIcon.png';
import ReportsIcon from '../../../assets/icons/ReportsIcon.png';

const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  grow: {
    flexGrow: 1
  },
  card: {
    maxHeight: "90%",
    flex: 1,
    marginTop: '1em',
    marginBottom: '1em',
    marginLeft: '2em',
    marginRight: '2em'
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  image: {
    height: "12vh",
    width: "12vw"
  },
  buttonGrid: {
    height: '30vh'
  },
  landscape: {
    width: '100%'
  },
  portrait: {
    display: 'none'
  },
  helpButtons: {
    fontSize: '1em'
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation: portrait)': {
    portrait: {
      display: 'flex',
      justifyContent: 'center'
    },
    landscape: {
      display: 'none'
    },
    helpButtons: {
      fontSize: '1.5em'
    },
  }
};

interface Style {
  root: string,
  grow: string,
  card: string,
  title: string,
  pos: string,
  image: string,
  buttonGrid: string,
  portrait: string,
  landscape: string,
  helpButtons: string
}

interface Props {
  classes: Style,
  coachName: string,
  getCoach(name: string): void,
  history: H.History
}

interface State {
  teacherModal: boolean,
  type: string,
  coachName: string
}

/**
 * home page
 * @class HomePage
 */
class LeadersDashboard extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      teacherModal: false,
      type: "",
      coachName: ""
    }
  }

  /**
   * @param {string} type
   */
  showTeacherModal = (type: string): void => {
    this.setState({ teacherModal: true, type: type });
  };

  handleClose = (): void => {
    this.setState({
      teacherModal: false,
      type: ""
    });
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    if (!this.props.coachName) {
      firebase.getCoachFirstName().then((name: string): void => {
        this.props.getCoach(name);
      })
    }
    // firebase.handleFetchTrainingStatus();
    // firebase.handleFetchQuestions("transition");
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      grow: PropTypes.string,
      card: PropTypes.string,
      title: PropTypes.string,
      pos: PropTypes.string,
      image: PropTypes.string,
      buttonGrid: PropTypes.string,
      portrait: PropTypes.string,
      landscape: PropTypes.string,
      helpButtons: PropTypes.string
    }).isRequired,
    coachName: PropTypes.string.isRequired,
    getCoach: PropTypes.func.isRequired,
    userRole: PropTypes.string,
    history: ReactRouterPropTypes.history
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes, userRole, coachName } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase} noBack={true} />}
        </FirebaseContext.Consumer>
        {coachName ? (
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            style={{ flexGrow: 1}}
          >
            <Grid item style={{height: '15vh'}}>
              <Grid container direction="row" justify="center" alignItems="center" style={{height: '100%'}}>
                <Grid item>
                <Typography variant="h3" align={"center"} style={{fontFamily: 'Arimo', verticalAlign: 'center'}}>
                  Welcome, {coachName}!
                </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.landscape}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="space-around"
                className={classes.buttonGrid}
              >

                {
                /*
                 * 'Explore CHALK Classroom Practices' Card
                 */
                }
                <Card
                  className={classes.card}
                  onClick={(): void =>
                    this.props.history.push({
                      pathname: "/LeadersClassroomPractices",
                      // state: { type: "Training" }
                    })
                  }
                >
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justify="flex-start"
                    >
                      <Grid item>
                        <TrainingIcon style={{fill: '#6f39c4', width: '12vw', height: '12vh'}} />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="h2" align="center" style={{fontFamily: 'Arimo'}}>
                          Explore CHALK
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {
                /*
                 * 'Observe' Card
                 */
                }
                <Card
                  className={classes.card}
                  onClick={(): void => this.showTeacherModal("Observe")}
                >
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justify="flex-start"
                    >
                      <Grid item>
                        <ObserveIcon style={{ fill: "#094492", width: '12vw', height: '12vh' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                          Observe
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {
                /*
                 * 'My Programs' Card
                 */
                }
                {/* <Card
                  className={classes.card}
                  onClick={(): void =>
                    this.props.history.push({
                      pathname: "/MyPrograms",
                      // state: { type: "Training" }
                    })
                  }
                >
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justify="flex-start"
                    >
                      <Grid item>
                        <Assignment style={{ fill: "#4fd9b3", width: '12vw', height: '12vh' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                          My Programs
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

              </Grid>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="space-around"
                className={classes.buttonGrid}
              > */}

                {
                /*
                 * 'Users' Card
                 */
                }
                <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justify="flex-start"
                      onClick={(): void => this.props.history.push("/LeadersUsers")}
                    >
                      <Grid item>
                        <img src={UsersIcon} style={{ fill: "#094492", width: '6vw', minWidth: '85px', height: '10vh', paddingBottom:'1vh', paddingTop:'1vh' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                          Users
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {
                /*
                 * 'Reports' Card
                 */
                }

                {[Role.ADMIN, Role.COACH, Role.PROGRAMLEADER, Role.SITELEADER].find(r => r === userRole) ? <Card className={classes.card}>
                  <CardContent>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justify="flex-start"
                      onClick={(): void => this.props.history.push("/Reports")}
                    >
                      <Grid item>
                        <img src={ReportsIcon} style={{ fill: "#094492", width: '6vw', minWidth: '85px', height: '10vh', paddingBottom:'1vh', paddingTop:'1vh' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                          Reports
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card> : null}

              </Grid>
            </Grid>

            {
            /*
             * Layout if the device is in portrait mode
             */
            }
            <div className={classes.portrait} style={{width: '100%'}}>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justify="space-around"
                  // className={classes.buttonGrid}
                  style={{width: '100%'}}
                >

                  <Grid item xs={6}>
                    <Card
                      className={classes.card}
                      onClick={(): void =>
                        this.props.history.push({
                          pathname: "/LeadersClassroomPractices",
                          state: { type: "LeadersClassroomPractices" }
                        })
                      }
                    >
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                        >
                          <Grid item>
                            <TrainingIcon style={{fill: '#6f39c4', width: '12vw', height: '12vh'}} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                              Explore CHALK
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      className={classes.card}
                      onClick={(): void => this.showTeacherModal("Observe")}
                    >
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                        >
                          <Grid item>
                            <ObserveIcon style={{ fill: "#094492", width: '12vw', height: '12vh' }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                              Observe
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* <Grid item xs={4}>
                    <Card
                      className={classes.card}
                      onClick={(): void =>
                        this.props.history.push({
                          pathname: "/MyPrograms",
                          state: { type: "MyPrograms" }
                        })
                      }
                    >
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                        >
                          <Grid item>
                            <Assignment style={{ fill: "#4fd9b3", width: '12vw', height: '12vh' }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                              My Programs
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid> */}

                  <Grid item xs={6}>
                    <Card
                      className={classes.card}
                      onClick={(): void =>
                        this.props.history.push({
                          pathname: "/LeadersUsers",
                          state: { type: "LeadersUsers" }
                        })
                      }
                    >
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                        >
                          <Grid item>
                            <img src={UsersIcon} style={{width: '12vw', paddingBottom:'2vh', paddingTop:'2vh'}} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                              Users
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    {[Role.ADMIN, Role.COACH, Role.PROGRAMLEADER, Role.SITELEADER].find(r => userRole === r) ? <Card className={classes.card}>
                      <CardContent>
                        <Grid
                          container
                          alignItems="center"
                          direction="column"
                          justify="flex-start"
                          onClick={(): void =>
                            this.props.history.push({
                              pathname: "/Reports",
                              state: { type: "Reports" }
                            })
                          }
                        >
                          <Grid item>
                            <img src={ReportsIcon} style={{width: '12vw', paddingBottom:'2vh', paddingTop:'2vh'}} />
                          </Grid>
                          <Grid item>
                            <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                              Reports
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card> : null }
                  </Grid>

                </Grid>
              </Grid>
            </div>
            <Grid
              container
              alignItems="flex-end"
              direction="row"
              justify="center"
              style={{height: '14vh'}}
            >
              <Grid item xs={7} style={{paddingBottom: '1em', paddingTop: '1em'}}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item xs={5}>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                      <Button color="primary" className={classes.helpButtons} style={{paddingRight: '2em'}}
                        onClick={(): void => this.props.history.push("/MyAccount")}
                      >
                        MY ACCOUNT
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Divider variant="fullWidth" style={{height: '2em', borderLeft: '3px solid #d3d3d3', borderRadius: '0.5em'}} />
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                      <Button color="primary" className={classes.helpButtons} style={{paddingLeft: '2em'}}>
                        HELP
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{height: "85vh"}}
          >
            <img src={CHALKLogoGIF} alt="Loading" width="80%" />
          </Grid>
        )}
        {this.state.teacherModal ? (
          <FirebaseContext.Consumer>
            {(firebase: {
              getTeacherList(): Promise<Types.Teacher[]>
            }): React.ReactNode => (
              <TeacherModal
                handleClose={this.handleClose}
                firebase={firebase}
                type={this.state.type}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {coachName: string, userRole: Role} => {
  return {
    coachName: state.coachState.coachName,
    userRole: state.coachState.role
  };
};

LeadersDashboard.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {getCoach: coachLoaded})(LeadersDashboard));
