import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import * as Constants from '../../../constants';
import {
  lightGreen,
  deepOrange,
  orange,
  blue,
  indigo
} from "@material-ui/core/colors";
import { red } from "@material-ui/core/es/colors";
import ChildWaitingImage from "../../../assets/images/ChildWaitingImage.svg";
import WaitingInLineImage from "../../../assets/images/WaitingInLineImage.svg";
import WalkingImage from "../../../assets/images/WalkingImage.svg";
import ClassroomRoutinesImage from "../../../assets/images/ClassroomRoutinesImage.svg";
import BMDImage from "../../../assets/images/BMDImage.svg";

const styles: object = {
  transitionTypeButton: {
    width: "70px",
    height: "70px"
  },
  buttonText: {
    fontSize: "12px",
    textAlign: "center"
  },
};

const raisedThemes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    travelingColor: {
      backgroundColor: orange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    childWaitingColor: {
      backgroundColor: deepOrange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    classroomRoutinesColor: {
      backgroundColor: blue[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    bmiColor: {
      backgroundColor: red["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    otherColor: {
      backgroundColor: indigo["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    }
  }
});

const themes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    travelingColor: {
      backgroundColor: orange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    childWaitingColor: {
      backgroundColor: deepOrange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    classroomRoutinesColor: {
      backgroundColor: blue[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    bmiColor: {
      backgroundColor: red["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    otherColor: {
      backgroundColor: indigo["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    }
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white"
      },
      textColor: 'white',
      primaryTextColor: 'white'
    }
  }
});


interface Props {
  classes: {
    transitionTypeButton: string,
    buttonText: string,
    raisedThemes: {
      palette: {
        waitingColor: string,
        travelingColor: string,
        childWaitingColor: string,
        classroomRoutinesColor: string,
        bmiColor: string,
        otherColor: string,
      }
    },
    themes: {
      palette: {
        waitingColor: string,
        travelingColor: string,
        childWaitingColor: string,
        classroomRoutinesColor: string,
        bmiColor: string,
        otherColor: string,
        overrides: {
          MuiButton: {
            raisedPrimary: {
              color: string
            },
            textColor: string,
            primaryTextColor: string
          }
        }
      }
    }
  }
}

interface State {
  categoryView: string,
  openPanel: string,
  addedToPrep: Array<string>
}

/**
 * expansion panel of transition time coaching questions
 * @class TransitionCoachingQuestions
 */
class TransitionCoachingQuestions extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      categoryView: '',
      openPanel: '',
      addedToPrep: []
    }
  }
  
  /** opens line expansion panel */
  lineClick = (): void => {
    if (this.state.categoryView !== "line") {
      this.setState({
        categoryView: "line",
        openPanel: null
      })
    }
  }

  /** opens traveling expansion panel */
  travelingClick = (): void => {
    if (this.state.categoryView !== "traveling") {
      this.setState({
        categoryView: "traveling",
        openPanel: null
      })
    }
  }

  /** opens children waiting expansion panel */
  childrenWaitingClick = (): void => {
    if (this.state.categoryView !== "childrenWaiting") {
      this.setState({
        categoryView: "childrenWaiting",
        openPanel: null
      })
    }
  }

  /** opens classroom routines expansion panel */
  routinesClick = (): void => {
    if (this.state.categoryView !== "routines") {
      this.setState({
        categoryView: "routines",
        openPanel: null
      })
    }
  }

  /** opens behavior management expansion panel */
  behaviorClick = (): void => {
    if (this.state.categoryView !== "behavior") {
      this.setState({
        categoryView: "behavior",
        openPanel: null
      })
    }
  }

  /**
   * @param {string} panel
   */
  handlePanelChange = (panel: string): void => {
    if (this.state.openPanel === panel) {
      this.setState({ openPanel: '' });
    } else {
      this.setState({ openPanel: panel });
    }
  };

  /**
   * @param {string} panel
   */
  handleAddToPlan = (panel: string): void => {
    if (!this.state.addedToPrep.includes(panel)) {
      this.setState({ addedToPrep: [...this.state.addedToPrep, panel] });
    }
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return(
      <Grid container direction="column">
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle2" style={{fontFamily: 'Arimo'}}>
            In which type of transition did children spend the most amount of time?
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="subtitle2" style={{fontFamily: 'Arimo'}}>
            Select a transition type to view questions that will encourage reflection about teaching practices.
          </Typography>
        </Grid>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
          <Grid item>
            <Button 
              style={this.state.categoryView === "line" ? raisedThemes.palette.waitingColor : themes.palette.waitingColor}
              onClick={this.lineClick}
            >
              <img src={WaitingInLineImage} className={classes.transitionTypeButton}/>
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={this.state.categoryView === "traveling" ? raisedThemes.palette.travelingColor : themes.palette.travelingColor}
              onClick={this.travelingClick}
            >
              <img src={WalkingImage} className={classes.transitionTypeButton}/>
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={this.state.categoryView === "childrenWaiting" ? raisedThemes.palette.childWaitingColor : themes.palette.childWaitingColor}
              onClick={this.childrenWaitingClick}
            >
              <img src={ChildWaitingImage} className={classes.transitionTypeButton}/>
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={this.state.categoryView === "routines" ? raisedThemes.palette.classroomRoutinesColor : themes.palette.classroomRoutinesColor}
              onClick={this.routinesClick}
            >
              <img src={ClassroomRoutinesImage} className={classes.transitionTypeButton}/>
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={this.state.categoryView === "behavior" ? raisedThemes.palette.bmiColor : themes.palette.bmiColor}
              onClick={this.behaviorClick}
            >
              <img src={BMDImage} className={classes.transitionTypeButton}/>
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: ".5vh", fontFamily: "Arimo"}}>
          <Grid
            item xs={2}
            className = {classes.buttonText}
            style={{fontWeight: this.state.categoryView === "line" ? "bold" : "normal"}}
          >
            Waiting in Line
          </Grid>
          <Grid
            item xs={2}
            className = {classes.buttonText}
            style={{fontWeight: this.state.categoryView === "traveling" ? "bold" : "normal"}}
          >
            Traveling
          </Grid>
          <Grid
            item xs={2}
            className = {classes.buttonText}
            style={{fontWeight: this.state.categoryView === "childrenWaiting" ? "bold" : "normal"}}
          >
            Children Waiting
          </Grid>
          <Grid
            item xs={2}
            className = {classes.buttonText}
            style={{fontWeight: this.state.categoryView === "routines" ? "bold" : "normal"}}
          >
            Classroom Routines
          </Grid>
          <Grid
            item xs={2}
            className = {classes.buttonText}
            style={{fontWeight: this.state.categoryView === "behavior" ? "bold" : "normal"}}
          >
            Behavior Management
          </Grid>
        </Grid>
        <Grid container direction="column" style={{marginTop: "1vh"}}>
          {this.state.categoryView === "line" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Transition.LineQuestions}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.TransitionColor}
            />
          ) : this.state.categoryView === "traveling" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Transition.TravelingQuestions}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.TransitionColor}
            />
          ) : this.state.categoryView === "childrenWaiting" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Transition.WaitingQuestions}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.TransitionColor}
            />
          ) : this.state.categoryView === "routines" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Transition.RoutinesQuestions}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.TransitionColor}
            />
          ) : this.state.categoryView === "behavior" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Transition.BehaviorQuestions}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.TransitionColor}
            />
          ) : <div/>}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TransitionCoachingQuestions);
// export default TransitionCoachingQuestions;