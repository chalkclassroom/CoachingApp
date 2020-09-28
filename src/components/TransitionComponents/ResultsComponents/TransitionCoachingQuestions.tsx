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
        openPanel: ''
      })
    }
  }

  /** opens traveling expansion panel */
  travelingClick = (): void => {
    if (this.state.categoryView !== "traveling") {
      this.setState({
        categoryView: "traveling",
        openPanel: ''
      })
    }
  }

  /** opens children waiting expansion panel */
  childrenWaitingClick = (): void => {
    if (this.state.categoryView !== "childrenWaiting") {
      this.setState({
        categoryView: "childrenWaiting",
        openPanel: ''
      })
    }
  }

  /** opens classroom routines expansion panel */
  routinesClick = (): void => {
    if (this.state.categoryView !== "routines") {
      this.setState({
        categoryView: "routines",
        openPanel: ''
      })
    }
  }

  /** opens behavior management expansion panel */
  behaviorClick = (): void => {
    if (this.state.categoryView !== "behavior") {
      this.setState({
        categoryView: "behavior",
        openPanel: ''
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
    classes: PropTypes.exact({
      transitionTypeButton: PropTypes.string,
      buttonText: PropTypes.string
    }).isRequired,
    handleAddToPlan: PropTypes.func.isRequired,
    sessionId: PropTypes.string.isRequired,
    teacherId: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const categories = [
      {
        clickFunction: this.lineClick,
        categoryView: 'line',
        theme: Constants.LineTheme,
        src: WaitingInLineImage,
        title: 'Waiting in Line',
        questions: Constants.CoachingQuestions.Transition.LineQuestions
      },
      {
        clickFunction: this.travelingClick,
        categoryView: 'traveling',
        theme: Constants.TravelingTheme,
        src: WalkingImage,
        title: 'Traveling',
        questions: Constants.CoachingQuestions.Transition.TravelingQuestions
      },
      {
        clickFunction: this.childrenWaitingClick,
        categoryView: 'childrenWaiting',
        theme: Constants.WaitingTheme,
        src: ChildWaitingImage,
        title: 'Children Waiting',
        questions: Constants.CoachingQuestions.Transition.WaitingQuestions
      },
      {
        clickFunction: this.routinesClick,
        categoryView: 'routines',
        theme: Constants.RoutinesTheme,
        src: ClassroomRoutinesImage,
        title: 'Classroom Routines',
        questions: Constants.CoachingQuestions.Transition.RoutinesQuestions
      },
      {
        clickFunction: this.behaviorClick,
        categoryView: 'behavior',
        theme: Constants.BehaviorManagementTheme,
        src: BMDImage,
        title: 'Behavior Management',
        questions: Constants.CoachingQuestions.Transition.BehaviorQuestions
      }
    ];
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
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{marginTop: "1vh"}}
          >
            {categories.map((value, index) => {
              return(
                <Grid item key={index}>
                  <MuiThemeProvider theme={value.theme}>
                    <Button
                      onClick={value.clickFunction}
                      color={(this.state.categoryView!=='') && (this.state.categoryView !== value.categoryView) ? "secondary" : "primary"}
                      variant="raised"
                      style={{
                        color: 'white',
                        boxShadow: this.state.categoryView === value.categoryView ? "4px 4px #a9a9a9" : '2px 2px #d3d3d3'
                      }}
                    >
                      <img
                        src={value.src}
                        className={classes.transitionTypeButton}
                      />
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{marginTop: ".5vh", fontFamily: "Arimo"}}
          >
            {categories.map((value, index) => {
              return(
                <Grid
                  item xs={2}
                  key={index}
                  className = {classes.buttonText}
                  style={{fontWeight: this.state.categoryView === value.categoryView ? "bold" : "normal"}}
                >
                  {value.title}
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" style={{marginTop: "1vh"}}>
            {categories.map((value, index) => {
              return(
                this.state.categoryView === value.categoryView ? (
                  <DataQuestions
                    key={index}
                    questions={value.questions}
                    openPanel={this.state.openPanel}
                    handlePanelChange={this.handlePanelChange}
                    handleAddToPlan={this.props.handleAddToPlan}
                    sessionId={this.props.sessionId}
                    teacherId={this.props.teacherId}
                    magic8={'Transition Time'}
                    color={Constants.Colors.TT}
                  />
                ) : null
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TransitionCoachingQuestions);