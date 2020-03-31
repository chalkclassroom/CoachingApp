import * as React from "react";
import * as PropTypes from "prop-types";
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
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard";
import Countdown from "../Countdown";
import * as Constants from '../../constants';

const styles: object = {
  root: {
    // flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    height: '100vh',
    fontFamily: "Arimo"
  },
  grow: {
    flexGrow: 1
  }
};

const TeacherChildEnum = {
  CHILD_1: 1,
  CHILD_2: 2,
  TEACHER: 3,
};

const RATING_INTERVAL = 60000;
// const TEN_PERCENT = 0.1 * RATING_INTERVAL;

interface Props {
  toggleScreen(): void,
  finishVisit(centerName: string): void,
  currentCenter: string,
  classes: {
    root: string,
    grow: string
  },
  firebase: {
    handlePushCentersData(mEntry: {checked: Array<number>, people: number}): void
  },
  type: string,
  teacherFirstName: string,
  teacherLastName: string
}

interface State {
  childChecked: Array<number>,
  teacherChecked: Array<number>,
  people: number,
  time: number,
  timeUpOpen: boolean,
  peopleWarning: boolean
}

/**
 * Center Rating Checklist
 * @class CenterRatingChecklist
 * @return {void}
 */
class CenterRatingChecklist extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      childChecked: [],
      teacherChecked: [],
      people: undefined,
      time: RATING_INTERVAL,
      timeUpOpen: false,
      peopleWarning: false,
    }
  }

  /**
   * @return {void}
   */
  tick = (): void => {
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

  handleTimeUpClose = (): void => {
    this.setState({ timeUpOpen: false });
  };

  handlePeopleWarningClose = (): void => {
    this.setState({ peopleWarning: false });
  };

  handleBackButton = (): void => {
    this.props.toggleScreen();
  };

  handleSubmit = (): void => {
    if (this.state.people === undefined) {
      this.setState({ peopleWarning: true });
    } else {
      const mEntry = {
        checked: [...this.state.childChecked, ...this.state.teacherChecked],
        people: this.state.people
      };
      this.props.firebase.handlePushCentersData(mEntry);
      this.props.finishVisit(this.props.currentCenter);
      this.props.toggleScreen();
    }
  };

  /**
   * @param {number} value
   * @return {void}
   */
  handleChildToggle = (value: number) => (): void => {
    if (value <=5 && this.childDisabled()) {
      return;
    }
    const { childChecked } = this.state;
    const newChecked: Array<number> = [];
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

  /**
   * @param {number} value
   * @return {void}
   */
  handleTeacherToggle = (value: number) => (): void  => {
    if (value >=6 && this.teacherDisabled()) {
      return;
    }
    const { teacherChecked } = this.state;
    const newChecked: Array<number> = [];
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

  childDisabled = (): boolean  => {
    return (
      this.props.type === "AC" ? (
        this.state.people === TeacherChildEnum.CHILD_1 ||
        this.state.people === undefined
      ) : (
        this.state.people === undefined
      )
    );
  };

  teacherDisabled = (): boolean  => {
    return (
      this.state.people === TeacherChildEnum.CHILD_1 ||
      this.state.people === TeacherChildEnum.CHILD_2 ||
      this.state.people === undefined
    );
  };

  handleChild1Click = (): void  => {
    if (this.state.people !== TeacherChildEnum.CHILD_1) {
      this.setState({ people: TeacherChildEnum.CHILD_1 });

      if (this.props.type === "AC") {
        const { childChecked } = this.state;
        const newChildChecked = [...childChecked];
        for (let i = 1; i <= 5; i++) {
          // If there are child ratings checked, remove them
          if (childChecked.includes(i)) {
            const currentIndex = childChecked.indexOf(i);
            newChildChecked.splice(currentIndex);
          }
        }
        this.setState({ childChecked: newChildChecked });
      }

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

  handleChild2Click = (): void  => {
    if (this.state.people !== TeacherChildEnum.CHILD_2) {
      this.setState({ people: TeacherChildEnum.CHILD_2 });

      const { teacherChecked } = this.state;
      const newChecked = [...teacherChecked];
      for (let i = 6; i <= 10; i++) {
        // If there are teacher ratings checked, remove them
        if (teacherChecked.includes(i)) {
          const currentIndex = teacherChecked.indexOf(i);
          newChecked.splice(currentIndex);
        }
      }
      this.setState({ teacherChecked: newChecked });
    }
  };

  handleTeacherClick = (): void  => {
    if (this.state.people !== TeacherChildEnum.TEACHER) {
      this.setState({ people: TeacherChildEnum.TEACHER });
    }
  };


  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleScreen: PropTypes.func.isRequired,
    finishVisit: PropTypes.func.isRequired,
    currentCenter: PropTypes.string.isRequired,
    teacherFirstName: PropTypes.string.isRequired,
    teacherLastName: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <div>
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
          <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>
            Wait!
          </DialogTitle>
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
                  completeObservation={false}
                  teacherFirstName={this.props.teacherFirstName}
                  teacherLastName={this.props.teacherLastName}
                />
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid>
                <Button size={"small"} onClick={this.handleBackButton} style={{fontFamily: 'Arimo'}}>
                  <KeyboardArrowLeft />
                  Return to Center Menu
                </Button>
              </Grid>
              <Grid container alignItems="center" direction="column" xs={12}>
                <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                  {this.props.currentCenter[0].toUpperCase() +
                    this.props.currentCenter.substr(1)}
                </Typography>
                <div style={{ height: 20 }} />
                <Typography variant={"subtitle2"} style={{fontFamily: 'Arimo', paddingBottom: '1em'}}>
                  Please select the number of children and teachers at the
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
                      onClick={this.handleChild1Click}
                      size="small"
                      variant={
                        this.state.people === TeacherChildEnum.CHILD_1
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: 'Arimo'}}
                    >
                      1 child
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleChild2Click}
                      size="small"
                      variant={
                        this.state.people === TeacherChildEnum.CHILD_2
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: 'Arimo'}}
                    >
                      2+ children without teacher
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={this.handleTeacherClick}
                      size="small"
                      variant={
                        this.state.people === TeacherChildEnum.TEACHER
                          ? "contained"
                          : "outlined"
                      }
                      style={{fontFamily: 'Arimo'}}
                    >
                      1 + child with teacher
                    </Button>
                  </Grid>
                </Grid>
                <div style={{ height: 20 }} />
                <Grid container direction={"row"} spacing={16} xs={12}>
                  <Grid item xs={6}>
                    <Card>
                      <Typography variant="h6" align="center" style={{fontFamily: 'Arimo'}}>
                        Child Behaviors
                      </Typography>
                      <Typography
                        variant="body1"
                        align="center"
                        style={{fontFamily: 'Arimo', paddingLeft: '1em', paddingRight: '1em', height: '5vh', verticalAlign: 'center'}}
                      >
                        {Constants.Checklist[this.props.type].ChildInstructions}
                      </Typography>
                      <List>
                        {Constants.Checklist[this.props.type].ChildBehaviors.map(
                        (value: Array<React.ReactElement>, index: number) => {
                          return (<ListItem
                            key={index}
                            onClick={this.handleChildToggle(index+1)}
                            disabled={this.childDisabled()}
                            style={{height: '12vh'}}
                          >
                            <Checkbox
                              checked={
                                !this.childDisabled() && this.state.childChecked.includes(index+1)
                              }
                            />
                            <ListItemText disableTypography style={{fontFamily: 'Arimo'}}>
                              {value}
                            </ListItemText>
                          </ListItem>);
                        })}
                      </List>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <Typography variant="h6" align={"center"} style={{fontFamily: 'Arimo'}}>
                        Teacher Behaviors
                      </Typography>
                      <Typography
                        variant="body1"
                        align="center"
                        style={{fontFamily: 'Arimo', paddingLeft: '1em', paddingRight: '1em', height: '5vh', verticalAlign: 'center'}}
                      >
                        {Constants.Checklist[this.props.type].TeacherInstructions}
                      </Typography>
                      <List>
                        {Constants.Checklist[this.props.type].TeacherBehaviors.map(
                        (value: Array<React.ReactElement>, index: number) => {
                          return (<ListItem
                            key={index}
                            onClick={this.handleTeacherToggle(index+6)}
                            disabled={this.teacherDisabled()}
                            style={{height: '12vh'}}
                          >
                            <Checkbox
                              checked={
                                !this.teacherDisabled() && this.state.teacherChecked.includes(index+6)
                              }
                            />
                            <ListItemText disableTypography style={{fontFamily: 'Arimo'}}>
                              {value}
                            </ListItemText>
                          </ListItem>);
                        })}
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

export default withStyles(styles)(CenterRatingChecklist);
