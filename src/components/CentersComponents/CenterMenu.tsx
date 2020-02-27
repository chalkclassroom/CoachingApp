import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CenterChecklist from './CenterChecklist';
import NewCenterDialog from './NewCenterDialog';
import CenterRatingChecklist from './CenterRatingChecklist';
import Dashboard from '../Dashboard.js';
import TotalVisitCount from '../TotalVisitCount';
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
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

interface VisitCenterProps {
  centerName: string,
  visitCount: number,
  onClick(): void 
}

/**
 * @param {VisitCenterProps} props
 * @return {ReactElement}
 */
const VisitCenterButton = (props: VisitCenterProps): React.ReactElement => {
  const hsl = Math.max(82 - 4 * props.visitCount, 54);
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        minHeight: 150,
        maxHeight: 150,
        minWidth: 150,
        maxWidth: 150,
        whiteSpace: "normal",
        wordWrap: "break-word",
        backgroundColor: `hsl(263, 55%, ${hsl}%`,
        fontFamily: 'Arimo'
      }}
      onClick={props.onClick}
    >
      {props.centerName}
      <br />
      <br />
      {props.visitCount}
    </Button>
  );
};


const CENTER_CHECKLIST = 0;
const CENTER_MENU = 1;
const RATING_SCREEN = 2;

interface Props {
  teacherId: string,
  firebase: {
    auth: {
      currentUser: {
        uid: string
      }
    },
    handleSession(mEntry: {teacher: string, observedBy: string, type: string}): void,
    handlePushCentersData(mEntry: {checked: Array<number>, people: number}): void
  },
  type: string,
  onStatusChange(enable: boolean): void,
  addNewCenter(centerName: string): void,
  incrementCenterCount(centerName: string): void,
  centers: Array<{
    name: string,
    count: number
  }>,
  magic8: string,
  color: string,
  checklist: {ChildBehaviors: Array<string>, TeacherBehaviors: Array<string>}
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
      teacher: this.props.teacherId,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: this.props.type
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
    this.props.onStatusChange(true);
  };

  switchToRatingScreen = (): void => {
    this.setState({ status: RATING_SCREEN });
    this.props.onStatusChange(false);
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

  static propTypes = {
    onStatusChange: PropTypes.func.isRequired,
    teacherId: PropTypes.string,
    firebase: PropTypes.object.isRequired,
    addNewCenter: PropTypes.func.isRequired,
    incrementCenterCount: PropTypes.func.isRequired,
    centers: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    magic8: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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
          <div>
            <Grid
              justify="center"
              alignItems="stretch"
              direction="row"
              style={{ margin: 10 }}
            >
              <Grid justify="flex-start" alignItems="center" direction="row">
                <Grid container spacing={0} direction="row" alignItems="center">
                  <NewCenterDialog
                    open={this.state.addDialog}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleAddCenter}
                  />
                  <Grid item xs={3}>
                    <Grid
                      container
                      alignItems={"center"}
                      justify={"center"}
                      direction={"column"}
                    >
                      {/* <div style={{ margin: 20 }} /> */}
                      <Dashboard
                        magic8={this.props.magic8}
                        color={this.props.color}
                        infoDisplay={
                          <TotalVisitCount count={this.state.totalVisitCount} />
                        }
                        infoPlacement="flex-start"
                        completeObservation={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={9}>
                    {this.props.centers.map((center, index) => (
                      <Grid
                        key={index}
                        item
                        xs={4}
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        <VisitCenterButton
                          centerName={center.name}
                          visitCount={center.count}
                          onClick={() => this.handleCenterVisit(center.name)}
                        />
                      </Grid>
                    ))}
                    <Grid
                      item
                      xs={4}
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      <Button
                        variant="contained"
                        style={{
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
            </Grid>
          </div>
        );
      case RATING_SCREEN:
        return (
          <CenterRatingChecklist
            currentCenter={this.state.currentCenter}
            toggleScreen={this.switchToCenterMenu}
            finishVisit={centerName => this.finishCenterVisit(centerName)}
            firebase={this.props.firebase}
            magic8={this.props.magic8}
            color={this.props.color}
            checklist={this.props.checklist}
          />
        );
      default:
        return <div>Unknown status value!!!</div>;
    }
  }
}

/* const mapStateToProps = state => {
  return {
    centers: state.associativeCenterState.associativeCenters
  };
}; */

export default withStyles(styles)(CenterMenu
  /* connect(mapStateToProps, { })(
    CenterMenu
  ) */
);