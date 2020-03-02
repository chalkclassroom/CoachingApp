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
// const TEN_PERCENT = 0.1 * RATING_INTERVAL;

interface Props {
  // toggleScreen(): void,
  // finishVisit(centerName: string): void,
  classes: {
    root: string,
    grow: string
  },
  magic8: string,
  color: string,
  checklist: {ChildBehaviors: Array<string>, TeacherBehaviors: Array<string>}
}

interface State {
  checked: Array<number>,
  people: number,
  time: number,
  timeUpOpen: boolean,
  peopleWarning: boolean
}

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

    this.state = {
      checked: [],
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
    console.log('submitting checklist ', [...this.state.childChecked, ...this.state.teacherChecked])
    if (this.state.people === undefined) {
      this.setState({ peopleWarning: true });
    } else {
      const mEntry = {
        checked: [...this.state.checked],
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
  handleCheck = (value: number) => (): void => {
    const { checked } = this.state;
    const newChecked: Array<number> = [];
    console.log('newChecked starts as ', newChecked);
    if (((checked.includes(7) && value != 7) || 
    (checked.includes(1) || checked.includes(2) ||
    checked.includes(3) || checked.includes(4) || checked.includes(5) 
    || checked.includes(6)) && value === 7)) {
      newChecked.splice(0, newChecked.length);
      newChecked.push(value);
      console.log('after if condition ', newChecked);
    } else {
      newChecked.push(...checked);
      const currentIndex = checked.indexOf(value);

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      
      console.log('after else condition ', newChecked);
    }
    this.setState({checked: newChecked});
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    // toggleScreen: PropTypes.func.isRequired,
    // finishVisit: PropTypes.func.isRequired,
    magic8: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
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
          onClose={this.handleTimeUpClose}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>
            Don&apos;t forget to circulate!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo'}}>
              You&apos;ve been at this center for 1 minute.
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
                  magic8={this.props.magic8}
                  color={this.props.color}
                  infoDisplay={<Countdown color={this.props.color} timerTime={60000} />}
                  infoPlacement="center"
                  completeObservation={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid container alignItems="center" direction="column" xs={12}>
                <div style={{ height: 20 }} />
                <Grid container direction={"row"} justify="center" alignItems="center" spacing={16} xs={12}>
                  <Grid item xs={11}>
                    <Card>
                      <Typography variant="h6" align={"center"}>
                        Teacher Behaviors
                      </Typography>
                      <List>
                        {this.props.checklist.TeacherBehaviors.map((value, index) => {
                          return (<ListItem
                            key={index}
                            onClick={this.handleCheck(index+1)}
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(TeacherChecklist);