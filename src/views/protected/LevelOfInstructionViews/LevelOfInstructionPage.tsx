import * as React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FirebaseContext from '../../../components/Firebase/FirebaseContext';
import AppBar from '../../../components/AppBar';
import Dashboard from '../../../components/Dashboard';
import InstructionCounter from '../../../components/LevelOfInstructionComponents/InstructionCounter';
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';

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
  }
};

interface Props {
  classes: { root: string, backButton: string },
  history: {
    replace(
      param: {
        pathname: string,
        state: { type: string }
      }
    ): void
  }
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
    history: PropTypes.exact({
      replace: PropTypes.func
    }).isRequired
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
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <header>
          <Grid container direction="row" alignItems="center" justify="flex-start">
            <Grid item xs={3}>
              <Grid container alignItems="center" justify="center">
                <Grid item>
                  <Button variant="contained" size="medium" className={classes.backButton}
                    onClick={(): void => {
                      this.props.history.replace({
                        pathname: "/Magic8Menu",
                        state: {
                          type: "Observe"
                        }
                      })
                    }}>
                    <ChevronLeftRoundedIcon />
                    <b>Back</b>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </header>
        <main style={{ flexGrow: 1 }}>
          <Grid container alignItems="center" style={{height: '100%'}}>
            <Grid item xs={3} style={{alignSelf: 'flex-start', paddingTop: '0.5em'}}>
              <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
                <Dashboard
                  type="LI"
                  completeObservation={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={9} style={{height: '100%'}}>
              <Grid container alignItems={'center'} justify={'center'} direction={'column'}>
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
