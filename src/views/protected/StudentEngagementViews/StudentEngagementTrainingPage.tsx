import * as React from "react";
import * as PropTypes from "prop-types";
import * as Constants from "../../../constants/Constants";
// import Button from "@material-ui/core/Button/Button";
import EngagementIconImage from "../../../assets/images/EngagementIconImage.svg";
import { withStyles } from "@material-ui/core/styles/index";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import "chartjs-plugin-datalabels";
import TrainingVideo from "../../../components/Shared/TrainingVideo";
import TrainingQuestionnaire from "../../../components/Shared/TrainingQuestionnaire";
import TrainingDashboard from '../../../components/Shared/TrainingDashboard';
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { createMuiTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import StudentEngagementHelpCard from "../../../components/StudentEngagementComponents/StudentEngagementHelpCard";
import * as Types from '../../../constants/Types';
// import * as H from 'history';
// import ReactRouterPropTypes from 'react-router-prop-types';

const EngagementTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.SE
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles: object = {
  root: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflowX: 'hidden',
    overflowY: 'scroll',
    margin: '0',
    padding: '0'
  },
  titleContainer: {
    width: '100%',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  backButton: {
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
  main: {
    height: 'auto',
    flexGrow: 1,
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '25% 75%',
    margin: '2% 5% 2% 5%'
  },
  trainingContentCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '0% 4% 3% 4%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },

  // iPad Pro 12.9" Landscape
  '@media only screen and (max-width:1366px) and (min-height:800px) and (orientation:landscape)': {
    root: {
      fontSize: '1.5em'
    },
    main: {
      margin: '8% 2% 2% 2%'
    }
  },

  // iPad Pro 12.9" Portrait
  '@media only screen and (max-width:1024px) and (orientation:portrait)': {
    main: {
      height: '100%',
      margin: '2%',
      display: 'flex',
      flexDirection: 'column'
    },
    dashboardContainer: {
      boxShadow: '1px 1px 3px #8C8D91'
    },
    trainingContentCard: {
      flexGrow: 1,
      margin: '5% 0% 2% 0%',
      padding: '8% 2% 3% 2%',
      justifyContent: 'flex-start',
      borderTop: '2px solid #FFA726'
    }
  },

  // iPad-Mini Landscape
  '@media only screen and (max-width:1024px) and (orientation:landscape)': {
    main: {
      margin: '2%'
    }
  },

  // Minor Breakpoint - 900px height
  '@media only screen and (max-width:1024px) and (min-height:900px) and (orientation:portrait)': {
    root: {
      fontSize: '1.5em'
    }
  },

  // Minor Breakpoint - 920px width
  '@media only screen and (max-width:920px) and (orientation:landscape)': {
    main: {
      height: '100%',
      margin: '0% 2% 0% 2%',
      display: 'flex',
      flexDirection: 'column'
    },
    dashboardContainer: {
      boxShadow: '1px 1px 3px #8C8D91'
    },
    trainingContentCard: {
      flexGrow: 1,
      margin: '3% 0% 2% 0%',
      padding: '5% 2% 3% 2%',
      justifyContent: 'flex-start',
      borderTop: '2px solid #FFA726'
    }
  },

  // Mobile Landscape
  '@media only screen and (max-width:600px) and (orientation:landscape)': {
    root: {
      fontSize: '0.7em'
    }
  }
};

const ViewEnum = {
  CONCEPTS: 1,
  DEFINITIONS: 2,
  EXAMPLE: 3,
  DEMONSTRATION: 4,
  KNOWLEDGECHECK: 6
};

interface Props {
  classes: Style,
  // history: H.History,
  // location: H.Location
}

interface Style {
  titleContainer: string;
  backButton: string;
  main: string;
  dashboardContainer: string;
  trainingContentCard: string;
  root: string,
}

interface State {
  view: number
}

/**
 * Student Engagement Training
 * @class StudentEngagementTrainingPage
 */
class StudentEngagementTrainingPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      view: ViewEnum.CONCEPTS
    };
  }

  conceptsClick = (): void => {
    if (this.state.view !== ViewEnum.CONCEPTS) {
      this.setState({ view: ViewEnum.CONCEPTS })
    }
  }

  definitionsClick = (): void => {
    if (this.state.view !== ViewEnum.DEFINITIONS) {
      this.setState({ view: ViewEnum.DEFINITIONS })
    }
  }

  exampleClick = (): void => {
    if (this.state.view !== ViewEnum.EXAMPLE) {
      this.setState({ view: ViewEnum.EXAMPLE })
    }
  }

  demonstrationClick = (): void => {
    if (this.state.view !== ViewEnum.DEMONSTRATION) {
      this.setState({ view: ViewEnum.DEMONSTRATION })
    }
  }

  knowledgeCheckClick = (): void => {
    if (this.state.view !== ViewEnum.KNOWLEDGECHECK) {
      this.setState({ view: ViewEnum.KNOWLEDGECHECK })
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    // history: ReactRouterPropTypes.history.isRequired,
    // location: ReactRouterPropTypes.location
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const { view } = this.state;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.titleContainer}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={3}>
              {/* <Button variant="contained" size="medium" className={classes.backButton}
                onClick={(): void => {
                  if (this.props.location.state !== undefined) { // came from MyTeachers
                    this.props.history.goBack();
                  } else {
                    this.props.history.replace({
                      pathname: "/Magic8Menu",
                      state: { type: "Training" }
                    })
                  }
                }}>
                <ChevronLeftRoundedIcon />
                <b>Training Home</b>
              </Button> */}
            </Grid>
            <Grid item xs={9}>
              <h1 style={{ justifySelf: 'center', fontFamily: 'Arimo' }}>Training Tool</h1>
            </Grid>
          </Grid>
        </div>
        <div className={classes.main}>
          <div className={classes.dashboardContainer}>
            <TrainingDashboard
              ViewEnum={ViewEnum}
              view={view}
              Icon={EngagementIconImage}
              conceptsClick={this.conceptsClick}
              definitionsClick={this.definitionsClick}
              exampleClick={this.exampleClick}
              demonstrationClick={this.demonstrationClick}
              knowledgeCheckClick={this.knowledgeCheckClick}
              colorTheme={EngagementTheme}
            />
          </div>
          <div className={classes.trainingContentCard}>
            {view === ViewEnum.CONCEPTS ?
              <TrainingVideo
                videoUrl={'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/Student%20Engagement%20Concepts.mp4?alt=media&token=201b9f73-32c1-4842-aac5-f70a6eb0e375'}
              />
            : view === ViewEnum.DEFINITIONS ?
              <StudentEngagementHelpCard />
            : view === ViewEnum.EXAMPLE ?
              <div>EXAMPLE</div>
            : view === ViewEnum.DEMONSTRATION ?
              <div>
                Coming Soon!
              </div>
            : view === ViewEnum.KNOWLEDGECHECK ? (
              <TrainingQuestionnaire section={'student'} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StudentEngagementTrainingPage);

