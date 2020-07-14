import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants/Constants';
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

interface Props {
  classes: {
    transitionTypeButton: string,
    buttonText: string,
  },
  handleAddToPlan(panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionId: string
  teacherId: string
}

interface State {
  categoryView: string,
  openPanel: string,
}

/**
 * expansion panel of transition time coaching questions
 * @class TransitionCoachingQuestions
 */
class TransitionCoachingQuestions extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      categoryView: '',
      openPanel: '',
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

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleAddToPlan: PropTypes.func.isRequired,
    addedToPlan: PropTypes.array.isRequired,
    sessionId: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography variant="subtitle2" style={{fontFamily: 'Arimo'}}>
              In which type of transition did children spend the most amount of time?
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography variant="subtitle2" style={{fontFamily: 'Arimo'}}>
              Select a transition type to view questions that will encourage reflection about teaching practices.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
            <Grid item >
              <MuiThemeProvider theme={Constants.LineTheme}>
                <Button
                  onClick={this.lineClick}
                  color={(this.state.categoryView!=='') && (this.state.categoryView!=="line") ? "secondary" : "primary"}
                  variant="raised"
                  style={{
                    color: 'white',
                    boxShadow: this.state.categoryView === "line" ? "4px 4px #a9a9a9" : null
                  }}
                >
                  <img
                    src={WaitingInLineImage}
                    className={classes.transitionTypeButton}
                    // height="100"
                    // width="100"
                  />
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item>
              <MuiThemeProvider theme={Constants.TravelingTheme}>
              <Button
                onClick={this.travelingClick}
                color={(this.state.categoryView!=='') && (this.state.categoryView!=="traveling") ? "secondary" : "primary"}
                variant="raised"
                style={{
                  color: 'white',
                  boxShadow: this.state.categoryView === "traveling" ? "4px 4px #a9a9a9" : null
                }}
              >
                <img
                  src={WalkingImage}
                  className={classes.transitionTypeButton}
                />
              </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item>
              <MuiThemeProvider theme={Constants.WaitingTheme}>
                <Button
                  onClick={this.childrenWaitingClick}
                  color={(this.state.categoryView!=='') && (this.state.categoryView!=="childrenWaiting") ? "secondary" : "primary"}
                  variant="raised"
                  style={{
                    color: 'white',
                    boxShadow: this.state.categoryView === "childrenWaiting" ? "4px 4px #a9a9a9" : null
                  }}
                >
                  <img src={ChildWaitingImage} className={classes.transitionTypeButton}/>
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item>
              <MuiThemeProvider theme={Constants.RoutinesTheme}>
                <Button
                  onClick={this.routinesClick}
                  color={(this.state.categoryView!=='') && (this.state.categoryView!=="routines") ? "secondary" : "primary"}
                  variant="raised"
                  style={{
                    color: 'white',
                    boxShadow: this.state.categoryView === "routines" ? "4px 4px #a9a9a9" : null
                  }}
                >
                  <img src={ClassroomRoutinesImage} className={classes.transitionTypeButton}/>
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item>
              <MuiThemeProvider theme={Constants.BehaviorManagementTheme}>
                <Button
                  onClick={this.behaviorClick}
                  color={(this.state.categoryView!=='') && (this.state.categoryView!=="behavior") ? "secondary" : "primary"}
                  variant="raised"
                  style={{
                    color: 'white',
                    boxShadow: this.state.categoryView === "behavior" ? "4px 4px #a9a9a9" : null
                  }}
                >
                  <img src={BMDImage} className={classes.transitionTypeButton}/>
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <Grid container direction="column" style={{marginTop: "1vh"}}>
            {this.state.categoryView === "line" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Transition.LineQuestions}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Transition Time"}
                color={Constants.Colors.TT}
              />
            ) : this.state.categoryView === "traveling" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Transition.TravelingQuestions}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Transition Time"}
                color={Constants.Colors.TT}
              />
            ) : this.state.categoryView === "childrenWaiting" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Transition.WaitingQuestions}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Transition Time"}
                color={Constants.Colors.TT}
              />
            ) : this.state.categoryView === "routines" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Transition.RoutinesQuestions}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Transition Time"}
                color={Constants.Colors.TT}
              />
            ) : this.state.categoryView === "behavior" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Transition.BehaviorQuestions}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Transition Time"}
                color={Constants.Colors.TT}
              />
            ) : <div/>}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TransitionCoachingQuestions);