import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Dashboard from '../../../components/Dashboard';
import InstructionCounter from '../../../components/LevelOfInstructionComponents/InstructionCounter';
import * as Types from '../../../constants/Types';

const styles: object = {
  root: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden'
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
    direction: 'row'
  },
  dashboardGrid: {
    width: '25%'
  },
  contentGrid: {
    width: '75%'
  },
  // ipad landscape
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    main: {
      height: '90vh',
      paddingTop: 0,
      paddingBottom: 0
    },
    grid: {
      direction: 'column'
    },
    dashboardGrid: {
      width: '100%',
      height: '25%'
    },
    contentGrid: {
      width: '100%',
      height: '75%'
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
    contentGrid: string
  },
}

/**
 * Level Of Instruction Tool
 * @class LevelOfInstructionPage
 */
class LevelOfInstructionPage extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  /**
   * @param {string} type
   */
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Types.FirebaseAppBar): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main className={classes.main}>
          <Grid
            container
            alignItems="center"
            justify="space-around"
            style={{height: '100%'}}
            className={classes.grid}
          >
            <Grid item className={classes.dashboardGrid}>
              <Grid container alignItems={'center'} justify={'center'} direction={'column'} style={{height: '100%'}}>
                <Dashboard
                  type="LI"
                  completeObservation={true}
                />
              </Grid>
            </Grid>
            <Grid item className={classes.contentGrid}>
              <Grid container alignItems={'center'} justify={'center'} direction={'column'} style={{height: '100%'}}>
                <FirebaseContext.Consumer>
                  {(firebase: {
                    auth: {
                      currentUser: {
                        uid: string
                      }
                    },
                    handleSession(entry: {teacher: string, observedBy: string, type: string}): void,
                    handlePushInstruction(insType: string): void,
                  }): React.ReactNode => (
                    <InstructionCounter
                      firebase={firebase}
                    />
                  )}
                </FirebaseContext.Consumer>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(LevelOfInstructionPage);
