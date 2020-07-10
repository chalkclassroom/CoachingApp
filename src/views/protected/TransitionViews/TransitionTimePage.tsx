import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { withStyles } from "@material-ui/core/styles";
import TransitionTimer from "./TransitionTimer";
import TransitionLog from "./TransitionLog";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";
import { connect } from "react-redux";
import { resetTransitionTime, toggleNewTransitionType } from "../../../state/actions/transition-time";
import TransitionTypeSel from "./TransitionTypeSel";
import Dashboard from "../../../components/Dashboard";
import * as Constants from "../../../constants/Constants";
import * as Types from '../../../constants/Types';

const styles: object = {
  root: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
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
};

interface Props {
  classes: { root: string, backButton: string },
  history: {
    replace(
      param: {
        pathname: string,
        state: {
          type: string
        }
      }
    ): void
  },
  toggleNewTransitionType(transitionType: string | null): void,
  transitionType: string | null
};

interface State {
  notes: boolean,
  transitionType: string,
  open: boolean,
  transitionEnded: boolean
};

/**
 * transition time observation tool
 * @class TransitionTimePage
 */
class TransitionTimePage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      notes: false,
      transitionType: null,
      open: false,
      transitionEnded: false
    };
  }

  /**
   * @param {string} type
   */
  handleTransitionType = (type: string): void => {
    if (this.state.transitionEnded) {
      this.setState({ transitionEnded: false });
    }
    this.props.toggleNewTransitionType(type);
  };

  handleEndTransition = (): void => {
    this.setState({ transitionEnded: true });
    this.props.toggleNewTransitionType(null);
  };

  /**
   * @param {boolean} open
   */
  handleNotes = (open: boolean): void => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleNewTransitionType: PropTypes.func.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.notes ? (
          <FirebaseContext.Consumer>
            {(firebase: {
              handleFetchNotes(): Promise<Array<{
                id: string,
                content: string,
                timestamp: {seconds: number, nanoseconds: number}
              }>>,
              handlePushNotes(note: string): Promise<void>
            }): React.ReactElement => (
              <Notes
                open={true}
                onClose={this.handleNotes}
                color={Constants.Colors.TT}
                text={"Transition Time" + " Notes"}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (<div />)}
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
          <Grid container alignItems="center">
            <Grid item xs={3} style={{alignSelf: 'flex-start', paddingTop: '0.5em'}}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <Grid item>
                  <Dashboard
                    type="TT"
                    infoDisplay={<TransitionLog />}
                    infoPlacement="center"
                    completeObservation={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} justify="center">
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <TransitionTypeSel
                  handleTransitionType={this.handleTransitionType}
                  handleNotes={this.handleNotes}
                  transitionType={this.props.transitionType}
                />
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <FirebaseContext.Consumer>
                  {(firebase: {
                    auth: {
                      currentUser: {
                        uid: string
                      }
                    },
                    handleSession(mEntry: {
                      observedBy: string,
                      teacher: string,
                      start?: Date,
                      type: string
                    }): Promise<void>
                  }): React.ReactNode => (
                    <TransitionTimer
                      firebase={firebase}
                      typeSelected={
                        this.props.transitionType === null ? false : true
                      }
                      handleEndTransition={this.handleEndTransition}
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

const mapStateToProps = (state: Types.ReduxState): {transitionType: string | null} => {
  return {
    transitionType: state.transitionTypeState.transitionType,
  };
};


export default connect(mapStateToProps, { resetTransitionTime, toggleNewTransitionType })(
  withStyles(styles)(TransitionTimePage)
);
