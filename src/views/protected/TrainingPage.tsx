import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import TrainingDashboard from '../../components/TrainingComponents/TrainingDashboard';
import ToolIcons from '../../components/ToolIcons';
import LogoImage from '../../assets/images/LogoImage.svg';
import FirebaseContext from '../../components/Firebase/FirebaseContext';
import AppBar from '../../components/AppBar';
import * as Types from '../../constants/Types';
import * as H from 'history';

const styles: object = {
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    overflowY: 'auto',
    // overflowX: 'hidden'
    overflowX: 'auto'
  },
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
  main: {
    height: '100%',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  },
  grid: {
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
    paddingTop: '3em',
    paddingBottom: '3em'
  },
  dashboardGrid: {
    width: '25%',
    height: '100%'
  },
  contentGrid: {
    width: '75%',
    height: '100%'
  },
  typeGrid: {
    width: '45%',
  },
  timerGrid: {
    width: '55%',
  },
  trainingText: {
    paddingBottom: '0.5em',
    fontFamily: 'Arimo'
  },
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    grid: {
      height: '90vh',
      paddingTop: '1em',
      paddingBottom: '1em'
    }
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    grid: {
      direction: 'column',
      height: '90vh',
      paddingTop: '1em',
      paddingBottom: '1em'
    },
    dashboardGrid: {
      width: '100%',
      height: '25%'
    },
    contentGrid: {
      width: '100%',
      height: '75%'
    },
    typeGrid: {
      width: '50%'
    },
    timerGrid: {
      width: '50%'
    },
    trainingText: {
      paddingBottom: '1.5em'
    }
  }
};

interface Props {
  classes: {
    root: string,
    backButton: string,
    main: string,
    grid: string,
    dashboardGrid: string,
    contentGrid: string,
    typeGrid: string,
    timerGrid: string,
    trainingText: string
  },
  history: H.History
}

interface State {
  observe: boolean,
  navigation: boolean,
  results: boolean,
  conferencePlan: boolean,
  actionPlan: boolean,
  view: string
}

/**
 * training page
 * @class TrainingPage
 */
class TrainingPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      observe: true,
      navigation: false,
      results: false,
      conferencePlan: false,
      actionPlan: false,
      view: 'observe'
    }
  }

  /**
   * @param {string} name
   */
  viewClick = (name: string): void => {
    if (this.state.view !== name) {
      this.setState({ view: name })
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return(
      <div>
        <FirebaseContext.Consumer>
            {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
          </FirebaseContext.Consumer>
        <Grid
          container
          className={classes.grid}
          justify="center"
          alignItems="center"
        >
          <Grid item className={classes.dashboardGrid}>
            <Grid container direction="column" justify="center" alignItems="center" style={{height: '100%'}}>
              {<Grid item>
                <Typography align="center" variant="h4" className={classes.trainingText}>
                  Training
                </Typography>
              </Grid>}
              <Grid item style={{width: '100%'}}>
                <TrainingDashboard viewClick={this.viewClick} view={this.state.view} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.contentGrid}>
            {this.state.view === 'observe' ? (
              <ToolIcons type={'Observe'} training={true} history={this.props.history} />
            ) : this.state.view === 'navigation' ? (
              <Grid container direction="column" justify="center" alignItems="center" style={{height: '88vh'}}>
                <Grid item>
                  <img src={LogoImage} alt="CHALK" height="100vh" />
                </Grid>
                <Grid item style={{paddingTop: '3em'}}>
                  <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                    Navigation Training coming soon!
                  </Typography>
                </Grid>
              </Grid>
            ) : this.state.view === 'results' ? (
              <ToolIcons type={'Results'} training={true} history={this.props.history} />
            ) : this.state.view === 'conferencePlan' ? (
              <Grid container direction="column" justify="center" alignItems="center" style={{height: '88vh'}}>
                <Grid item>
                  <img src={LogoImage} alt="CHALK" height="100vh" />
                </Grid>
                <Grid item style={{paddingTop: '3em'}}>
                  <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                    Conference Plan Training coming soon!
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container direction="column" justify="center" alignItems="center" style={{height: '88vh'}}>
                <Grid item>
                  <img src={LogoImage} alt="CHALK" height="100vh" />
                </Grid>
                <Grid item style={{paddingTop: '3em'}}>
                  <Typography variant="h4" style={{fontFamily: 'Arimo'}}>
                    Action Plan Training coming soon!
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(TrainingPage);