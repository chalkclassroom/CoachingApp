import Button from "@material-ui/core/Button";
import CenterRatingChecklistMath from "./CenterRatingChecklistMath";
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
} from "../../state/actions/math-instruction";

import PropTypes from "prop-types";
import Dashboard from "../Dashboard";
import TotalVisitCount from "../TotalVisitCount";
import { Fab } from '@material-ui/core';
import { toggleLOISettingType } from '../../state/actions/level-of-instruction';


// TODO: X in top right corner, press and hold to remove/edit the center.

const styles = theme => ({
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
});

const VisitCenterButton = ({ centerName, visitCount, onClick }) => {
  const hsl = Math.max(82 - 4 * visitCount, 54);
  return (
    <Fab
      variant="contained"
      //color="primary" //color
      style={{
        width: 150,
        height: 150,
        whiteSpace: "normal",
        wordWrap: "break-word",
        fontFamily: "Arimo",
        backgroundColor: '#27B78FFF'

      }}
      onClick={onClick}
    >
      {centerName}
      <br />
      <br />
      {visitCount}
    </Fab>
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

class CenterChecklist extends React.Component {
  state = {
    checked: [],
    settingtype: []
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

  	/**
   * @param {string} settingtype
   */
  handleButtonChange = (settingtype) => {
		this.props.toggleLOISettingType(settingtype);
		this.setState({
			selected: settingtype
		});
	};

  handleDone = () => {
    this.state.checked.forEach(checked => {
this.props.toggleLOISettingType(checked) });
    this.props.switchToCenterMenu();
  };

  render() {
    return (
      <div>
            <Grid
              justify="center"
              alignItems="stretch"
              direction="row"
              style={{ margin: 10 }}
            >
              <Grid justify="flex-start" alignItems="center" direction="row"></Grid>
<Grid container spacing={16} alignItems="center">
            <Grid item xs={3}>
              <Grid   container alignItems={"center"}  justify={"center"} direction={"column"} >
                      <Dashboard
                        magic8="Math Instruction"
                        color="#E55529"
                        infoDisplay={
                          <TotalVisitCount count={this.state.totalVisitCount} />
                        }
                        infoPlacement="flex-start"
                        completeObservation={true}
                      />
                    </Grid>
                    </Grid>

                    <Grid container direction="column" justify="center" alignItems="center">
          <Typography component="h4" variant="h4"  align="center" style={{ padding: "10px", fontFamily: 'Arimo' }}
          >
           What is the activity setting?
          </Typography>
       
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >

<Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>
 <VisitCenterButton
   onClick={() => this.handleDone('wholeGroup')}

 >
   Whole Group
 </VisitCenterButton>
 </Grid>
 <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

 <VisitCenterButton

   onClick={() => this.handleDone('centersOrSmall')}

 >
   Centers/Small Group
 </VisitCenterButton>
</Grid>
</Grid>

        </Grid>
        </Grid>
        </Grid>


      </div>
    );
  }
}

class NewCenterDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"  style={{fontFamily: 'Arimo'}}>Add a New Center</DialogTitle>
        <DialogContent>
          <DialogContentText  style={{fontFamily: 'Arimo'}} >
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
          <Button onClick={this.props.handleClose} 
          color="primary"
          style={{fontFamily: 'Arimo'}}
          >
            Cancel
          </Button>
          <Button
            onClick={() => this.props.handleSubmit(this.centerName.value)}
            color="primary"
            style={{fontFamily: 'Arimo'}}
          >
            Add Center
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const CENTER_CHECKLIST = 0;
const CENTER_MENU = 1;
const RATING_SCREEN = 2;

class CenterMenuMath extends React.Component {
  constructor(props) {
    super(props);
    const mEntry = {
      teacher: this.props.teacherId,
      observedBy: this.props.firebase.auth.currentUser.uid,
      type: "Math"
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
                        magic8="Math Instruction"
                        color="#E55529"
                        infoDisplay={
                          <TotalVisitCount count={this.state.totalVisitCount} />
                        }
                        infoPlacement="flex-start"
                        completeObservation={true}
                      />
                    </Grid>
              </Grid>
                  <Grid container xs={9}  container direction={'row'} >

                   <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>
					<VisitCenterButton
						//onClick={() => this.handleButtonChange('wholeGroup')}
					//	classes={{ root: classes.button }}//, label: classes.label
					//	style={{ backgroundColor: "#27B78FFF" }}
					>
						Whole Group
					</VisitCenterButton>
          </Grid>
          <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

					<VisitCenterButton
					//	onClick={() => this.handleButtonChange('centersOrSmall')}
					//	classes={{ root: classes.button }}//, label: classes.label
					//	style={{ backgroundColor: "#27B78FFF" }}
					>
						Centers/Small Group
					</VisitCenterButton>
				</Grid>

        <Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

<VisitCenterButton
//	onClick={() => this.handleButtonChange('centersOrSmall')}
//	classes={{ root: classes.button }}//, label: classes.label
//	style={{ backgroundColor: "#27B78FFF" }}
>
  Centers/Small Group
</VisitCenterButton>
</Grid>

<Grid container alignItems="flex-start" item xl={6} md={6} sm={12} xs={12} style={{ fontFamily: 'Arimo' }}>

<VisitCenterButton
//	onClick={() => this.handleButtonChange('centersOrSmall')}
//	classes={{ root: classes.button }}//, label: classes.label
//	style={{ backgroundColor: "#27B78FFF" }}
>
  Centers/Small Group
</VisitCenterButton>
</Grid>

      </Grid>
                    
    </Grid>





                </Grid>
              </Grid>
          </div>
        );
      case RATING_SCREEN:
        return (
          <CenterRatingChecklistMath
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
    centers: state.mathCentersState.mathCenters
  };
};

CenterMenuMath.propTypes = {
  onStatusChange: PropTypes.func.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps, { addNewCenter, incrementCenterCount })(
    CenterMenuMath
  )
);
