import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowLeft from "@material-ui/core/es/internal/svg-icons/KeyboardArrowLeft";
import Line from "rc-progress/es/Line";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import ms from "pretty-ms";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  }
};

const TeacherChildEnum = {
  CHILD_1: 1,
  CHILD_2: 2,
  CHILD_1_TEACHER: 3,
  CHILD_2_TEACHER: 4
};

const teacherBehaviors = {
  noSupp: 'no support',
  support: 'support'
};

const childBehaviors = {
  noOpp: 'no opportunity',
  ac: 'ac',
  noAc: 'no ac'
};

const RATING_INTERVAL = 60000;
const TEN_PERCENT = 0.1 * RATING_INTERVAL;

class CenterRatingChecklistAssocCoop extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    ratings: [],
    checked: [0],
    people: undefined,
    time: RATING_INTERVAL,
    timeUpOpen: false,
    peopleWarning: false,
    acType: ''
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
      let mEntry = {
        checked: this.state.checked,
        people: this.state.people,
        acType: this.state.acType
      };
      this.props.firebase.handlePushAC(mEntry);
      this.props.finishVisit(this.props.currentCenter);
      this.props.toggleScreen();
    }
  };

  handleToggle = value => () => {
    // Prevents updating state of checkbox when disabled
    if (
      (value <= 5 && this.childDisabled()) ||
      (value >= 6 && this.teacherDisabled())
    ) {
      return;
    }
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  childDisabled = () => {
    return (
        this.state.people === TeacherChildEnum.CHILD_1 ||
        this.state.people === undefined
    );
  };

  teacherDisabled = () => {
    return (
      this.state.people === TeacherChildEnum.CHILD_1 ||
      this.state.people === TeacherChildEnum.CHILD_2 ||
      this.state.people === undefined
    );
  };

  handleChild1Click = () => {
    if (this.state.people !== TeacherChildEnum.CHILD_1) {
      this.setState({ people: TeacherChildEnum.CHILD_1 });
      this.setState({acType: teacherBehaviors.noSupp});
      this.setState({acType: childBehaviors.noOpp});

      const { checked } = this.state;
      const newChecked = [...checked];
      for (let i = 5; i <= 8; i++) {
        // If there are teacher ratings checked, remove them
        if (checked.indexOf(i) !== -1) {
          let currentIndex = checked.indexOf(i);
          newChecked.splice(currentIndex);
        }
      }
      this.setState({ checked: newChecked });
    }
  };

  handleChild2Click = () => {
    if (this.state.people !== TeacherChildEnum.CHILD_2) {
      this.setState({ people: TeacherChildEnum.CHILD_2 });
      this.setState({acType: teacherBehaviors.noSupp});
      this.setState({acType: childBehaviors.ac});

      const { checked } = this.state;
      const newChecked = [...checked];
      for (let i = 5; i <= 8; i++) {
        // If there are teacher ratings checked, remove them
        if (checked.indexOf(i) !== -1) {
          let currentIndex = checked.indexOf(i);
          newChecked.splice(currentIndex);
        }
      }
      this.setState({ checked: newChecked });
    }
  };

  handleChild1TeacherClick = () => {
    if (this.state.people !== TeacherChildEnum.CHILD_1_TEACHER) {
      this.setState({ people: TeacherChildEnum.CHILD_1_TEACHER });
      this.setState({acType: teacherBehaviors.support});
      this.setState({acType: childBehaviors.ac});

    }
  };

  handleChild2TeacherClick = () => {
    if (this.state.people !== TeacherChildEnum.CHILD_2_TEACHER) {
      this.setState({ people: TeacherChildEnum.CHILD_2_TEACHER });
      this.setState({acType: teacherBehaviors.support});
      this.setState({acType: childBehaviors.ac});

    }
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Dialog
          open={this.state.timeUpOpen}
          onClose={this.handleTimeUpClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title">
            Don't forget to circulate!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You've been at the {this.props.currentCenter} center for 1 minute.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.peopleWarning}
          onClose={this.handlePeopleWarningClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title">Wait!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please select the number of children and teachers at the center
              before submitting your rating.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <main>
          <Grid alignItems={"center"} direction={"row"} justify={"center"}>
            <Grid>
              <Button size={"small"} onClick={this.handleBackButton}>
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
              <Typography variant={"subtitle2"} gutterBottom style={{marginLeft: -450}}>
                Please select the number of children and teachers at the center:
              </Typography>
              <Grid
                container
                direction={"row"}
                justify={"space-between"}
                xs={10}
              >
                <Grid item>
                  <Button
                    onClick={this.handleChild1Click}
                    variant={
                      this.state.people === TeacherChildEnum.CHILD_1
                        ? "contained"
                        : "outlined"
                    }
                  >
                    1 child
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={this.handleChild2Click}
                    variant={
                      this.state.people === TeacherChildEnum.CHILD_2
                        ? "contained"
                        : "outlined"
                    }
                  >
                    2+ children without teacher
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={this.handleChild1TeacherClick}
                    variant={
                      this.state.people === TeacherChildEnum.CHILD_1_TEACHER
                        ? "contained"
                        : "outlined"
                    }
                  >
                    1 child with teacher
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={this.handleChild2TeacherClick}
                    variant={
                      this.state.people === TeacherChildEnum.CHILD_2_TEACHER
                        ? "contained"
                        : "outlined"
                    }
                  >
                    2+ children with teacher
                  </Button>
                </Grid>
              </Grid>
              <div style={{ height: 20 }} />
              <Grid container direction={"row"} spacing={16} xs={12}>
                <Grid xs={1} />
                <Grid item xs={5}>
                  <Card>
                    <Typography variant="h6" align={"center"}>
                      Child Behaviors
                    </Typography>
                    <List>
                      <ListItem
                        onClick={this.handleToggle(1)}
                        disabled={this.childDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.childDisabled() &&
                            this.state.checked.indexOf(1) !== -1
                          }
                          disabled={this.childDisabled()}
                        />
                        <ListItemText>
                          <b>Talking</b> to adult or peer about{" "}
                          <b>current activity</b>
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        onClick={this.handleToggle(2)}
                        disabled={this.childDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.childDisabled() &&
                            this.state.checked.indexOf(2) !== -1
                          }
                          disabled={this.childDisabled()}
                        />
                        <ListItemText>
                          Engaging <b>together</b> in an{" "}
                          <b>open-ended activity</b> without clear roles or
                          order
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        onClick={this.handleToggle(3)}
                        disabled={this.childDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.childDisabled() &&
                            this.state.checked.indexOf(3) !== -1
                          }
                          disabled={this.childDisabled()}
                        />
                        <ListItemText>
                          Following <b>formal rules of a game</b> and/or taking
                          turns
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        onClick={this.handleToggle(4)}
                        disabled={this.childDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.childDisabled() &&
                            this.state.checked.indexOf(4) !== -1
                          }
                          disabled={this.childDisabled()}
                        />
                        <ListItemText>
                          Speaking or acting according to a{" "}
                          <b>predetermined scenario</b> (e.g., restaurant,
                          grocery store)
                        </ListItemText>
                      </ListItem>
                      <ListItem
                          onClick={this.handleToggle(5)}
                          disabled={this.childDisabled()}
                      >
                        <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.indexOf(5) !== -1
                            }
                            disabled={this.childDisabled()}
                        />
                        <ListItemText>
                          None
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item xs={5}>
                  <Card>
                    <Typography variant="h6" align={"center"}>
                      Teacher Behaviors
                    </Typography>
                    <List>
                      <ListItem
                        onClick={this.handleToggle(6)}
                        disabled={this.teacherDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.teacherDisabled() &&
                            this.state.checked.indexOf(6) !== -1
                          }
                          disabled={this.teacherDisabled()}
                        />
                        <ListItemText>
                          <b>Participating</b> in children’s play
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        onClick={this.handleToggle(7)}
                        disabled={this.teacherDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.teacherDisabled() &&
                            this.state.checked.indexOf(7) !== -1
                          }
                          disabled={this.teacherDisabled()}
                        />
                        <ListItemText>
                          <b>Asking questions</b> to check for understanding or
                          extend children’s thinking
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        onClick={this.handleToggle(8)}
                        disabled={this.teacherDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.teacherDisabled() &&
                            this.state.checked.indexOf(8) !== -1
                          }
                          disabled={this.teacherDisabled()}
                        />
                        <ListItemText>
                          <b>Encouraging</b> children to <b>share</b>,
                          <b>work</b>, or <b>interact</b> with each other
                        </ListItemText>
                      </ListItem>
                      <ListItem
                        onClick={this.handleToggle(9)}
                        disabled={this.teacherDisabled()}
                      >
                        <Checkbox
                          checked={
                            !this.teacherDisabled() &&
                            this.state.checked.indexOf(9) !== -1
                          }
                          disabled={this.teacherDisabled()}
                        />
                        <ListItemText>
                          Helping children find the <b>words to communicate</b>
                        </ListItemText>
                      </ListItem>
                      <ListItem
                          onClick={this.handleToggle(10)}
                          disabled={this.teacherDisabled()}
                      >
                        <Checkbox
                            checked={
                              !this.childDisabled() &&
                              this.state.checked.indexOf(10) !== -1
                            }
                            disabled={this.teacherDisabled()}
                        />
                        <ListItemText>
                          None
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid xs={1}>
                  <Line
                    style={{ transform: "rotate(270deg)" }}
                    percent={`${100 * (this.state.time / RATING_INTERVAL)}`}
                    strokeWidth="8"
                    strokeColor={
                      this.state.time > TEN_PERCENT ? "#009365" : "#E55529"
                    }
                  />
                  <div
                    style={{
                      paddingTop: 50,
                      textAlign: "center"
                    }}
                  >
                    {ms(this.state.time)}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"row"}
              >
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  onClick={this.handleSubmit}
                  style={{ marginTop: 20 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

CenterRatingChecklistAssocCoop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenterRatingChecklistAssocCoop);
