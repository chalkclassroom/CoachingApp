import * as React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from '@material-ui/core/DialogActions';
import Grid from "@material-ui/core/Grid";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../Dashboard";
import Countdown from "../Countdown";
import Math1 from '../../assets/images/Math1.svg';
import Math2 from '../../assets/images/Math2.svg';
import Math3 from '../../assets/images/Math3.svg';
import Sequential1 from '../../assets/images/Sequential1.svg';
import Sequential2 from '../../assets/images/Sequential2.svg';
import Sequential3 from '../../assets/images/Sequential3.svg';
import AC1 from '../../assets/images/AC1.svg';
import AC2 from '../../assets/images/AC2.svg';
import AC3 from '../../assets/images/AC3.svg';
import Gray1 from '../../assets/images/Gray1.svg';
import Gray2 from '../../assets/images/Gray2.svg';
import Gray3 from '../../assets/images/Gray3.svg';
import * as Constants from '../../constants/Constants';
import * as Types from '../../constants/Types';
import Zoom from '@material-ui/core/Zoom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
  startTime:string
  forceComplete: boolean
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
  isStopped: boolean
  canForceEndSession: boolean
}

type ChecklistKey = 'MI' | 'AC' | 'SA';

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
      final: false,
      isStopped: false,
      canForceEndSession: false
    }
  }

  stopTimer = (): void => {
    this.setState({ isStopped: true });
  };

  startTimer = (): void => {
    this.setState({ isStopped: false });
  };

  /**
   * @return {void}
   */
  tick = (): void => {
    if (this.state.time <= 0) {
      clearInterval(this.timer);
      if (this.state.final) {
        this.handleChecklists();
        this.handleTimeUpNotification();
      } else {
        this.handleTimeUpNotification();
      }
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - (this.state.isStopped ? 0 : 1000) });
      }
    }
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.timer = global.setInterval(this.tick, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if(prevProps.forceComplete !== this.props.forceComplete) {
      console.log('ENDING...')
      let [childChecked, teacherChecked] = this.handleChecklists()
      this.handleCentersData(childChecked, teacherChecked)
      this.handleStoreData()
      this.setState({canForceEndSession: true})
    }
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  handleTimeUpNotification = (): void => {
    if (this.state.people) {
      this.setState({ timeUpOpen: true });
    } else {
      this.setState({ peopleWarning: true })
    }
  };

  handleTimeUpClose = (): void => {
    this.setState({ timeUpOpen: false });
  };

  handlePeopleWarningClose = (): void => {
    this.setState({ peopleWarning: false });
  };

  handlePeopleWarningOpen = (): void => {
    this.setState({
      peopleWarning: true
    });
  }

  handleBackButton = (): void => {
    this.props.toggleScreen();
  };

  handleCentersData = (childChecked: Array<number>, teacherChecked: Array<number>) => {
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
    let validChildChecked = this.props.type === 'AC' ? ACChildChecked : childChecked;
    if (validChildChecked.includes(5) && validChildChecked.length > 1) {
      validChildChecked = validChildChecked.filter(e => e !== 5)
    }
    let validTeacherChecked = teacherChecked;
    if (teacherChecked.includes(10) && teacherChecked.length > 1) {
      validTeacherChecked = teacherChecked.filter(e => e !== 10)
    }
    const mEntry = {
      checked: [...validChildChecked, ...validTeacherChecked],
      people: this.state.people
    };
    this.props.firebase.handlePushCentersData(mEntry);
  }

  handleStoreData = () => {
    this.props.finishVisit(this.props.currentCenter);
    if (this.props.type==="AC" && this.state.people===TeacherChildEnum.CHILD_1) {
      this.props.updateCount('noOpp')
    } else if (
      this.state.childChecked.includes(1) ||
      this.state.childChecked.includes(2) ||
      this.state.childChecked.includes(3) ||
      this.state.childChecked.includes(4)
    ){
      this.props.updateCount('true')
    } else {
      this.props.updateCount('false')
    }
  }

  /**
   *
   * @param {Array<number>} childChecked
   * @param {Array<number>} teacherChecked
   */
  handleSubmit = (): void => {
    if (this.state.people === undefined) {
      this.setState({ peopleWarning: true });
    } else {
      let [childChecked, teacherChecked] = this.handleChecklists()
     this.handleCentersData(childChecked, teacherChecked)
     this.handleStoreData()
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
      this.handleSubmit();
    });
  }

  handleChecklists = (): number[][] => {
    let childChecked = this.state.childChecked.length  > 0 ? this.state.childChecked : [5]
    let teacherChecked = this.state.teacherChecked.length > 0 ? this.state.teacherChecked : [10]
  return [childChecked, teacherChecked]

  }

  /**
   * @param {number} value
   * @return {void}
   */
  handleChildToggle = (value: number) => (): void => {
    if (this.state.people === null) {
      this.setState({ peopleWarning: true })
    } else {
      if (value <=5 && this.childDisabled()) {
        return;
      }
      const { childChecked } = this.state;
      const newChecked: Array<number> = [];
      newChecked.push(...childChecked);
        const currentIndex = childChecked.indexOf(value);
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
      this.setState({childChecked: newChecked});
    }
  }

  /**
   * @param {number} value
   * @return {void}
   */
  handleTeacherToggle = (value: number) => (): void  => {
    if (this.state.people === null) {
      this.setState({ peopleWarning: true })
    } else {
      if (value >=6 && this.teacherDisabled()) {
        return;
      }
      const { teacherChecked } = this.state;
      const newChecked: Array<number> = [];
      newChecked.push(...teacherChecked);
        const currentIndex = teacherChecked.indexOf(value);
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
      this.setState({teacherChecked: newChecked});
    }
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

  /*
   * We're reenabling the "Complete Observation" button
   *
   * This function will get passed to the Dashboard Component, which
   *  will then pass it to the 'YesNoDialog'. So the button will run this
   *  function instead of the usual function
   */
  handleCompleteObservation = (): void => {
    if (this.state.final) {
      this.handleChecklists();
    }
    
    this.handleTimeUpNotification();
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleScreen: PropTypes.func.isRequired,
    finishVisit: PropTypes.func.isRequired,
    updateCount: PropTypes.func.isRequired,
    currentCenter: PropTypes.string.isRequired,
    backToCenterMenu: PropTypes.func.isRequired,
    type: PropTypes.oneOf<Types.DashboardType>([
      'AppBar',
      'TT',
      'CC',
      'MI',
      'SE',
      'IN',
      'LC',
      'SA',
      'LI',
      'AC',
      'RedGraph',
      'NotPresent'
    ]).isRequired
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
          {(this.state.childChecked.length > 0 || this.state.teacherChecked.length > 0 || (this.props.type === 'AC' && this.state.people === 1))? (
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
        <Dialog
          open={this.state.peopleWarning}
          aria-labelledby="simple-dialog-title"
        >
        <ClickAwayListener onClickAway={(): void => this.handlePeopleWarningClose()}>
          <DialogContent>
          <DialogTitle style={{padding: 0}}>
            <Grid container justify="flex-end">
                <IconButton onClick={():void => this.handlePeopleWarningClose()} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                  <CloseIcon/>
                </IconButton>
            </Grid>
          </DialogTitle>
            <DialogContentText id="alert-dialog-description">
              <Typography align='center' style={{fontFamily: 'Arimo', fontSize: '1.5em', color: 'black'}}>
                Please select the number of children and teachers at the center.
              </Typography>
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Arimo', fontSize: '1em', color: 'black'}}>
              If teachers or students leave or join while you are observing a center,
              make sure your final selection reflects the largest number of people
              that were present at any point during the 1 minute observation in that
              center.
            </DialogContentText>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="flex-start"
              style={{paddingTop: '1em', paddingBottom: '1em'}}
            >
              <Grid item xs={4}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Button
                    onClick={this.handleChild1Click}
                    size="small"
                    style={{fontFamily: 'Arimo'}}
                  >
                    <img
                      src={
                        (this.state.people === 2 || this.state.people === 3) ? Gray1
                          : this.props.type === 'MI' ? Math1
                          : this.props.type === 'SA' ? Sequential1
                          : AC1
                      }
                      alt="1 child"
                    />
                  </Button>
                  <Typography variant='h5' align='center' style={{fontFamily: 'Arimo', fontSize: '1.5em'}}>
                    1 child
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Button
                    onClick={this.handleChild2Click}
                    size="small"
                    style={{fontFamily: 'Arimo'}}
                  >
                    <img
                      src={
                        (this.state.people === 1 || this.state.people === 3) ? Gray2
                          : this.props.type === 'MI' ? Math2
                          : this.props.type === 'SA' ? Sequential2
                          : AC2
                      }

                      alt="2+ children without teacher"
                    />
                  </Button>
                  <Typography variant='h5' align='center' style={{fontFamily: 'Arimo', fontSize: '1.5em'}}>
                    2+ children without teacher
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Button
                    onClick={this.handleTeacherClick}
                    size="small"
                    style={{fontFamily: 'Arimo'}}
                  >
                    <img
                      src={
                        (this.state.people === 1 || this.state.people === 2) ? Gray3
                          : this.props.type === 'MI' ? Math3
                          : this.props.type === 'SA' ? Sequential3
                          : AC3
                      }
                      alt="1+ child with teacher"
                    />
                  </Button>
                  <Typography variant='h5' align='center' style={{fontFamily: 'Arimo', fontSize: '1.5em'}}>
                    1+ child with teacher
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </ClickAwayListener>
        </Dialog>
        <main className={classes.main}>
          <Grid
            container
            alignItems={"center"}
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
                    infoDisplay={
                      <>
                      <div onClick={() => this.handleCompleteObservation()}>Sweet</div>
                      <Countdown
                        type={this.props.type}
                        time={this.state.time}
                        timerTime={60000}

                      />

                      </>
                    }
                    infoPlacement="center"
                    completeObservation={true}
                    startTimer={this.startTimer}
                    stopTimer={this.stopTimer}
                    startTime={this.props.startTime}
                    forceComplete={this.state.canForceEndSession}
                    completeCallBackFunctionOverride={() => this.handleCompleteObservation()}
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
                    <Grid item xs={2} >
                      <Grid container direction="row" justify="center" alignItems="center">
                        <IconButton onClick={this.handleReturnToCenterMenu} style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <div style={{ height: '0.5em' }} />
                  <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item xs={8} style={{height: '100%'}}>
                      <Grid container direction='row' alignItems='flex-end' justify='center'>
                        <Typography variant={"subtitle2"} align='center' style={{fontFamily: 'Arimo'}}>
                          Please select the number of children and teachers at the
                          center.
                        </Typography>
                        <InfoIcon
                        style={{
                          fill: "black",
                          marginRight: '0.3em',
                          marginTop: '0.1em',
                          paddingLeft: '0.3em'
                        }}
                        onClick={(): void => {
                          this.handlePeopleWarningOpen();
                        }}
                      />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction={"row"}
                    justify={"space-evenly"}
                    xs={12}
                    style={{paddingBottom: '0.5em'}}
                  >
                    <Grid item>
                      <Button
                        onClick={this.handleChild1Click}
                        size="small"
                        style={{fontFamily: 'Arimo'}}
                      >
                        <img
                          src={
                            (this.state.people === 2 || this.state.people === 3) ? Gray1
                              : this.props.type === 'MI' ? Math1
                              : this.props.type === 'SA' ? Sequential1
                              : AC1
                          }
                          alt="1 child"
                        />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={this.handleChild2Click}
                        size="small"
                        style={{fontFamily: 'Arimo'}}
                      >
                        <img
                          src={
                            (this.state.people === 1 || this.state.people === 3) ? Gray2
                              : this.props.type === 'MI' ? Math2
                              : this.props.type === 'SA' ? Sequential2
                              : AC2
                          }

                          alt="2+ children without teacher"
                        />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={this.handleTeacherClick}
                        size="small"
                        style={{fontFamily: 'Arimo'}}
                      >
                        <img
                          src={
                            (this.state.people === 1 || this.state.people === 2) ? Gray3
                              : this.props.type === 'MI' ? Math3
                              : this.props.type === 'SA' ? Sequential3
                              : AC3
                          }
                          alt="1+ child with teacher"
                        />
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container direction={"row"} spacing={2} xs={12}>
                    <Grid item xs={6}>
                      <Card>
                        <Typography
                          variant="h6"
                          align="center"
                          style={{
                            fontFamily: 'Arimo',
                            color: (this.childDisabled() || (this.state.people === null)) ? 'gray' : 'black',
                            opacity: (this.childDisabled() || (this.state.people === null)) ? '0.75' : '1'
                          }}
                        >
                          Child Behaviors
                        </Typography>
                        <Typography
                          variant="body1"
                          align="center"
                          className={classes.instructionText}
                          style={{
                            color: (this.childDisabled() || (this.state.people === null)) ? 'gray' : 'black',
                            opacity: (this.childDisabled() || (this.state.people === null)) ? '0.75' : '1'
                          }}
                        >
                          {Constants.Checklist[this.props.type as ChecklistKey].ChildInstructions}
                        </Typography>
                        <List style={{paddingBottom: 0}}>
                          {Constants.Checklist[this.props.type as ChecklistKey].ChildBehaviors.map(
                            (value: JSX.Element, index: number): JSX.Element => {
                              return (
                                <ListItem
                                  key={index}
                                  id={'child' + index}
                                  onClick={this.handleChildToggle(index+1)}
                                  disabled={this.childDisabled() || (this.state.people === null)}
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
                                </ListItem>
                              );
                            }
                          )}
                          {this.props.type === 'AC' ? (
                            <div className={classes.checklistItem} />
                          ) : (null)}
                        </List>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <Typography
                          variant="h6"
                          align={"center"}
                          style={{
                            fontFamily: 'Arimo',
                            color: (this.teacherDisabled() || (this.state.people === null)) ? 'gray' : 'black',
                            opacity: (this.teacherDisabled() || (this.state.people === null)) ? '0.75' : '1'
                          }}
                        >
                          Teacher Behaviors
                        </Typography>
                        <Typography
                          variant="body1"
                          align="center"
                          className={classes.instructionText}
                          style={{
                            color: (this.teacherDisabled() || (this.state.people === null)) ? 'gray' : 'black',
                            opacity: (this.teacherDisabled() || (this.state.people === null)) ? '0.75' : '1'
                          }}
                        >
                          {Constants.Checklist[this.props.type as ChecklistKey].TeacherInstructions}
                        </Typography>
                        <List style={{paddingBottom: 0}}>
                          {Constants.Checklist[this.props.type as ChecklistKey].TeacherBehaviors.map(
                            (value: JSX.Element, index: number): JSX.Element => {
                              return (
                                <ListItem
                                  key={index}
                                  id={'teacher' + index}
                                  onClick={this.handleTeacherToggle(index+6)}
                                  disabled={this.teacherDisabled() || (this.state.people === null)}
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
                                </ListItem>
                              );
                            }
                          )}
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

export default withStyles(styles)(CenterRatingChecklist);
