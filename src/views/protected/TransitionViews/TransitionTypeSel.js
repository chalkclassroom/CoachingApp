import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { lightGreen, white, deepOrange, orange, blue, indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import ChildWaiting from "../../../assets/icons/ChildWaiting.svg"; 
import WaitinginLine from "../../../assets/icons/WaitinginLine.svg"; 
import Walking from "../../../assets/icons/Walking.svg"; 
import ClassroomRoutines from "../../../assets/icons/classroomRoutines.svg"; 
import bmi from "../../../assets/icons/BehaviorManagementDisruption.svg"; 
import { red } from '@material-ui/core/es/colors';
import other from "../../../assets/icons/other.svg"; 
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 130, 
    height: 130, 
    textAlign: 'center'
  },
  label: {
    flexDirection: 'column ', 
    textAlign: 'center'
  },
});

const themes = createMuiTheme({
  palette: {
    waitingColor: { 
      backgroundColor: lightGreen[300], color: '#000',
      textColor: white, 
      primaryTextColor: white, 
  },
  travelingColor: { 
    backgroundColor: orange[400], color: '#000',
    textColor: white, 
    primaryTextColor: white, 
}, 
childWaitingColor: { 
  backgroundColor: deepOrange[400], color: '#000',
  textColor: white,
  primaryTextColor: white, 
}, 
classroomRoutinesColor: { 
  backgroundColor: blue[300], color: '#000',
  textColor: white,
  primaryTextColor: white, 
}, 
bmiColor: { 
  backgroundColor: red['A200'], color: '#000',
  textColor: white,
  primaryTextColor: white, 
}, 
otherColor: { 
  backgroundColor: indigo['A200'], color: '#000',
  textColor: white,
  primaryTextColor: white, 
}}, 
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
      textColor: white, 
      primaryTextColor: white, 
    },
  }, 
})

function firstRow(props) {
  const { classes } = props;
  return (
    <div>
    <Grid container spacing={1} justify = "center">
    <Grid container item xs = {11}
    justify = "center">
    <Grid
      container
      alignItems={"center"}
      justify={"center"}
      direction={"column"}>
     <Button
    /* Use classes property to inject custom styles */
    classes={{ root: classes.button, label: classes.label }}
    variant="raised"
    style = {themes.palette.waitingColor}>
    <img alt = "Waiting in line" src = {WaitinginLine} height = '100' width = '100'/> 
  </Button>
  Waiting in line/lining up 
  <Button
    /* Use classes property to inject custom styles */
    classes={{ root: classes.button, label: classes.label }}
    variant="raised"
    style = {themes.palette.travelingColor}>
    <img alt = "Walking" src = {Walking} height = '100' width = '100'/> 
  </Button>
 <text style = {{textAlign: 'center'}}>Traveling outside the classroom</text> 
 <Button
    /* Use classes property to inject custom styles */
    classes={{ root: classes.button, label: classes.label }}
    variant="raised"
    style = {themes.palette.childWaitingColor}>
    <img alt = "Child waiting" src = {ChildWaiting} height = '100' width = '100'/> 
  </Button>
 <text style = {{textAlign: 'center'}}>Children waiting on teacher/materials</text> 
  </Grid>
  </Grid> 
  </Grid> 
    </div>
  );
}
function secondRow(props) {
  const {classes} = props
  return (
  <div>
    <Grid container spacing={1} justify = "center">
      <Grid container item xs = {11}
      justify = "center">
      <Grid
        container
        alignItems={"center"}
        justify={"center"}
        direction={"column"}>
      <Button
      /* Use classes property to inject custom styles */
      classes={{ root: classes.button, label: classes.label }}
      variant="raised"
      style = {themes.palette.classroomRoutinesColor}>
      <img alt = "classroom routines" src = {ClassroomRoutines} height = '100' width = '100'/> 
    </Button>
    Classroom Routines
    <Button
      /* Use classes property to inject custom styles */
      classes={{ root: classes.button, label: classes.label }}
      variant="raised"
      style = {themes.palette.bmiColor}>
      <img alt = "Behavior Management Disruption" src = {bmi} height = '100' width = '100'/> 
    </Button>
  <text style = {{textAlign: 'center'}}>Behavior Management Disruption</text> 
  <Button
      /* Use classes property to inject custom styles */
      classes={{ root: classes.button, label: classes.label }}
      variant="raised"
      style = {themes.palette.otherColor}>
      <img alt = "otherg" src = {other} height = '100' width = '100'/> 
    </Button>
  <text style = {{textAlign: 'center'}}>Other</text> 
    </Grid>
    </Grid> 
    </Grid> 
    </div>) 
}

firstRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(IconLabelButtons);

export default withStyles(styles)(firstRow)