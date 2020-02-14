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
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard";
import Countdown from "../Countdown";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    fontFamily: 'Arimo'
  },
  grow: {
    flexGrow: 1
  }
};

const TeacherChildEnum = {
  NO_TEACHER:1,
  TEACHER_PRESENT:2
};

const RATING_INTERVAL = 60000;
const TEN_PERCENT = 0.1 * RATING_INTERVAL;

/**
 * Center Rating Checklist for Math
 * @class CenterRatingChecklistMath
 * @return {void}
 */
class CenterRatingChecklistMath extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    ratings: [],
    childChecked: [],
    teacherChecked: [],
    people: undefined,
    time: RATING_INTERVAL,
    timeUpOpen: false,
    peopleWarning: false,
    mathType: ""
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

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

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
      this.props.firebase.handlePushMath(mEntry);
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
    return (
      this.state.people === undefined
    );
  };

  teacherDisabled = () => {
    return (
      this.state.people === TeacherChildEnum.NO_TEACHER ||
      this.state.people === undefined
    );
  };

  handleTeacherClick = () => {
    if (this.state.people !== TeacherChildEnum.TEACHER_PRESENT) {
      this.setState({ people: TeacherChildEnum.TEACHER_PRESENT });
    }
  };

  handleNoTeacherClick = () => {
    if (this.state.people !== TeacherChildEnum.NO_TEACHER) {
      this.setState({ people: TeacherChildEnum.NO_TEACHER });

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
              Please select if the teachers is present at the center or not
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
                {/* <div style={{ margin: 20 }} /> */}
                <Dashboard
                  magic8="Math Instruction"
                  color="#E55529"
                  infoDisplay={<Countdown color="#E55529" timerTime={60000} />}
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
                <Typography variant="h4" gutterBottom style={{fontFamily: 'Arimo'}}>
                  {this.props.currentCenter[0].toUpperCase() +
                    this.props.currentCenter.substr(1)}
                </Typography>
                <div style={{ height: 20 }} />
                <Typography variant={"subtitle2"} gutterBottom style={{fontFamily: 'Arimo'}}>
                  Please select if teacher is present or not at the
                  center:
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
                        this.state.people === TeacherChildEnum.NO_TEACHER
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: 'Arimo'}}
                    >
                      no teacher
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleTeacherClick}
                      size="small"
                      variant={
                        this.state.people === TeacherChildEnum.TEACHER_PRESENT
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: 'Arimo'}}
                    >
                     teacher present
                    </Button>
                  </Grid>
                  </Grid> 
                <div style={{ height: 20 }} />
                <Grid container direction={"row"} spacing={16} xs={12}>
                  <Grid item
                   xs={6}>
                    <Card>
                      <Typography variant="h6" align={"center"} style={{fontFamily: 'Arimo'}}>
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
                          <ListItemText disableTypography>
                             <b>Counting and Numbers</b> 
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
                          <ListItemText disableTypography>
                             <b>Shapes and Spatial reasoning</b>  
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
                          <ListItemText disableTypography>
                          <b>Patterns</b>  
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
                          <ListItemText disableTypography>
                            <b>Measurement and Data</b>
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
                          <ListItemText disableTypography>None</ListItemText>
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <Typography variant="h6" align={"center"} style={{fontFamily: 'Arimo'}}>
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
                          <ListItemText disableTypography>
                            Using <b>math vocabulary</b> 
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
                          <ListItemText disableTypography>
                            <b>Asking questions {" "}</b> about math concepts
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
                          <ListItemText disableTypography>
                            <b>Demonstrating</b> math concepts
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
                          <ListItemText disableTypography>
                            Helping children use math
                            to <b>problem solve</b>
                          </ListItemText>
                        </ListItem>
                        <ListItem
                          onClick={this.handleTeacherToggle(10)}
                          disabled={this.teacherDisabled()}
                        >
                          <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.teacherChecked.includes(10)
                            }
                            disabled={this.teacherDisabled()}
                          />
                          <ListItemText disableTypography>None</ListItemText>
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
                    style={{ marginTop: 20, fontFamily: 'Arimo' }}
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

CenterRatingChecklistMath.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenterRatingChecklistMath);
