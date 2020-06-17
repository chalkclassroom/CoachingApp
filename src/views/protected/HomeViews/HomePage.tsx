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
import TeacherModal from "./TeacherModal";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif';
import { getCoach } from '../../../state/actions/coach.ts';
import { connect } from 'react-redux';
import TeacherBarDetails from "../../../components/MathInstructionComponents/ResultsComponents/TeacherBarDetails";

interface ReduxState {
  associativeCenterState: {
    associativeCenters: Array<{
      name: string,
      count: number
    }>
  },
  associativeCountState: {
    acCount: number,
    noACCount: number,
    noOppCount: number
  },
  climateRatingsState: {
    climateRatings: Array<{
      timestamp: number,
      rating: number
    }>
  },
  climateStackState: {
    climateStack: Array<{
      observation: string,
      timestamp: number
    }>
  },
  coachState: {
    coachName: string
  },
  engagementCountState: {
    engagedCount: number,
    notEngagedCount: number
  },
  instructionStackState: {
    instructionStack: Array<{
      timestamp: number,
      observation: string
    }>
  },
  listeningCountState: {
    listeningCount: number,
    noListeningCount: number
  },
  mathCountState: {
    mathCount: number,
    noMathCount: number
  },
  mathCentersState: {
    mathCenters: Array<{
      name: string,
      count: number
    }>
  },
  sequentialCenterState: {
    sequentialCenters: Array<{
      name: string,
      count: number
    }>
  },
  sequentialCountState: {
    noSequentialCount: number,
    sequentialCount: number
  },
  sessionTimeState: {
    endTime: number,
    startTime: number
  },
  teacherListState: {
    teachers: Array<Teacher>
  },
  teacherSelectedState: {
    teacher: Teacher
  },
  transitionLogState: {
    transitionStack: Array<{
      duration: string,
      end: string,
      start: string,
      transitionType: string
    }>
  },
  transitionTimeState: {
    transitionTime: number
  },
  transitionTypeState: {
    transitionType: string
  }
}

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
  }
};

interface Style {
  root: string,
  grow: string,
  card: string,
  title: string,
  pos: string,
  image: string,
  buttonGrid: string
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
}

interface Props {
  classes: Style,
  coachName: string,
  getCoach(name: string): void,
  history: {
    push(
      param: string | {
        pathname: string,
        state: {
          type: string,
          teacher?: TeacherBarDetails,
          teachers?: Array<Teacher>
        }
      },
    ): void
  }
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
class HomePage extends React.Component<Props, State> {
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
    firebase.handleFetchTrainingStatus();
    firebase.handleFetchQuestions("transition");
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      grow: PropTypes.string,
      card: PropTypes.string,
      title: PropTypes.string,
      pos: PropTypes.string,
      image: PropTypes.string,
      buttonGrid: PropTypes.string
    }).isRequired,
    history: PropTypes.exact({
      push: PropTypes.func
    }).isRequired,
    coachName: PropTypes.string.isRequired,
    getCoach: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        {this.props.coachName ? (
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-start"
            style={{ flexGrow: 1 }}
          >
            <Grid item style={{height: '15vh'}}>
              <Grid container direction="row" justify="center" alignItems="center" style={{height: '100%'}}>
                <Grid item>
                <Typography variant="h3" align={"center"} style={{fontFamily: 'Arimo', verticalAlign: 'center'}}>
                  Welcome, {this.props.coachName}!
                </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item style={{width: '100%', paddingTop: '2em'}}>
              <Grid container direction="row" alignItems="center" justify="space-around">
                <Grid item>
                  <Typography variant="h6" align="center" style={{fontFamily: 'Arimo'}}>
                    Last Observation: Harsha Seethalam on 4/8/20
                  </Typography>
                </Grid>
                <Grid item>
                  <MuiThemeProvider theme={theme}>
                    <Button variant="outlined" color="primary">
                      SEND THANK YOU
                    </Button>
                  </MuiThemeProvider>
                </Grid>
                <Grid item>
                  <MuiThemeProvider theme={theme}>
                    <Button variant="outlined" color="primary">
                      VIEW RESULTS
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid
              container
              alignItems="center"
              direction="row"
              justify="space-around"
              className={classes.buttonGrid}
            >
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
              <Card
                className={classes.card}
                onClick={(): void => this.showTeacherModal("Results")}
              >
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                  >
                    <Grid item>
                      <ResultsIcon style={{ fill: "#4fd9b3", width: '12vw', height: '12vh' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                        Results
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                    onClick={(): void => this.props.history.push("/MyTeachers")}
                  >
                    <Grid item>
                      <PeopleIcon style={{ fill: "#ffd300", width: '12vw', height: '12vh' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                        My Teachers
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
            >
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                    onClick={(): void => this.props.history.push("/ActionPlans")}
                  >
                    <Grid item>
                      <ActionPlansIcon style={{ fill: "#e55529", width: '12vw', height: '12vh' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                        Action Plan
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justify="flex-start"
                    onClick={(): void => this.props.history.push("/ConferencePlans")}
                  >
                    <Grid item>
                      <ConferencePlansIcon style={{ fill: "#0988ec", width: '12vw', height: '12vh' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                        Conference Plan
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card
                className={classes.card}
                onClick={(): void => 
                  this.props.history.push({
                    pathname: "/Magic8Menu",
                    state: { type: "Training" }
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
                        Training
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              container
              alignItems="flex-end"
              direction="row"
              justify="center"
              style={{height: '14vh'}}
            >
              <Grid item xs={4} style={{paddingBottom: '1em', paddingTop: '1em'}}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item xs={5}>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                      <Button color="primary" style={{paddingRight: '2em'}}>
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
                      <Button color="primary" style={{paddingLeft: '2em'}}>
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
            {(firebase: object): React.ReactNode => (
              <TeacherModal
                handleClose={this.handleClose}
                history={this.props.history}
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

const mapStateToProps = (state: ReduxState): {coachName: string} => {
  return {
    coachName: state.coachState.coachName
  };
};

HomePage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {getCoach})(HomePage));
