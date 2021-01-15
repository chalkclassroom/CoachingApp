import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from '@material-ui/core/DialogActions';
import Grid from "@material-ui/core/Grid";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard";
import Countdown from "../Countdown";
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import Zoom from '@material-ui/core/Zoom';

const styles: object = {
  root: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    height: '100vh',
    fontFamily: "Arimo"
  },
  grow: {
    flexGrow: 1
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
  instructionText: {
    fontFamily: 'Arimo',
    paddingLeft: '1em',
    paddingRight: '1em',
    height: '9vh',
    verticalAlign: 'center'
  },
  main: {
    height: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  },
  grid: {
    direction: 'row'
  },
  dashboardGrid: {
    width: '25%'
  },
  contentGrid: {
    width: '75%'
  },
  checklistItem: {
    height: '10vh'
  },
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
  },
  // ipad portrait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    grid: {
      direction: 'column'
    },
    dashboardGrid: {
      height: '25%',
      width: '100%'
    },
    contentGrid: {
      height: '75%',
      width: '100%'
    },
    checklistItem: {
      height: '7vh'
    },
    instructionText: {
      height: '7vh'
    }
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
  updateCount(behavior: string): void,
  currentCenter: string,
  classes: {
    root: string,
    grow: string,
    backButton: string,
    instructionText: string,
    main: string,
    grid: string,
    dashboardGrid: string,
    contentGrid: string,
    checklistItem: string
  },
  firebase: {
    handlePushCentersData(mEntry: {checked: Array<number>, people: number | null}): void
  },
  type: Types.DashboardType,
  backToCenterMenu(): void
}

interface State {
  childChecked: Array<number>,
  teacherChecked: Array<number>,
  people: number | null,
  time: number,
  timeUpOpen: boolean,
  peopleWarning: boolean,
  confirmReturn: boolean,
  final: boolean
}

type ChecklistKey = 'MI' | 'AC' | 'SA';

interface ChecklistContents {
  ChildInstructions: string,
  TeacherInstructions: string,
  ChildBehaviors: JSX.Element[],
  TeacherBehaviors: JSX.Element[]
}

type ChecklistContentsKey = keyof ChecklistContents;

/**
 * Center Rating Checklist
 * @class CenterRatingChecklist
 * @return {void}
 */
class CenterRatingChecklist extends React.Component<Props, State> {
  timer: NodeJS.Timeout;
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      childChecked: [],
      teacherChecked: [],
      people: null,
      time: RATING_INTERVAL,
      timeUpOpen: false,
      peopleWarning: false,
      confirmReturn: false,
      final: false
    }
  }

  /**
   * @return {void}
   */
  tick = (): void => {
    console.log('this state people', this.state.people);
    if (this.state.time <= 0) {
      clearInterval(this.timer);
      if (this.state.final) {
        this.handleChecklists();
        /* if (this.state.checked.length > 0) {
          this.handleSubmit(this.state.checked);
        } else {
          this.handleSubmit([7]);
        } */
        // this.setState({ final: false })
      } else {
        this.handleTimeUpNotification();
      }
      // this.handleTimeUpNotification();
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
    this.timer = global.setInterval(this.tick, 1000);
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  handleTimeUpNotification = (): void => {
    if (this.state.people) {
      console.log('if this state people');
      this.setState({ timeUpOpen: true });
    } else {
      console.log('else');
      this.setState({ peopleWarning: true })
    }
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

  /**
   * 
   * @param {Array<number>} childChecked
   * @param {Array<number>} teacherChecked
   */
  handleSubmit = (childChecked: Array<number>, teacherChecked: Array<number>): void => {
    if (this.state.people === undefined) {
      this.setState({ peopleWarning: true });
    } else {
      const ACChildChecked: Array<number> = [];
      if (this.props.type === 'AC') {
        childChecked.forEach((value: number) => {
          if (value !== 5) {
            ACChildChecked.push(value+1)
          } else {
            ACChildChecked.push(value)
          }
        })
      }
      const mEntry = {
        // checked: [...this.state.childChecked, ...this.state.teacherChecked],
        checked: this.props.type === 'AC' ? ([...ACChildChecked, ...teacherChecked]) : ([...childChecked, ...teacherChecked]),
        people: this.state.people
      };
      this.props.firebase.handlePushCentersData(mEntry);
      this.props.finishVisit(this.props.currentCenter);
      if (this.props.type==="AC" && this.state.people===TeacherChildEnum.CHILD_1) {
        this.props.updateCount('noOpp')
      } else if (this.state.childChecked.includes(5)){
        this.props.updateCount('false')
      } else {
        this.props.updateCount('true')
      }
      this.props.toggleScreen();
    }
  };

  handleFinish = (): void => {
    this.setState({
      timeUpOpen: false,
      time: 10000,
      final: true
    }, () => {this.timer = global.setInterval(this.tick, 1000)})
  }

  handleNext = (): void => {
    this.setState({
      timeUpOpen: false,
      time: 60000
    }, () => {
      /* if (this.state.childChecked.length > 0 && this.state.teacherChecked.length > 0) {
        this.handleSubmit(this.state.childChecked, this.state.teacherChecked);
      } else if (this.state.childChecked.length > 0 && this.state.teacherChecked.length === 0) {
        this.handleSubmit(this.state.childChecked, [10]);
      } else if (this.state.childChecked.length === 0 && this.state.teacherChecked.length > 0) {
        this.handleSubmit([5], this.state.teacherChecked);
      } else {
        this.handleSubmit([5], [10]);
      } */
      this.handleChecklists();
    });
  }

  handleChecklists = (): void => {
    if (this.state.childChecked.length > 0 && this.state.teacherChecked.length > 0) {
      this.handleSubmit(this.state.childChecked, this.state.teacherChecked);
    } else if (this.state.childChecked.length > 0 && this.state.teacherChecked.length === 0) {
      this.handleSubmit(this.state.childChecked, [10]);
    } else if (this.state.childChecked.length === 0 && this.state.teacherChecked.length > 0) {
      this.handleSubmit([5], this.state.teacherChecked);
    } else {
      this.handleSubmit([5], [10]);
    }
  }

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
    /* if (((childChecked.includes(5) && value != 5) ||
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

    } */
    newChecked.push(...childChecked);
      const currentIndex = childChecked.indexOf(value);

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
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
    /* if (((teacherChecked.includes(10) && value != 10) ||
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

    } */
    newChecked.push(...teacherChecked);
      const currentIndex = teacherChecked.indexOf(value);

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
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
    this.handlePeopleWarningClose();
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
      this.setState({ teacherChecked: newTeacherChecked }, () => {
        if (this.state.time <= 0) {
          this.setState({ timeUpOpen: true })
        }
      });
    }
  };

  handleChild2Click = (): void  => {
    this.handlePeopleWarningClose();
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
      this.setState({ teacherChecked: newChecked }, () => {
        if (this.state.time <= 0) {
          this.setState({ timeUpOpen: true })
        }
      });
    }
  };

  handleTeacherClick = (): void  => {
    this.handlePeopleWarningClose();
    if (this.state.people !== TeacherChildEnum.TEACHER) {
      this.setState({ people: TeacherChildEnum.TEACHER }, () => {
        if (this.state.time <= 0) {
          this.setState({ timeUpOpen: true })
        }
      });
    }
  };

  handleReturnToCenterMenu = (): void => {
    if (this.state.people === null) {
      this.props.backToCenterMenu();
    } else {
      this.setState({ confirmReturn: true });
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleScreen: PropTypes.func.isRequired,
    finishVisit: PropTypes.func.isRequired,
    updateCount: PropTypes.func.isRequired,
    currentCenter: PropTypes.string.isRequired,
    backToCenterMenu: PropTypes.func.isRequired,
    type: PropTypes.oneOf<Types.DashboardType>(['AppBar', 'TT', 'CC', 'MI', 'SE', 'IN', 'LC', 'SA', 'LI', 'AC', 'RedGraph', 'NotPresent']).isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.timeUpOpen}
          aria-labelledby="simple-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          {(this.state.childChecked.length > 0 || this.state.teacherChecked.length > 0)? (
            <div>
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
        <Dialog
          open={this.state.confirmReturn}
          aria-labelledby="simple-dialog-title"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo', fontSize: '1.5em'}}>
              Are you sure you want to return to the center menu?
              You will lose the selection(s) you have made.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(): void => this.props.backToCenterMenu()}>
              Yes
            </Button>
            <Button onClick={(): void => this.setState({ confirmReturn: false })}>
              No
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Dialog
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
        </Dialog> */}
        <Dialog
          open={this.state.peopleWarning}
          onClose={this.handlePeopleWarningClose}
          aria-labelledby="simple-dialog-title"
        >
          {/* <DialogTitle id="simple-dialog-title" style={{fontFamily: 'Arimo'}}>
            Wait!
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo', fontSize: '1.5em'}}>
              Please select the number of children and teachers at the center
              before submitting your rating.
            </DialogContentText>
            <Grid container direction="row" justify="space-around" alignItems="center" style={{paddingTop: '1em', paddingBottom: '1em'}}>
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
          </DialogContent>
        </Dialog>
        <main className={classes.main}>
          <Grid
            container
            alignItems={"center"}
            // direction={"row"}
            justify={"space-around"}
            style={{height: '100%'}}
            className={classes.grid}
          >
            <Grid item className={classes.dashboardGrid}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
                style={{height: '100%'}}
              >
                <Grid item>
                <Dashboard
                  type={this.props.type}
                  infoDisplay={<Countdown type={this.props.type} time={this.state.time} timerTime={60000} />}
                  infoPlacement="center"
                  completeObservation={false}
                />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.contentGrid}>
              <Zoom in={true}>
                <Grid container alignItems="center" direction="column">
                  <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={2} />
                    <Grid item>
                      <Typography variant="h5" style={{fontFamily: 'Arimo'}}>
                        {this.props.currentCenter[0].toUpperCase() +
                        this.props.currentCenter.substr(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={this.handleReturnToCenterMenu} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <div style={{ height: '0.5em' }} />
                  <Typography variant={"subtitle2"} style={{fontFamily: 'Arimo', paddingBottom: '0.5em'}}>
                    Please select the number of children and teachers at the
                    center:
                  </Typography>
                  <Grid
                    container
                    direction={"row"}
                    justify={"space-around"}
                    xs={12}
                    style={{paddingBottom: '0.5em'}}
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
                  <Grid container direction={"row"} spacing={2} xs={12}>
                    <Grid item xs={6}>
                      <Card>
                        <Typography variant="h6" align="center" style={{fontFamily: 'Arimo'}}>
                          Child Behaviors
                        </Typography>
                        <Typography
                          variant="body1"
                          align="center"
                          className={classes.instructionText}
                        >
                          {Constants.Checklist[this.props.type as ChecklistKey].ChildInstructions}
                        </Typography>
                        <List style={{paddingBottom: 0}}>
                          {Constants.Checklist[this.props.type as ChecklistKey].ChildBehaviors.map(
                          (value: JSX.Element, index: number): JSX.Element => {
                            return (<ListItem
                              key={index}
                              onClick={this.handleChildToggle(index+1)}
                              disabled={this.childDisabled()}
                              className={classes.checklistItem}
                            >
                              <ListItemIcon>
                                { value.props.children ? (
                                <Checkbox
                                  checked={
                                    !this.childDisabled() && this.state.childChecked.includes(index+1)
                                  }
                                />
                                ) : (null)
                          }
                              </ListItemIcon>
                              <ListItemText disableTypography style={{fontFamily: 'Arimo', fontSize: '1em'}}>
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
                          className={classes.instructionText}
                        >
                          {Constants.Checklist[this.props.type as ChecklistKey].TeacherInstructions}
                        </Typography>
                        <List style={{paddingBottom: 0}}>
                          {Constants.Checklist[this.props.type as ChecklistKey].TeacherBehaviors.map(
                          (value: JSX.Element, index: number): JSX.Element => {
                            return (<ListItem
                              key={index}
                              onClick={this.handleTeacherToggle(index+6)}
                              disabled={this.teacherDisabled()}
                              className={classes.checklistItem}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  checked={
                                    !this.teacherDisabled() && this.state.teacherChecked.includes(index+6)
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText disableTypography style={{fontFamily: 'Arimo', fontSize: '1em'}}>
                                {value}
                              </ListItemText>
                            </ListItem>);
                          })}
                        </List>
                      </Card>
                    </Grid>
                  </Grid>
                  {/* <Grid
                    container
                    alignItems={"center"}
                    justify={"space-between"}
                    direction={"row"}
                    style={{padding: '0.7em'}}
                  >
                    <Button
                      variant="contained"
                      onClick={this.handleReturnToCenterMenu}
                      style={{ fontFamily: 'Arimo' }}
                    >
                      Return to Center Menu
                    </Button>
                    <Button
                      variant="contained"
                      color={"secondary"}
                      onClick={this.handleSubmit}
                      style={{ fontFamily: 'Arimo' }}
                    >
                      Submit
                    </Button>
                  </Grid> */}
                </Grid>
              </Zoom>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(CenterRatingChecklist);
