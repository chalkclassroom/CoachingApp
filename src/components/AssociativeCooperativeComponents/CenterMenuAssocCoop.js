import Button from "@material-ui/core/Button";
import CenterRatingChecklistAssocCoop from "./CenterRatingChecklistAssocCoop";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  addNewCenter,
  incrementCenterCount
} from "../../state/actions/associative-cooperative";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import Dashboard from "../Dashboard";
import TotalVisitCount from "../TotalVisitCount.tsx";

// TODO: X in top right corner, press and hold to remove/edit the center.

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  }
});

const VisitCenterButton = ({ centerName, visitCount, onClick }) => {
  const hsl = Math.max(82 - 4 * visitCount, 54);
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
        backgroundColor: `hsl(263, 55%, ${hsl}%`
      }}
      onClick={onClick}
    >
      {centerName}
      <br />
      <br />
      {visitCount}
    </Button>
  );
};

const commonCenters = [
  "Blocks",
  "Toys and Games",
  "Technology/\nComputer",
  "Sensory",
  "Math/\nManipulatives",
  "Science and Nature",
  "Writing",
  "Art",
  "Dramatic Play",
  "Music and Movement",
  "Library"
];

const halfOfCommon = Math.ceil(commonCenters.length / 2);
const commonFirstHalf = commonCenters.slice(0, halfOfCommon);
const commonSecondHalf = commonCenters.slice(
  halfOfCommon,
  commonCenters.length
);

/**
 * Center Checklist
 * @class CenterChecklist
 * @param {value} value
 * @return {void}
 */
class CenterChecklist extends React.Component {
  state = {
    checked: []
  };

  handleToggle = value => () => {
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

  handleDone = () => {
    this.state.checked.forEach(checked => {
      this.props.addCenter(checked);
    });
    this.props.switchToCenterMenu();
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography
            component="h4"
            variant="h4"
            align="center"
            style={{ padding: "10px" }}
          >
            Which centers are open?
          </Typography>
          <Typography>
            You will have the opportunity to add additional centers if the ones
            in your classroom are not listed here.
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item>
              <List>
                {commonFirstHalf.map((value, index) => (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    disableRipple
                    onClick={this.handleToggle(value)}
                  >
                    <Checkbox
                      checked={this.state.checked.includes(value)}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText
                      primary={value}
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item>
              <List>
                {commonSecondHalf.map((value, index) => (
                  <ListItem
                    key={index}
                    role={undefined}
                    dense
                    button
                    disableRipple
                    onClick={this.handleToggle(value)}
                  >
                    <Checkbox
                      checked={this.state.checked.includes(value)}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText
                      primary={value}
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleDone}
          >
            Done
          </Button>
        </Grid>
      </div>
    );
  }
}

CenterChecklist.propTypes = {
  addCenter: PropTypes.func.isRequired,
  switchToCenterMenu: PropTypes.func.isRequired
};

/**
 * New Center Dialog
 * @class NewCenterDialog
 * @return {void}
 */
class NewCenterDialog extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a New Center</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new center.
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={cn => (this.centerName = cn)}
            margin="dense"
            id="center-name"
            label="Center Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => this.props.handleSubmit(this.centerName.value)}
            color="primary"
          >
            Add Center
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewCenterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

const CENTER_CHECKLIST = 0;
const CENTER_MENU = 1;
const RATING_SCREEN = 2;

/**
 * Center Menu for Associative and Cooperative
 * @class CenterMenuAssocCoop
 * @param {string} centerName
 */
class CenterMenuAssocCoop extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    const mEntry = {
      teacher: this.props.teacherId,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: "AC"
    };
    this.props.firebase.handleSession(mEntry);
  }

  state = {
    addDialog: false,
    status: CENTER_CHECKLIST,
    currentCenter: undefined,
    totalVisitCount: 0
  };

  handleClickOpen = () => {
    this.setState({ addDialog: true });
  };

  handleClose = () => {
    this.setState({ addDialog: false });
  };

  switchToCenterChecklist = () => {
    this.setState({ status: CENTER_CHECKLIST });
  };

  switchToCenterMenu = () => {
    this.setState({ status: CENTER_MENU });
    this.props.onStatusChange(true);
  };

  switchToRatingScreen = () => {
    this.setState({ status: RATING_SCREEN });
    this.props.onStatusChange(false);
  };

  handleAddCenter = centerName => {
    this.props.addNewCenter(centerName);
    this.handleClose();
  };

  // Entry point for a center visit.
  handleCenterVisit = centerName => {
    this.switchToRatingScreen();
    this.setState({ currentCenter: centerName });
  };

  // Exit point for a center visit.
  finishCenterVisit = centerName => {
    if (centerName !== undefined) {
      this.props.incrementCenterCount(centerName);
      this.setState({ totalVisitCount: this.state.totalVisitCount + 1 });
    }
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
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
                        magic8="Associative and Cooperative"
                        color="#6f39c4"
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
                          backgroundColor: grey[400]
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
          <CenterRatingChecklistAssocCoop
            currentCenter={this.state.currentCenter}
            toggleScreen={this.switchToCenterMenu}
            finishVisit={centerName => this.finishCenterVisit(centerName)}
            firebase={this.props.firebase}
          />
        );
      default:
        return <div>Unknown status value!!!</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    centers: state.associativeCenterState.associativeCenters
  };
};

CenterMenuAssocCoop.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  teacherId: PropTypes.string,
  firebase: PropTypes.object.isRequired,
  addNewCenter: PropTypes.func.isRequired,
  incrementCenterCount: PropTypes.func.isRequired,
  centers: PropTypes.array.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps, { addNewCenter, incrementCenterCount })(
    CenterMenuAssocCoop
  )
);
