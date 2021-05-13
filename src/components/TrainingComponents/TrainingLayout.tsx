import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles, Theme } from '@material-ui/core/styles/index';
import AppBar from '../AppBar';
import FirebaseContext from '../Firebase/FirebaseContext';
import 'chartjs-plugin-datalabels';
import TrainingVideo from './TrainingVideo';
import TrainingQuestionnaire from './TrainingQuestionnaire';
import TrainingObservationDashboard from './TrainingObservationDashboard';
import Grid from '@material-ui/core/Grid';
import * as Types from '../../constants/Types';

const styles: object = {
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  titleContainer: {
    width: '100%',
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
    height: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  },
  trainingContentCard: {
    padding: '0% 4% 3% 4%',
    width: '75%'
  },
  grid: {
    direction: 'row',
    width: '100%',
    height: '100%'
  },
  dashboardContainer: {
    width: '25%'
  },

  // iPad Landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh'
    }
  },

  // iPad Portrait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      margin: '2%',
      display: 'flex',
      flexDirection: 'column'
    },
    grid: {
      direction: 'column'
    },
    dashboardContainer: {
      boxShadow: '1px 1px 3px #8C8D91'
    },
    trainingContentCard: {
      width: '100%',
      height: '75%'
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
  DEMONSTRATION: 4,
  KNOWLEDGECHECK: 6
};

enum LiteracyTypes {
  NONE = 0,
  FOUNDATIONAL = 1,
  WRITING = 2,
  READING = 3,
  LANGUAGE = 4
}

interface Props {
  classes: Style,
  icon: string,
  colorTheme: Theme;
  conceptsUrl: string;
  demonstrationUrl: string;
  definitions: React.ReactElement;
  section: string,
  literacyType: LiteracyTypes
}

interface Style {
  main: string,
  titleContainer: string,
  backButton: string,
  trainingContentCard: string,
  dashboardContainer: string,
  root: string,
  viewButtons: string,
  buttonsList: string,
  resultsContent: string,
  grid: string,
}

interface State {
  view: number;
}

/**
 * Training Layout
 * @class TrainingLayout
 */
class TrainingLayout extends React.Component<Props, State> {
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
      this.setState({ view: ViewEnum.CONCEPTS });
    }
  };

  definitionsClick = (): void => {
    if (this.state.view !== ViewEnum.DEFINITIONS) {
      this.setState({ view: ViewEnum.DEFINITIONS });
    }
  };

  demonstrationClick = (): void => {
    if (this.state.view !== ViewEnum.DEMONSTRATION) {
      this.setState({ view: ViewEnum.DEMONSTRATION });
    }
  };

  knowledgeCheckClick = (): void => {
    if (this.state.view !== ViewEnum.KNOWLEDGECHECK) {
      this.setState({ view: ViewEnum.KNOWLEDGECHECK });
    }
  };

  static propTypes = {
    classes: PropTypes.exact({
      main: PropTypes.string,
      titleContainer: PropTypes.string,
      backButton: PropTypes.string,
      trainingContentCard: PropTypes.string,
      dashboardContainer: PropTypes.string,
      root: PropTypes.string,
      viewButtons: PropTypes.string,
      buttonsList: PropTypes.string,
      resultsContent: PropTypes.string,
      grid: PropTypes.string,
    }).isRequired,
    icon: PropTypes.string.isRequired,
    conceptsUrl: PropTypes.string.isRequired,
    demonstrationUrl: PropTypes.string.isRequired,
    definitions: PropTypes.element.isRequired,
    section: PropTypes.string.isRequired,
    literacyType: PropTypes.number.isRequired
  };

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
          {(firebase: Types.FirebaseAppBar | null): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <div className={classes.main}>
          <Grid container justify="center" alignItems="center" className={classes.grid}>
            <Grid item className={classes.dashboardContainer}>
              <Grid
                container
                alignItems='center'
                justify='center'
                direction='column'
                style={{height: '100%'}}
              >
                <TrainingObservationDashboard
                  ViewEnum={ViewEnum}
                  view={view}
                  Icon={this.props.icon}
                  conceptsClick={this.conceptsClick}
                  definitionsClick={this.definitionsClick}
                  demonstrationClick={this.demonstrationClick}
                  knowledgeCheckClick={this.knowledgeCheckClick}
                  colorTheme={this.props.colorTheme}
                  literacyType={this.props.literacyType}
                />
              </Grid>
            </Grid>
            <Grid item className={classes.trainingContentCard}>
              {view === ViewEnum.CONCEPTS ? (
                <TrainingVideo videoUrl={this.props.conceptsUrl} />
              ) : view === ViewEnum.DEFINITIONS ? (
                <div>
                  {this.props.definitions}
                </div>
              ) : view === ViewEnum.DEMONSTRATION ? (
                <div>
                  <TrainingVideo videoUrl={this.props.demonstrationUrl} />
                </div>
              ) : view === ViewEnum.KNOWLEDGECHECK ? (
                <TrainingQuestionnaire section={this.props.section} />
              ) : null}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TrainingLayout);
