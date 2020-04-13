import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowLeft from "@material-ui/core/es/internal/svg-icons/KeyboardArrowLeft";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard";
import Countdown from "../Countdown";
import Zoom from '@material-ui/core/Zoom';
import { connect } from 'react-redux';
import * as Constants from '../../constants';


const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arimo"
  },
  grow: {
    flexGrow: 1
  }
};

const RATING_INTERVAL = 60000;

interface Props {
  classes: {
    root: string,
    grow: string
  },
  type: string,
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleSession(mEntry: {teacher: string, observedBy: string, type: string}): void,
    handlePushListening(mEntry: {checked: Array<number>}): Promise<void>
  },
  teacherSelected: Teacher
}

interface State {
  checked: Array<number>,
  time: number,
  timeUpOpen: boolean,
  final: boolean,
  in: boolean
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
};

/**
 * Teacher Checklist
 * @class TeacherChecklist
 * @return {void}
 */
class TeacherChecklist extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    const mEntry = {
      teacher: this.props.teacherSelected.teacher,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: "listening"
    };
    this.props.firebase.handleSession(mEntry);

    this.state = {
      checked: [],
      time: RATING_INTERVAL,
      timeUpOpen: false,
      final: false,
      in: true
    }
  }

  /**
   * @return {void}
   */
  tick = (): void => {
    if (this.state.time <= 0) {
      clearInterval(this.timer);
      if (this.state.final) {
        this.handleSubmit(this.state.checked);
        this.setState({ final: false })
      } else {
        this.handleTimeUpNotification();
      }
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - 1000 });
      }
    }
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.timer = setInterval(this.tick, 1000);
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  handleTimeUpNotification = (): void => {
    this.setState({ timeUpOpen: true });
  };

  handleFinish = (): void => {
    this.setState({
      timeUpOpen: false,
      time: 10000,
      final: true
    }, () => {this.timer = setInterval(this.tick, 1000)})
  }

  handleNext = (): void => {
    this.setState({
      timeUpOpen: false,
      time: 60000
    }, () => {
      if (this.state.checked.length > 0) {
        this.handleSubmit(this.state.checked);
      } else {
        this.handleSubmit([7]);
      }
    });
  }

  /**
   * @param {Array<number>} checked
   */
  handleSubmit = (checked: Array<number>): void => {
    this.setState({in: false}, () => {
      this.props.firebase.handlePushListening({checked}).then(() => {
        this.setState({
          checked: [],
          in: true,
          time: 60000
        }, () => {this.timer = setInterval(this.tick, 1000)})
      });
    })
  };

  /**
   * @param {number} value
   * @return {void}
   */
  handleCheck = (value: number) => (): void => {
    const { checked } = this.state;
    const newChecked: Array<number> = [];
    newChecked.push(...checked);
    const currentIndex = checked.indexOf(value);
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({checked: newChecked});
  }

  static propTypes = {
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        currentUser: PropTypes.exact({
          uid: PropTypes.string
        })
      }),
      handleSession: PropTypes.func,
      handlePushListening: PropTypes.func
    }).isRequired,
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div className={this.props.classes.root}>
        <Dialog
          open={this.state.timeUpOpen}
          aria-labelledby="simple-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          {this.state.checked.length > 0 ? (
            <div>
              {/* <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>
                Don&apos;t forget to circulate!
              </DialogTitle> */}
              <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo', fontSize: '1.5em'}}>
                  Complete your selections or move to the next observation.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleFinish} color="secondary" variant="contained" style={{fontFamily: 'Arimo'}}>
                  MAKE FINAL SELECTIONS
                </Button>
                <Button onClick={this.handleNext} color="primary" variant="contained" style={{fontFamily: 'Arimo'}} autoFocus>
                  GO TO NEXT OBSERVATION
                </Button>
              </DialogActions>
            </div>
          ) : (
            <div>
              {/* <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>
                Don&apos;t forget to circulate!
              </DialogTitle> */}
              <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo', fontSize: '1.5em'}}>
                  Complete your selections or move to the next observation.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleFinish} color="secondary" variant="contained" style={{fontFamily: 'Arimo'}}>
                  MAKE FINAL SELECTIONS
                </Button>
                <Button onClick={this.handleNext} color="primary" variant="contained" style={{fontFamily: 'Arimo'}} autoFocus>
                  NO BEHAVIORS OBSERVED
                </Button>
              </DialogActions>
            </div>
          )}
        </Dialog>
        <main>
          <Grid
            container
            alignItems={"center"}
            direction={"row"}
            justify={"center"}
          >
            <Grid item xs={3} style={{alignSelf: 'flex-start', paddingTop: '0.5em'}}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <Dashboard
                  type={this.props.type}
                  infoDisplay={<Countdown type={this.props.type} time={this.state.time} timerTime={60000} />}
                  infoPlacement="center"
                  completeObservation={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Zoom in={this.state.in}>
                <Grid container alignItems="center" direction="column" xs={12}>
                  <div style={{ height: 20 }} />
                  <Typography variant="h6" align={"center"} style={{paddingBottom: '1em'}}>
                    Select all the teacher behaviors you see:
                  </Typography>
                  <Grid container direction={"row"} justify="center" alignItems="center" spacing={16} xs={12}>
                    <Grid item xs={5}>
                      <Card style={{height: '45vh'}}>
                        <List>
                          {Constants.Checklist.LC.TeacherBehaviors.slice(0, 3).map((value, index) => {
                            return (<ListItem
                              key={index}
                              onClick={this.handleCheck(index+1)}
                              style={{height: '15vh'}}
                            >
                              <Checkbox
                                checked={this.state.checked.includes(index+1)}
                              />
                              <ListItemText disableTypography>
                                {value}
                              </ListItemText>
                            </ListItem>);
                          })}
                        </List>
                      </Card>
                    </Grid>
                    <Grid item xs={5}>
                      <Card style={{height: '45vh'}}>
                        <List>
                          {Constants.Checklist.LC.TeacherBehaviors.slice(3, 6).map((value, index) => {
                            return (<ListItem
                              key={index}
                              onClick={this.handleCheck(index+4)}
                              style={{height: '15vh'}}
                            >
                              <Checkbox
                                checked={this.state.checked.includes(index+4)}
                              />
                              <ListItemText disableTypography>
                                {value}
                              </ListItemText>
                            </ListItem>);
                          })}
                        </List>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Zoom>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state): {teacherSelected: Teacher} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

export default connect(mapStateToProps)(withStyles(styles)(TeacherChecklist));