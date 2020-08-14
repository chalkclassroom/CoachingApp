import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CenterChecklist from './CenterChecklist';
import NewCenterDialog from './NewCenterDialog';
import CenterRatingChecklist from './CenterRatingChecklist';
import Dashboard from '../Dashboard';
import TotalVisitCount from '../TotalVisitCount';
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import * as Types from '../../constants/Types';

const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column"
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
  main: {
    height: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  },
  centerMenuGrid: {
    direction: 'row'
  },
  dashboardGrid: {
    // xs: 3
    width: '25%'
  },
  contentGrid: {
    // xs: 9
    width: '75%'
  },
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    /* dashboardGrid: {
      xs: 3
    },
    contentGrid: {
      xs: 9
    }, */
  },
  // ipad portrait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    centerMenuGrid: {
      direction: 'column'
    },
    dashboardGrid: {
      // xs: 12
      width: '100%'
    },
    contentGrid: {
      // xs: 12
      width: '100%',
      height: '70%'
    }
  }
};

interface VisitCenterProps {
  centerName: string,
  visitCount: number,
  onClick(): void,
  type: string
}

/**
 * @param {VisitCenterProps} props
 * @return {ReactElement}
 */
const VisitCenterButton = (props: VisitCenterProps): React.ReactElement => {
  let hsl = 0;
  props.type === "AC" ? 
    hsl = Math.max(82 - 4 * props.visitCount, 49.6)
    : props.type === "MI" ?
    hsl = Math.max(70 - 4 * props.visitCount, 30)
    : hsl = Math.max(82 - 4 * props.visitCount, 50);
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        // height: '18vh',
        // width: '18vh',
        minHeight: 150,
        maxHeight: 150,
        minWidth: 150,
        maxWidth: 150,
        whiteSpace: "normal",
        wordWrap: "break-word",
        backgroundColor: props.type === "AC" ?
          `hsl(263.3, 54.9%, ${hsl}%`
          : props.type === "MI" ?
          `hsl(214.2, 88.4%, ${hsl}%`
          : `hsl(49.6, 100%, ${hsl}%`
        ,
        fontFamily: 'Arimo'
      }}
      onClick={(): void => props.onClick()}
    >
      <Typography
        variant="subtitle1"
        style={{fontFamily: 'Arimo', color: props.type === 'SA' ? 'black' : 'white'}}
      >
        {props.centerName}
        <br />
        <br />
        {props.visitCount}
      </Typography>
    </Button>
  );
};

VisitCenterButton.propTypes = {
  centerName: PropTypes.string.isRequired,
  visitCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};


const CENTER_CHECKLIST = 0;
const CENTER_MENU = 1;
const RATING_SCREEN = 2;

interface Props {
  teacher: {
    email: string,
    firstName: string,
    lastName: string,
    notes: string,
    id: string,
    phone: string,
    role: string,
    school: string
  },
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleSession(mEntry: {teacher: string, observedBy: string, type: string}): void,
    handlePushCentersData(mEntry: {checked: Array<number>, people: number}): void
  },
  type: Types.DashboardType,
  addNewCenter(centerName: string): void,
  incrementCenterCount(centerName: string): void,
  updateCount(behavior: string): void,
  centers: Array<{
    name: string,
    count: number
  }>,
  classes: {
    root: string,
    grow: string,
    backButton: string,
    main: string,
    centerMenuGrid: string,
    dashboardGrid: string,
    contentGrid: string
  },
}

interface State{
  addDialog: boolean,
  status: number,
  currentCenter: string,
  totalVisitCount: number
}

/**
 * Center Menu
 * @class CenterMenu
 */
class CenterMenu extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
    const mEntry = {
      teacher: this.props.teacher.id,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: this.props.type === 'MI' ? 'math'
        : this.props.type === 'SA' ? 'sequential'
        : 'AC'
    };
    this.props.firebase.handleSession(mEntry);

    this.state = {
      addDialog: false,
      status: CENTER_CHECKLIST,
      currentCenter: null,
      totalVisitCount: 0
    }
  }

  handleClickOpen = (): void => {
    this.setState({ addDialog: true });
  };

  handleClose = (): void => {
    this.setState({ addDialog: false });
  };

  switchToCenterChecklist = (): void => {
    this.setState({ status: CENTER_CHECKLIST });
  };

  switchToCenterMenu = (): void => {
    this.setState({ status: CENTER_MENU });
  };

  switchToRatingScreen = (): void => {
    this.setState({ status: RATING_SCREEN });
  };

  /**
   * @param {string} centerName
   */
  handleAddCenter = (centerName: string): void => {
    this.props.addNewCenter(centerName);
    this.handleClose();
  };

  /**
   * @param {string} centerName
   */
  handleCenterVisit = (centerName: string): void => {
    this.switchToRatingScreen();
    this.setState({ currentCenter: centerName });
  };

  /**
   * @param {string} centerName
   */
  finishCenterVisit = (centerName: string): void => {
    if (centerName !== undefined) {
      this.props.incrementCenterCount(centerName);
      this.setState({ totalVisitCount: this.state.totalVisitCount + 1 });
    }
  };

  backToCenterMenu = (): void => {
    this.setState({ status: CENTER_MENU });
  }

  static propTypes = {
    teacher: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired,
    // classes: PropTypes.object.isRequired,
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        currentUser: PropTypes.exact({
          uid: PropTypes.string
        })
      }).isRequired,
      handleSession: PropTypes.func,
      handlePushCentersData: PropTypes.func
    }).isRequired,
    addNewCenter: PropTypes.func.isRequired,
    incrementCenterCount: PropTypes.func.isRequired,
    updateCount: PropTypes.func.isRequired,
    centers: PropTypes.array.isRequired,
    type: PropTypes.oneOf<Types.DashboardType>(['AppBar', 'TT', 'CC', 'MI', 'SE', 'LI', 'LC', 'SA', 'AC', 'RedGraph', 'NotPresent']).isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    // const { classes } = this.props;
    switch (this.state.status) {
      case CENTER_CHECKLIST:
        return (
          <CenterChecklist
            switchToCenterMenu={this.switchToCenterMenu}
            addCenter={this.props.addNewCenter}
          />
        );
      case CENTER_MENU:
        return (
          <div className={this.props.classes.main}>
            <Grid
              container
              justify="space-around"
              alignItems="center"
              style={{height: '100%'}}
              className={this.props.classes.centerMenuGrid}
            >
              <NewCenterDialog
                open={this.state.addDialog}
                handleClose={this.handleClose}
                handleSubmit={this.handleAddCenter}
              />
              <Grid item className={this.props.classes.dashboardGrid}>
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
                        <TotalVisitCount count={this.state.totalVisitCount} />
                      }
                      infoPlacement="flex-start"
                      completeObservation={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={this.props.classes.contentGrid}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  {this.props.centers.map((center, index) => (
                    <Grid
                      key={index}
                      item
                      xs={4}
                      style={{ textAlign: "center", paddingTop: '1em' }}
                    >
                      <VisitCenterButton
                        centerName={center.name}
                        visitCount={center.count}
                        onClick={(): void => this.handleCenterVisit(center.name)}
                        type={this.props.type}
                      />
                    </Grid>
                  ))}
                  <Grid
                    item
                    xs={4}
                    style={{ textAlign: "center", paddingTop: '1em' }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        // height: '18vh',
                        // width: '18vh',
                        minHeight: 150,
                        maxHeight: 150,
                        minWidth: 150,
                        maxWidth: 150,
                        backgroundColor: grey[400],
                        fontFamily: 'Arimo'
                      }}
                      onClick={this.handleClickOpen}
                    >
                      Add Center <br /> <br /> +
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      case RATING_SCREEN:
        return (
          <CenterRatingChecklist
            currentCenter={this.state.currentCenter}
            toggleScreen={this.switchToCenterMenu}
            updateCount={this.props.updateCount}
            finishVisit={(centerName): void => this.finishCenterVisit(centerName)}
            backToCenterMenu={this.backToCenterMenu}
            firebase={this.props.firebase}
            type={this.props.type}
          />
        );
      default:
        return <div>Unknown status value!!!</div>;
    }
  }
}



export default withStyles(styles)(CenterMenu);