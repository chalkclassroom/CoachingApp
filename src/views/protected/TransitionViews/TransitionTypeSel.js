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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 130, 
    height: 130, 
    textAlign: 'center',
    // boxShadow: "5px 5px #d3d3d3"
  },
  label: {
    flexDirection: 'column ', 
    textAlign: 'center'
  },
});

const raisedThemes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300], color:'#000',
      textColor: white,
      primaryTextColor: white,
      boxShadow: "8px 8px #a9a9a9"
    },
    travelingColor: {
      backgroundColor: orange[400], color: '#000',
      textColor: white, 
      primaryTextColor: white,
      boxShadow: "8px 8px #a9a9a9"
    },
    childWaitingColor: { 
      backgroundColor: deepOrange[400], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }, 
    classroomRoutinesColor: { 
      backgroundColor: blue[300], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }, 
    bmiColor: { 
      backgroundColor: red['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }, 
    otherColor: { 
      backgroundColor: indigo['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }
  }
})

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


class TransitionTypeSel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lineSelected: false,
      travelingSelected: false,
      waitingSelected: false,
      routinesSelected: false,
      behaviorSelected: false,
      otherSelected: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.transitionEnded && this.props.transitionEnded) {
      this.setState({
        lineSelected: false,
        travelingSelected: false,
        waitingSelected: false,
        routinesSelected: false,
        behaviorSelected: false,
        otherSelected: false
      });
    }
  };

  handleLineButton = type => {
    this.props.handleTransitionType(type);
    this.setState({
      lineSelected: true,
      travelingSelected: false,
      waitingSelected: false,
      routinesSelected: false,
      behaviorSelected: false,
      otherSelected: false
    });
  };

  handleTravelingButton = type => {
    this.props.handleTransitionType(type);
    this.setState({
      lineSelected: false,
      travelingSelected: true,
      waitingSelected: false,
      routinesSelected: false,
      behaviorSelected: false,
      otherSelected: false
    });
  };

  handleWaitingButton = type => {
    this.props.handleTransitionType(type);
    this.setState({
      lineSelected: false,
      travelingSelected: false,
      waitingSelected: true,
      routinesSelected: false,
      behaviorSelected: false,
      otherSelected: false
    });
  };

  handleRoutinesButton = type => {
    this.props.handleTransitionType(type);
    this.setState({
      lineSelected: false,
      travelingSelected: false,
      waitingSelected: false,
      routinesSelected: true,
      behaviorSelected: false,
      otherSelected: false
    });
  };

  handleBehaviorButton = type => {
    this.props.handleTransitionType(type);
    this.setState({
      lineSelected: false,
      travelingSelected: false,
      waitingSelected: false,
      routinesSelected: false,
      behaviorSelected: true,
      otherSelected: false
    });
  };

  handleOtherButton = type => {
    this.props.handleTransitionType(type);
    this.setState({
      lineSelected: false,
      travelingSelected: false,
      waitingSelected: false,
      routinesSelected: false,
      behaviorSelected: false,
      otherSelected: true
    });
    this.props.handleNotes(true);
  };


  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* {this.props.transitionEnded ? <div> {this.componentWillUnmount} </div> : <div/>}
        {console.log(this.props.transitionEnded)} */}
        <Grid container alignItems="flex-start" direction={"row"}>
          <Grid item xs={6}
            align="center"
            alignItems="center"
            justify="center"
            direction="column">
              <Grid item>
                <Button onClick={() => this.handleLineButton("waiting")}
                      /* Use classes property to inject custom styles */
                          classes={{root: classes.button, label: classes.label}}
                          variant="raised"
                          style={this.state.lineSelected ? raisedThemes.palette.waitingColor : themes.palette.waitingColor}>
                    <img alt="Waiting in line" src={WaitinginLine} height='100' width='100'/>

                </Button>
              </Grid>
              <Grid item>
                Waiting in line/
                <br/>
                lining up
              </Grid>
              <br>
              </br>
              <Grid item>
                <Button onClick={()=>this.handleTravelingButton("traveling")}
                      
                      classes={{root: classes.button, label: classes.label}}
                     variant="raised"
                     style={this.state.travelingSelected ? raisedThemes.palette.travelingColor : themes.palette.travelingColor}>
                   <img alt="Walking" src={Walking} height='100' width='100'/>
                </Button>
              </Grid>
              <Grid item>
                Traveling outside 
                <br />
                the classroom
              </Grid>
              <br>
              </br>
              <Grid item>
                <Button onClick={()=>this.handleWaitingButton("child waiting")}
                      
                      classes={{root: classes.button, label: classes.label}}
                      variant="raised"
                      style={this.state.waitingSelected ? raisedThemes.palette.childWaitingColor : themes.palette.childWaitingColor}>
                    <img alt="Child waiting" src={ChildWaiting} height='100' width='100'/>
                </Button>
              </Grid>
              <Grid item>
                Children waiting on teacher/materials
              </Grid>
          </Grid>
          <Grid item xs={6} align="center"
            alignItems="center"
            justify="center"
            direction="column">
              <Grid item>
                <Button onClick={()=>this.handleRoutinesButton("classroom routines")}
                     
                     classes={{root: classes.button, label: classes.label}}
                     variant="raised"
                     style={this.state.routinesSelected ? raisedThemes.palette.classroomRoutinesColor : themes.palette.classroomRoutinesColor}>
                   <img alt="classroom routines" src={ClassroomRoutines} height='100' width='100'/>
                </Button>
              </Grid>
              <Grid item>
                Classroom routines
              </Grid>
              <br>
              </br>
              <br>
              </br>
              <Grid item>
                <Button onClick={()=>this.handleBehaviorButton("behavior management disruption")}
                      
                      classes={{root: classes.button, label: classes.label}}
                      variant="raised"
                      style={this.state.behaviorSelected ? raisedThemes.palette.bmiColor : themes.palette.bmiColor}>
                    <img alt="Behavior Management Disruption" src={bmi} height='100' width='100'/>
                </Button>
              </Grid>
              <Grid item>
                Behavior management 
                <br />
                disruption
              </Grid>
              <br>
              </br>
              <Grid item>
                <Button onClick={()=>this.handleOtherButton("other")}
                      
                      classes={{root: classes.button, label: classes.label}}
                      variant="raised"
                      style={this.state.otherSelected ? raisedThemes.palette.otherColor : themes.palette.otherColor}>
                    <img alt="other" src={other} height='100' width='100'/>
                </Button>
              </Grid>
              <Grid item>
                Other
              </Grid>
              <br>
              </br>
            </Grid>
        </Grid>
      </div>
 
    );


  }

}

TransitionTypeSel.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(IconLabelButtons);

export default withStyles(styles)(TransitionTypeSel)