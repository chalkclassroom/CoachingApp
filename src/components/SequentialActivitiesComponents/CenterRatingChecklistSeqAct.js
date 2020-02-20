import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowLeft from "@material-ui/core/es/internal/svg-icons/KeyboardArrowLeft";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { toggleSequentialMaterials } from "../../state/actions/sequential-activities";
import Dashboard from "../Dashboard";
import Countdown from "../Countdown.tsx";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    paddingTop: '2%',
    fontFamily: 'Arimo'
  },
  grow: {
    flexGrow: 1
  }
};

const TeacherEnum = {
  NO_TEACHER: 1,
  TEACHER: 2,
};

const RATING_INTERVAL = 60000;

/**
 * center rating checklist for sequential activities
 * @class CenterRatingChecklistSeqAct
 */
class CenterRatingChecklistSeqAct extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    ratings: [],
    childChecked: [],
    teacherChecked: [],
    people: undefined,
    time: RATING_INTERVAL,
    timeUpOpen: false,
    peopleWarning: false
  };

  tick = () => {
    if (this.state.time <= 0) {
      this.handleTimeUpNotification();
      this.setState({ time: RATING_INTERVAL });
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - 1000 });
      }
    }
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleTimeUpNotification = () => {
    this.setState({ timeUpOpen: true });
  };

  handleTimeUpClose = () => {
    this.setState({ timeUpOpen: false });
  };

  handlePeopleWarningClose = () => {
    this.setState({ peopleWarning: false });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  handleBackButton = () => {
    this.props.toggleScreen();
  };

  handleSubmit = () => {
    if (this.state.people === undefined) {
      this.setState({ peopleWarning: true });
    } else {
      const mEntry = {
        checked: [...this.state.childChecked, ...this.state.teacherChecked],
        people: this.state.people
      };

      this.props.firebase.handlePushSequential(mEntry);

      this.props.finishVisit(this.props.currentCenter);
      this.props.toggleScreen();
    }
  };

  handleChildToggle = value => () => {
    if (value <=5 && this.childDisabled()) {
      return;
    }
    const { childChecked } = this.state;
    const newChecked = [];
    if (((childChecked.includes(5) && value != 5) || 
    (childChecked.includes(1) || childChecked.includes(2) ||
    childChecked.includes(3) || childChecked.includes(4)) && value === 5)) {
      newChecked.splice(0, newChecked.length);
      newChecked.push(value);
    } else {
      newChecked.push(...childChecked);
      const currentIndex = childChecked.indexOf(value);

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      
    }
    this.setState({childChecked: newChecked});
  }

  handleTeacherToggle = value => () => {
    if (value >=6 && this.teacherDisabled()) {
      console.log('is this even possible');
      return;
    }
    const { teacherChecked } = this.state;
    const newChecked = [];
    if (((teacherChecked.includes(10) && value != 10) || 
    (teacherChecked.includes(6) || teacherChecked.includes(7) ||
    teacherChecked.includes(8) || teacherChecked.includes(9)) && value === 10)) {
      newChecked.splice(0, newChecked.length);
      newChecked.push(value);
    } else {
      newChecked.push(...teacherChecked);
      const currentIndex = teacherChecked.indexOf(value);

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      
    }
    this.setState({teacherChecked: newChecked});
  }

  childDisabled = () => {
    return this.state.people === undefined;
  };

  teacherDisabled = () => {
    return (
      this.state.people === TeacherEnum.NO_TEACHER ||
      this.state.people === undefined
    );
  };

  handleNoTeacherClick = () => {
    if (this.state.people !== TeacherEnum.NO_TEACHER) {
      this.setState({ people: TeacherEnum.NO_TEACHER });

      const { teacherChecked } = this.state;
      const newTeacherChecked = [...teacherChecked];
      for (let i = 6; i <= 10; i++) {
        // If there are teacher ratings checked, remove them
        if (teacherChecked.includes(i)) {
          const currentIndex = teacherChecked.indexOf(i);
          newTeacherChecked.splice(currentIndex);
        }
      }
      this.setState({ teacherChecked: newTeacherChecked });
    }
  };

  handleTeacherClick = () => {
    if (this.state.people !== TeacherEnum.TEACHER) {
      this.setState({ people: TeacherEnum.TEACHER });
    }
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render() {
    return (
      <div className={this.props.classes.root}>
        <Dialog
          open={this.state.timeUpOpen}
          onClose={this.handleTimeUpClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>
            Don&apos;t forget to circulate!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo'}}>
              You&apos;ve been at the {this.props.currentCenter} center for 1 minute.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.peopleWarning}
          onClose={this.handlePeopleWarningClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>Wait!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo'}}>
              Please select the number of children and teachers at the center
              before submitting your rating.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <main>
          <Grid
            container
            alignItems={"center"}
            direction={"row"}
            justify={"center"}
          >
            <Grid item xs={3}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <Dashboard
                  magic8="Sequential Activities"
                  color="#ffd300"
                  infoDisplay={<Countdown color="#ffd300" timerTime={60000} />}
                  infoPlacement="center"
                  completeObservation={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid>
                <div style={{ margin: 10 }} />
                <Button size={"small"} onClick={this.handleBackButton} style={{fontFamily: 'Arimo'}}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              </Grid>
              <Grid container alignItems="center" direction="column" xs={12}>
                <Typography variant="h4" gutterBottom>
                  {this.props.currentCenter[0].toUpperCase() +
                    this.props.currentCenter.substr(1)}
                </Typography>
                <div style={{ height: 20 }} />
                <Typography variant={"subtitle1"} gutterBottom style={{fontFamily: 'Arimo'}}>
                  Please indicate who is present at the center:
                </Typography>
                <Grid
                  container
                  direction={"row"}
                  justify={"space-around"}
                  xs={12}
                >
                  <Grid item>
                    <Button
                      onClick={this.handleNoTeacherClick}
                      size="small"
                      variant={
                        this.state.people === TeacherEnum.NO_TEACHER
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: "Arimo"}}
                    >
                      No Teacher
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleTeacherClick}
                      size="small"
                      variant={
                        this.state.people === TeacherEnum.TEACHER
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: "Arimo"}}
                    >
                      Teacher Present
                    </Button>
                  </Grid>
                </Grid>
                <div style={{ height: 20 }} />
                <Grid container direction={"row"} spacing={16} xs={12}>
                  <Grid item xs={6}>
                    <Card>
                      <Typography variant="h6" align={"center"}>
                        Child Behaviors
                      </Typography>
                      <List>
                        <ListItem
                          onClick={this.handleChildToggle(1)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.childChecked.includes(1)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            Using materials in a{" "}
                            <b>step-by-step, predictable way</b>
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleChildToggle(2)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.childChecked.includes(2)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{ fontSize: 16}}
                          >
                            <b>Drawing</b> recognizable images or <b>writing</b>{" "}
                            names or messages (letters or letter-like forms)
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleChildToggle(3)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.childChecked.includes(3)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            Playing a game with <b>set rules</b> and/or {" "}
                            <b>taking turns</b>
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleChildToggle(4)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.childChecked.includes(4)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            Speaking or acting according to a{" "}
                            <b>pretend scenario</b> that follows a
                            predictable plot
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleChildToggle(5)}
                          disabled={this.childDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.childChecked.includes(5)
                            }
                            disabled={this.childDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            None
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <Typography variant="h6" align={"center"}>
                        Teacher Behaviors
                      </Typography>
                      <List>
                        <ListItem
                          onClick={this.handleTeacherToggle(6)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.teacherChecked.includes(6)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            <b>Helping</b> children do sequential activities
                            with manipulatives or toys
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleTeacherToggle(7)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.teacherChecked.includes(7)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            Supporting children as they <b>draw</b> images
                            or <b>write</b> messages
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleTeacherToggle(8)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.teacherChecked.includes(8)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            <b>Demonstrating the steps</b> to an activity
                            or game
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleTeacherToggle(9)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.teacherChecked.includes(9)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            Supporting children as they <b>act out</b> 
                            {" "} a dramatic play scenario or book
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleTeacherToggle(10)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.teacherDisabled() &&
                              this.state.teacherChecked.includes(10)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText
                            disableTypography
                            style={{fontSize: 16}}
                          >
                            None
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems={"center"}
                  justify={"center"}
                  direction={"row"}
                >
                  <Button
                    variant="contained"
                    color={"secondary"}
                    onClick={this.handleSubmit}
                    style={{ marginTop: 20, fontFamily: 'Arimo', fontSize: 18}}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

CenterRatingChecklistSeqAct.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleScreen: PropTypes.func.isRequired,
  finishVisit: PropTypes.func.isRequired,
  currentCenter: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    centers: state.sequentialCenterState.sequentialCenters
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, { toggleSequentialMaterials })(
    CenterRatingChecklistSeqAct
  )
);
