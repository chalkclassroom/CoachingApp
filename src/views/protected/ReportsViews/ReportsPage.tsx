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
import TeacherModal from "../HomeViews/TeacherModal";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif';
import { coachLoaded, Role } from '../../../state/actions/coach'
import { connect } from 'react-redux';
import * as Types from '../../../constants/Types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as H from 'history';
import Firebase from '../../../components/Firebase'

import MenuBar from './MenuBar'
import Sidebar from "./Sidebar";

const styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  pictureBar: {
    position: 'static',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    minHeight: '4em',
    maxHeight: '200px',
  },
  grow: {
    flexGrow: 1
  },
  card: {
    minHeight: "90%",
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
      display: 'flex'
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
  helpButtons: string,
  pictureBar: string
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
 * reports page
 * @class ReportsPage
 */
class ReportsPage extends React.Component<Props, State> {
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
        <Grid container className={classes.pictureBar}>
            <Grid item xs={1} style={{padding: '2em 0 2em 0'}}>
                <ConferencePlansIcon style={{ fill: "#0988ec", width: '12vw', height: '12vh', minHeight: '4em', maxHeight: '120px', minWidth: '4em'}} />
            </Grid>
        </Grid>
        <MenuBar/>
        <div>
            <div style={{display: "flex"}}>
                <Sidebar/>
                <div> 

                <Grid container >
                    <Grid container justifyContent="space-evenly">
                        <Grid item xs={5}>
                        <Card
                            className={classes.card}
                            onClick={(): void => this.showTeacherModal("Observe")}
                            >
                            <CardContent style={{padding: '1em 0 1em 0'}}>
                                <Grid
                                container
                                alignItems="center"
                                direction="column"
                                justify="flex-start"
                                >
                                <Grid item>
                                <Typography variant="subtitle1" style={{margin: '0 .4em 0 .4em'}}>
                                    The Teacher Profile shows average teacher practice over time.
                                </Typography>
                                <hr/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="h2" style={{fontFamily: 'Arimo'}}>
                                        Teacher Profile
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Go
                                    </Button>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={5}>
                        <Card
                            className={classes.card}
                            onClick={(): void => this.showTeacherModal("Observe")}
                            >
                            <CardContent style={{padding: '1em 0 1em 0'}}>
                                <Grid
                                container
                                alignItems="center"
                                direction="column"
                                justify="flex-start"
                                >
                                <Grid item>
                                <Typography variant="subtitle1" style={{margin: '0 .4em 0 .4em'}}>
                                    The Site Profile Shows average practice of all teachers at one site within a selected timeframe.
                                </Typography>
                                <hr/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="h2" style={{fontFamily: 'Arimo'}}>
                                        Site Profile
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Go
                                    </Button>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-evenly">
                        <Grid item xs={5}>
                        <Card
                            className={classes.card}
                            onClick={(): void => this.showTeacherModal("Observe")}
                            >
                            <CardContent style={{padding: '1em 0 1em 0'}}>
                                <Grid
                                container
                                alignItems="center"
                                direction="column"
                                justify="flex-start"
                                >
                                <Grid item>
                                <Typography variant="subtitle1" style={{margin: '0 .4em 0 .4em'}}>
                                    The Coach Profile enables administrators to generate an Excel file with coach activities completed via the CHALK website.
                                </Typography>
                                <hr/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="h2" style={{fontFamily: 'Arimo'}}>
                                        Coach Profile
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Go
                                    </Button>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={5}>
                            <Card
                            className={classes.card}
                            onClick={(): void => this.showTeacherModal("Observe")}
                            >
                            <CardContent style={{padding: '1em 0 1em 0'}}>
                                <Grid
                                container
                                alignItems="center"
                                direction="column"
                                justify="flex-start"
                                >
                                <Grid item>
                                <Typography variant="subtitle1" style={{margin: '0 .4em 0 .4em'}}>
                                    The Program Profile shows average practice of all sites from one program within a selected timeframe.
                                </Typography>
                                <hr/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" component="h2" style={{fontFamily: 'Arimo'}}>
                                        Program Profile
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Go
                                    </Button>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                    {/* {coachName ? (
                    <Grid
                        style={{background:'red'}}
                        container
                        alignItems="center"
                        direction="column"
                        justify="flex-start"
                        style={{ flexGrow: 1 }}
                    >
                        <Grid item className={classes.landscape} style={{background:'green'}}>
                        <Grid
                            style={{background:'blue', paddingLeft: '100px'}}
                            container
                            alignItems="center"
                            direction="row"
                            justify="space-evenly"
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
                                    CHANGED
                                    </Typography>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card> */}
                            {/*{[Role.COACH, Role.ADMIN].find(r => r === userRole) ? <Card className={classes.card}>
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
                            </Card> :  null}
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            direction="row"
                            justify="space-around"
                            className={classes.buttonGrid}
                        > */}
                            {/* <Card className={classes.card}>
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
                                    Action Plans
                                    </Typography>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card> */}
                            {/* {[Role.ADMIN, Role.COACH].find(r => r === userRole) ? <Card className={classes.card}>
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
                                    Conference Plans
                                    </Typography>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card> : null}
                            <Card
                            className={classes.card}
                            onClick={(): void =>
                                this.props.history.push({
                                pathname: "/Training",
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
                                    <Typography variant="h5" component="h2" style={{fontFamily: 'Arimo'}}>
                                    Training
                                    </Typography>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card> */}
                        {/* </Grid>
                        </Grid>
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
                            <Grid item xs={6}>
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
                            </Grid>
                            <Grid item xs={6}>
                                <Card
                                className={classes.card}
                                onClick={(): void =>
                                    this.props.history.push({
                                    pathname: "/Training",
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
                            <Grid item xs={6}>
                                {[Role.ADMIN, Role.COACH].find(r => userRole === r) ? <Card className={classes.card}>
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
                                </Card> : null }
                            </Grid>
                            <Grid item xs={6}>
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
                                        Action Plans
                                        </Typography>
                                    </Grid>
                                    </Grid>
                                </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
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
                                        Conference Plans
                                        </Typography>
                                    </Grid>
                                    </Grid>
                                </CardContent>
                                </Card>
                            </Grid>
                            </Grid>
                        </Grid>
                        </div> */}
                        {/* <Grid
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
                        </Grid> */}
                    {/* </Grid>
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
                    )} */}
                </div>
            </div>
        </div>
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

ReportsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {getCoach: coachLoaded})(ReportsPage));
